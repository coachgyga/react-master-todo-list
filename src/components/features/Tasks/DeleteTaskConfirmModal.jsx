import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { func } from 'prop-types';

const DeleteTaskConfirmationModal = ({ onConfirm }) => {

	const [ isOpen, setIsOpen ] = useState(false);

	const handleOpenModal = () => setIsOpen(true);

	const handleCloseModal = () => setIsOpen(false);

	const handleConfirm = () => {
		onConfirm();
		handleCloseModal();
	}

	return (
		<>
			<Button variant="danger" onClick={ handleOpenModal }>Delete</Button>
			<Modal isOpen={ isOpen } onClose={ handleCloseModal }>
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

export default DeleteTaskConfirmationModal;

DeleteTaskConfirmationModal.propTypes = {
	onConfirm: func,
};

DeleteTaskConfirmationModal.defaultProps = {
	onConfirm: () => {},
};