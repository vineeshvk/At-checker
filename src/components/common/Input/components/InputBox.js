import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({
	placeHolder,
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
}) => (
	<View style={styles.inputView}>
		<TextInput
			style={styles.inputText}
			value={value}
			underlineColorAndroid="transparent"
			placeholder={placeHolder}
			placeholderTextColor="#ccc"
			onChangeText={onChangeText}
			secureTextEntry={secureTextEntry}
			autoFocus={autoFocus}
			keyboardType={ktype}
			returnKeyType={rtype}
			autoCorrect={false}
			blurOnSubmit={blurOnSubmit}
			onSubmitEditing={onSubmitEditing}
			ref={refs}
			autoCapitalize={autoCapitalize}
			onFocus={onFocus}
		/>
	</View>
);
const styles = StyleSheet.create({
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
