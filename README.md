# ⚛️ React Master - Todo list: Manipuler les tâches via une API (Correction)

Dans cet énoncé tu trouvra:

1 💡 indice

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Context
*   Reducer

## Consignes

Pour cet exercice, tu vas devoir cloner le dépôt.

Tu peux taper la commande suivante dans ton terminal:

```bash
git clone git@github.com:Atomic-React/react-master-todo-list.git
```

Ensuite, rends toi dans le dossier avec la commande suivante:

```bash
cd react-master-todo-list
```

Accède à la branche de l'exercice en exécutant la commande:

```bash
git switch ex13/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>.

Pour cet exercice, j'ai mis à ta disposition une petite API que tu peux installer localement sur ton poste.

Rends-toi ici pour suivre les indications et lire la documentation de cette API: <https://github.com/Atomic-React/todo-list-api>

Tu l'aura compris, le but de cet exercice est de faire en sorte que les tâches que l'on crée soient sauvergardées dans une base de données.

Une fois ces tâches sauvegardées, nous pourrons ensuite les récupérer pour les afficher, réaliser des mises à jour dessus et éventuellement les supprimer.

Toutes ces fonctionnalités sont mises à disposition par l'API. Il y a d'ailleurs déjà des tâches enregistrées dans la base de données de l'API.

À toi de t'imprégner de la documentation fournie et d'effectuer tes recherches pour mener à bien cet exercice.

<details>
 <summary>💡 indice</summary>

 > Pour charger la valeur initiale des tâches depuis l'API, tu peux effectuer ta requête dans un `useEffect` dans le composant `TasksContextProvider`.
 >
 > Tu peux ensuite dispatcher le résultat de la requête dans le `state` via une action.
 >
 > Tu aura certainement besoin d'adapter le reducer pour pouvoir mettre à jour le `state`
</details>

Bon courage ! 💪

## Correction

Première étape, récupérer les tâches déjà enregistrées dans l'API pour les afficher dans l'interface.

Nous pouvons nous rendre dans le composant `TasksContextProvider` pour faire cette requête.

C'est le composant du contexte qui détient le `state` contenant toutes les tâches, nous devons donc faire la requête dans ce composant pour placer la réponse dans le `state`.

Nous pouvons utiliser le hook `useEffect` pour faire cette requête.

Il est déconseillé de placer les requêtes API directement dans la fonction d'un composant, car à chaque fois que le composant va se re-rendre, la requête va se redéclencher. Le mieux est donc d'utiliser le cycle de vie.

On va dire à `useEffect` d'effectuer la requête seulement au montage du composant:

```JSX
useEffect(() => {
	fetch('http://localhost:3000/tasks')
	.then(response => response.json())
	.then(json => {
		console.log(json);
	})
	.catch(console.error);
}, []);
```

Pour l'instant, on fait seulement un `console.log` pour vérifier que nous récupérons bien une valeur.

Nous pouvons utiliser le `reducer` pour mettre à jour le `state`. Mais il va falloir le modifier pour rajouter l'action permettant d'insérer cette valeur dans le `state`.

On référence l'action dans `Tasks.actions.js`:

```jsx
export const SET_TASKS_ACTION = 'tasks/setTasks';
```

Puis on met à jour le `reducer`:

```jsx
const tasksReducer = (state, action) => {

	switch (action.type) {
		case SET_TASKS_ACTION:
			return {
				...state,
				tasks: action.payload,
			};
		// ...
	}
};

export default tasksReducer;
```

Je peux maintenant utiliser cette action dans le `useEffect`:

```jsx
useEffect(() => {
	fetch('http://localhost:3000/tasks')
	.then(response => response.json())
	.then(json => {
		dispatchTasksAction({
			type: SET_TASKS_ACTION,
			payload: json.rows,
		});
	})
	.catch(console.error);
}, []);
```

Nous devrions avoir quelques erreurs dans la console qu'il est nécessaire de traiter pour voir les tâches s'afficher.

Nous faisons face à deux problèmes:

*   L'API fourni un `id` de type `string` alors que nous utilisions des nombres.
*   La date de création de chaque tâche envoyée par l'API est une chaine de caractère au format ISO nommé `createdAt` et non un objet `Date` nommé `created_at`

Commençons par ajuster le nom et le typage des `props` dans `TasksTable`:

```jsx
TasksTable.propTypes = {
	tasks: arrayOf(shape({
		id: string.isRequired, // ICI
		title: string.isRequired,
		isDone: bool.isRequired,
		createdAt: string.isRequired, // ICI
	})),
	isLoading: bool,
};
```

Et dans `TaskRow`:

```jsx
const TaskRow = ({ id, title, createdAt, isDone }) => { // ICI

	// ...

	return (
		<tr>
			<td>
			{
					isEditionModeActive ?
					<form onSubmit={ handleSaveTitle } style={{ display: 'flex', gap: 8 }}>
						<InputText ref={ editTaskInputRef } />
						<Button type="submit">Save</Button>
					</form>
					: <span role="button" onClick={ handleEditTitle }>{ title }</span>
				}
			</td>
			<td>{ new Date(createdAt).toLocaleDateString() }</td> { /* ICI */}
			<td><Checkbox value={ isDone } onChange={ handleSwitchCompletedTask } useCheckedAsValue /></td>
			<td>
				<DeleteTaskConfirmModal onConfirm={ handleDeleteTask } />
			</td>
		</tr>
	);
};

