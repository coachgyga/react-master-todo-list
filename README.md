# ⚛️ React Master - Todo list: Gérer l'état d'erreur et l'état de chargement (Correction)

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Context
*   Reducer

## Consignes

Sauvegarde d'abord le travail de l'exercice précédent:

```bash
git add .
```

```bash
git commit -m "exercice terminé"
```

Ensuite, accède à la branche de l'exercice en exécutant la commande:

```bash
git switch ex14/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Et lance l'application:

```bash
npm run dev
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>.

Pour cet exercice, tu vas devoir gérer l'état de chargement, et l'état d'erreur accompagné des messages d'erreurs éventuels.

J'ai apporté quelques modifications à l'application pour que tu puisses partir sur de meilleures bases.

Tout d'abord, j'ai ajouté la récupération des messages d'erreurs dans les fonction de `tasks.service.js`.

C'est ce code ci que tu vois dans chaque fonction:

```JSX
if (!response.ok) {
	throw new Error(json.error);
}
```

Cela te servira pour récupérer les messages d'erreurs.

J'ai aussi commenté une partie de la fonction `validateForm` qui se trouve dans le composant `CreateTaskFormModal`:

```JSX
const validateForm = () => {
	let errors;
	// const { title } = formValue;
	// if (title.length < 3) {
	// 	errors = {
	// 		...errors,
	// 		title: 'The task title must contain at least 3 characters.',
	// 	};
	// }
	setValidationsErrors(errors);
	return errors;
};
```

De cette façon, tu pourra tester plus facilement le cas d'erreur avec un exemple accessible directement.

Comme il n'y a plus de validation du champ "titre", tu vas pouvoir envoyer un titre vide à l'API. Sauf que l'API n'aime pas ça, elle te renverra un message d'erreur que tu devra traiter et afficher comme tu peux le voir ci-dessous:

![tasks api error](docs/tasks_error_api.png)

Ce message d'erreur devra forcément passer par l'état du contexte puisque c'est dans le composant du contexte que les requêtes API sont effectuées. Cela veut dire que tu as certainement besoin de toucher au `reducer` pour créer des actions supplémentaires.

Il faudra aussi que tu gère l'état de chargement.

Dans le service `tasks.service.js`, j'ai ajouté un temps de latence factice sur la requête des tâches:

```JSX
const wait = (delay = 3000) => new Promise((resolve) => {
	setTimeout(() => resolve(), delay);
});

export const getTasks = async () => {
	try {
		await wait(); // ICI => On attend 3 secondes que les tâches chargent
		const response = await fetch(`${apiURL}/tasks`);
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.error);
		}
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
```

Pendant le chargement, tu devra afficher le message _"Loading data..."_ à la place du tableau des tâches:

![tasks loading](docs/tasks_loading.png)

Rappelle toi qu'il y a un moment maintenant, nous avions ajouté une propriétés `isLoading` sur le composant `TasksTable`. Tu peux certainement t'en servir ! Je te laisse regarder ça.

Comme pour l'état d'erreur, tu devra utiliser le `reducer` du contexte et certainement créer une action pour l'état de chargement.

Bon courage ! 💪

## Correction

Commençons par le plus simple: l'état de chargement.

Supposons que depuis le composant `Tasks`, grâce à `useTasksContext`, nous puissions récupérer une propriété `isLoading`:

```JSX
const { tasks, allTasksCount, todoTasksCount, completedTasksCount, createTask, isLoading } = useTasksContext();
```

Cette propriété serait transmise à `TasksTable` via la prop `isLoading`:

```JSX
<Tabs
	tabs={ tabs }
	defaultActiveTabId={ 0 }
	renderContent={
		({ activeTabId }) => (
			<>
				{ activeTabId === 0 && <AllFilteredTasksTable tasks={ tasks } searchValue={ searchTaskValue } isLoading={ isLoading } /> }
				{ activeTabId === 1 && <TodoFilteredTasksTable tasks={ tasks } searchValue={ searchTaskValue } isLoading={ isLoading } />}
				{ activeTabId === 2 && <CompletedFilteredTasksTable tasks={ tasks } searchValue={ searchTaskValue } isLoading={ isLoading } /> }
			</>
		)
	}
/>
```

Cette propriété serait dans la valeur initiale du `state` à `false` par défaut:

```JSX
const INITIAL_TASKS_STATE_VALUE = {
	tasks: [],
	allTasksCount: 0,
	todoTasksCount: 0,
	completedTasksCount: 0,
	isLoading: false,
};
```

Il faut alors l'ajouter à la valeur du contexte:

```jsx
const contextValue = {
	tasks: tasksState.tasks,
	allTasksCount: tasksState.allTasksCount,
	todoTasksCount: tasksState.todoTasksCount,
	completedTasksCount: tasksState.completedTasksCount,
	isLoading: tasksState.isLoading, // ICI
	createTask,
	deleteTask,
	updateTask,
};
```

