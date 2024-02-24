# ⚛️ React Master - Todo list: Manipuler les tâches via une API (Correction)

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Context
*   Appels API

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
git switch ex13/exercise
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

Tu peux consulter la correction vidéo sur [Atomic React](https://atomic-react.com) ou te rendre sur la branche `ex13/correction`.

Pense à sauvegarder ton travail avec les commandes ci-dessous avant de changer de branche !

```bash
git add .
```

```bash
git commit -m "Sauvegarde"
```
