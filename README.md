# ⚛️ React Master - Todo list: Révisions et composants non-contrôlés (Correction)

Dans cet énoncé tu trouvra:

1 ℹ️ information<br>
2 💡 indices

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Événements
*   Props
*   Gestion d'état
*   Cycle de vie
*   Typage des props
*   Composition
*   Composants contrôlés

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
git switch ex01/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>. Tu vera qu'il y a déjà quelques éléments.

Ta mission désormais va être de compléter l'application pour obtenir ce rendu final:

![Todo list](docs/todo-list.png)

Sur la page que tu as actuellement dans ton navigateur, il manque le champ texte permettant d'inscrire le titre d'une tâche, le bouton _"Create"_ pour valider la création de la tâche et le tableau des tâches.

Tu devra donc ajouter toi-même ce champ texte et faire en sorte qu'après chaque ajout de tâche, le champ se réinitialise automatiquement.

<details>
 <summary>💡 <b>Indice</b></summary>

 > Pour réinitialiser le champ, il se peut que tu éprouves de la difficulté à le faire sans que cela n'occasionne un bug lors de l'ajout d'une tâche au tableau.
 >
 > Si tu réinitialises le champ dans la fonction d'ajout d'une tâche, même après l'exécution de la mise à jour du `state`, il se peut que la tâche que tu viens d'ajouter se voit perdre son `title`.
 >
 > C'est dû au fait que le _setter_ du `state` est asynchrone.
 >
 > Tu peux contourner le problème en utilisant le cycle de vie avec `useEffect` en le mettant en écoute sur les mises à jour apportées au tableau des tâches dans le `state`

</details>

Jète un oeil du côté des **composants non-contrôlés** (_uncontrolled components_ en anglais) pour le réaliser: <https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components>

<details>
 <summary>💡 <b>Indice</b></summary>

 > Le hook `useRef` permet d'interagir avec des éléments HTML. Il est utilisé pour interagir avec les `input` et faire ce que l'on appelle des "champs non-controllés"
 >
 > Voici le lien vers la documentation de **React** qui parle de `useRef`: <https://react.dev/reference/react/useRef>

</details>

**Attention !** **Tu ne dois pas faire de composant contrôlé** (n'utilise pas le `state` pour gérer la valeur de ton `input`). Nous verrons cela prochainement.

Tu peux également constater qu'il y a un tableau à réaliser. Tu dois y afficher la liste des tâches et un bouton _"Delete"_ permettant de supprimer chaque tâche individuellement.

Chaque tâche devra contenir les informations suivantes:

*   Un `id` unique de type `number`
*   Un `title` de type `string`
*   Une date de création `created_at` de type `Date`

S'il n'y a pas de tâche dans le tableau, le tableau devra afficher un texte indiquant _"No data"_ comme ceci:

![Todo list no data](docs/todo-list-no-data.png)

Évidemment, tu devra faire ajouter le typage de tes `props` avec `prop-types`.

> ℹ️ **Information**
>
> Le CSS t'es en partie donné. Regarde le fichier `index.css` dans le dossier `src/`, tu y trouvera tout ce dont tu as besoin.

Tu remarques qu'il y a une nouvelle architecture dans le dossier `components/`. Les fichiers de composants ne sont plus simplement placés dans ce dossier, ils sont rangés dans des sous-dossiers:

*   Le dossier `ui` contient les composants d'interface utilisateur qui sont génériques comme les boutons, les modales, les conteneurs, etc...
*   Le dossier `features` contient les composants qui sont propres aux fonctionnalités de l'application. Dans notre cas, il rassemble les composants qui ont un rapport avec la gestion des tâches de la todo-list.

Les composants sont eux-mêmes placés dans des dossiers selon leur nom. Par exemple, le composant `Button` est dans le fichier `index.jsx` placé dans le dossier `Button/`.

Cette approche permet de placer dans le dossier d'un composant tous les autres fichiers qui auraient un lien direct et exclusif avec lui (comme les images, le CSS ou d'autres composants enfant). C'est le cas du fichier `Button.css` qui ne concerne que le composant `Button`.

Bon courage ! 💪

## Correction

La moitié de cet exercice concernant des notions des modules précédents, nous allons rapidement passer en revue la correction au sujet de ces notions.

