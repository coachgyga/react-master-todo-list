# ⚛️ React Master - Todo list: Gérer les états complexes avec `useReducer` (Correction)

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
git switch ex11/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>.

<details>
 <summary>💡 <b>Indice</b></summary>

 > C'est le composant `App` qui détient l'état des tâches et la logique de mise à jour et de suppression.
 >
 > `App` va donc partager ces fonctionnalités au contexte pour que le context puisse à son tour les partager avec les composants enfants qui le demanderont

</details>

Bon courage ! 💪

## Correction

Pour ajouter chacun des compteurs, nous pourrions ajouter des propriétés au `state` du composant du `context`:

```JSX
const [ tasks, setTasks ] = useState([]);
const [ allTasksCount, setAllTasksCount ] = useState([]);
const [ todoTasksCount, setTodoTasksCount ] = useState([]);
const [ completedTasksCount, setCompletedTasksCount ] = useState([]);
```

Cependant, on risque d'encombrer l'état de notre composant et si on continue de le faire évoluer, on va se retrouver avec un état de plus en plus riche et complexe.

Pour gérer ce genre d'état, **React** met à notre disposition le hook `useReducer`. C'est un équivalent de `useState` mais pour les états complexes dans lesquels on a un certain nombre de propriétés à gérer.

Il s'utilise comme ceci:

```JSX
const [ state, dispatch ] = useReducer(reducer, initialValue);
```

Comme pour le `useState`, `useReducer` retourne un tableau avec deux éléments: l'état en lecture seule et la fonction `dispatch` permettant de mettre à jour de cet état en fonction d'actions pré-définies.

Il prend deux arguments:

*   Un `reducer`, c'est une fonction permettant de définir les actions possibles à effectuer via `dispatch`
*   Une valeur initiale

Dans notre cas, cela va donner le code suivant:

```JSX
const INITIAL_TASKS_STATE_VALUE = {
	tasks: [],
	allTasksCount: 0,
	todoTasksCount: 0,
	completedTasksCount: 0,
};

const tasksReducer = () => {};

const TasksContextProvider = ({ children }) => {

	const [ tasksState, dispatchTasksAction ] = useReducer(tasksReducer, INITIAL_TASKS_STATE_VALUE);

	// ...
};
```

La bonne pratique veut que nous placions le reducer dans un autre fichier que nous allons appeler `Tasks.reducer.js`:

```jsx
const tasksReducer = () => {};

export default tasksReducer;
```

Avant de le compléter, examinons le `dispatch` et quelles informations nous allons devoir lui passer pour pouvoir développer le `reducer` correctement:

```jsx
const [ tasksState, dispatchTasksAction ] = useReducer(tasksReducer, INITIAL_TASKS_STATE_VALUE);

const createTask = (newTask) => {
	const idsList = tasksState.tasks.map(({ id }) => id);
	const newId = generateMaxId(idsList);
	dispatchTasksAction({
		type: 'tasks/create',
		payload: {
			isDone: false,
			...newTask,
			id: newId,
			created_at: new Date(),
		},
	});
};
```

Dans l'exemple ci-dessus, ce qui nous intéresse c'est le `dispatchTasksAction`.

Tu remarques que nous lui passons un objet contenant deux propriétés: le `type` d'action à réaliser sous la forme d'une chaine de caractères, et le `payload` (_"charge utile"_ en français), la valeur à traiter.

Le `dispatch` communique directement ces informations au `reducer` qui se charge de traiter l'action.

Donc en utilisant le `dispatch` ainsi, je m'attends à ce que `tasksReducer` dispose d'une action de type `tasks/create` qui traite la valeur que je lui envoie.

Occupons nous de `tasksReducer`.

Le reducer reçois deux arguments par `useReducer`: le `state` actuel et l'`action`.

L'`action` est la valeur émise dans le `dispatch`. C'est dans l'`action` qu'on va récupérer le `type` d'action à effectuer et le `payload`, la valeur à traiter.

Réalisons l'action `tasks/create`:

```jsx
const tasksReducer = (state, action) => {

	switch (action.type) {
		case 'tasks/create': // si action.type === 'tasks/create'
			return { // On met à jour le state en ajoutant la valeur issue du payload dans les tâches
				...state,
				tasks: [
					...state.tasks,
					action.payload // Le payload contient la tâche à créer
				],
			};
		default:
			// Par défaut, si l'action envoyée par le dispatch n'est pas traitée dans le switch,
			// on retournera le state sans aucune modification
			return state;
	}
};

export default tasksReducer;
```

On récupère le `state` actuel, on modifie les tâches dans le `state` en ajoutant le contenu du `payload`. C'est le `payload` qui contient la nouvelle tâche à ajouter.

Par convention, on nomme les actions d'après ce modèle: `reducer/action`. Comme nous sommes dans le reducer des tâches et que l'on souhaite effectuer une action de création, je définie le nom `tasks/create`.

Dans un `reducer`, il faut respecter le principe d'immutabilité. On ne modifie jamais le `state` directement, on crée une copie, on modifie cette copie et on la retourne pour mettre à jour le `state`.

Le `state` est un objet pouvant contenir d'autres valeurs que `tasks` ici (ça sera le cas avec les compteurs), c'est pour cette raison que je le réintègre dans chaque valeur de retour. Autrement, je risquerais de supprimer les autres valeurs du `state`.

Rajoutons le cas de suppression et de modification:

```jsx
const tasksReducer = (state, action) => {

	switch (action.type) {
		case 'tasks/create':
			return {
				...state,
				tasks: [
					...state.tasks,
					action.payload // Le payload contient l'objet d'une nouvelle tâche
				],
			};
		case 'tasks/update':
			return {
				...state,
				tasks: state.tasks.map(task => {
					if (task.id === action.payload.id) {
						return {
							...task,
							...action.payload,  // Le payload contient l'object de la tâche à modifier
						};
					}
					return task;
				}),
			};
		case 'tasks/delete':
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== action.payload), // Le payload contient l'id de la tâche à modifier
			};
		default:
			return state;
	}
};

export default tasksReducer;
```

Modifions les fonctions du contexte en conséquence:

```jsx
const TasksContextProvider = ({ children }) => {

	const [ tasksState, dispatchTasksAction ] = useReducer(tasksReducer, INITIAL_TASKS_STATE_VALUE);

	const createTask = (newTask) => {
		const idsList = tasksState.tasks.map(({ id }) => id);
		const newId = generateMaxId(idsList);
		dispatchTasksAction({
			type: 'tasks/create',
			payload: {
				isDone: false,
				...newTask,
				id: newId,
				created_at: new Date(),
			},
		});
	};

	const deleteTask = (taskId) => {
		dispatchTasksAction({
			type: 'tasks/delete',
			payload: taskId,
		});
	};

	const updateTask = (taskToUpdate) => {
		dispatchTasksAction({
			type: 'tasks/update',
			payload: taskToUpdate,
		});
	};

	const contextValue = {
		tasks: tasksState.tasks,
		createTask,
		deleteTask,
		updateTask,
	};

	return (
		<TasksContext.Provider value={contextValue}>
			{ children }
		</TasksContext.Provider>
	);
};
```
