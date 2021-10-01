import React from 'react';
import { Header, Container } from 'semantic-ui-react';

interface Props {
	name: string
}

export const HoneyireneComponent: React.FC<Props> = props => {
	return (
		<>
			<Header>공간</Header>

			<Container>
				설호
			</Container>
		</>
	);
}
