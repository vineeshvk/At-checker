import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';

import {
	SignInForm,
	SignUpForm,
	SubjectList,
	AddSubject,
	SubjectMain,
	EditSubject
} from './components/layouts';
import { displayModal } from './actions';

const iconText = ({ selected, title }) => (
	<View style={{ flex: 1, justifyContent: 'center' }}>
		<Text style={{ fontSize: 16, color: selected ? '#fc3' : '#bbb' }}>{title}</Text>
	</View>
);

class RouterComponent extends Component {
	render() {
		return (
			<Router navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle}>
				<Scene key="Splash" component={Splash} type="reset" panHandlers={null} hideNavBar initial />
				<Scene key="tabKey" sceneStyle={{ paddingBottom: 50 }} panHandlers={null}>
					<Scene
						initial
						hideNavBar
						key="myTabBar"
						panHandlers={null}
						tabs
						hideNavBar
						tabBarStyle={{
							top: 54,
							height: 70
						}}
					>
						<Scene
							key="signin"
							panHandlers={null}
							title="SIGN IN"
							icon={iconText}
							tabBarStyle={{ backgroundColor: '#000' }}
						>
							<Scene
								key="sign_in"
								panHandlers={null}
								component={SignInForm}
								title="ACCOUNT"
								sceneStyle={styles.margin100}
							/>
						</Scene>
						<Scene
							key="signup"
							title="SIGN UP"
							icon={iconText}
							tabBarStyle={{ backgroundColor: '#000' }}
							panHandlers={null}
						>
							<Scene
								key="sign_up"
								component={SignUpForm}
								title="ACCOUNT"
								sceneStyle={styles.margin100}
								panHandlers={null}
							/>
						</Scene>
					</Scene>
				</Scene>

				<Scene key="main" type="replace">
					<Scene
						renderLeftButton={() => (
							<TouchableOpacity onPress={() => this.props.displayModal(true)}>
								<Icon name="md-close" size={26} color="#f00" style={{ marginLeft: 15 }} />
							</TouchableOpacity>
						)}
						initial
						key="subjectList"
						panHandlers={null}
						component={SubjectList}
						title="SUBJECT"
						type="replace"
						rightTitle="ADD"
						rightButtonTextStyle={styles.elRightButtonText}
						onRight={() => {
							Actions.addSubject();
						}}
						sceneStyle={styles.margin80}
						icon="close"
					/>
					<Scene
						key="addSubject"
						panHandlers={null}
						component={AddSubject}
						title="ADD SUBJECT"
						leftButtonIconStyle={styles.ecLeftIcon}
						leftButtonStyle={styles.ecLeftButton}
						sceneStyle={styles.margin80}
					/>
					<Scene
						key="editSubject"
						panHandlers={null}
						component={EditSubject}
						title="EDIT SUBJECT"
						leftButtonIconStyle={styles.ecLeftIcon}
						leftButtonStyle={styles.ecLeftButton}
						sceneStyle={styles.margin80}
					/>
					<Scene
						onBack={() => Actions.subjectList({ type: 'reset' })}
						key="mainSubject"
						panHandlers={null}
						component={SubjectMain}
						leftButtonIconStyle={styles.ecLeftIcon}
						leftButtonStyle={styles.ecLeftButton}
						sceneStyle={styles.margin80}
					/>
				</Scene>
			</Router>
		);
	}
}
const styles = StyleSheet.create({
	navigationBarStyle: {
		backgroundColor: '#fff',
		elevation: 3,
		borderBottomColor: '#fff',
		height: 60
	},
	titleStyle: {
		paddingTop: 3,
		fontWeight: '500',
		fontSize: 19
	},
	elRightButtonText: {
		paddingRight: 10,
		color: '#F2C94C',
		fontWeight: 'bold'
	},
	ecLeftButton: {
		paddingLeft: 20
	},
	ecLeftIcon: {
		tintColor: '#f2c94c'
	},
	margin80: {
		marginTop: 80
	},
	margin100: {
		marginTop: 100
	}
});

class Splash extends Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				Actions.main({ type: 'reset' });
			} else {
				Actions.tabKey({ type: 'reset' });
			}
		});
	}
	componentWillUnmount() {
		//	Splash;
		SplashScreen.hide();
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}
export default connect(
	null,
	{ displayModal }
)(RouterComponent);
