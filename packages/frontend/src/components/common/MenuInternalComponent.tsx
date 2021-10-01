import React from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Menu,
} from 'semantic-ui-react';

export const MenuInternalComponent: React.FC = props => {

	const menuList = [
		{ name: 'Probi', page: 'probi' },
		{ name: 'D6', page: 'd6' },
		{ name: '허니린', page: 'honeyirene' },
	];

	return (
		<Container>
			<Menu.Item
				header
				name={'name'}
			>
				{`님룸황`}
			</Menu.Item>
			{menuList.map(menu => {
				return (
					<Menu.Item
						key={menu.page}
						name={menu.name}
						active={true}
						as={Link}
						to={`/main/${menu.page}`}
					>
						{menu.name.replace(/_/g, ' ')}
					</Menu.Item>
				);
			})}
		</Container>
	);
};
