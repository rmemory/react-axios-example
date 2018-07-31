/* eslint-disable implicit-arrow-linebreak */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import './index.css';

// The non-hot-loader way
// ReactDOM.render(<App />, document.getElementById('app'));

// The hot loader way
const render = Component =>
	ReactDOM.render( // eslint-disable-line react/no-render-return-value
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app'));

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/App.jsx', () => render(App));
}
