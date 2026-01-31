import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PhotosLayout, Spinner } from '../../../components';
import { getPhotosList } from '../../../api';
import './index.scss';

const PER_PAGE = 15;

const Photos = () => {
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchPhotos = async () => {
		if (isLoading) return;

		setIsLoading(true);

		try {
			const result = await getPhotosList(page, PER_PAGE);

			setPhotos((prev) => [...prev, ...result.results]);
			setPage((prev) => prev + 1);

			if (total === null) {
				setTotal(result.total);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const hasMore = total === null || photos.length < total;

	return (
		<div className='home-photos-container'>
			<InfiniteScroll
				dataLength={photos.length}
				next={fetchPhotos}
				hasMore={hasMore}
				loader={
					<div className='loading-spinner'>
						<Spinner />
					</div>
				}
			>
				<PhotosLayout photos={photos} />
			</InfiniteScroll>

			{!hasMore && photos.length > 0 && (
				<p className='end-message'>You're caught all up 🙌</p>
			)}
		</div>
	);
};

export default Photos;
