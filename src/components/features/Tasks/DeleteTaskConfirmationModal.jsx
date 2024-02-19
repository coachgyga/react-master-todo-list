import { useState, memo } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { func } from 'prop-types';

const DeleteTaskConfirmationModal = memo(({ onConfirm }) => { // props avant MAJ !== props après MAJ => re-render

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
});

DeleteTaskConfirmationModal.displayName = 'DeleteTaskConfirmationModal';

export default DeleteTaskConfirmationModal;

DeleteTaskConfirmationModal.propTypes = {
	onConfirm: func,
};

DeleteTaskConfirmationModal.defaultProps = {
	onConfirm: () => {},
};