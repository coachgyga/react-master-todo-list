# ⚛️ React Master - Todo list: Modification des tâches (Correction)

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Événements
*   Props
*   Gestion d'état
*   Typage des props
*   Composants contrôlés
*   Passage de référence

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
git switch ex02/exercise
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

Voici une capture d'écran du rendu final que tu dois obtenir:

![Todo list edit](docs/todo-list-edit.png)

Tu remarques le `label` au dessus du champ de création d'une nouvelle tâche.

L'idée ici c'est permettre à l'utilisateur de cliquer sur le titre d'une tâche pour faire apparaître un champ pré-rempli avec le titre et lui permettre de modifier ce titre. Un bouton d'enregistrement doit être placé à côté du champ pour valider la modification.

Une fois la modification faite, le champ doit disparaitre et la ligne de la tâche doit s'afficher comme avant que l'utilisateur ne clique dessus.

Voici à quoi cela doit ressembler:

![todo edit task](docs/todo-edit-task.png)

Pour réaliser cela, tu devra créer un composant dédié au champ que tu pourra appeler à plusieurs endroits.

Il n'est pas question de redévelopper plusieurs fois la même `input`. Tu l'as déjà, elle se trouve dans le composant `App`. Il te suffit de la récupérer et de la placer dans ce fameux composant dédié. Tu devra alors remplacé le champ dans `App.jsx` par le composant en question.

Tu placera ce composant dans le dossier `forms/` qui a été ajouté dans le dossier `components/`.

Ce composant devra être capable de prendre en charge un `label` optionnel. Tu devras donc rajouter la structure HTML nécessaire pour que ce label puisse être ajouté et relié à l'`input`.

<details>
 <summary>💡 <b>Indice</b></summary>

 > Tu vas avoir plusieurs champs avec des labels sur la même page. Pour relier chaque champ à chaque label, l'une des méthodes possibles consiste à utiliser l'`id` du champ pour le mettre en tant que valeur de l'attribut `for` du label.
 >
 > Pour éviter les conflits d'`id`, tu devras en générer un unique à chaque fois que tu fais appel à ton composant. Pour cela, **React** met à ta disposition le hook `useId`.
 >
 > Voici le lien de la documentation **React** qui en parle: <https://react.dev/reference/react/useId>

</details>

Nous travaillons toujours avec les références et les composants non-contrôlés. À toi de trouver comment faire pour communiquer une référence d'un composant parent à un composant enfant et vice-vers-ça.

<details>
 <summary>💡 <b>Indice</b></summary>

 > Pour transmettre des références entre composants, renseignes-toi la fonction `forwardRef`
 >
 > Voici le lien de la documentation **React** qui en parle: <https://react.dev/reference/react/forwardRef>

</details>

Bon courage ! 💪

## Correction

Nous allons avoir besoin d'ajouter un peu de **CSS** pour cet `input`. Créons donc un fichier `forms.css` dans le dossier `components/forms/`:

```css
.form-block {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.form-input {
	padding: 0.5rem 1rem;
	box-shadow: var(--shadow);
	border: none;
	border-radius: 0.5rem;
}
```

Récupérons l'`input` depuis `App.jsx` pour l'ajouter dans le composant `InputText`.

Nous savons que nous allons avoir besoin d'un `label` optionnel. Nous pouvons déjà anticiper les `props`:

```jsx
import { object, string } from 'prop-types';
import '../forms.css';

const InputText = ({ label, ...htmlInputProps }, ref) => {
	
	return (
		<input className="form-input" { ...htmlInputProps } />
	);
};

export default InputText;

InputText.propTypes = {
	label: string,
	style: object,
};

InputText.defaultProps = {
	label: '',
};
```

Pour ajouter le label, nous allons encapsuler l'`input` dans une `div` et y mettre le `label` avec:

```jsx
import { object, string } from 'prop-types';

const InputText = ({ label, ...htmlInputProps }, ref) => {
	
	return (
		<div className="form-block">
			{ label ? <label>{ label }</label> : null }
			<input className="form-input" { ...htmlInputProps } ref={ ref } />
		</div>
	);
};
```

