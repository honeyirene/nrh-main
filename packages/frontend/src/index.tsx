import React from 'react'
import ReactDOM from 'react-dom'
import {
	HashRouter,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import App from './App';

import './index.scss';

function main() {
	const defaultPath = `/main`;
	ReactDOM.render(
		<HashRouter>
			<Switch>
				<Route
					path={`/main`}
					render={props => <App {...props.match.params} />}
				/>
				<Route
					render={() => <Redirect to={defaultPath} />}
				/>
			</Switch>
		</HashRouter>,
		document.getElementById('root'));
}
main();
