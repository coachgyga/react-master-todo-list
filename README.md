# ⚛️ React Master - Todo list: Composants d'ordre supérieur (Correction)

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Props
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
git switch ex09/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>.

Ça y est ! C'est le moment où nous parlons des composants d'ordre supérieur (_"High Order Components"_ en anglais ou _"HOC"_).

Les _"HOCs"_ sont un pattern de développement pour les composants **React** qui permettent de transformer des composants existants sans avoir à modifier directement les composants.

Dans notre cas, nous allons nous servir de ce pattern pour afficher des tâches filtrées.

Nous disposons déjà de la fonctionnalité de recherche pour nos tâches, et nous affichons les tâches recherchées comme ceci:

```JSX
<Tasks tasks={ searchTaskValue ? getSearchedTasks(tasks, searchTaskValue) : tasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
```

Nous appliquons une condition pour savoir s'il y a une recherche en cours et afficher les tâches recherchées en conséquence.

Mais si nous pouvions faire ceci ? ⬇️

```JSX
<FilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
```

On utiliserait un composant d'ordre supérieur permettant de passer directement les tâches et la chaîne de caractère correspondant à la recherche effectuée et c'est ce composant d'ordre supérieur qui se chargerait d'utiliser la fonction de recherche.

Le composant `Tasks` existe toujours et n'est pas modifié, il est seulement transmis à `FilteredTasks` pour conserver l'affichage et la logique liées aux tâches. D'ailleurs on peut voir dans l'exemple ci-dessus que les props `onDeleteTask` et `onUpdateTask` sont toujours renseignées.

Pour réaliser cet exercice tu vas avoir besoin de prendre le temps d'étudier les _"HOCs"_, consulter des exemples et expérimenter. Prend ton temps, renseigne toi bien et réfléchi à la façon doit tu peux obtenir les résultat montré plus haut.

Tu verra que les _"HOCs"_ sont en réalité des fonctions curry. Si tu ne maîtrises pas ce concept, je t'invite d'abord à valider cette connaissance de ton côté.

Voici le lien vers la page de l'ancienne documentation **React** qui en parle: <https://legacy.reactjs.org/docs/higher-order-components.html>

La nouvelle documentation ne parle pas des _"HOCs"_ car il ne s'agit pas d'une fonctionnalité de **React** mais seulement d'un pattern.

Je t'invite à faire des recherches supplémentaires et de trouver des exemples sur Internet pour complémenter ton étude des _"HOCs"_ car l'ancienne documentation de **React** montre des exemples avec des `class components`, et non avec des `function components`.

Bon courage ! 💪

## Correction

Procédons encore une fois en mode déclaratif.

Dans le `JSX` du composant `App`, admettons que nous souhaitions remplacer cette ligne:

```JSX
<Tasks tasks={ searchTaskValue ? getSearchedTasks(tasks, searchTaskValue) : tasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
```

Par cette ligne:

```JSX
<FilteredTasks tasks={ tasks } searchValue={ searchTaskValue } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
```

Comment procéder alors pour réaliser ce filtrage ?

Il faut un composant `FilteredTasks` qui "hériterait" en quelques sortes du composant `Tasks` pour permettre l'affichage des tâches et conserver les fonctionnalités de mise à jour et de suppression.

Ce composant doit être retourné par un composant d'ordre supérieur.

Si tu t'es renseigné sur les composants d'ordre supérieur, tu sais que ce sont des fonctions qui commencent par le mot `with`.

Je vais donc créer une constante `FilteredTasks` au dessus du composant `App` qui va faire appel à un _"HOC"_ qui n'existe pas encore: `withFilteredTasks`.

```JSX
const FilteredTasks = withFilteredTasks(Tasks, { /* Callback function */ });
```

`withFilteredTasks` prendrait en tant que valeur du premier argument le compsoant `Tasks`.

En tant que valeur du second argument, on aurait la fonction de filtrage qui serait _callback_ qui nous renvoie les `props` passées à `FilteredTasks` et qui attend une valeur de retour.

Ces `props` nous permettraient d'accéder au tableau des tâches et à `searchValue`. Nous pourrons donc les utiliser pour réaliser la recherche et retourner le tableau des tâches filtrées.

```JSX
const FilteredTasks = withFilteredTasks(Tasks, ({ tasks, searchValue }) => getSearchedTasks(tasks, searchValue));
```

Passons maintenant au code du composant d'ordre supérieur. Pour cela nous allons rajouter un dossier `HOCs/` dans le dossier `components/features/Tasks/`, puisse qu'il s'agit d'un composant d'ordre supérieur relatif aux tâches.

Créons le fichier `withFilteredTasks.jsx`:

```jsx
// Il reçoit `TasksComponent` en tant que premier argument (le composant du tableau des tâches)
// Il reçoit la fonction de filtrage en tant que second argument
const withFilteredTasks = (TasksComponent, filterFunction) => {

};

export default withFilteredTasks;
```

Le composant d'ordre supérieur doit retourner un composant exploitable dans le JSX:

```jsx
const withFilteredTasks = (TasksComponent, filterFunction) => {

	/// Le composant qui sera utilisé dans le JSX grâce auquel on récupère les props
	const FilteredTasks = (props) => {
		// ...
	};

	// On retourne ce composant
	return FilteredTasks;

};

export default withFilteredTasks;
```

`FiltreredTasks` va retourner `TasksComponent` en prenant soin d'exécuter la fonction de filtrage juste avant pour envoyer les tâches filtrées au composant des tâches:

```jsx
const withFilteredTasks = (TasksComponent, filterFunction) => {

	const FilteredTasks = (props) => {
		// On passe les props à la fonction de filtrage
		const filteredTasks = filterFunction(props); // Cette fonction retourne le tableau des tâches filtrées

		// On passe le reste des props au composant Tasks et on lui transmet les tâches filtrées
		return <TasksComponent {...props} tasks={ filteredTasks } />;
	};

	return FilteredTasks;

};

export default withFilteredTasks;
```

Pense bien à importer `withFilteredTasks` dans `App`:

```jsx
import withFilteredTasks from './components/features/Tasks/HOCs/withFilteredTasks';
```

Essaie de ton côté, tu verra que la recherche fonctionne ! 👏