Pour pouvoir les relier, le label et l'input, il va nous falloir un `id` unique qui soit généré au moment où le composant est rendu. Car si nous appelons plusieurs fois le même composant dans la même page alors que l'`id` est le même à chaque fois, nous aurons quelques soucis.

Pour faire cela, nous allons utiliser le hook `useId`:

```jsx
const InputText = ({ label, ...htmlInputProps }, ref) => {

	const inputId = useId();
	
	return (
		<div className="form-block">
			{ label ? <label htmlFor={ inputId }>{ label }</label> : null }
			<input id={ inputId } className="form-input" { ...htmlInputProps } ref={ ref } />
		</div>
	);
};
```

Tu remarques que le `for` du label est devenu `htmlFor`. C'est dû au fait que `for` est un mot clé en **JavaScript**, puisse qu'il sert à faire des boucles. Pour éviter les conflits, il a été renommé en `htmlFor`.

Il va aussi nous falloir rajouter la props `style` car nous aurons besoin de personnaliser le style de cet input pour sa mise en page dans le composant `App` (voir un peu plus bas):

```jsx
const InputText = ({ label, style, ...htmlInputProps }, ref) => {

	const inputId = useId();
	
	return (
		<div className="form-block" style={ style }> { /* Le style est placé sur la div */ }
			{ label ? <label htmlFor={ inputId }>{ label }</label> : null }
			<input id={ inputId } className="form-input" { ...htmlInputProps } ref={ ref } />
		</div>
	);
};

// On pense au typage des props

InputText.propTypes = {
	label: string,
	style: object,
};

InputText.defaultProps = {
	label: '',
	style: {},
};
```

On peut maintenant utiliser ce composant dans le composant `App` à la place de l'ancienne `input`:

```jsx
const App = () => {

	// ...

	return (
		<div className="container">
			<h1 className="text--primary">Todo</h1>
			<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
				<InputText label="Add a new task" style={{ flexGrow: 1 }} />
				<Button onClick={ handleCreateNewTask } style={{ marginTop: 'auto' }}>Create</Button>
			</div>
			<Block>
				<Tasks tasks={ tasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
			</Block>
		</div>
	);
};
```

La question maintenant est: comment passer la référence d'un composant parent à un composant enfant ?

Car pendant l'exercice, tu as dû te rendre compte que `ref` n'était pas une `props` comme les autres et que tu ne pouvais pas la récupérer directement dans les `props` du composant `InputText`.

Nous pouvons dès maintenant passer la référence à `InputText` comme ceci:

```jsx
<InputText label="Add a new task" style={{ flexGrow: 1 }} ref={ newTaskInputRef } />
```

Mais pour la récupérer dans `InputText`, il va falloir utiliser la fonction `forwardRef` fournie par **React** qui permet justement le passage de références entre composants.

`forwardRef` est ce que l'on appel un _Composant d'Ordre Supérieur_. C'est juste un gros mot pour dire que c'est une fonction qui permet d'apporter certaines fonctionnalités à un composant sans modifier le composant d'origine. Nous en reparlerons dans le prochain module.

Il s'utilise comme ceci:

```jsx
// On import forwardRef depuis react;
import { forwardRef, useId } from 'react';
import '../forms.css';
import { object, string } from 'prop-types';

const InputText = ({ label, style, ...htmlInputProps }, ref) => { // On récupère la référence ici, après les props

	const inputId = useId();
	
	return (
		<div className="form-block" style={ style }>
			{ label ? <label htmlFor={ inputId }>{ label }</label> : null }
			<input type="text" className="form-input" { ...htmlInputProps } ref={ ref } /> { /* On utilise la référence sur l'input */ }
		</div>
	);
};

// On encapsule InputText avec forwardRef
export default forwardRef(InputText);
```

Le formulaire d'ajout devrait de nouveau fonctionner à présent.

Pour permettre la modification des tâches, il faut maintenant rendre le titre de chaque tâche cliquable pour afficher un composant `InputText` à la place:

