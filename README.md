# ⚛️ React Master - Todo list: Validation de formulaire (Correction)

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
*   Portails

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
git switch ex06/exercise
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

Dasn cet exercice, tu vas devoir obtenir le rendu suivant:

![delete task modal](docs/delete_task_modal.png)

Il s'agit d'une modale permettant de demander la confirmation à l'utilisateur lorsque celui-ci clique sur le bouton de suppression d'une tâche.

Évidemment, le bouton _"Cancel"_ doit permettre l'annulation de la suppression, c'est à dire de fermer la modale sans supprimer la tâche. Et le bouton _"Confirm"_ est comme son nom l'indique le bouton de confirmation; il doit supprimer la tâche et également fermer la modale.

Pour réaliser cette modale, je te recommande de d'abord créer un composant `Modal` générique que tu va pouvoir réutiliser.

<details>
 <summary>💡 <b>Indice</b></summary>

 > Lorsque tu vas vouloir utiliser ta modale au niveau des lignes du tableau correspondantes au tâches, tu risques d'avoir des erreurs dans la console. Notamment une qui te dit qu'une `div` ne peut pas être enfants d'éléments de tableaux. Pour corriger cela tu peux utiliser les _portails_.
 >
 > C'est une fonctionnalité de **React** qui te permet de "téléporter" des éléments dans le DOM pour les placer où tu veux dans ton JSX tout en respectant la sémantique.
 >
 > Voici le lien de la documentation **React** qui parle des _portails_: <https://react.dev/reference/react-dom/createPortal>

</details>

Une fois ton composant `Modal` réalisé, crée un nouveau composant qui utilisera `Modal` et qui sera en charge de la confirmation de suppression des tâches.

Bon courage ! 💪

## Correction

Pour corriger cet exercice, nous allons encore une fois adopter la logique de programmation déclarative.

C'est à dire que nous allons déclarer ce que nous voulons faire pour ensuite développer la logique.

Chaque tâche dispose d'un bouton _"Delete"_ permettant sa suppression. Nous voulons que ce bouton ouvre d'abord une modale de confirmation avant d'effectuer la suppression.

Ce bouton se trouvant dans `Task.jsx`, je dois m'y rendre pour y apporter quelques modifications.

Je vais alors remplacer le bouton _"Delete"_ qui se trouve en dernière colonne par un composant qui n'existe pas encore et que je vais nommer `DeleteTaskConfirmationModal`. Il contiendra le bouton _"Delete"_ et la modale:

```jsx
// Ce composant se trouvera dans le même dossier
import DeleteTaskConfirmationModal from './DeleteTaskConfirmationModal';

const Task = ({ title, created_at, isDone, onUpdateTask, onDeleteTask: handleDeleteTask }) => {

	// ...
	
	return (
		<tr>
			<td>
				{
					isEditionModeActive ?
					<form onSubmit={ handleSaveTitle } style={{ display: 'flex', gap: 8 }}>
						<InputText ref={ inputRef } />
						<Button.Primary type="submit">Save</Button.Primary>
					</form> 
					: <span role="button" onClick={ handleEditTitle }>{ title }</span>
				}
			</td>
			<td>{ created_at.toLocaleDateString() }</td>
			<td><Checkbox value={ isDone } onChange={ handleSwitchCompletedTask } useCheckedAsValue /></td>
			<td>
				{ /*
					On s'attend à ce que DeleteTaskConfirmationModal dispose d'une props
					émettant l'événement de confirmation pour nous permettre de déclencher la suppression
				*/ }
				<DeleteTaskConfirmationModal onConfirm={ handleDeleteTask } />
			</td>
		</tr>
	);
};
```

Créons maintenant un fichier `DeleteTaskConfirmationModal.jsx` dans le même dossier que `Task.jsx`.

On crée le composant `DeleteTaskConfirmationModal` qui reçoit `onConfirm` dans les `props` et on y intègre le composant `Button`:

```jsx
import Button from '../../ui/Button';
import { func } from 'prop-types';

const DeleteTaskConfirmationModal = ({ onConfirm }) => {

	return (
		<>
			<Button variant="danger">Delete</Button>
			{ /* La modale sera utilisée ici */ }
		</>
	);
};

export default DeleteTaskConfirmationModal;

// Typage des props
DeleteTaskConfirmationModal.propTypes = {
	onConfirm: func,
};

DeleteTaskConfirmationModal.defaultProps = {
	onConfirm: () => {},
};
```