Mais d'abord, occupons-nous de la notion qui nous intéresse le plus: réaliser le formulaire d'ajout des tâches.

Il était spécifié dans l'énoncé de l'exercice qu'il fallait utiliser le concept de _composant non-contrôlé_.

Un composant non-controlé est un composant qui gère lui-même son propre état en interne sans aucun contrôle de la part du composant parent.

Un composant contrôlé à l'inverse, est un composant dont l'état état est contrôlé par le composant parent. Nous reparlerons de ce dernier un peu plus tard.

Si nous plaçons simplement une `input` en dessous du titre dans `App.jsx`:

```jsx
const App = () => {

	return (
		<div className="container">
			<h1 className="text--primary">Todo</h1>
			
			<input />

			<Block>
				<Tasks tasks={ tasks } onDeleteTask={ handleDeleteTask }/>
			</Block>
		</div>
	);
};

export default App;
```

Nous verrons que nous pouvons interagir avec cette `input` dans la page. Nous pouvons cliquer dessus et y écrire du texte.

Cela paraît banal dit de cette façon mais en réalité, ce qui fait que nous sommes capable de voir ce que nous écrivons dans l'interface de cette façon s'explique par le fait que l'`input` dispose de son propre `state` interne.

Le défi ici c'est de réussir à exploiter le `state` de l'input pour en extraire sa valeur et la traiter.

Pour réaliser cela, nous avons besoin de référencer cet élément HTML `input` auprès de **React**.

**React** met à notre disposition le hook `useRef` qui nous permet justement de créer une référence.

Nous allons l'utiliser comme ceci au sein du composant `App`:

```jsx
const newTaskInputRef = useRef(null);
```

`useRef` prend en argument une valeur initiale. Ici nous plaçons `null` en tant que valeur initiale car `useRef` s'exécute avant que le DOM soit chargé. À ce moment là il ne sait pas que `input` existe.

La valeur référence routrnée par `useRef` nous permet le relier à l'`input` de cette façon:

```jsx
<input ref={ newTaskInputRef } />
```

L'`input` est maintenant reliée à la référence il est donc possible de récupérer l'état de l'`input` par cet intermédiaire.

Complétons un peu le composant pour avoir un bouton et un _event handler_ sur le clic du bouton. Profitons en pour ajouter un peu de style:

```jsx
const App = () => {

	const newTaskInputRef = useRef(null);

	const handleCreateNewTask = () => {

	};

	return (
		<div className="container">
			<h1 className="text--primary">Todo</h1>
			<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
				<input style={{ flexGrow: 1, borderRadius: 8, border: 'none', padding: '0.5rem 1rem' }} ref={ newTaskInputRef } />
				<Button onClick={ handleCreateNewTask }>Create</Button>
			</div>
			<Block>
				<Tasks />
			</Block>
		</div>
	);
};
```

Maintenant nous pouvons faire un `console.log` de `newTaskInputRef`:

```jsx
const handleCreateNewTask = () => {
	console.log(newTaskInputRef);
};
```

On peut voir dans la console que `newTaskInputRef` est un objet contenant `current` qui lui-même contient l'objet `input`.

On peut donc récupérer la valeur de l'`input` comme ceci:

```jsx
const handleCreateNewTask = () => {
	const value = newTaskInputRef.current.value;
};
```

Maintenant que nous sommes capables de récupérer la valeur de l'`input`, ajoutons une propriété `tasks` dans le `state` du composant `App` pour y stocker les tâches de notre todo-list et peuplons la fonction `handleCreateNewTask` pour qu'elle ajoute une nouvelle tâche:

```jsx
const [ tasks, setTasks ] = useState([]);

const handleCreateNewTask = () => {
	// On récupère la valeur de l'input
	const title = newTaskInputRef.current.value;
	// On met à jour le state
	setTasks([
		...tasks,
		{
			title,
			created_at: new Date(),
		},
	]);
};
```

Il manque l'`id` de la tâche ! C'est une paramètre très important, nous en aurons besoin pour l'affichage et pour la suppression.

Il faut faire en sorte que cet `id` soit unique. On va alors récupérer l'`id` maximum enregistré dans le tableau des tâches pour lui ajouter `1` et obtenir un nouvel `id` à l'image des bases de données SQL. Comme ceci:

