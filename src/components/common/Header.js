import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
	const { tabView, tabText } = styles;

	return (
		<View style={tabView}>
			<Text style={tabText}>{title}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	tabView: {
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		height: 70,
		elevation: 3
	},
	tabText: {
		fontSize: 23,
		color: '#000',
		fontWeight: '500'
	}
});
export default Header;
