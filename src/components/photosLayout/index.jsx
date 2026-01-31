import OptimizedPhoto from '../optimizedPhoto';
import './index.scss';

const PhotosLayout = ({ photos }) => {
	return (
		<ul className='photos-layout-container'>
			{photos.map((p) => (
				<OptimizedPhoto key={p.id} image={p} />
			))}
		</ul>
	);
};

export default PhotosLayout;
