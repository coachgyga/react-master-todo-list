import { createPortal } from 'react-dom';
import './Modal.css';
import { bool, func, node } from 'prop-types';


const Modal = ({ isOpen, children, onClose, ...htmlDivProps }) => {

	return (
		isOpen
			? createPortal(
				<div className='modal-overlay'>
					<div className="modal" { ...htmlDivProps }>
						{ children }
					</div>
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
	children: node,
	onClose: func,
} ;

Modal.defaultProps = {
	isOpen: false,
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