TaskRow.propTypes = {
	id: string.isRequired, // ICI
	title: string.isRequired,
	createdAt: string.isRequired, // ICI
	isDone: bool,
};
```

Cela devrait fonctionner à présent.

En revanche, l'ajout, la modification et la suppression risquent de ne pas fonctionner et d'engendrer des erreurs si on essaie de les utiliser.

Nous allons donc nous en occuper mais avant cela je vais préparer le terrain pour que les appels API puissent être faits de façon plus rapide et efficace.

Plutôt que de faire un `fetch` dans chaque composant où nous en avons besoin, nous allons appeler des fonctions qui se chargeront d'effectuer le `fetch`.

Pour cela, nous allons créer un dossier `services/` dans `src/` dans lequel nous ajouterons un fichier `tasks.service.js`:

Ajoutons la première fonction:

```jsx
const apiURL = 'http://localhost:3000';

export const getTasks = async () => {
	try {
		const response = await fetch(`${apiURL}/tasks`);
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
```

Et utilisons la dans le `useEffect` du composant du contexte:

```jsx
useEffect(() => {
	getTasks()
	.then(data => {
		dispatchTasksAction({
			type: SET_TASKS_ACTION,
			payload: data.rows,
		});
	})
	.catch(console.error);
}, []);
```

Le callback du `useEffect` ne peut pas être asynchrone. Il faudrait une fonction intermédiaire supplémentaire pour utiliser la syntaxe `async`/`await`. J'utilise donc la syntaxe `then`/`catch` pour des raisons de simplicité ici.

L'intérêt de créer des fonctions dans un service est multiple:

*   Les fonctions sont plus simples à utiliser et à comprendre qu'une URL
*   Il n'est pas nécessaire de se souvenir de chaque route
*   Cela permet de déléguer une partie de la logique en lien avec l'api (les headers, le traitement des erreurs, etc...)

On peut également demander la mise à jour des compteurs après avoir récupéré les tâches directement dans le `useEffect`:

```jsx
useEffect(() => {
	getTasks()
	.then(data => {
		dispatchTasksAction({
			type: SET_TASKS_ACTION,
			payload: data.rows,
		});
		dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
	})
	.catch(console.error);
}, []);
```

Occupons nous de la création de tâches en ajoutant la fonction dans le service:

```jsx
export const createTask = async (taskToCreate) => {
	try {
		const response = await fetch(`${apiURL}/tasks`, {
			method: 'POST',
			body: JSON.stringify(taskToCreate),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
```

Puis modifions la fonction `createTask` dans le contexte. Mais attention, il va y avoir un conflit de nommage entre la fonction du contexte et la fonction `createTask` du service.

Je vais donc renommer la fonction du service à l'importation dans le contexte, comme ceci:

```jsx
import { getTasks, createTask as createTaskRequest } from '../../services/tasks.service';
```

Puis je m'occupe de la fonction `createTask` du contexte:

```jsx
const createTask = async (newTask) => {
	const createdTask = await createTaskRequest(newTask);
	dispatchTasksAction({
		type: CREATE_TASK_ACTION,
		payload: createdTask,
	});
	dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
};
```

La création de tâches devrait être rétablie.

Remettons en place la mise à jour des tâches en ajoutant d'abord la fonction dans le service:

```JSX
export const updateTask = async (taskToUpdate) => {
	try {
		const response = await fetch(`${apiURL}/tasks`, {
			method: 'PUT',
			body: JSON.stringify(taskToUpdate),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
```

Puis en mettant à jour la fonction `updateTask` dans le contexte. Mais encore une fois, je dois renommer la fonction `updateTask` qui vient du service dans le contexte lors de l'importation. Et ça sera pareil avec la fonction de suppression.

```jsx
import { getTasks, createTask as createTaskRequest, updateTask as updateTaskRequest } from '../../services/tasks.service';
```

Fonction `updateTask` du contexte:

```jsx
const updateTask = async (taskToUpdate) => {
	await updateTaskRequest(taskToUpdate);
	dispatchTasksAction({
		type: UPDATE_TASK_ACTION,
		payload: taskToUpdate,
	});
	dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
};
```

La requête ne retourne pas l'objet de la tâche mise à jour en base de données. Je dois donc continuer de passer directement `taskToUpdate` reçu en argument de la fonction dans le `dispatch` pour mettre à jour la vue.

Mais si on rafraichit la page après une mise à jour, on peut observer qu'elle a bien été prise en compte par l'API.

Reste plus que la suppression pour finaliser le CRUD.

On ajoute la fonction dans le service:

```jsx
export const deleteTask = async (taskIdToDelete) => {
	try {
		const response = await fetch(`${apiURL}/tasks/${ taskIdToDelete }`, {
			method: 'DELETE',
		});
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
```

Puis on met à jour dans le contexte:

```jsx
const deleteTask = async (taskId) => {
	await deleteTaskRequest(taskId);
	dispatchTasksAction({
		type: DELETE_TASK_ACTION,
		payload: taskId,
	});
	dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
};
```

Comme pour la requête de mise à jour, la requête de suppression ne retourne pas l'objet supprimé.

L'exercice est terminé ! 👏
