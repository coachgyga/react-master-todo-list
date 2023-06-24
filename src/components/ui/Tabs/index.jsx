import './Tabs.css';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { useState } from 'react';
import Button from '../Button';

const Tabs = ({ defaultActiveTabId, tabs, renderContent }) => {

	const [ activeTabId, setActiveTabId ] = useState(defaultActiveTabId);

	const handleChangeTab = (tabId) => () => {
		setActiveTabId(tabId);
	};

	return (
		<>
			<div className="tabs-buttons-container">
				{
					tabs.map(({ title, id }) => <Button key={ id } variant={ id === activeTabId ? 'primary' : 'light' } onClick={ handleChangeTab(id) }>{ title }</Button>)
				}
			</div>
			{
				renderContent({ activeTabId })
			}
		</>
	);

};

export default Tabs;

Tabs.propTypes = {
	defaultActiveTabId: number,
	tabs: arrayOf(shape({
		id: number.isRequired,
		title: string.isRequired
	})),
	renderContent: func.isRequired,
};

Tabs.defaultProps = {
	defaultActiveTabId: 0,
	tabs: [],
};