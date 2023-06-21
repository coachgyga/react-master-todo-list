import InputText from '../InputText';
import { object, string, func } from 'prop-types';

const InputSearch = ({ label, style, onSearch: handleSearch, ...htmlInputProps }) => {

	const handleChangeInputValue = (event) => {
		handleSearch(event.target.value);
	}

	return (
		<InputText label={ label } style={ style } type="search" onChange={ handleChangeInputValue } { ...htmlInputProps } />
	);
};

export default InputSearch;

InputSearch.propTypes = {
	label: string,
	style: object,
	onSearch: func,
};

InputSearch.defaultProps = {
	label: '',
	style: {},
	onSearch: () => {},
};
