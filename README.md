# ⚛️ React Master - Todo list: Découverte des contexts (Correction)

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Context

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
git switch ex11/exercise
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

Tu as dû remarquer que notre application commence à devenir un joli sac de nœuds !

Pour supprimer une tâche, la fonction se trouve dans `App`, mais le bouton se trouve dans `Task`. On se retrouve du coup à devoir passer la fonction depuis `App` à `Tasks` puis enfin à `Task`.

Imagine si on avait d'autres composants enfants qui auraient besoin d'accéder à des fonction d'un composant parent assez haut perché dans l'arbre... Ça deviendrait vite l'enfer !

Mais heureusement, **React** a créé les contextes !

C'est une fonctionnalité qui te permet, entre autres, de transmettre des fonctionnalité issues de composants parents vers des composants enfants, sans devoir traverser toutes les couches de composants.

C'est une sorte de service auquel n'importe quel composant peut accéder pour en récupérer les fonctionnalités.

Ta mission va être de supprimer les intermédiaires. Pour modifier ou supprimer une tâche, nous ne devrions plus avoir besoin de transmettre les fonctions correspondantes par les `props`.

En gros le `JSX` dans `App`, à l'endroit où on fait appel aux tâches pour les afficher, devrait ressembler à ça:

```JSX
<Block>
	<Tabs
		tabs={ tabs }
		defaultActiveTabId={ 0 }
		renderContent={
			({ activeTabId }) => (
				<>
					{ activeTabId === 0 && <AllFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } /> /* plus de onUpdateTask ou de onDeleteTask ! */ }
					{ activeTabId === 1 && <TodoFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } />  /* plus de onUpdateTask ou de onDeleteTask ! */ }
					{ activeTabId === 2 && <CompletedFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } />  /* plus de onUpdateTask ou de onDeleteTask ! */ }
				</>
			)
		}
	/>
</Block>
```

Le composant `Task` devrait avoir accès à ces fonctions de suppression et de modification grâce au contexte que l'on appellera `TasksContext`.

Voici le lien de la documentation **React** qui parle des contextes: <https://react.dev/reference/react/createContext#consumer>

<details>
 <summary>💡 <b>Indice</b></summary>

 > C'est le composant `App` qui détient l'état des tâches et la logique de mise à jour et de suppression.
 >
 > `App` va donc partager ces fonctionnalités au contexte pour que le context puisse à son tour les partager avec les composants enfants qui le demanderont

</details>

Bon courage ! 💪

## Correction

Pour commencer, je vais créer un fichier `Tasks.context.jsx` dans un dossier `context/` à la racine de `src/`:

```jsx
import { createContext } from 'react';

const TasksContext = createContext();

export default TasksContext;
```

On crée donc le contexte et on l'exporte par défaut. Pour le moment, il n'y a rien de plus à faire ici.

En suite, nous devons nous rendre dans `App` pour utiliser le `Provider` du contexte:

```jsx
const App = () => {

	// ...

	return (
		// On utilise le Provider et on lui transmet une valeur
		<TasksContext.Provider value={ contextValue }>
			<div className="container">
				<h1 className="text--primary">Todo</h1>
				<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
					<InputSearch label="Search a task" placeholder="Search..." onSearch={ handleSearchTask } style={{ flexGrow: 1 }} />
					<CreateTaskFormModal onSubmit={ handleSubmitCreateTaskForm } />
				</div>
				<Block>
					<Tabs
						tabs={ tabs }
						defaultActiveTabId={ 0 }
						renderContent={
							({ activeTabId }) => (
								<>
									{ activeTabId === 0 && <AllFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } /> }
									{ activeTabId === 1 && <TodoFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } />}
									{ activeTabId === 2 && <CompletedFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } /> }
								</>
							)
						}
					/>
				</Block>
			</div>
		</TasksContext.Provider>
	);
};
```

Le `Provider` (_"fournisseur"_ en français) c'est la partie du contexte qui sert à, comme son nom l'indique, fournir les composants enfants.