On s'attend à ce qu'on dispose d'un composant `Modal` capable de recevoir une propriété `isOpen` permettant de définir si la modale est ouverte ou non, et une propriété `onClose` permettant de fermer la modale.

C'est `DeleteTaskConfirmationModal` qui va gérer l'état d'ouvertue de la modale:

```jsx
// ...imports
// On s'attend à ce que le composant Modal se trouve dans le dossier 'ui/'
import Modal from '../../ui/Modal';

const DeleteTaskConfirmationModal = ({ onConfirm }) => {

	const [ isModalOpen, setIsModalOpen ] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);

	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<>
			<Button variant="danger" onClick={ handleOpenModal }>Delete</Button>
			<Modal isOpen={ isModalOpen } onClose={ handleCloseModal }>
				{ /* Modal content */ }
			</Modal>
		</>
	);
};
```

La modale devra recevoir des enfants afin de pouvoir y placer le contenu désiré.

On attend de cette `Modal` qu'elle nous fournisse en quelque sorte des _composants secondaires_ afin de standardiser la structure de la modale.

Le but ici, c'est de faire en sorte que toutes les modales de l'application disposent du même design et aient accès aux mêmes fonctionnalités.

Il faudrait donc que le composant `Modal` fournisse des _"sous-composants"_ pour l'en-tête, le titre, le contenu et le pied de la modale.

Pour cela, on va utiliser le pattern de la _"JSX Dot Notation"_. C'est une notation permettant de créer des composants dépendants d'autres composants.

Par exemple, je veux que le composant _"en-tête de modale"_ que l'on va appeler `Header` ne soit utilisé que dans les modales. Il faut donc rendre ce composant dépendant de `Modal`.

Pour accéder à `Header`, je devrais obligatoirement faire appel à `Modal` et l'utiliser avec la syntaxe `Modal.Header`. C'est pour cela qu'on appelle cette syntaxe la _"JSX Dot Notation"_ (_"dot"_ signifie _"point"_ en anglais).

Cela donne le résultat suivant:

```jsx
const DeleteTaskConfirmationModal = ({ onConfirm }) => {

	const [ isModalOpen, setIsModalOpen ] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);

	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<>
			<Button variant="danger" onClick={ handleOpenModal }>Delete</Button>
			<Modal isOpen={ isModalOpen } onClose={ handleCloseModal }>
				<Modal.Header>
					<Modal.Title>
						Delete this task ?
					</Modal.Title>
				</Modal.Header>
				<Modal.Content>
					Are you sure you want to delete this task ?
				</Modal.Content>
				<Modal.Footer>
					<Button type='button'>Cancel</Button>
					<Button variant="danger" type='button'>Confirm</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
```

Nous verrons dans un instant comment rendre cela possible.

Terminons d'abord ce composant en rajoutant la logique de confirmation:

```jsx
const DeleteTaskConfirmationModal = ({ onConfirm }) => {

	const [ isModalOpen, setIsModalOpen ] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);

	const handleCloseModal = () => setIsModalOpen(false);

	const handleConfirm = () => {
		onConfirm();
		handleCloseModal();
	}

	return (
		<>
			<Button variant="danger" onClick={ handleOpenModal }>Delete</Button>
			<Modal isOpen={ isModalOpen } onClose={ handleCloseModal }>
				<Modal.Header>
					<Modal.Title>
						Delete this task ?
					</Modal.Title>
				</Modal.Header>
				<Modal.Content>
					Are you sure you want to delete this task ?
				</Modal.Content>
				<Modal.Footer>
					<Button type='button' onClick={ handleCloseModal }>Cancel</Button>
					<Button variant="danger" type='button' onClick={ handleConfirm }>Confirm</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
```

Ajoutons maintenant le composant `Modal` dans le dossier `components/ui/`:

```jsx
// On importe le CSS (voir le block de code suivant)
import './Modal.css';
import { bool, func, node } from 'prop-types';

const Modal = ({ isOpen, children, onClose, ...htmlDivProps }) => {

	// Si la modale est ouverte, on affiche la div
	return (
		isOpen ?
			<div className='modal-overlay'>
				<div className="modal" { ...htmlDivProps }>
					{ children }
				</div>
			</div>
			: null
	);

};

export default Modal;

// Le typage des props
Modal.propTypes = {
	isOpen: bool,
	children: node,
	onClose: func,
};

Modal.defaultProps = {
	isOpen: false,
	children: null,
	onClose: () => {},
};
```

Voilà le CSS du composant:

