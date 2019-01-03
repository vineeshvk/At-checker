import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';

import RouterComponent from './RouterComponent';

export default class App extends Component {
	render() {
		return (
			<Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
				<View style={{ flex: 1 }}>
					<StatusBar backgroundColor="white" barStyle="dark-content" />
					<RouterComponent />
				</View>
			</Provider>
		);
	}
}
