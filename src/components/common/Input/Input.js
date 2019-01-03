import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import InputBox from './components/InputBox';

const Input = ({
	placeHolder,
	label,
	onChangeText,
	secureTextEntry = false,
	value,
	autoFocus = false,
	rtype = 'default',
	ktype = 'default',
	blurOnSubmit,
	onSubmitEditing,
	refs,
	autoCapitalize,
	onFocus
}) => {
	const { formView, formText, inputText, inputView } = styles;
	return (
		<View style={formView}>
			<Text style={formText}>{label}</Text>
			<View style={inputView}>
				<InputBox
					style={inputText}
					value={value}
					placeholder={placeHolder}
					onChangeText={onChangeText}
					secureTextEntry={secureTextEntry}
					autoFocus={autoFocus}
					keyboardType={ktype}
					returnKeyType={rtype}
					autoCorrect={false}
					blurOnSubmit={blurOnSubmit}
					onSubmitEditing={onSubmitEditing}
					refs={refs}
					autoCapitalize={autoCapitalize}
					onFocus={onFocus}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	formView: {
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 20
	},
	formText: {
		fontSize: 18,
		color: '#9E9E9E',
		marginBottom: 12
	},
	inputView: {
		paddingLeft: 7,
		paddingRight: 7,
		backgroundColor: '#f1f1f1',
		borderRadius: 3
	},
	inputText: {
		color: '#818181',
		fontSize: 18
	}
});

export default Input;
