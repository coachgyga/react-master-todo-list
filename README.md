# ⚛️ React Master - Todo list: Améliorer la fermeture de la modale (Exercice)

Cet exercice est un exercice bonus. Il ne dispose pas d'explication vidéo mais seulement d'une correction écrite.

## Sommaire

<!-- no toc -->
*   [Notions](#notions-de-lexercice)
*   [Consignes](#consignes)
*   [Correction](#correction)

## Notions de l'exercice

*   Événements
*   Props
*   Gestion d'état
*   Refs
*   Custom hooks

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
git switch ex07/exercise
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

Je t'invite à aller jeter un oeil dans le composant `Modal`. Tu verra qu'un _custom hook_ y a été ajouté: `useClickOutSide` qui provient du dossier `hooks/` placé à la racine du dossier `src/`:

```jsx
import useClickOutSide from '../../../hooks/useClickOutSide';

const Modal = ({ isOpen, children, onClose, ...htmlDivProps }) => {

	const modalRef = useClickOutSide(onClose);

	return (
		isOpen
			? createPortal(
				<div className='modal-overlay'>
					<div className="modal" ref={ modalRef } { ...htmlDivProps }>
						{ children }
					</div>
				</div>,
				document.body
			)
			: null
	);

};
```

Tu l'aura peut-être compris, le but du jeu est de permettre à l'utilsiateur de fermer la modale en cliquant à l'extérieur de celle-ci.

Cette fonctionnalité étant commune à d'autres composants, comme les _dropdowns_ par exemple, on décide de la placer dans un _custom hook_ pour pouvoir la réutiliser à souhait.

À toi d'analyser le code actuel du composant `Modal` pour comprendre ce qui est attendu du hook `useClickOutSide` pour ensuite créer ce _custom hook_.

Il n'y a pas de documentation **React** sur ce sujet précis. À toi de faire tes propres recherches.

Bon courage ! 💪

## Correction

Tu peux consulter la correction écrite ici: <https://github.com/Atomic-React/react-master-todo-list/tree/ex07/correction#correction>

Aucune correction vidéo n'est proposée pour les exercices bonus.
