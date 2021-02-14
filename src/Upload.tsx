import firebase from 'firebase/app';
import React, { useEffect, useRef } from 'react';
import { db, storage } from './App';
import { ArtworkCollection } from './collections';
import { Login } from './Login';
import { ArtStyle, Artwork } from './Models';

export const Upload: React.FC = () => {
	const [artStyle, setArtStyle] = React.useState<ArtStyle>('art1');
	const [artName, setArtName] = React.useState('');
	const [User, setUser] = React.useState(false);

	const input = useRef<HTMLInputElement>(null);
	const handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(false);
			})
			.catch((error) => {
				// An error happened.
			});
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		const files = input.current?.files;
		if (!files) return;
		if (files.length <= 0) return;
		const sotrageRef = storage.ref();
		const fileRef = sotrageRef.child(files[0].name);
		await fileRef.put(files[0]);
		const fileUrl = await fileRef.getDownloadURL();
		const UploadData: Artwork = {
			artUrl: fileUrl,
			artStyle: artStyle,
			artName,
			artDate: firebase.firestore.Timestamp.now(),
		};
		db.collection(ArtworkCollection).doc().set(UploadData);
	};

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			setUser(true);
		}
	});

	if (User) {
		console.log(User);

		return (
			<div>
				<form onSubmit={onSubmit}>
					<input ref={input} type='file' />
					<input type='text' onChange={(e) => setArtName(e.target.value)} />
					<select
						value={artStyle}
						onChange={(e) => setArtStyle(e.target.value as ArtStyle)}>
						<option>art1</option>
						<option>art2</option>
					</select>
					<button>Submit</button>
				</form>
				<div>
					<button onClick={handleSignOut}>Sign Out</button>
				</div>
			</div>
		);
	} else {
		console.log('false');
		return (
			<div>
				<Login />
			</div>
		);
	}
};
