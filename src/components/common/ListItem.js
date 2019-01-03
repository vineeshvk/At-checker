import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { loadingSwitch } from '../../actions';

class ListItem extends Component {
	componentWillMount() {
		this.props.loadingSwitch(false);
	}
	render() {
		const { data } = this.props;
		const { titleStyle, row } = styles;
		return (
			<TouchableWithoutFeedback
				style={{ flex: 1 }}
				onPress={() => {
					Actions.mainSubject({ subject: data, title: data.subject_name });
				}}
			>
				<View style={{ flex: 1 }}>
					<View style={row}>
						<Text style={titleStyle}>{data.subject_name}</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	titleStyle: {
		fontSize: 18,
		marginLeft: 30,
		color: '#000'
	},
	row: {
		flex: 1,
		backgroundColor: '#fff',
		borderColor: '#eee',
		width: '94%',
		height: 55,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 0.5,
		justifyContent: 'center',
		borderRadius: 2,
		borderBottomWidth: 0.5
	}
});

export default connect(
	null,
	{ loadingSwitch }
)(ListItem);
