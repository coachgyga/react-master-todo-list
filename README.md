# ⚛️ React Master - Todo list: Composants d'ordre supérieur (Exercice)

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Props
*   Composants d'ordre supérieur

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
git switch ex09/exercise
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

Tu peux consulter la correction écrite ici: <https://github.com/Atomic-React/react-master-todo-list/tree/ex09/correction#correction>

Ou suivre la correction en vidéo ici: _Bientôt disponible_
