# ⚛️ React Master - Todo list: Validation de formulaire (Exercice)

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Événements
*   Props
*   Gestion d'état
*   Typage des props
*   Composants contrôlés

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
git switch ex05/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Et lance l'application:

```bash
npm run dev
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>. Tu y trouvera l'application dans le même état qu'à la fin de la correction de l'exercice précédent.

Dans cet exercice, tu vas devoir créer un nouveau composant dédié au formulaire de création des tâches.

Actuellement, la création des tâches s'effectue via un champ non-contrôlé directement dans le composant `App`. Le composant `App` contient déjà trop de logique et si notre application évolue, cela risque de devenir de plus en plus difficile à gérer et à maintenir.

Crée donc ce nouveau composant dans lequel tu devras gérer le formulaire de façon contrôlée, c'est à dire en utilisant le `state` du composant. Tu dois donc te débarasser du `useRef`.

Une fois ceci fait, il faudra ajouter une logique de validation du formulaire.

L'utilisateur devra entrer une valeur d'au minimum 3 caractères pour pouvoir soumettre le formulaire et valider la création de la tâche. Si la valeur renseignée par l'utilisateur ne respecte pas cette règle, le message d'erreur suivant doit s'afficher: `The task title must contain at least 3 characters.`.

Tu as déjà toutes les notions pour réaliser cet exercice. Aucune notion supplémentaire n'est requise.

Si jamais tu rencontres des difficultés, n'hésite pas à consulter les leçons précédentes et à effectuer des recherches sur Internet.

Bon courage ! 💪

## Correction

Tu peux consulter la correction écrite ici: <https://github.com/Atomic-React/react-master-todo-list/tree/ex05/correction#correction>

Ou suivre la correction en vidéo ici: _Bientôt disponible_
