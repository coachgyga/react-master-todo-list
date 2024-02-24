# ⚛️ React Master - Todo list: Découverte des contextes (Exercice)

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

Tu peux consulter la correction vidéo sur [Atomic React](https://atomic-react.com) ou te rendre sur la branche `ex11/correction`.

Pense à sauvegarder ton travail avec les commandes ci-dessous avant de changer de branche !

```bash
git add .
```

```bash
git commit -m "Sauvegarde"
```
