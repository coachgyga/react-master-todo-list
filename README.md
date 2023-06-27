# ⚛️ React Master - Todo list: Mémoiser un composant (Exercice)

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
git switch ex15/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>.

Il y a dans notre application des composants qui se re-rendent très souvent, à chaque mise à jour d'état, alors qu'ils n'en ont pas forcément besoin.

Par exemple, le bouton `Delete` de chaque tâche, une fois rendu n'a pas besoin de se re-rendre quand on coche la case _"Completed"_ ou quand on modifie le nom de la tâche.

Le bouton `Delete` ne change pas d'état: Il s'appelle toujours `Delete` et la fonction de confirmation liée à la modale contient toujours la même valeur.

Je t'invite à ouvrir ta console et à te rendre sur l'onglet **⚛️ Components**.

Clique sur la roue dentée en haut à droite pour ouvrir les paramètres:

![react dev tools gear](docs/react_dev_tools/react_dev_tools_gear.png)

Puis coche la case _"Highlight updates when components render."_ dans l'onglet _"General"_:

![react dev tools highlight render](docs/react_dev_tools/react_dev_tools_highlight_render.png)

Ce paramètre va te permettre de mettre évidence les re-rendus de tes composants. (Tu pourra le désactiver plus tard)

À chaque fois qu'un composant se re-rendra, une bordure apparaîtra brièvement autour de ce composant.

Par exemple, le composant `DeleteTaskConfirmationModal` se re-rend à chaque modification d'une tâche:

![tasks render delete button](docs/tasks_render_delete_button.png)

Dans une application telle que la nôtre, ce n'est pas grave du tout.

Dans une application dans laquelle il y aurait beaucoup de re-rendu, beaucoup de mises à jour de `state`, cela pourrait occasionner de lourds problèmes de performances.

Tu va donc apprendre à _mémoiser_ des composants.

Mémoiser ? Oui, et pas "mémoriser".

La mémoisation consiste à dire à **React** de garder l'état d'un composant en mémoire et de le re-rendre que sous certaines conditions.

Le but du jeu, c'est que cette bordure n'apparaisse plus autour du bouton `Delete` à chaque fois que tu coches/décoches la case d'une tâche ou que tu modifies sont titre.

Pour réaliser cela, jète un oeil à la fonction `memo`: <https://react.dev/reference/react/memo>

<details>
 <summary>💡 <b>Indice</b></summary>

 > Si malgré l'utilisation de `memo` ton composant continue de ce re-rendre, c'est à cause de ses props.
 >
 > Tu dois déterminer laquelle de ses `props` induit un re-rendu du composant.
 >
 > Si tu as lu la documentation de `memo`, tu sais que `memo` compare la valeur actuelle des `props` et la nouvelle valeur des `props`. Si les deux valeurs son différentes, le composant est re-rendu.
 >
 > Trouve la `props` qui change de valeur ou la `props` dont la valeur n'est pas prise en charge par `memo` et traite la.
 >
 > Ces deux hooks peuvent t'être utiles:
 >
 > `useMemo`: <https://react.dev/reference/react/useMemo>
 >
 > `useCallback`: <https://react.dev/reference/react/useCallback>

</details>

Bon courage ! 💪

## Correction

Tu peux consulter la correction écrite ici: <https://github.com/Atomic-React/react-master-todo-list/tree/ex15/correction#correction>

Ou suivre la correction en vidéo ici: _Bientôt disponible_
