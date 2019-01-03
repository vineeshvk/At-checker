import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { subjectDetailChange, subjectCreate, reset } from '../../actions';

import { Button, ButtonSecondary, SubjectForm } from '../common';

class AddSubject extends Component {
	componentWillMount() {
		AndroidKeyboardAdjust.setAdjustNothing();
	}
	onSubmitPress() {
		if (this.props.subject_name && this.props.total_hours) {
			const { subject_name, total_hours } = this.props;
			this.props.subjectCreate({ subject_name, total_hours });
		}
	}
	render() {
		const { container, buttonWrap } = styles;
		return (
			<View style={container}>
				<SubjectForm />
				<View style={buttonWrap}>
					<Button
						title="CREATE"
						onPress={() => {
							this.onSubmitPress();
						}}
					/>
					<View style={{ marginTop: 35 }}>
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
	{ subjectDetailChange, subjectCreate, reset }
)(AddSubject);
