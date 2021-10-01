import React from 'react';
import {
	Route,
	Switch,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
import {
	D6Component,
	HoneyireneComponent,
	MainComponent,
	ProbiComponent,
	SampleComponent,
} from './components';

interface Props {
}

// 중간단계를 한번 만들어 놓으면 나중에 뭔가 context 끼워넣기 좋다.
const RootApp: React.FC<Props> = props => {
	return <App {...props} />;
};

const App: React.FC<Props> = props => {
	return (
		<MainComponent {...props}>
			{(() => {
				return (
					<Container
						id={'app-main'}
					>
						<Switch>
							<Route
								exact={true}
								path={`/main/d6`}
								render={_ => <D6Component name='D6' />}
							/>
							<Route
								exact={true}
								path={`/main/probi`}
								render={_ => <ProbiComponent name='probi' />}
							/>
							<Route
								exact={true}
								path={`/main/honeyirene`}
								render={_ => <HoneyireneComponent name='허니린' />}
							/>
							<Route
								exact={false}
								path={`/main`}
								render={_ => <SampleComponent name='샘플' />}
							/>
						</Switch>
					</Container>
				);
			})()}
		</MainComponent>
	);
};

export default RootApp;
