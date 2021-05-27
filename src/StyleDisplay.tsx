import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './App';
import { ArtworkCollection } from './collections';
import { Artwork } from './Models';
import { SingleImageDisplay } from './SingleImageDisplay';
import { Navbar } from './Navbar';
import styles from './csss/StyleDisplay.module.css';

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
	useEffect(fetchImages, [artStyle]);
	return (
		<div>
			<Navbar>
				<Link className={styles.link} to='/art1'>
					<p className={styles.linkp}>Kubizmus</p>
				</Link>
				<Link className={styles.link} to='/art2'>
					<p className={styles.linkp}>Realizmus</p>
				</Link>
				<Link className={styles.link} to='/art3'>
					<p className={styles.linkp}>art3</p>
				</Link>
			</Navbar>
			<div>
				<ul>
					{pictures.map((image) => {
						return (
							<li key={image.artUrl} className={styles.listElement}>
								<SingleImageDisplay
									artDate={image.artDate}
									artUrl={image.artUrl}
									artName={image.artName}
									artStyle={image.artStyle}
									artDescription={image.artDescription}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
