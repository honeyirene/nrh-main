import React from 'react';
import { Header, Container } from 'semantic-ui-react';

interface Props {
	name: string
}

export const ProbiComponent: React.FC<Props> = props => {
	return (
		<>
			<Header>probi 공간</Header>

			<Container>
				프로비틱 설호
			</Container>
		</>
	);
}
