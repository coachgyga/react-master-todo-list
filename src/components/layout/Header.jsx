import { string } from 'prop-types';
import { wait } from '../../utils';

const Header = ({ title }) => {

	wait(2000);

	return (
		<header>
			<h1 className="text--primary">{title}</h1>
		</header>
	);
};
Header.displayName = 'Header';

export default Header;

Header.propTypes = {
	title: string
};

Header.defaultProps = {
	title: 'Todo List',
};