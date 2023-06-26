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
git switch ex13/exercise
```

Puis installes les dépendances avec la commande:

```bash
npm install
```

Tu peux maintenant te rendre sur l'URL <http://localhost:5173>.

Pour cet exercice, tu vas devoir gérer l'état de chargement, et l'état d'erreur accompagné des messages d'erreurs éventuels.

J'ai apporté quelques modifications à l'application pour que tu puisses partir sur de meilleures bases.

Tout d'abord, j'ai ajouté la récupération des messages d'erreurs dans les fonction de `tasks.service.js`.

C'est ce code ci que tu vois dans chaque fonction:

```JSX
if (!response.ok) {
	throw new Error(json.error);
}
```

Cela te servira pour récupérer les messages d'erreurs.

J'ai aussi commenté une partie de la fonction `validateForm` qui se trouve dans le composant `CreateTaskFormModal`:

```JSX
const validateForm = () => {
	let errors;
	// const { title } = formValue;
	// if (title.length < 3) {
	// 	errors = {
	// 		...errors,
	// 		title: 'The task title must contain at least 3 characters.',
	// 	};
	// }
	setValidationsErrors(errors);
	return errors;
};
```

De cette façon, tu pourra tester plus facilement le cas d'erreur avec un exemple accessible directement.

Comme il n'y a plus de validation du champ "titre", tu vas pouvoir envoyer un titre vide à l'API. Sauf que l'API n'aime pas ça, elle te renverra un message d'erreur que tu devra traiter et afficher comme tu peux le voir ci-dessous:

![tasks api error](docs/tasks_error_api.png)

Ce message d'erreur devra forcément passer par l'état du contexte puisque c'est dans le composant du contexte que les requêtes API sont effectuées. Cela veut dire que tu as certainement besoin de toucher au `reducer` pour créer des actions supplémentaires.

Il faudra aussi que tu gère l'état de chargement.

Dans le service `tasks.service.js`, j'ai ajouté un temps de latence factice sur la requête des tâches:

```JSX
const wait = (delay = 3000) => new Promise((resolve) => {
	setTimeout(() => resolve(), delay);
});

export const getTasks = async () => {
	try {
		await wait(); // ICI => On attend 3 secondes que les tâches chargent
		const response = await fetch(`${apiURL}/tasks`);
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.error);
		}
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
```

Pendant le chargement, tu devra afficher le message _"Loading..."_ à la place du tableau des tâches:

![tasks loading]()

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