```jsx
// On récupère la liste des id enregistrés
const idsList = tasks.map(({ id }) => id);
// On cherche l'id le plus grand
const maxId = idsList.length > 0 ? Math.max(...idsList) : 0;
// On ajoute 1 pour avoir le dernier id
const newId = maxId + 1;
```

Finalement le composant ressemble à cela:

```jsx
const App = () => {

	const newTaskInputRef = useRef(null);

	const [ tasks, setTasks ] = useState([]);

	const handleCreateNewTask = () => {
		const title = newTaskInputRef.current.value;
		const idsList = tasks.map(({ id }) => id);
		const maxId = idsList.length > 0 ? Math.max(...idsList) : 0;
		const newId = maxId + 1;
		setTasks([
			...tasks,
			{
				id: newId,
				title,
				created_at: new Date(),
			},
		]);
	};

	return (
		<div className="container">
			<h1 className="text--primary">Todo</h1>
			<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
				<input style={{ flexGrow: 1, borderRadius: 8, border: 'none', padding: '0.5rem 1rem' }} ref={ newTaskInputRef } />
				<Button onClick={ handleCreateNewTask }>Create</Button>
			</div>
			<Block>
				<Tasks />
			</Block>
		</div>
	);
};
```

Maintenant que nous sommes capables de faire un enregistrement, il faudrait que nous soyons capables d'afficher le contenu du tableau `tasks`.

Pour cela, nous avons le composant `Tasks` à compléter. Ce composant devra recevoir en tant que `props` le tableau `tasks`. Cela signifie qu'on doit ajouter le typage des `props`:

```jsx
import './Tasks.css';

import { arrayOf, shape, string, number, instanceOf } from 'prop-types';

const Tasks = ({ tasks }) => {

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
					{ /* Les tâches ICI ! */ }
				</tbody>
			</table>
			{ /* On en profite pour ajouter le texte "No data" */ }
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
};

Tasks.defaultProps = {
	tasks: [],
};
```

Le CSS du composant `Tasks` et de ses enfants:

```css
.tasks-table {
	border-collapse: collapse;
	width: 100%;
}

.tasks-table th {
	border-bottom: 1px solid var(--secondary);
	color: var(--secondary);
	text-align: left;
	padding: 1rem 2rem;
}

.tasks-table th:last-child {
	text-align: right;
}

.tasks-table tbody td {
	padding: 1rem 2rem;
}

.tasks-table tbody tr:nth-child(even) {
	background-color: var(--light);
}

.tasks-table tbody tr td:last-child {
	text-align: right;
}
```

Le `tbody` de ce tableau n'est pas complété car nous allons avoir besoin d'un composant supplémentaire ici. Si nous métions tout le code du tableau directement ici, le composant risquerait de devenir assez imposant et difficile à lire.

Gardons nos composants simples et créons un composant `Task` (au singulier) qui va correspondre à UNE ligne du tableau:

```jsx
import { string, instanceOf } from 'prop-types';

const Task = ({ title, created_at }) => {

	return (
		<tr>
			<td>
				{ title }
			</td>
			<td>{ created_at.toLocaleDateString() }</td>
			<td>
				{ /* Ici on ajoutera le bouton Delete */ }
			</td>
		</tr>
	);
};

export default Task;

Task.propTypes = {
	title: string.isRequired,
	created_at: instanceOf(Date).isRequired,
};
```

On s'occupe d'abord de l'affichage, nous verrons pour la suppression ensuite.

Il faut maintenant intégrer ce composant au tableau. Pour chaque tâche du tableau `tasks`, on affiche ce composant en lui transmettant les informations de la tâche:

```jsx
const Tasks = ({ tasks }) => {

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
						tasks.map((task) => <Task key={task.id} {...task} />)
					}
				</tbody>
			</table>
			{ !tasks || tasks.length === 0 && <p style={{ textAlign: 'center' }}>No data</p>}
		</>
	);
};
```

Il ne reste plus qu'à transmettre le tableau `tasks` au composant `Tasks` dans `App.jsx` et les tâches enregistrées devraient apparaître dans l'interface:

```jsx
<Block>
	<Tasks tasks={ tasks } />
</Block>
```

