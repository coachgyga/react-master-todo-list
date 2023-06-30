import { useEffect, useState } from 'react';
import InputText from '../InputText';
import { object, string, func, number } from 'prop-types';

let timeoutId;

const InputSearch = ({ label, style, onSearch: handleSearch, debounceDelay, ...htmlInputProps }) => {

	const [ searchValue, setSearchValue ] = useState('');

	useEffect(() => {
		return () => {
			if (debounceDelay) {
				clearTimeout(timeoutId);
			}
		}
	}, [debounceDelay]);

	const handleChangeInputValue = (event) => {
		const { value } = event.target;
		setSearchValue(value);
		if (debounceDelay) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				handleSearch(value);
			}, debounceDelay);
		}
	};

	const handleInputKeyDown = (event) => {
		if (debounceDelay && event.key !== "Backspace") {
			clearTimeout(timeoutId);
		}
	};

	return (
		<InputText label={ label } style={ style } type="search" value={ searchValue } onKeyDown={ handleInputKeyDown } onChange={ handleChangeInputValue } { ...htmlInputProps } />
	);
};

export default InputSearch;

InputSearch.propTypes = {
	label: string,
	style: object,
	onSearch: func,
	debounceDelay: number,
};

InputSearch.defaultProps = {
	label: '',
	style: {},
	onSearch: () => {},
	debounceDelay: 300,
};
