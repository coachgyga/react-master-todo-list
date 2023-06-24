# ⚛️ React Master - Todo list: Améliorer la fermeture de la modale (Correction)

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
git switch ex07/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
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

Voici le code du _custom hook_ `useClickOutSide` expliqué:

```jsx
import { useEffect, useRef } from 'react';

// On attend 'handler' comme argument: une fonction a exécuté quand le click est déclenché
const useClickOutSide = (handler) => {

	// On crée une référence qui devra être retournée par le hook pour pouvoir la passer à l'élément ciblé
	const ref = useRef(null);

	useEffect(() => {

		// On crée un handler qui va s'exécuter quand un événement 'click' est détecté.
		const handleClickOutSide = (event) => {
			// Si la référence est bien reliée à un élément
			// Et que l'élément sur lequel on a cliqué n'est pas contenu dans cet élément
			if (ref.current && !ref.current.contains(event.target)) {
				// Alors cela signifie qu'on a cliqué à l'extérieur, on exécute le handler
				handler();
			}
		};

		// On écoute l'événement 'click' sur l'ensemble du DOM
		document.addEventListener("click", handleClickOutSide);

    return () => {
		// À la destruction du composant, on supprime l'écouteur d'événement
		document.removeEventListener("click", handleClickOutSide);
    };
	// Si le handler change, on relance le useEffect
	}, [ handler ]);

	// On retourne la référence
	return ref;

};

export default useClickOutSide;
```

Si l'écoute de l'événement `click` sur le DOM ne fonctionne pas, l'alternative avec les événements `mousedown` et/ou `touchstart` devrait fonctionner:

```jsx
import { useEffect, useRef } from 'react';

const useClickOutSide = (handler) => {

	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutSide = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				handler();
			}
		};
		document.addEventListener("mousedown", handleClickOutSide);
		// document.addEventListener("touchstart", handleClickOutSide);

    return () => {
		document.removeEventListener("mousedown", handleClickOutSide);
		// document.removeEventListener("touchstart", handleClickOutSide);
    };
	}, [ handler ]);

	return ref;

};

export default useClickOutSide;
```
