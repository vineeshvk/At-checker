import {
	AUTH_DETAIL_CHANGE,
	AUTH_ERROR,
	AUTH_SUCCESSFULL,
	FIELD_EMPTY,
	LOADING
} from '../actions/types';

const INITIAL_STATE = {
	u_name: '',
	email: '',
	password: '',
	name: '',
	error: '',
	loading: true
};
export default (state = INITIAL_STATE, actions) => {
	switch (actions.type) {
		case AUTH_DETAIL_CHANGE:
			return { ...state, [actions.payload.prop]: actions.payload.value, error: '' };

		case AUTH_ERROR:
			return { ...state, password: '', error: 'Authentication Error', loading: false };
		case AUTH_SUCCESSFULL:
			return { ...INITIAL_STATE, loading: false };
		case FIELD_EMPTY:
			return { ...state, error: 'Field empty' };
		case LOADING:
			return { ...state, loading: actions.payload };
		default:
			return { ...state };
	}
};
