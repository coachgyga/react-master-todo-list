# ⚛️ React Master - Todo list: Révisions & function as children (Correction)

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Props
*   State
*   Function as children
*   Composants d'ordre supérieur

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
git switch ex10/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>.

Le but de cet exercice est de réaliser les fonctionnalités suivantes:

*   Ajouter une `checkbox` aux tâches pour permettre de les marquer comme _complétées_
*   Intégrer un système d'onglets permettant de trier les tâches selons trois vues: _"Toutes"_, _"À faire"_, _"Terminées"_.

Voici le rendu final attendu:

![tasks tabs all](docs/tasks_tabs_all.png)

Rendu des tâches à faire:

![tasks tabs todo](docs/tasks_tabs_todo.png)

Rendu des tâches terminées:

![tasks tabs completed](docs/tasks_tabs_completed.png)

Pour réliser la partie de l'exercice qui consiste à ajouter une `checkbox`, voici les indications:

*   Ajoute une propriété `isDone` aux tâches
*   Crée un composant `Checkbox` dans le dossier `components/forms/`
*   L'état `isDone` de la tâche concernée doit se mettre à jour lorsque l'utilisateur coche ou décoche la case

Pour réaliser la seconde partie, tu vas devoir créer un composant `Tabs` capable de recevoir en tant que `props` la propriété `defaultActiveTabId` permettant de sélectionner un onglet à afficher par défaut et `tabs`, le tableau des onglets à afficher.

Voici le tableau `tabs`:

```jsx
const tabs = [
	{
		id: 0,
		title: 'All',
	},
	{
		id: 1,
		title: 'Todo',
	},
	{
		id: 2,
		title: 'Completed',
	},
];
```

Tu remarques que cette fois-ci, il n'y a pas de propriété `content`.

L'idée ici est de pouvoir utiliser un pattern qui s'appelle _"Function as children"_.

On va s'attendre à ce que le composant `Tabs` soit capable de prendre une fonction en tant qu'enfant. Cette fonction renverrai l'`id` de l'onglet en cours d'affichage. En fonction de cet `id`, on afficherait le contenu adéquat.

Voici un exemple de ce qui est attendu:

```jsx
<Tabs tabs={ tabs } defaultActiveTabId={ 0 }>
	{
		({ activeTabId }) => (
			<>
				{ activeTabId === 0 && /* Content A */ }
				{ activeTabId === 1 && /* Content B */ }
				{ activeTabId === 2 && /* Content C */ }
			</>
		)
	}
</Tabs>
```

Voici un lien vers l'ancienne documentation de **React** qui parle des _functions as children_: <https://legacy.reactjs.org/docs/jsx-in-depth.html#functions-as-children>

Les _functions as children_ ne sont pas incrits dans la nouvelle documentation car ce n'est pas une fonctionnalité de **React** mais un pattern.

Enfin, pour le filtrage des tâches, tu devra utiliser le pattern des composant d'ordre supérieur en t'inspirant de ce qui a été fait dans l'exercice précédent.

Le système de recherche doit rester fonctionnel pour tous les onglets !

Bon courage ! 💪

## Correction

Procédons, pour ne pas changer, en mode déclaratif.

Nous voulons rajouter une nouvelle colonne au tableau des tâches: la colonne `completed`.

Pour cela, modifions le composant `Tasks` pour ajouter une cellule dans l'en-tête du tabeau et pensons à mettre à jour le typage des `props`:

```jsx
const Tasks = ({ tasks, onDeleteTask: handleDeleteTask, onUpdateTask: handleUpdateTask, isLoading }) => {

	return (
		<>
			<table className="tasks-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Created At</th>
						<th>Completed</th> { /* On ajoute une cellule d'en-tête */ }
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						!isLoading &&
						tasks.map((task) => <Task key={task.id} onDeleteTask={ handleDeleteTask(task.id) } onUpdateTask={ handleUpdateTask(task.id) } {...task} />)
					}
				</tbody>
			</table>
			{ !tasks || tasks.length === 0 && <p style={{ textAlign: 'center' }}>No data</p>}
			{ isLoading && <p style={{ textAlign: 'center' }}>Loading data...</p>}
		</>
	);
};

export default Tasks;

Tasks.propTypes = {
	tasks: arrayOf(shape({
		id: number.isRequired,
		title: string.isRequired,
		isDone: bool.isRequired, // On met à jour le typage des props !
		created_at: instanceOf(Date).isRequired,
	})),
	onDeleteTask: func.isRequired,
	onUpdateTask: func.isRequired,
	isLoading: bool,
};

// ...
```

