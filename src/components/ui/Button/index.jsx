import './Button.css';
import { node, oneOf } from 'prop-types';

const Button = ({ variant, children, ...htmlButtonProps }) => {

	return (
		<button className={`btn btn--${ variant }`} { ...htmlButtonProps }>
			{ children }
		</button>
	);
};

export default Button;

Button.propTypes = {
	variant: oneOf([ 'primary', 'danger', 'warning', 'success', 'light' ]),
	children: node.isRequired,
}

Button.defaultProps = {
	variant: 'primary',
}