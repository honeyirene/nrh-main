import React from 'react';
import { Header, Container } from 'semantic-ui-react';

interface Props {
	name: string
}

export const D6Component: React.FC<Props> = props => {
	return (
		<>
			<Header>D6 공간</Header>

			<Container>
				D6 설호
			</Container>
		</>
	);
}
