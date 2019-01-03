import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { subjectDetailChange, subjectCreate } from '../../actions';

import InputBox from '../common/Input/components/InputBox';

class SubjectForm extends Component {
	render() {
		const { mainContainer, inputContainer, textStyle, inputView, titleText } = styles;

		return (
			<View style={mainContainer}>
				<Text style={titleText}>Subject details : </Text>
				<View style={{ padding: 45 }}>
					<View style={inputContainer}>
						<Text style={textStyle}>name</Text>
						<View style={inputView}>
							<InputBox
								value={this.props.subject_name}
								rtype="next"
								blurOnSubmit={false}
								onSubmitEditing={() => {
									this.hours.focus();
								}}
								onChangeText={value => {
									this.props.subjectDetailChange({ prop: 'subject_name', value });
								}}
							/>
						</View>
					</View>

					<View style={inputContainer}>
						<View>
							<Text style={textStyle}>total</Text>
							<Text style={{ fontSize: 15.5 }}>hours</Text>
						</View>
						<View style={inputView}>
							<InputBox
								value={this.props.total_hours}
								ktype="numeric"
								rtype="next"
								blurOnSubmit={false}
								onSubmitEditing={() => this.hours.blur()}
								refs={input => {
									this.hours = input;
								}}
								onChangeText={value => {
									if (Number(value) || value === '') {
										this.props.subjectDetailChange({ prop: 'total_hours', value });
									}
								}}
							/>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputView: { flex: 1, paddingLeft: 20 },
	inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 55 },
	textStyle: { fontSize: 16 },
	titleText: { fontSize: 17, paddingLeft: 20, color: '#858585' },
	mainContainer: { paddingTop: 30, flex: 1 }
});
const mapStateToProps = state => {
	const { subject_name, total_hours } = state.subject;
	return { subject_name, total_hours };
};
export default connect(
	mapStateToProps,
	{ subjectDetailChange, subjectCreate }
)(SubjectForm);