En valeur du `Provider` on place dans un objet toutes les fonctions et tous les paramètres que nous souhaitons rendre accessibles aux composants enfants.

Je vais apporter une légère modification aux fonctions `handleDeleteTask` et `handleUpdateTask`.

Je vais les renommer car ce ne seront plus des `handlers` à l'avenir, et retirer la curryfication:

```jsx
const App = () => {

	// ...

	const deleteTask = (taskId) => {
		setTasks(tasks.filter(({ id }) => id !== taskId));
	};

	const updateTask = (taskToUpdate) => {
		const updatedTasks = tasks.map(task => {
			if (task.id === taskToUpdate.id) {
				return {
					...task,
					...taskToUpdate,
				};
			}
			return task;
		})
		setTasks(updatedTasks);
	};

	// deleteTask et updateTask sont placés en valeur du context
	const contextValue = {
		deleteTask,
		updateTask,
	};

	return (
		// On utilise le Provider et on lui transmet la valeur contextValue
		<TasksContext.Provider value={ contextValue }>
			<div className="container">
				<h1 className="text--primary">Todo</h1>
				<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
					<InputSearch label="Search a task" placeholder="Search..." onSearch={ handleSearchTask } style={{ flexGrow: 1 }} />
					<CreateTaskFormModal onSubmit={ handleSubmitCreateTaskForm } />
				</div>
				<Block>
					<Tabs
						tabs={ tabs }
						defaultActiveTabId={ 0 }
						renderContent={
							({ activeTabId }) => (
								<>
									{ activeTabId === 0 && <AllFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } /> }
									{ activeTabId === 1 && <TodoFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } />}
									{ activeTabId === 2 && <CompletedFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } /> }
								</>
							)
						}
					/>
				</Block>
			</div>
		</TasksContext.Provider>
	);
};
```

On peut maintenant retirer les fonctions des `props` dans le composant `Tasks` et retirer le typage de ces fonctions:

```jsx
import './Tasks.css';

import { arrayOf, shape, string, number, instanceOf, bool } from 'prop-types';
import Task from './Task';

const Tasks = ({ tasks, isLoading }) => { // ICI, les fonctions de suppression et de modification ont été retirées

	return (
		<>
			<table className="tasks-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Created At</th>
						<th>Completed</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						!isLoading &&
						tasks.map((task) => <Task key={task.id} {...task} />) // ICI, les fonctions de suppression et de modification ont été retirées
					}
				</tbody>
			</table>
			{ !tasks || tasks.length === 0 && <p style={{ textAlign: 'center' }}>No data</p>}
			{ isLoading && <p style={{ textAlign: 'center' }}>Loading data...</p>}
		</>
	);
};

export default Tasks;

Tasks.propTypes = { // ICI, les fonctions de suppression et de modification ont été retirées
	tasks: arrayOf(shape({
		id: number.isRequired,
		title: string.isRequired,
		isDone: bool.isRequired,
		created_at: instanceOf(Date).isRequired,
	})),
	isLoading: bool,
};

Tasks.defaultProps = {
	tasks: [],
	isLoading: false,
};
```

Pareil dans le composant `Task`:

```jsx
const Task = ({ id, title, created_at, isDone }) => { // ICI, les fonctions de suppression et de modification ont été retirées

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
			<td>{ created_at.toLocaleDateString() }</td>
			<td><Checkbox value={ isDone } onChange={ handleSwitchCompletedTask } useCheckedAsValue /></td>
			<td>
				<DeleteTaskConfirmModal onConfirm={ handleDeleteTask } />
			</td>
		</tr>
	);
};

export default Task;

Task.propTypes = { // ICI, les fonctions de suppression et de modification ont été retirées
	title: string.isRequired,
	created_at: instanceOf(Date).isRequired,
	isDone: bool,
};
```

Cependant, on a des erreurs qui apparaissent dans ce composant. Il va falloir récupérer les fonctions depuis le contexte pour pouvoir les corriger.

