import { forwardRef, useId } from 'react';
import '../forms.css';
import { object, string } from 'prop-types';

const InputText = ({ label, style, error, ...htmlInputProps }, ref) => {

	const inputId = useId();
	
	return (
		<div className="form-block" style={ style }>
			{ label ? <label htmlFor={ inputId }>{ label }</label> : null }
			<input type="text" className="form-input" { ...htmlInputProps } ref={ ref } />
			{ error && <small style={{ color: 'red', margin: 0 }}>{ error }</small> }
		</div>
	);
};

export default forwardRef(InputText);

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
