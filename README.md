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

Créons le composant `CreateTaskForm` dans le dossier `components/features/Tasks/`. Ce composant sera dédié au formulaire de création des tâches.

Récupérons le code du formulaire de création depuis `App` et intégrons le dans ce nouveau composant. Il faut penser à importer le composant `Button` et le composant `InputText` et à supprimer `newTaskInputRef` du champ ainsi que `handleCreateNewTask` du bouton:

```JSX
import Button from '../../ui/Button';
import InputText from '../../forms/InputText';

const CreateTaskForm = () => {

	return (
		<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
			<InputText label="Add a new task" style={{ flexGrow: 1 }} />
			<Button style={{ marginTop: 'auto' }}>Create</Button>
		</div>
	);
};

export default CreateTaskForm;
```

De cette façon, nous pouvons repartir sur une base propre.

Effectivement, la référence ne nous est plus utile ici car nous n'allons pas utiliser de champ _non-contrôlé_ mais bien un champ _contrôlé_, qui utilise donc le `state` du composant `CreateTaskForm`.

Nous allons également remplacer la `div` par une balise `form` et utilise la fonction `submit` pour la soumission du formulaire, plutôt que d'utiliser le `onClick` du bouton. En terme d'accessibilité et de sémantique, c'est plus juste de procéder ainsi.

```JSX
import { useState } from 'react';
import Button from '../../ui/Button';
import InputText from '../../forms/InputText';

const CreateTaskForm = () => {

	const [ formValues, setFormValues ] = useState();

	const handleSubmitForm = (event) => {
		event.preventDefault();
	}

	return (
		<form onSubmit={ handleSubmitForm } style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
			<InputText label="Task title" style={{ flexGrow: 1 }} />
			<Button type="submit" style={{ marginTop: 'auto' }}>Create</Button>
		</form>
	);
};

export default CreateTaskForm;
```

Tu remarques que nous avons nommé la propriété `formValues` dans le `state` au lieu de lui avoir donné un nom comme `inputValue` ou `newTaskInputValue`.

Ceci est justifié par le fait qu'il existe tout un tas de formulaires différents, et bon nombre d'entre eux comptent plusieurs champs. Si nous avions plusieurs champs à gérer, on se retrouverait avec ce genre de code:

```JSX
// Exemple pour une page de profil
const [ usernameValue, setUsernameValue ] = useState();
const [ emailValue, setEmailValue ] = useState();
const [ phoneValue, setPhoneValue ] = useState();
const [ addressValue, setAddressValue ] = useState();
const [ zipCodeValue, setZipCodeValue ] = useState();
const [ setCityValue, setCityValue ] = useState();
```

On se rend bien compte que ce n'est pas très pratique et que cela alourdit considérablement le code.

Je t'ai déjà dit plus tôt dans le cours que _une valeur = une propriété_ du `state`. Il semble y avoir une contradiction entre cette règle et cet exemple.

En fait il n'y en a pas. La "valeur" que l'on considère ici est celle du formulaire, et non pas celle de chaque champ pris individuellement.

Maintenant que nous sommes au clair là dessus, ajoutons une valeur initiale à cette propriété:

```JSX
const INITIAL_FORM_VALUE = {
	title: '',
};

const CreateTaskForm = () => {

	const [ formValues, setFormValues ] = useState(INITIAL_FORM_VALUE);

	const handleSubmitForm = (event) => {
		event.preventDefault();
	}

	return (
		<form onSubmit={ handleSubmitForm } style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
			<InputText label="Task title" style={{ flexGrow: 1 }} />
			<Button type="submit" style={{ marginTop: 'auto' }}>Create</Button>
		</form>
	);
};
```

Le formulaire ne contient qu'une seule `input`, donc qu'une seule valeur.

Nous plaçons cette valeur initiale dans une constante pour pouvoir la réutiliser plus tard, notamment pour réinitialiser le formulaire.

Relions le champ au `state`:

```JSX
<InputText label="Title" style={{ flexGrow: 1 }} value={ formValue.title } onChange={ handleChangeInput('title') } />
```

Pour l'écoute du changement de valeur, on s'attend à ce qu'une fonction curry recevant le nom du champ en argument existe.

Créons cette fonction:

```JSX
const handleChangeInput = (inputName) => (event) => {
	const { value } = event.target;
	setFormValue({
		...formValue,
		[inputName]: value,
	});
};
```

Reste plus qu'à nous occuper de la soumission du formulaire pour pouvoir rétablir le bon fonctionnement de la création des tâches.

On s'attend donc à recevoir une propriété `onSubmit` depuis les `props` qui enverra au parent le signal que le formulaire a été soumis en transmettant les valeurs:

