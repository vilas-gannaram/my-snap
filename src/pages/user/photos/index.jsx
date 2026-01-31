import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useOutletContext } from 'react-router-dom';

import { getUserPhotos } from '../../../api';
import { PhotosLayout, Spinner } from '../../../components';

const PER_PAGE = 15;

const UserPhotos = () => {
	const { user } = useOutletContext();

	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchPhotos = async () => {
		if (isLoading) return;

		setIsLoading(true);

		try {
			const result = await getUserPhotos(user.username, page, PER_PAGE);

			setPhotos((prev) => [...prev, ...result.results]);
			setPage((prev) => prev + 1);

			if (total === null) {
				setTotal(result.total);
			}
		} finally {
			setIsLoading(false);
		}
	};

	// initial fetch when user becomes available
	useEffect(() => {
		if (!user?.username) return;

		setPhotos([]);
		setPage(1);
		setTotal(null);

		fetchPhotos();
	}, [user?.username]);

	const hasMore = total === null || photos.length < total;

	return (
		<div>
			<InfiniteScroll
				style={{ overflow: 'visible' }}
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

			<div className='user-footer'>
				{!isLoading && total === 0 && <p>No Photos Found 😑</p>}
				{!hasMore && photos.length > 0 && <p>You’re all caught up 🤞</p>}
			</div>
		</div>
	);
};

export default UserPhotos;
