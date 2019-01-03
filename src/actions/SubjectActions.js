import firebase from 'react-native-firebase';

import { Actions } from 'react-native-router-flux';
import { SUBJECT_DETAIL_CHANGE, SUBJECT_FETCH_SUCCESS, RESET, LOADING, MODAL } from './types';

export const subjectDetailChange = value => ({
	type: SUBJECT_DETAIL_CHANGE,
	payload: value
});

export const subjectCreate = ({ subject_name, total_hours }) => {
	const { currentUser } = firebase.auth();
	return dispatch => {
		dispatch({ type: LOADING, payload: true });
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/subjects`)
			.push({ subject_name, total_hours, absent_hours: 0 })
			.then(() => {
				Actions.subjectList({ type: 'reset' });
				dispatch({ type: RESET });
			});
	};
};

export const subjectFetch = () => {
	const { currentUser } = firebase.auth();
	return dispatch => {
		dispatch({ type: LOADING, payload: true });
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/subjects`)
			.on('value', snapshot => {
				dispatch({ type: SUBJECT_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const subjectPrimaryUpdate = ({ subject_name, total_hours, uid }) => {
	const { currentUser } = firebase.auth();
	return () => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/subjects/${uid}`)
			.update({ subject_name, total_hours })
			.then(() => {
				Actions.subjectList({ type: 'reset' });
			});
	};
};

export const subjectAbsentUpdate = ({ absent_hours, uid }) => {
	const { currentUser } = firebase.auth();
	return () => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/subjects/${uid}`)
			.update({ absent_hours })
			.then(() => {
				Actions.subjectList({ type: 'reset' });
			});
	};
};

export const subjectDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();
	return () => {
		firebase
			.database()
			.ref(`/users/${currentUser.uid}/subjects/${uid}`)
			.remove()
			.then(() =>
				Actions.subjectList({
					type: 'reset'
				})
			);
	};
};

export const reset = () => ({
	type: RESET
});

export const displayModal = value => ({
	type: MODAL,
	payload: value
});
