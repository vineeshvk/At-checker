import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, BackHandler } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { MaterialDialog } from 'react-native-material-dialog';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { subjectFetch, loadingSwitch, reset, displayModal } from '../../actions';
import { ListItem } from '../common';

class SubjectList extends Component {
	componentWillMount() {
		this.props.loadingSwitch(true);
		this.props.subjectFetch();
		BackHandler.addEventListener('hardwareBackPress', () => {
			BackHandler.exitApp();
			return true;
		});
	}
	componentWillUpdate() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			BackHandler.exitApp();
			return true;
		});
	}

	activityIndicator() {
		if (this.props.loading) {
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator size="large" animating={this.props.loading} />
				</View>
			);
		}
		return <View />;
	}

	render() {
		const { listCard } = styles;
		return (
			<View style={{ flex: 1 }}>
				<View style={listCard}>
					{this.activityIndicator()}
					<FlatList
						data={this.props.list}
						renderItem={({ item }) => <ListItem data={item} />}
						keyExtractor={item => item.uid}
					/>
				</View>
				<MaterialDialog
					title="Log Out"
					colorAccent="#fc4"
					visible={this.props.display_modal}
					onCancel={() => this.props.displayModal(false)}
					onOk={() => {
						Actions.tabKey({ type: 'reset' });
						firebase.auth().signOut();
						this.props.displayModal(false);
					}}
				>
					<Text style={{ fontSize: 18 }}>Do you really want to Logout?</Text>
				</MaterialDialog>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	listCard: {
		flex: 1,
		backgroundColor: '#fff',
		elevation: 1.5,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 0.5,
		marginBottom: 10,
		borderRadius: 3
	}
});
const mapStateToProps = state => {
	const list = _.map(state.subjectList, (val, uid) => ({ ...val, uid }));
	const { loading } = state.auth;
	const { display_modal } = state.subject;
	console.log(display_modal);

	return { list, loading, display_modal };
};
export default connect(
	mapStateToProps,
	{ subjectFetch, loadingSwitch, reset, displayModal }
)(SubjectList);
