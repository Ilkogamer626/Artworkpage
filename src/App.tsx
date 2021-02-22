import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Homepage } from './Homepage';
import { Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';
import { Login } from './Login';
import { Upload } from './Upload';
import { StyleDisplay } from './StyleDisplay';

const firebaseConfig = {
	apiKey: 'AIzaSyATo1D562Qabi_umeG25f-SIaLgsyF0aD8',
	authDomain: 'artworkpage-b1220.firebaseapp.com',
	projectId: 'artworkpage-b1220',
	storageBucket: 'artworkpage-b1220.appspot.com',
	messagingSenderId: '1068862217002',
	appId: '1:1068862217002:web:5f6d17e2f0e49949939c53',
	measurementId: 'G-RR5Y7V79ML',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const provider = new firebase.auth.GoogleAuthProvider();

export const db: firebase.firestore.Firestore = firebase.firestore();
export const auth: firebase.auth.Auth = firebase.auth();
export const storage: firebase.storage.Storage = firebase.storage();

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/' component={Homepage} exact />
				<Route path='/art1' render={() => <StyleDisplay artStyle='art1' />} />
				<Route path='/art2' render={() => <StyleDisplay artStyle='art2' />} />
				<Route path='/art3' render={() => <StyleDisplay artStyle='art3' />} />
				<Route path='/login' component={Login} />
				<Route path='/upload' component={Upload} />
			</Switch>
		</div>
	);
}

export default App;