```JSX
import { useState } from 'react';
import Button from '../../ui/Button';
import InputText from '../../forms/InputText';
import { func } from 'prop-types';

const INITIAL_FORM_VALUE = {
	title: '',
};

const CreateTaskForm = ({ onSubmit }) => {

	const [ formValue, setFormValue ] = useState(INITIAL_FORM_VALUE);

	// Écoute du changement de valeur des inputs
	const handleChangeInput = (inputName) => (event) => {
		const { value } = event.target;
		setFormValue({
			...formValue,
			[inputName]: value,
		});
	};

	// Soumission du formulaire
	const handleSubmitForm = (event) => {
		event.preventDefault();

		// Transmission des valeurs au composant parent
		onSubmit(formValue);
		// Réinitialisation du formulaire
		setFormValue(INITIAL_FORM_VALUE);
	};

	return (
		<form onSubmit={ handleSubmitForm } style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
			<InputText label="Title" style={{ flexGrow: 1 }} value={ formValue.title } onChange={ handleChangeInput('title') } />
			<Button type="submit" style={{ marginTop: 'auto' }}>Create</Button>
		</form>
	);
};

export default CreateTaskForm;

// On pense au typage des props !
CreateTaskForm.propTypes = {
	onSubmit: func.isRequired,
};
```

Modifions le composant `App` pour l'adapter à cette nouvelle configuration. On supprime le `useRef` et le `useEffect` (qui était utilisé seulement par la référence) et on intègre `CreateTaskForm`:

```JSX
// ...
import CreateTaskForm from './components/features/Tasks/CreateTaskForm';

const App = () => {

	// ...

	return (
		<div className="container">
			<h1 className="text--primary">Todo</h1>
			<div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
				<InputSearch label="Search a task" placeholder="Search..." onSearch={ handleSearchTask } style={{ flexGrow: 1 }} />
			</div>
			<CreateTaskForm onSubmit={ handleSubmitCreateTaskForm } />
			<Block>
				<Tasks tasks={ searchTaskValue ? getSearchedTasks(tasks, searchTaskValue) : tasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
			</Block>
		</div>
	);
};

export default App;
```

On modifie la fonction `handleCreateNewTask` en la renommant `handleSubmitCreateTaskForm` pour que cela soit plus parlant:

```JSX
const handleSubmitCreateTaskForm = (values) => {
	const idsList = tasks.map(({ id }) => id);
	const newId = generateMaxId(idsList);
	setTasks([
		...tasks,
		{
			id: newId,
			title: values.title,
			created_at: new Date(),
		},
	]);
};
```

La création de tâches devrait de nouveau fonctionner !

Occupons nous maintenant de la validation du formulaire.

Dans la fonction `handleSubmitForm` qui se trouve dans le composant `CreateTaskForm`, nous nous attendons à avoir à notre disposition une fonction `validateForm` qui retournerait les erreurs liées au non-respect des règles de validation appliquées aux champs du formulaire.

Si aucune erreur n'est retournée, on autorise la soumission et la réinitialisation du formulaire:

```JSX
const handleSubmitForm = (event) => {
	event.preventDefault();
	const errors = validateForm();
	if (!errors) {
		onSubmit(formValue);
		setFormValue(INITIAL_FORM_VALUE);
	}
};
```

Créons cette fonction `validateForm`:

```JSX
const validateForm = () => {
	
	let errors; // errors est undefined par défaut (il n'y a pas d'erreur)

	const { title } = formValue; // On récupère les valeurs du formulaire

	if (title.length < 3) { // Si le titre contient moins de 3 caractères
		// On ajoute une erreur
		errors = {
			...errors,
			title: 'The task title must contain at least 3 characters.',
		};
	}
	// On envoie ces erreurs dans le state pour pouvoir les afficher dans l'interface
	// Cette propriété du state n'existe pas encore, nous allons la créer
	setValidationsErrors(errors);
	// On retourne les erreurs
	return errors;
};
```

Dans cette fonction, nous utilisons `setValidationsErrors` qui est censée mettre à jour le `state` pour pouvoir afficher les erreurs dans l'interface.

Ajoutons cette propriété de `state`:

```JSX
const [ validationErrors, setValidationsErrors ] = useState();
```

Ici nous ne passons pas de valeur initiale. Nous choisissons consciemment et volontairement de laisser la valeur par défaut `undefined`. Car si `validationErrors` est `undefined`, cela signifie qu'il n'y a pas d'erreur, donc rien à afficher.

Ces erreurs, nous voulons les passer aux composants des `inputs` pour pouvoir afficher un message d'erreur associé à ces `inputs`:

```JSX
<InputText label="Title" style={{ flexGrow: 1 }} value={ formValue.title } onChange={ handleChangeInput('title') } error={ validationErrors?.title } />
```

Cela veut dire qu'il faut modifier le composant `InputText` pour qu'il puisse recevoir ce message d'erreur et l'afficher:

```JSX
// On récupère le message d'erreur depuis les props
const InputText = ({ label, style, error, ...htmlInputProps }, ref) => {

	const inputId = useId();
	
	return (
		<div className="form-block" style={ style }>
			{ label ? <label htmlFor={ inputId }>{ label }</label> : null }
			<input type="text" className="form-input" { ...htmlInputProps } ref={ ref } />
			{ /* S'il y a une erreur, on l'affiche en rouge, sous le champ */ }
			{ error && <small style={{ color: 'red', margin: 0 }}>{ error }</small> }
		</div>
	);
};

export default forwardRef(InputText);

// On pense au typage de props !

InputText.propTypes = {
	label: string,
	style: object,
	error: string,
};

InputText.defaultProps = {
	label: '',
	style: {},
	error: '',
};
```

Désormais, nous avons un formulaire munit d'un système de validation de champs.

L'exercice est terminé ! 👏
