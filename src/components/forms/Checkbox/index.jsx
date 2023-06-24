import { bool, func, number, oneOfType, string } from 'prop-types';
import { useId } from 'react';

const Checkbox = ({ value, onChange, useCheckedAsValue, label, ...htmlInputProps }) => {

	const inputId = useId();

	const handleChange = (event) => {
		if (useCheckedAsValue) {
			onChange(event.target.checked);
		} else {
			onChange(event.target.value);
		}
	};
	
	const customValue = useCheckedAsValue ? { checked: value } : { value };

	return (
		<div className="form-checkbox-container">
			<input { ...htmlInputProps }  type="checkbox" id={ inputId } onChange={ handleChange } { ...customValue } />
			{ label ? <label htmlFor={ inputId }>{ label }</label> : null }
		</div>
	)

};

export default Checkbox;

Checkbox.propTypes = {
	value: oneOfType([ string, number, bool ]).isRequired,
	onChange: func,
	useCheckedAsValue: bool,
	label: string,
};

Checkbox.defaultProps = {
	onChange: () => {},
	useCheckedAsValue: false,
	label: '',
};