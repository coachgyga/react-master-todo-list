import { createPortal } from 'react-dom';
import './Modal.css';
import useClickOutSide from '../../../hooks/useClickOutSide';
import { bool, func, node, elementType } from 'prop-types';


const Modal = ({ isOpen, as, children, onClose, ...htmlDivProps }) => {

	const ModalComponent = as || 'div';

	const modalRef = useClickOutSide(onClose);

	return (
		isOpen
			? createPortal(
				<div className='modal-overlay'>
					<ModalComponent className="modal" ref={ modalRef } { ...htmlDivProps }>
						{ children }
					</ModalComponent>
				</div>,
				document.body
			)
			: null
	);

};

const ModalHeader = ({ children }) => <div className='modal-header'>{ children }</div>;

const ModalTitle = ({ children }) => <h5 className="modal-title">{ children }</h5>

const ModalContent = ({ children }) => <div className="modal-content">{ children }</div>;

const ModalFooter = ({ children }) => <div className="modal-footer">{ children }</div>;

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;

Modal.propTypes = {
	isOpen: bool,
	as: elementType,
	children: node,
	onClose: func,
} ;

Modal.defaultProps = {
	isOpen: false,
	as: null,
	children: null,
	onClose: () => {},
};

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