Une fois ceci fait, allons dans le composant `Task` et ajoutons également une nouvelle cellule en pensant au typage des props. On va également supposer que l'on dispose d'un composant `Checkbox`:

```jsx
// ...
// On importe le composant Checkbox (il n'existe pas encore)
import Checkbox from '../../forms/Checkbox';

// On récupère la props `isDone`
const Task = ({ title, created_at, isDone, onDeleteTask: handleDeleteTask, onUpdateTask }) => {

	// ...

	// Fonction permettant la mise à jour de la propriété `isDone`
	const handleSwitchCompletedTask = (value) => {
		// On réutilise `onUpdateTask` depuis les props
		onUpdateTask({
			isDone: value,
		});
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
			{ /*
				Le composant Checkbox dispose d'une `value` qui rassemble à la fois l'attribut `checked` et `value`
				Grâce à `useCheckedAsValue` on pourrait choisir si on veut utiliser l'attribut `value` ou l'attribut `checked` comme valeur de référence
				Dans notre cas, on veut utiliser `checked` car on traite avec un booléen

				Au changement de valeur, la mise à jour est déclenchée via `handleSwitchCompletedTask`
			*/ }
			<td><Checkbox value={ isDone } useCheckedAsValue onChange={ handleSwitchCompletedTask } /></td>
			<td>
				<DeleteTaskConfirmModal onConfirm={ handleDeleteTask } />
			</td>
		</tr>
	);
};

export default Task;

// On pense au typage des props !

Task.propTypes = {
	title: string.isRequired,
	created_at: instanceOf(Date).isRequired,
	onDeleteTask: func.isRequired,
	onUpdateTask: func.isRequired,
	isDone: bool,
};

Task.defaultProps = {
	isDone: false,
};
```

Il faut maintenant créer le composant `Checkbox`, que l'on va venir placer dans le dossier `components/forms/`:

```jsx
import { bool, func, number, oneOfType, string } from 'prop-types';
import { useId } from 'react';

// Optionnel: On rajoute un label facultatif pour les cas où on en aurait besoin (comme une validation de CGU ou de mentions légales par exemples)
const Checkbox = ({ value, onChange, useCheckedAsValue, label, ...htmlInputProps }) => {

	// On génère un id unique
	const inputId = useId();

	// Au changement de valeur
	const handleChange = (event) => {
		// Si useCheckedAsValue est vraie
		if (useCheckedAsValue) {
			// On transmet la valeur de l'attribut `checked` via `onChange`
			onChange(event.target.checked);
		} else {
			// On transmet la valeur de l'attribut `value` via `onChange`
			onChange(event.target.value);
		}
	};
	
	// Si useCheckedAsValue est vraie, alors on utilise `checked` comme valeur de référence, sinon on utilise `value`
	const customValue = useCheckedAsValue ? { checked: value } : { value };

	return (
		<div className="form-checkbox-container">
			<input { ...htmlInputProps }  type="checkbox" id={ inputId } onChange={ handleChange } { ...customValue } />
			{ label ? <label htmlFor={ inputId }>{ label }</label> : null }
		</div>
	)

};

export default Checkbox;

// Typage des props
Checkbox.propTypes = {
	// Si useCheckedAsValue n'est pas vraie, une checkbox peu recevoir
	// des chaines de caractères ou des nombres en tant que valeur
	value: oneOfType([ string, number, bool ]).isRequired,
	onChange: func,
	useCheckedAsValue: bool,
	label: string,
};

Checkbox.defaultProps = {
	onChange: () => {},
	useCheckedAsValue: false,
	label: '',
};
```

Dans `App.jsx`, il faut penser à ajouter la propriété `isDone` lors de la création d'une tâche:

