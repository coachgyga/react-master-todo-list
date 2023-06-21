import { forwardRef, useId } from 'react';
import '../forms.css';
import { object, string } from 'prop-types';

const InputText = ({ label, style, ...htmlInputProps }, ref) => {

	const inputId = useId();
	
	return (
		<div className="form-block" style={ style }>
			{ label ? <label htmlFor={ inputId }>{ label }</label> : null }
			<input type="text" className="form-input" { ...htmlInputProps } ref={ ref } />
		</div>
	);
};

export default forwardRef(InputText);

InputText.propTypes = {
	label: string,
	style: object,
};

InputText.defaultProps = {
	label: '',
	style: {},
}  ;
