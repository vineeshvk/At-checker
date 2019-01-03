import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import {
	AUTH_DETAIL_CHANGE,
	AUTH_ERROR,
	AUTH_SUCCESSFULL,
	FIELD_EMPTY,
	LOGGED_IN,
	LOADING
} from './types';

export const authDetailChange = value => ({
	type: AUTH_DETAIL_CHANGE,
	payload: value
});

export const loggedIn = value => ({
	type: LOGGED_IN,
	payload: value
});

export const signInAction = ({ email, password }) => dispatch => {
	dispatch({ type: LOADING, payload: true });
	firebase
		.auth()
		.signInAndRetrieveDataWithEmailAndPassword(email, password)
		.then(() => {
			// AsyncStorage.setItem('userData', JSON.stringify(userData));
			dispatch({ type: AUTH_SUCCESSFULL });
			Actions.main();
		})
		.catch(() => authErrorLocal(dispatch));
};

export const signUpAction = ({ email, password }) => dispatch => {
	dispatch({ type: LOADING, payload: true });
	firebase
		.auth()
		.createUserAndRetrieveDataWithEmailAndPassword(email, password)
		.then(() => {
			dispatch({ type: AUTH_SUCCESSFULL });
			Actions.main();
		})
		.catch(() => authErrorLocal(dispatch));
};

const authErrorLocal = dispatch => {
	dispatch({
		type: AUTH_ERROR
	});
};

export const fieldEmpty = () => ({
	type: FIELD_EMPTY
});

export const loadingSwitch = value => ({
	type: LOADING,
	payload: value
});