```jsx
const handleSubmitCreateTaskForm = (values) => {
	const idsList = tasks.map(({ id }) => id);
	const newId = generateMaxId(idsList);
	setTasks([
		...tasks,
		{
			id: newId,
			title: values.title,
			isDone: false, // ICI ! => isDone est false par défaut
			created_at: new Date(),
		},
	]);
};
```

Maintenant que la case à cochée est rajoutée, nous pouvons passer aux `tabs`.

Nous savons grâce à l'énoncer de l'exercice que cette structure est attendue:

```jsx
<Tabs tabs={ tabs } defaultActiveTabId={ 0 }>
	{
		({ activeTabId }) => (
			<>
				{ activeTabId === 0 && /* Content A */ }
				{ activeTabId === 1 && /* Content B */ }
				{ activeTabId === 2 && /* Content C */ }
			</>
		)
	}
</Tabs>
```

Nous connaissons donc déjà les `props` qui seront reçues par le composant `Tabs`.

Nous allons déjà rendre les onglets fonctionnels, nous nous occuperons du tri après.

Dans le `JSX` du composant `App`, remplaçons donc cette partie:

```jsx
<Block>
	<FilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
</Block>
```

Par ceci:

```jsx
<Block>
	<Tabs tabs={ tabs } defaultActiveTabId={ 0 }>
		{
			({ activeTabId }) => (
				<>
					{ /* ici nous mettons un simple texte en tant que contenu pour vérifier si nos tabs fonctionnent */ }
					{ activeTabId === 0 && <p>Content { activeTabId }</p> }
					{ activeTabId === 1 && <p>Content { activeTabId }</p> }
					{ activeTabId === 2 && <p>Content { activeTabId }</p> }
				</>
			)
		}
	</Tabs>
</Block>
```

Dans le dossier `components/ui/` nous allons créer le composant `Tabs` et ajouter le CSS correspondant:

```CSS
.tabs-buttons-container {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1rem;
}
```

Je l'ai récupéré de l'exercice que nous avions fait en début de cours qui impliquait des onglets.

Nous pouvons d'ailleurs récupérer la logique de l'affichage des boutons et de la sélection d'onglet depuis ce précédent exercice. Il s'agit de la même chose ici:

```jsx
import './Tabs.css';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { useState } from 'react';
import Button from '../Button';

const Tabs = ({ defaultActiveTabId, tabs, children }) => {

	// État de l'onglet actif
	const [ activeTabId, setActiveTabId ] = useState(defaultActiveTabId);

	// Changement d'onglet actif
	const handleChangeTab = (tabId) => () => {
		setActiveTabId(tabId);
	};

	return (
		<>
			<div className="tabs-buttons-container">
				{
					// Affichage des boutons
					tabs.map(({ title, id }) => <Button key={ id } variant={ id === activeTabId ? 'primary' : 'light' } onClick={ handleChangeTab(id) }>{ title }</Button>)
				}
			</div>
			{
				/* Content */
			}
		</>
	);

};

export default Tabs;

// Typage des props

Tabs.propTypes = {
	defaultActiveTabId: number,
	tabs: arrayOf(shape({
		id: number.isRequired,
		title: string.isRequired
	})),
	children: func.isRequired, // Children doit être une fonction !
};

Tabs.defaultProps = {
	defaultActiveTabId: 0,
	tabs: [],
};
```

Ce qui est attendu ici c'est que nous puissions passer en tant qu'enfant de `Tabs` une fonction qui nous donnerai l'id de l'onglet actif.

Ce qui veut dire que je peux exécuter `children` comme une fonction en lui passant `activeTabId` en argument:

```jsx
const Tabs = ({ defaultActiveTabId, tabs, children }) => {

	// ...

	return (
		<>
			<div className="tabs-buttons-container">
				{
					tabs.map(({ title, id }) => <Button key={ id } variant={ id === activeTabId ? 'primary' : 'light' } onClick={ handleChangeTab(id) }>{ title }</Button>)
				}
			</div>
			{
				/* On exécute `children` comme une fonction et lui transmet activeTabId */
				children({ activeTabId })
			}
		</>
	);

};
```

Je passe un objet (contenant `activeTabId`) en argument car si je veux transmettre d'autres informations à l'avenir je pourrait le faire plus facilement ainsi.

