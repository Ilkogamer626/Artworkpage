import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './App';
import { ArtworkCollection } from './collections';
import styles from './csss/StyleDisplay.module.css';
import { Artwork } from './Models';

export const StyleDisplay: React.FC<{ artStyle: string }> = ({ artStyle }) => {
	const [pictures, setPicturesUrls] = React.useState<Artwork[]>([]);
	const fetchImages = () => {
		db.collection(ArtworkCollection)
			.where('artStyle', '==', artStyle)
			.get()
			.then((data) => {
				setPicturesUrls(
					data.docs.map((doc) => {
						return doc.data() as Artwork;
					})
				);
			});
	};
	useEffect(fetchImages, []);
	return (
		<div>
			<div>
				<ul>
					{pictures.map((image) => {
						return (
							<li key={image.artUrl}>
								<p>{image.artName}</p>
								<img className={styles.art} src={image.artUrl} />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