```jsx
const Task = ({ title, created_at, onDeleteTask: handleDeleteTask }) => {

	// On utilise le state pour savoir si le mode "modification" est activé ou pas
	const [ isEditionModeActive, setIsEditionModeActive ] = useState(false);

	const handleEditTitle = () => {
		setIsEditionModeActive(true);
	}

	return (
		<tr>
			<td>
			{
					isEditionModeActive ?
					// Ici on ajoute un formulaire pour permettre la modification
					<form style={{ display: 'flex', gap: 8 }}>
						<InputText />
						<Button type="submit">Save</Button>
					</form>
					: <span role="button" onClick={ handleEditTitle }>{ title }</span> { /* La span contenant le titre joue le role de bouton pour activer le mode modification */ }
				}
			</td>
			<td>{ created_at.toLocaleDateString() }</td>
			<td>
				<Button variant="danger" onClick={ handleDeleteTask }>Delete</Button>
			</td>
		</tr>
	);
};

export default Task;
```

Contrairement au formulaire de création d'une tâche qui utilise une simple `input` et un bouton avec un écouteur d'événement sur le bouton pour valider la création, ici on utilise une balise `form`.

Ce n'est pas du tout obligatoire, c'est simplement une alternative. Cependant c'est une alternative recommandée car elle répond mieux aux standards d'accessibilité et de sémantique.

Relions l'`InputText` à une référence avec `useRef` et faisons en sorte que cette `input` soit pré-remplie avec la valeur du titre de la tâche. Pour cela, il va falloir utiliser `useEffect`:

```jsx
const Task = ({ title, created_at, onDeleteTask: handleDeleteTask, onUpdateTask }) => {

	const [ isEditionModeActive, setIsEditionModeActive ] = useState(false);

	// On crée la référence
	const editTaskInputRef = useRef(null);

	const handleEditTitle = () => {
		setIsEditionModeActive(true);
	}

	useEffect(() => {
		// Au montage du composant ET lorsque isEditionModeActive ou title sont mis à jour
		// Si editTaskInputRef.current est défini (si l'input existe et est référencée)
		if (editTaskInputRef.current) {
			// Alors on met le titre en valeur du champ
			editTaskInputRef.current.value = title;
		}
	}, [ isEditionModeActive, title ]);

	return (
		<tr>
			<td>
			{
					isEditionModeActive ?
					<form style={{ display: 'flex', gap: 8 }}>
						{ /* On passe la référence à l'input */ }	
						<InputText ref={ editTaskInputRef } />
						<Button type="submit">Save</Button>
					</form>
					: <span role="button" onClick={ handleEditTitle }>{ title }</span>
				}
			</td>
			<td>{ created_at.toLocaleDateString() }</td>
			<td>
				<Button variant="danger" onClick={ handleDeleteTask }>Delete</Button>
			</td>
		</tr>
	);
};

export default Task;
```

Le `useEffect` est nécessaire ici pour plusieurs raisons:

*   Lors de l'affichage initial, le mode "modification" est désactivé, donc `InputText` n'est pas monté. Ce qui signifie que la référence `editTaskInputRef` n'est reliée à aucun composant. On utilise alors `useEffect` pour remplir le champ avec le titre au moment où le champ se monte, c'est à dire au moment où `isEditionModeActive` passe à `true`.
*   Ensuite, si le titre change de valeur, il faut bien que l'`input` soit à jour pour la prochaine modification. On ajoute donc le titre en dépendance du `useEffect`.

Il ne manque plus que la fonction permettant la mise à jour.

Dans `Task.jsx`, on ajoute l'écouteur d'événement `onSubmit` sur la balise `form`. Cet écouteur d'événement déclenchera la fonction `handleSaveTitle` qui elle-même déclenchera la fonction de mise à jour reçue depuis les `props` (on pense aux `PropTypes` !), puis on ferme le mode "modification":

