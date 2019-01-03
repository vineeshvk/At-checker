import { SUBJECT_DETAIL_CHANGE, RESET, MODAL } from '../actions/types';

const INITIAL_STATE = {
	subject_name: '',
	total_hours: null,
	absent_hours: 0,
	display_modal: false
};

export default (state = INITIAL_STATE, actions) => {
	switch (actions.type) {
		case SUBJECT_DETAIL_CHANGE:
			console.log(actions.payload);

			return { ...state, [actions.payload.prop]: actions.payload.value };
		case RESET:
			return { ...INITIAL_STATE };
		case MODAL:
			return { ...state, display_modal: actions.payload };
		default:
			return { ...state };
	}
};