```CSS
.modal-overlay {
	position: absolute;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	box-shadow: var(--shadow);
	border-radius: 1rem;
	background-color: var(--white);
	min-width: 324px;
	max-width: 648px;
}

.modal-header {
	padding: 1rem 2rem;
	border-bottom: 1px solid var(--light);
}

.modal-title {
	font-weight: bold;
	font-size: 1.2rem;
	margin: 0;
}

.modal-content {
	padding: 2rem 2rem;
}

.modal-footer {
	padding: 2rem 2rem;
	border-top: 1px solid var(--light);
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
}
```

La propriété `onClose` ne sera pas utilisée pendant cette correction, elle sera utile dans le prochain exercice. Ne nous en occupons pas pour le moment.

Tu peux remarquer dans le `CSS` fourni qu'il y a des classes pour chaque bloc de la modale.

La modale doit rester flexible pour la développeuse ou le développeur qui l'utilisera. Il faut donc lui laisser le choix d'ajouter ou non un `Header`, un `Footer`, un `Title`, etc...

Mais ces composants, s'ils sont utilisés doivent respecter un design bien précis et sont dépendants du composant `Modal`.

Pour pouvoir permettre la _JSX Dot Notation_, il va falloir créer tout ces composant dans le fichier `Modal.jsx`:

```jsx
const ModalHeader = ({ children }) => <div className='modal-header'>{ children }</div>;

const ModalTitle = ({ children }) => <h5 className="modal-title">{ children }</h5>

const ModalContent = ({ children }) => <div className="modal-content">{ children }</div>;

const ModalFooter = ({ children }) => <div className="modal-footer">{ children }</div>;
```

Ensuite, il faut les ajouter en tant que propriété de la constante `Modal`:

```jsx
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
```

Sans oublier le typage des props:

```jsx
ModalHeader.propTypes = {
	children: node,
};

ModalHeader.defaultProps = {
	children: null,
};

ModalTitle.propTypes = {
	children: node,
};

ModalTitle.defaultProps = {
	children: null,
};

ModalContent.propTypes = {
	children: node,
};

ModalContent.defaultProps = {
	children: null,
};

ModalFooter.propTypes = {
	children: node,
};

ModalFooter.defaultProps = {
	children: null,
};
```

Et c'est tout !

Désormais, la modale de confirmation de suppression devrait fonctionner.

Cependant il y a des erreurs dans la console indiquant que la `div` de la modale ne peut être enfant d'un élément de tableau HTML.

De plus, l'`overlay` de la modale, c'est à dire la `div` qui contient toute la modale et qui dispose du fond sombre et partiellement transparent, est en `position: absolute` pour permettre l'affichage de la modale par dessus tous les autres composants.

Si tu rajoutes un `position: relative` sur la balise `table` qui se trouve dans `Tasks/index.jsx`, tu vas vite t'apercevoir qu'il y a un problème dans l'interface.

La modale prend maintenant pour référence le tableau. C'est du CSS de base, tout élément en `position: absolute` prend pour référence de positionnement son parent le plus proche en `position: relative`.

Comme solution à ces deux problèmes, nous pourrions placer la modale dans un composant parent et adapter la logique de suppression en conséquence. Mais il existe une méthode beaucoup plus simple que d'entamer un refactoring.

Cette méthode consiste à élever la modale dans la hiérarchie des éléments HTML, sans pour autant changer son emplacement dans le JSX.

Dans le JSX, elle est enfant d'une ligne de tableau, mais dans le HTML, elle sera enfant direct de `body`.

Ce moyen, c'est `createPortal`. Un composant d'ordre supérieur (nous en parlons bientôt, promis) fournit par **React** qui permet de faire exactement ce que je viens de décrire: téléporter des éléments JSX à travers le DOM.

Il s'utilise de cette façon:

```jsx
import { createPortal } from 'react-dom';


const Modal = ({ isOpen, children, onClose, ...htmlDivProps }) => {

	return (
		isOpen
			? createPortal( // On encapsule le code souhaité dans le portail
				<div className='modal-overlay'>
					<div className="modal" ref={ modalRef } { ...htmlDivProps }>
						{ children }
					</div>
				</div>,
				// On lui donne l'élément du DOM cible (vers lequel le code doit être "téléporté")
				document.body
			)
			: null
	);

};
```

Note que c'est `document.body` qui est passé en argument ici et non pas un élément JSX. Le portail ne prend pour cible que des éléments du DOM. Il faut donc passer par l'API `document`. Si tu essaies de passer `<App />` par exemple, tu verra que cela ne fonctionnera pas.

Notre problème est désormais résolu ! 👏
