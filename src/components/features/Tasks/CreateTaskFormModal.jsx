import { useState } from 'react';
import Button from '../../ui/Button';
import InputText from '../../forms/InputText';
import { func } from 'prop-types';
import Modal from '../../ui/Modal';

const INITIAL_FORM_VALUE = {
	title: '',
};

const CreateTaskFormModal = ({ onSubmit }) => {

	const [ formValue, setFormValue ] = useState(INITIAL_FORM_VALUE);
	const [ validationErrors, setValidationsErrors ] = useState();
	const [ isModalOpen, setIsModalOpen ] = useState(false);

	const validateForm = () => {
		let errors;
		const { title } = formValue;
		if (title.length < 3) {
			errors = {
				...errors,
				title: 'The task title must contain at least 3 characters.',
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
		const errors = validateForm();
		if (!errors) {
			onSubmit(formValue);
			setFormValue(INITIAL_FORM_VALUE);
			setIsModalOpen(false);
		}
	};

	const handleOpenModal = () => setIsModalOpen(true);

	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<>
			<Button type="button" onClick={ handleOpenModal } style={{ marginTop: 'auto' }}>+ New task</Button>
			<Modal as='form' onSubmit={ handleSubmitForm } isOpen={ isModalOpen } onClose={ handleCloseModal }>
				<Modal.Header>
					<Modal.Title>
						Create new task
					</Modal.Title>
				</Modal.Header>
				<Modal.Content>
					<InputText label="Title" style={{ flexGrow: 1 }} value={ formValue.title } onChange={ handleChangeInput('title') } error={ validationErrors?.title } />
				</Modal.Content>
				<Modal.Footer>
					<Button type="submit" style={{ marginTop: 'auto' }}>Submit</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CreateTaskFormModal;

CreateTaskFormModal.propTypes = {
	onSubmit: func.isRequired,
};