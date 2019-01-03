import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import { View, Text, TouchableNativeFeedback, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { subjectDetailChange, subjectAbsentUpdate, reset } from '../../actions/SubjectActions';
import { Button } from '../common';

class SubjectMain extends Component {
	componentWillMount() {
		_.each(this.props.subject, (value, prop) => {
			this.props.subjectDetailChange({ prop, value });
		});
		console.log('will mount');
	}
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			Actions.subjectList({ type: 'reset' });
			return true;
		});
	}
	componentWillUpdate() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			Actions.subjectList({ type: 'reset' });
			return true;
		});
	}
	componentWillUnmount() {
		this.props.reset();
		BackHandler.removeEventListener('hardwareBackPress', () => {
			Actions.subjectList({ type: 'reset' });
			return true;
		});
	}
	addButton() {
		if (this.props.absent_hours < this.props.total_hours) {
			return this.props.subjectDetailChange({
				prop: 'absent_hours',
				value: this.props.absent_hours + 1
			});
		}
	}

	subButton() {
		if (this.props.absent_hours !== 0) {
			return this.props.subjectDetailChange({
				prop: 'absent_hours',
				value: this.props.absent_hours - 1
			});
		}
	}

	numberOfAbsentComponent() {
		return (
			<View style={{ flexDirection: 'row' }}>
				{this.extraButton('-', this.subButton.bind(this))}
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#f2f2f2',
						width: 70,
						borderWidth: 0.5,
						borderColor: '#ddd'
					}}
				>
					<Text
						style={{
							fontSize: 20,
							alignItems: 'center',
							justifyContent: 'center',
							color: '#5f5f5f'
						}}
					>
						{this.props.absent_hours}
					</Text>
				</View>
				{this.extraButton('+', this.addButton.bind(this))}
			</View>
		);
	}

	extraButton(symbol, onPress) {
		return (
			<TouchableNativeFeedback onPress={onPress}>
				<View
					style={{
						height: 50,
						width: 60,
						backgroundColor: '#fff',
						elevation: 2,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ color: '#888', fontSize: 25, fontWeight: 'bold' }}>{symbol}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}

	render() {
		const { absent_hours, total_hours } = this.props;
		let percent = 0;
		if (Number(total_hours))
			percent = Number((((total_hours - absent_hours) / total_hours) * 100).toFixed(1));
		let percentInt = 100;
		if (percent) {
			percentInt = Math.floor(percent);
		}
		return (
			<View style={{ flex: 1 }}>
				<ActionButton
					renderIcon={() => <Icon name="pencil" color="#fff" size={23} />}
					buttonColor="#f2c94c"
					onPress={() => Actions.editSubject({ uid: this.props.subject.uid })}
					fixNativeFeedbackRadius
					position="right"
					positioningMode="absolute"
					style={{ marginBottom: 450 }}
				/>
				<AnimatedCircularProgress
					style={{ flex: 1, alignSelf: 'center', marginTop: 30 }}
					size={185}
					width={10}
					fill={percentInt}
					tintColor="#fc4"
					onAnimationComplete={() => console.log('onAnimationComplete')}
					backgroundColor="#fff"
					lineCap="round"
				>
					{() => (
						<View>
							<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
								<Text style={{ fontSize: 60, color: '#000', fontWeight: 'bold', marginLeft: 5 }}>
									{percent}
								</Text>
								<View style={{ justifyContent: 'flex-end', paddingBottom: 15 }}>
									<Text style={{ color: '#000' }}>%</Text>
								</View>
							</View>
						</View>
					)}
				</AnimatedCircularProgress>
				<View
					style={{
						flex: 2,
						backgroundColor: '#fff',
						elevation: 4,
						marginLeft: 30,
						marginRight: 30,
						marginBottom: 30,
						borderRadius: 3,
						marginTop: 65
					}}
				>
					<View style={{ alignItems: 'center', paddingTop: 15 }}>
						<Text style={{ fontSize: 18, color: '#515151' }}>NO OF DAYS YOU WERE ABSENT</Text>
					</View>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						{this.numberOfAbsentComponent()}
					</View>
					<View style={{ paddingBottom: 30 }}>
						<Button
							title="SAVE"
							onPress={() =>
								this.props.subjectAbsentUpdate({
									absent_hours: this.props.absent_hours,
									uid: this.props.subject.uid
								})
							}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
	const { absent_hours, total_hours, subject_name } = state.subject;
	return { absent_hours, total_hours, subject_name };
};

export default connect(
	mapStateToProps,
	{ subjectDetailChange, subjectAbsentUpdate, reset }
)(SubjectMain);
