import React from 'react';
import { Artwork } from './Models';
import styles from './csss/SingleImageDisplay.module.css';

export const SingleImageDisplay: React.FC<Artwork> = ({
	artStyle,
	artDate,
	artName,
	artUrl,
	artDescription,
}) => {
	const [showBigImage, setShowBigImage] = React.useState(false);
	const monthText = (monthNumber: number) => {
		switch (monthNumber) {
			case 0:
				return 'January';
			case 1:
				return 'February';
			case 2:
				return 'March';
			case 3:
				return 'April';
			case 4:
				return 'May';
			case 5:
				return 'June';
			case 6:
				return 'July';
			case 7:
				return 'August';
			case 8:
				return 'September';
			case 9:
				return 'October';
			case 10:
				return 'November';
			case 11:
				return 'December';
		}
	};

	return (
		<div>
			{!showBigImage ? ( //not(!) preto ze sa mi to nechcelo prehadzovat
				<div className={styles.container}>
					<img className={styles.art} src={artUrl} />
					<div
						className={styles.centeringDiv}
						onClick={() => setShowBigImage(!showBigImage)}>
						<p className={styles.smallArtName}>{artName}</p>
					</div>
				</div>
			) : (
				<div>
					<div className={styles.bigContainer}>
						<img
							className={styles.bigArt}
							src={artUrl}
							onClick={() => setShowBigImage(!showBigImage)}
						/>
						<div className={styles.additionalInfo}>
							<p className={styles.artTitle}>{artName}</p>
							<p className={styles.artStyle}>{artStyle}</p>
							<p className={styles.artDate}>
								{monthText(artDate.toDate().getMonth())}{' '}
								{artDate.toDate().getFullYear().toString()}
							</p>
							<p className={styles.artDescription}>{artDescription}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
