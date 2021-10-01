import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { MenuInternalComponent } from './MenuInternalComponent';

export const MainComponent: React.FC = props => {
	return (
		<>
			<Container
				id={'app-menu'}
				className={'test'}
				as={'div'}
			>
				<Menu
					fixed={'top'}
					pointing
					secondary
					widths={10}
					size={'large'}
				>
					<MenuInternalComponent />
				</Menu>
			</Container>
			{props.children}
		</>
	);
}
