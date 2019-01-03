import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

const Button = ({ onPress, title }) => {
	const { buttonText, buttonView, innerButtonView } = styles;
	return (
		<View style={buttonView}>
			<TouchableNativeFeedback onPress={onPress}>
				<View style={innerButtonView}>
					<Text style={buttonText}>{title}</Text>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonView: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 40
	},
	innerButtonView: {
		backgroundColor: '#F2C94C',
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 5,
		elevation: 2.5
	},
	buttonText: {
		color: '#000',
		fontSize: 18
	}
});

export default Button;
