import './Block.css';

import { node } from 'prop-types';

const Block = ({ children }) => {

	return (
		<div className='block'>
			{ children }
		</div>
	);
};

export default Block;

Block.propTypes = {
	children: node,
};

Block.defaultProps = {
	children: null,
}