Il nous reste deux fonctionnalités à gérer: La réinitialisation du champ texte après avoir ajouté une tâche et la suppression d'une tâche.

Pour la réinitialisation du champ, tu as dû remarquer pendant l'exercice que réinitialiser le champ après la mise à jour du `state` dans la fonction `handleCreateNewTask` comme ceci:

```jsx
const handleCreateNewTask = () => {
	const title = newTaskInputRef.current.value;
	const idsList = tasks.map(({ id }) => id);
	const maxId = idsList.length > 0 ? Math.max(...idsList) : 0;
	const newId = maxId + 1;
	setTasks([
		...tasks,
		{
			id: newId,
			title,
			created_at: new Date(),
		},
	]);
	newTaskInputRef.current.value = '';
};
```

Posait un problème.

Quand tu procède ainsi, le champ de réinitialise avant que le `state` n'ait pu se mettre à jour ce qui fait que la tâche que tu viens d'ajouter voit son titre être supprimé.

Cela s'explique par le fait que la fonction de mise à jour du `state` est asynchrone. C'est à dire que la logique de `setTasks` va s'exécuter après le code qui la suit.

Le côté asynchrone de cette fonction est nécessaire en raison de toute la logique qu'elle entraine derrière, notamment au niveau du re-rendu du composant.

Mais elle attend également quelques instants pour savoir si un autre `setState` n'arrive pas juste derrière pour regrouper les mises à jour du `state` pour n'en faire qu'une seule et donc optimiser les re-rendus.

Bref. Pour réaliser cette réinitialisation du champ, il va falloir feinter. Nous allons donc utiliser `useEffect` en écoute sur la mise à jour de `tasks` pour le faire.

Si `tasks` est mis à jour, cela signifie qu'une nouvelle tâche a été ajoutée, alors on vide le champ. Comme ceci:

```jsx
useEffect(() => {
		newTaskInputRef.current.value = '';
}, [ tasks ]); // useEffect se relance à chaque MAJ de tasks
```

La réinitialisation du champ c'est fait! ✅

Reste plus que la suppression des tâches.

Pour cela nous allons créer une fonction `handleDeleteTask` dans `App`:

```jsx
const handleDeleteTask = (taskId) => () => { // fonction curry
	// On filtre les tâches dont l'id n'est pas égal à celui qu'on veut retirer
	setTasks(tasks.filter(({ id }) => id !== taskId));
};
```

`handleDeleteTask` est une fonction `curry` car elle doit recevoir l'`id` de la tâche et être exécutée dans un second temps par le clic du bouton de suppression.

Puis on envoie cette fonction dans le composant `Tasks`:

```jsx
<Tasks tasks={ tasks } onDeleteTask={ handleDeleteTask }/>
```

Cela veut dire qu'il faut mettre à jour les `props` de `Tasks` et le typage. Il faut également transmettre cette fonction à `Task` (le composant d'une ligne) pour que l'on puisse la déclencher par un bouton dans ce composant:

```jsx
import './Tasks.css';

import { arrayOf, shape, string, number, instanceOf, func } from 'prop-types';
import Task from './Task';

const Tasks = ({ tasks, onDeleteTask: handleDeleteTask }) => {

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
						tasks.map((task) => <Task key={task.id} onDeleteTask={ handleDeleteTask(task.id) } {...task} />)
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
	onDeleteTask: func.isRequired
};

Tasks.defaultProps = {
	tasks: [],
};
```

Tu remarques que j'ai renommé `onDeleteTask` => `handleDeleteTask` dans le composant `Tasks`.

C'est un convention:

*   Les écouteurs d'événement sont préfixés par `on`, donc vu de l'extérieur du composant `Tasks`, il s'agit d'un écouteur d'événement.
*   De l'intérieur du composant `Tasks`, on actionne un gestionnaire d'événement, un _event handler_, qui sont toujours préfixés par `handle`.

On fait la même chose dans le composant `Task` et on rajoute le bouton que l'on relie avec la fonction de suppression:

```jsx
import { string, instanceOf, func } from 'prop-types';
import Button from '../../ui/Button';

const Task = ({ title, created_at, onDeleteTask: handleDeleteTask }) => {

	return (
		<tr>
			<td>
				{ title }
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
};
```

On est bon! Cet exercice est terminé ! 👏
