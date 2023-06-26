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
git switch ex12/exercise
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

Toutes ces fonctionnalités sont mises à disposition par l'API.

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

Tu peux consulter la correction écrite ici: <https://github.com/Atomic-React/react-master-todo-list/tree/ex13/correction#correction>

Ou suivre la correction en vidéo ici: _Bientôt disponible_