D'ailleurs pour ne plus avoir à s'embêter avec le fait d'inscrire chaque propriété du `state` en valeur du contexte, nous devrions procéder ainsi:

```jsx
const contextValue = {
	...tasksState,
	createTask,
	deleteTask,
	updateTask,
};
```

Ce qui changerait la valeur de cette propriété `isLoading`, ça serait une action du `reducer` qui serait utilisée pour mettre `isLoading` à `true` au moment de faire la requête, puis à `false`, une fois la réponse reçue.

```JSX
dispatchTasksAction({ type: TASKS_SET_LOADING_ACTION, payload: true });
getTasks()
.then(data => {
	dispatchTasksAction({
		type: SET_TASKS_ACTION,
		payload: data.rows,
	});
	dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
	dispatchTasksAction({ type: TASKS_SET_LOADING_ACTION, payload: false });
})
.catch(console.error);
```

Ajoutons le nom de l'action dans `Tasks.actions.js`:

```JSX
const TASKS_SET_LOADING_ACTION = 'tasks/setLoading';
```

Puis ajoutons l'action dans le `reducer`:

```JSX
const tasksReducer = (state, action) => {

	switch (action.type) {
		// ...
		case TASKS_SET_LOADING_ACTION:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};

export default tasksReducer;
```

Ceci devrait fonctionner.

Cependant, je n'ai pas que l'état de chargement à gérer; j'ai aussi l'état d'erreur.

L'état d'erreur va avoir ses subtilités.

Je sais que je vais devoir afficher un message d'erreur fourni par l'API dans le composant `Tasks` dans le `Block`.

Imaginons qu'on récupère une propriété `error` depuis le contexte qui contiendrait un message d'erreur:

```jsx
const { tasks, allTasksCount, todoTasksCount, completedTasksCount, createTask, isLoading, error } = useTasksContext();
```

```JSX
<Block>
	{
		error && <p style={ { color: 'red', textAlign: 'center' } }>{ error }</p>
	}
	{ /* ... */ }
</Block>
```

Si `error` existe alors on affiche un paragraphe en rouge contenant le message d'erreur.

Ajoutons l'action qui va permettre d'inscrire l'erreur dans le `state`:

```jsx
export const TASKS_SET_ERROR_ACTION = 'tasks/setError';
```

```jsx
const tasksReducer = (state, action) => {

	switch (action.type) {
		// ...
		case TASKS_SET_ERROR_ACTION:
			return {
				...state,
				error: action.payload,
				isLoading: false, // On remet l'état de isLoading à false en cas d'erreur
			};
		default:
			return state;
	}
};

export default tasksReducer;
```

Puis on l'appelle partout où c'est nécessaire dans le composant du contexte. C'est à dire à chaque fois qu'il y a une requête API, dans le `catch` de la requête:

```jsx
useEffect(() => {
	dispatchTasksAction({ type: TASKS_SET_LOADING_ACTION, payload: true });
	getTasks()
	.then(data => {
		dispatchTasksAction({
			type: SET_TASKS_ACTION,
			payload: data.rows,
		});
		dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
		dispatchTasksAction({ type: TASKS_SET_LOADING_ACTION, payload: false });
	})
	.catch(error => {
		dispatchTasksAction({ type: TASKS_SET_ERROR_ACTION, payload: error.message }); // ICI
	});
}, []);

const createTask = async (newTask) => {
	try {
		const createdTask = await createTaskRequest(newTask);
		dispatchTasksAction({
			type: CREATE_TASK_ACTION,
			payload: createdTask,
		});
		dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
	} catch (error) {
		dispatchTasksAction({ type: TASKS_SET_ERROR_ACTION, payload: error.message }); // ICI
	}
};

const deleteTask = async (taskId) => {
	try {
		await deleteTaskRequest(taskId);
		dispatchTasksAction({
			type: DELETE_TASK_ACTION,
			payload: taskId,
		});
		dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
	} catch (error) {
		dispatchTasksAction({ type: TASKS_SET_ERROR_ACTION, payload: error.message }); // ICI
	}
};

const updateTask = async (taskToUpdate) => {
	try {
		await updateTaskRequest(taskToUpdate);
		dispatchTasksAction({
			type: UPDATE_TASK_ACTION,
			payload: taskToUpdate,
		});
		dispatchTasksAction({ type: UPDATE_TASKS_COUNTERS_ACTION });
	} catch (error) {
		dispatchTasksAction({ type: TASKS_SET_ERROR_ACTION, payload: error.message }); // ICI
	}
};
```

Il n'y a plus qu'à tester en essayant par exemple, de créer une tâche sans titre. Tu verra que le message d'erreur apparaitra au dessus du tableau des tâches.

Exercice terminé ! 👏