Occupons nous maintenant du filtrage des tâches avec les _"HOCs"_.

Nous pouvons réutiliser le composant `withFilteredTasks`. Il faudra juste appliquer une petite modification sur le tableau des tâches en fonction du contenu que l'on veut avoir.

Voici les composants à créer au dessus de `App` qui utilisent `withFilteredTasks`:

```jsx
// Composant pour l'affichage de toutes les tâches (nous l'avions déjà, je l'ai juste renommé)
const AllFilteredTasks = withFilteredTasks(Tasks, ({ tasks, searchValue }) => getSearchedTasks(tasks, searchValue));

// Composant pour l'affichage des tâches à faire
const TodoFilteredTasks = withFilteredTasks(Tasks, ({ tasks, searchValue }) => getSearchedTasks(tasks.filter(task => !task.isDone), searchValue));

// Composant pour l'affichage des tâches terminées
const CompletedFilteredTasks = withFilteredTasks(Tasks, ({ tasks, searchValue }) => getSearchedTasks(tasks.filter(task => task.isDone), searchValue));
```

Remarques que pour les tâches à faire et les tâches complétées un filtre est ajouté sur les tâches.

Reste plus qu'à mettre à jour les enfants de `Tabs` dans le JSX de `App`:

```jsx
<Block>
	<Tabs tabs={ tabs } defaultActiveTabId={ 0 }>
		{
			({ activeTabId }) => (
				<>
					{ activeTabId === 0 && <AllFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } /> }
					{ activeTabId === 1 && <TodoFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } /> }
					{ activeTabId === 2 && <CompletedFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } /> }
				</>
			)
		}
	</Tabs>
</Block>
```

Et c'est fini ! 👏

Un dernier mot tout de même !

Le pattern _"function as children"_ est en réalité considéré comme un anti-pattern auquel il faut faire attention car il ne respecte pas les bonnes pratiques du _clean code_.

Effectivement, dans le JSX du composant `Tabs`, cette ligne de code n'est pas des plus claires:

```jsx
{
	children({ activeTabId })
}
```

`children` est exécuté comme fonction. Cependant, le nom de cette fonction n'est pas parlante, elle n'explicite pas ce qu'elle fait.

Un article de Donavon West publié en 2017 explique en détail pourquoi il s'agit d'un anti-pattern et qu'elles sont les alternatives "plus propres". Voici le lien de l'article: <https://americanexpress.io/faccs-are-an-antipattern/>.

Ce qu'il faudrait utiliser c'est une propriété dédiée qui s'appellerait par exemple `renderContent`

**React** en parle dans sa nouvelle documentation: <https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering>

Faisons le avec les `Tabs`:

```jsx
const Tabs = ({ defaultActiveTabId, tabs, renderContent }) => {

	const [ activeTabId, setActiveTabId ] = useState(defaultActiveTabId);

	const handleChangeTab = (tabId) => () => {
		setActiveTabId(tabId);
	};

	return (
		<>
			<div className="tabs-buttons-container">
				{
					tabs.map(({ title, id }) => <Button key={ id } variant={ id === activeTabId ? 'primary' : 'light' } onClick={ handleChangeTab(id) }>{ title }</Button>)
				}
			</div>
			{
				renderContent({ activeTabId })
			}
		</>
	);

};

export default Tabs;

Tabs.propTypes = {
	defaultActiveTabId: number,
	tabs: arrayOf(shape({
		id: number.isRequired,
		title: string.isRequired
	})),
	renderContent: func.isRequired, // On pense au typage des props !
};
```

Et cette propriété s'utiliserait comme ceci dans `App`:

```jsx
// J'ajoute des retours à la ligne pour y voir plus clair
<Block>
	<Tabs
		tabs={ tabs }
		defaultActiveTabId={ 0 }
		renderContent={
			({ activeTabId }) => (
				<>
					{ activeTabId === 0 && <AllFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } /> }
					{ activeTabId === 1 && <TodoFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } /> }
					{ activeTabId === 2 && <CompletedFilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } /> }
				</>
			)
		}
	/>
</Block>
```

C'est bien mieux comme ça et ça fonctionne toujours ! 👏👏