Dans le composant `Task`, faisons appelle au contexte en utilisant le hook `useContext`:

```jsx
const { updateTask, deleteTask } = useContext(TasksContext);
```

`useContext` prend en argument le contexte que l'on souhaite utiliser et nous retourne la valeur de ce contexte. Comme nous avons placé `updateTask` et `deleteTask` en valeur du contexte, nous pouvons les récupérer directement ici.

Il n'y a plus qu'à modifier les fonctions de mise à jour de `Task`:

```jsx
const handleSaveTitle = (event) => { // fonction de MAJ du titre
	event.preventDefault();
	updateTask({
		id, // on passe l'id ici
		title: editTaskInputRef.current.value,
	});
	setIsEditionModeActive(false);
};

const handleSwitchCompletedTask = (value) => { // fonction de MAJ de l'état "à faire"/"terminée"
	updateTask({
		id, // on passe l'id ici
		isDone: value,
	});
}
```

Comme les fonctions ne sont plus curryfiées, il faut passer l'`id` directement dans l'objet de mise à jour en argument de la fonction.

Ce qui veut dire qu'il faut récupérer l'`id` de la tâche depuis les props:

```jsx
const Task = ({ id, title, created_at, isDone }) => {

	// ...
};

export default Task;

// On met à jour le typage!
Task.propTypes = {
	id: number.isRequired,
	title: string.isRequired,
	created_at: instanceOf(Date).isRequired,
	isDone: bool,
};
```

Reste plus que la fonction de suppression à ajouter. La modale de confirmation de suppression fait appelle à la fonction `handleDeleteTask` qui venait des props. Créons cette fonction directement dans le composant `Task`:

```jsx
const handleDeleteTask = () => {
	deleteTask(id);
}
```

Le composant entier ressemble à cela:

```jsx
import { string, instanceOf, bool, number } from 'prop-types';
import Button from '../../ui/Button';
import { useContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import InputText from '../../forms/InputText';
import DeleteTaskConfirmModal from './DeleteTaskConfirmModal';
import Checkbox from '../../forms/Checkbox';
import TasksContext from '../../../context/Tasks.context';

const Task = ({ id, title, created_at, isDone }) => {

	const { updateTask, deleteTask } = useContext(TasksContext);

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
		event.preventDefault();
		updateTask({
			id,
			title: editTaskInputRef.current.value,
		});
		setIsEditionModeActive(false);
	};

	const handleSwitchCompletedTask = (value) => {
		updateTask({
			id,
			isDone: value,
		});
	}

	const handleDeleteTask = () => {
		deleteTask(id);
	}

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
			<td>{ created_at.toLocaleDateString() }</td>
			<td><Checkbox value={ isDone } onChange={ handleSwitchCompletedTask } useCheckedAsValue /></td>
			<td>
				<DeleteTaskConfirmModal onConfirm={ handleDeleteTask } />
			</td>
		</tr>
	);
};

export default Task;

Task.propTypes = {
	id: number.isRequired,
	title: string.isRequired,
	created_at: instanceOf(Date).isRequired,
	isDone: bool,
};

Task.defaultProps = {
	isDone: false,
};
```

Revenons une seconde sur le contexte (`Tasks.context.jsx`). Je te propose d'ajouter une valeur par défaut à ce contexte:

```jsx
const TasksContext = createContext({
	deleteTask: (taskId) => taskId,
	updateTask: (taskToUpdate) => taskToUpdate,
});
```

Cette valeur permet principalement deux choses:

*   Elle permet de toujours disposer des fonctions, même si l'une d'entre elle n'est pas disponible. Par exemple, la fonction `deleteTask` a un problème dans `App`, les composants enfants ne sont pas affectés car il y a la fonction par défaut qui prend le relais.
*   Elle permet l'auto-complétion au moment de récupérer la valeur avec `useContext`. VS Code reconnaît la valeur du contexte et ça nous permet d'avoir, au moment d'utiliser le contexte, une auto-complétion pour mieux nous y retrouver

Cet exercice est terminé ! 👏
