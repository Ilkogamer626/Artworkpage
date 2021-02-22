import React from 'react';
import { Artwork } from './Models';

export const SingleImageDisplay: React.FC<Artwork> = ({
	artUrl,
	artStyle,
	artDate,
	artName,
}) => {
	console.log('single image running');
	return (
		<div>
			<img src={artUrl} />
			<p>{artName}</p>
			<p>{artStyle}</p>
			<p>{artDate}</p>
		</div>
	);
};