```jsx
// On récupère `onUpdateTask` depuis les props et on la renomme `handleUpdateTask`
const Task = ({ title, created_at, onDeleteTask: handleDeleteTask, onUpdateTask: handleUpdateTask }) => {

	const [ isEditionModeActive, setIsEditionModeActive ] = useState(false);
	const editTaskInputRef = useRef(null);

	const handleEditTitle = () => {
		setIsEditionModeActive(true);
	}

	useEffect(() => {
		if (editTaskInputRef.current) {
			editTaskInputRef.current.value = title;
		}
	}, [ isEditionModeActive, title ]);

	const handleSaveTitle = (event) => {
		// On empêche le comportement par défaut du submit (rafraichissement de la page)
		event.preventDefault();

		// On déclenche la fonction de mise à jour qui reçois en argument un objet contenant le titre à mettre à jour
		handleUpdateTask({
			title: editTaskInputRef.current.value,
		});

		// On désactive le mode modification
		setIsEditionModeActive(false);
	};

	return (
		<tr>
			<td>
			{
					isEditionModeActive ?
					// Lorsque l'on soumet le formulaire, `handleSaveTitle` est déclenchée
					<form onSubmit={ handleSaveTitle } style={{ display: 'flex', gap: 8 }}>
						<InputText ref={ editTaskInputRef } />
						<Button type="submit">Save</Button>
					</form>
					: <span role="button" onClick={ handleEditTitle }>{ title }</span>
				}
			</td>
			<td>{ created_at.toLocaleDateString() }</td>
			<td>
				<Button variant="danger" onClick={ handleDeleteTask }>Delete</Button>
			</td>
		</tr>
	);
};

export default Task;

Task.propTypes = {
	title: string.isRequired,
	created_at: instanceOf(Date).isRequired,
	onDeleteTask: func.isRequired,
	onUpdateTask: func.isRequired, // On ajoute le typage de onUpdateTask
};
```

Dans le composant `Tasks`, il faut aussi récupérée `onUpdateTask` depuis les `props` (sans oublier le typage). Et on transmet cette fonction au composant `Task`.

On doit traverser toutes les couches de composants car le `state` des tâches est géré dans `App`.

```jsx
// On récupère `onUpdateTask` depuis les props et on la renomme `handleUpdateTask`
const Tasks = ({ tasks, onDeleteTask: handleDeleteTask, onUpdateTask: handleUpdateTask }) => {

	return (
		<>
			<table className="tasks-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Created At</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						// On passe cette fonction en tant que props du composant Task en l'exécutant pour lui transmettre l'id de la tâche (fonction curry)
						tasks.map((task) => <Task key={task.id} onDeleteTask={ handleDeleteTask(task.id) } onUpdateTask={ handleUpdateTask(task.id) } {...task} />)
					}
				</tbody>
			</table>
			{ !tasks || tasks.length === 0 && <p style={{ textAlign: 'center' }}>No data</p>}
		</>
	);
};

export default Tasks;

Tasks.propTypes = {
	tasks: arrayOf(shape({
		id: number.isRequired,
		title: string.isRequired,
		created_at: instanceOf(Date).isRequired,
	})),
	onDeleteTask: func.isRequired,
	onUpdateTask: func.isRequired, // On ajoute le typage de onUpdateTask
};
```

Dans `App`, on écoute l'événement de modification d'une tâche. Lorsqu'il est déclenché, il exécute la fonction `handleUpdateTask`:

```jsx
<Tasks tasks={ tasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
```

Cette fonction la voici:

```jsx
 // fonction curry qui reçois taskId en argument
 // La fonction retournée reçoit les informations à mettre à jour
const handleUpdateTask = (taskId) => (updatedTask) => {
	// On crée un nouveau tableau à partir du tableau des tâches en tenant compte des modifications à apporter
	const updatedTasks = tasks.map(task => {
		// Si l'id de la tâche est égal à celui reçu en argument
		if (task.id === taskId) {
			// On modifie la tâche
			return {
				...task,
				...updatedTask,
			};
		}
		// Sinon, on laisse la tâche telle qu'elle est
		return task;
	});
	// On envoie la mise à jour au state
	setTasks(updatedTasks);
}
```

Tout devrait fonctionner maintenant. L'exercice est terminé ! 👏
