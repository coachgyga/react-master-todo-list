import { useState } from 'react';
import Button from '../../ui/Button';
import InputText from '../../forms/InputText';
import { func } from 'prop-types';

const INITIAL_FORM_VALUE = {
	title: '',
};

const CreateTaskForm = ({ onSubmit }) => {

	const [ formValue, setFormValue ] = useState(INITIAL_FORM_VALUE);

	const [ validationErrors, setValidationsErrors ] = useState();

	const validateInputs = () => {
		let errors;
		const { title } = formValue;
		if (title.length < 3) {
			errors = {
				...errors,
				title: 'Title must contain at least 3 characters.',
			};
		}
		setValidationsErrors(errors);
		return errors;
	};

	const handleChangeInput = (inputName) => (event) => {
		const { value } = event.target;
		setFormValue({
			...formValue,
			[inputName]: value,
		});
	};

	const handleSubmitForm = (event) => {
		event.preventDefault();
		const errors = validateInputs();
		if (!errors) {
			onSubmit(formValue);
			setFormValue(INITIAL_FORM_VALUE);
		}
	};

	return (
		<form onSubmit={ handleSubmitForm } style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
			<InputText label="Title" style={{ flexGrow: 1 }} value={ formValue.title } onChange={ handleChangeInput('title') } error={ validationErrors?.title } />
			<Button type="submit" style={{ marginTop: 'auto' }}>Create</Button>
		</form>
	);
};

export default CreateTaskForm;

CreateTaskForm.propTypes = {
	onSubmit: func.isRequired,
};