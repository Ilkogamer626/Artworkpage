import React from 'react';
import { db } from './App';
import { Link, Route } from 'react-router-dom';
import { ArtworkCollection } from './collections';
import { Artwork } from './Models';
import { Navbar } from './Navbar';
import { SingleImageDisplay } from './SingleImageDisplay';
import styles from './csss/Homepage.module.css';

export const Homepage: React.FC = () => {
	const [pictures, setPicturesUrls] = React.useState<Artwork[]>([]);
	const [showNavbar, setShowNavbar] = React.useState(false);
	const [showBigImage, setShowBigImage] = React.useState(false);
	const fetchImages = () => {
		db.collection(ArtworkCollection)
			.get()
			.then((data) => {
				setPicturesUrls(
					data.docs.map((doc) => {
						return doc.data() as Artwork;
					})
				);
			});
	};
	React.useEffect(fetchImages, []);
	return (
		<div>
			<div className={styles.logo}>
				<img src='/podpisken.png' alt='logo' />
			</div>
			<Navbar>
				<Link className={styles.link} to='/art1'>
					<p className={styles.linkp}>art1</p>
				</Link>
				<Link className={styles.link} to='/art2'>
					<p className={styles.linkp}>art2</p>
				</Link>
				<Link className={styles.link} to='/art3'>
					<p className={styles.linkp}>art3</p>
				</Link>
			</Navbar>
			<div>
				<ul>
					{pictures.map((image) => {
						return (
							<div key={image.artName}>
								<Route
									path={`/${image.artName}`}
									render={() => (
										<SingleImageDisplay
											artName={image.artName}
											artUrl={image.artUrl}
											artDate={image.artDate}
											artStyle={image.artStyle}
										/>
									)}
								/>
								<li key={image.artUrl}>
									{setShowBigImage ? (
										<div>
											<p className={styles.artName}>{image.artName}</p>
											<img
												className={styles.art}
												src={image.artUrl}
												onClick={() => setShowBigImage(!setShowBigImage)}
											/>
										</div>
									) : (
										<div></div>
									)}

									<p>{image.artDate}</p>
								</li>
							</div>
						);
					})}
				</ul>
			</div>
			<div className={styles.footer}> ©Toko 2021</div>
		</div>
	);
};
