import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
	subjectDetailChange,
	subjectCreate,
	subjectPrimaryUpdate,
	subjectDelete,
	reset
} from '../../actions';

import { Button, ButtonSecondary, SubjectForm } from '../common';

class EditSubject extends Component {
	componentWillMount() {
		AndroidKeyboardAdjust.setAdjustNothing();
	}

	onSubmitPress() {
		const { subject_name, total_hours } = this.props;
		const { uid } = this.props;
		this.props.subjectPrimaryUpdate({ subject_name, total_hours, uid });
	}
	onDeletePress() {
		console.log(this.props);
	}

	render() {
		const { container, buttonWrap } = styles;
		return (
			<View style={container}>
				<SubjectForm />
				<View style={buttonWrap}>
					<Button
						title="  SAVE  "
						onPress={() => {
							this.onSubmitPress();
						}}
					/>
					<View style={{ marginTop: 35 }}>
						<ButtonSecondary
							title="DELETE"
							color="#f00"
							onPress={() => {
								this.props.subjectDelete({ uid: this.props.uid });
							}}
						/>
					</View>
					<View style={{ marginTop: 30 }}>
						<ButtonSecondary
							title="CANCEL"
							color="#f2c94c"
							onPress={() => Actions.subjectList({ type: 'reset' })}
						/>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: { flex: 1, flexDirection: 'column' },
	buttonWrap: { alignItems: 'flex-end', flex: 1, marginTop: 30, marginRight: 30 }
});

const mapStateToProps = state => {
	const { subject_name, total_hours } = state.subject;
	return { subject_name, total_hours };
};

export default connect(
	mapStateToProps,
	{ subjectDetailChange, subjectCreate, subjectPrimaryUpdate, subjectDelete, reset }
)(EditSubject);
