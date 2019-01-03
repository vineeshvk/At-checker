import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SubjectReducer from './SubjectReducer';
import SubjectListReducer from './SubjectListReducer';

export default combineReducers({
	auth: AuthReducer,
	subject: SubjectReducer,
	subjectList: SubjectListReducer
});
