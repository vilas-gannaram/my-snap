import { useState, useEffect } from 'react';
import { NavLink, useParams, Outlet } from 'react-router-dom';

import { getUser } from '../../api';
import { Spinner } from '../../components';

import check from '../../assets/images/check.png';
import locationPoint from '../../assets/images/location.png';
import portfolio from '../../assets/images/portfolio.png';
import instagram from '../../assets/images/instagram.png';
import twitter from '../../assets/images/twitter.png';
import image from '../../assets/images/image.png';
import imageFill from '../../assets/images/image-fill.png';
import heart from '../../assets/images/heart.png';
import heartFill from '../../assets/images/heart-fill.png';

import './index.scss';

const User = () => {
	const { username } = useParams();

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const fetchUser = async () => {
			setIsLoading(true);
			try {
				const result = await getUser(username);
				if (isMounted) setUser(result);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};

		fetchUser();

		return () => {
			isMounted = false;
		};
	}, [username]);

	if (isLoading || !user) {
		return (
			<div className='user-loading'>
				<Spinner />
			</div>
		);
	}

	const {
		first_name,
		last_name,
		bio,
		location,
		for_hire,
		profile_image,
		social,
		total_photos,
		total_likes,
	} = user;

	return (
		<section className='user-container'>
			<div className='user-details'>
				<div className='image-wrapper'>
					<img src={profile_image.large} alt={first_name} />
				</div>

				<div className='text-wrapper'>
					<h2 className='user-name'>
						{first_name} {last_name}
					</h2>
					{bio && <p className='user-bio'>{bio}</p>}

					<div className='user-links-wrapper'>
						{for_hire && (
							<div className='user-link'>
								<img src={check} alt='' />
								<p>Available for hire</p>
							</div>
						)}

						{location && (
							<div className='user-link location'>
								<img src={locationPoint} alt='' />
								<p>{location}</p>
							</div>
						)}

						<div className='social-links'>
							{social?.portfolio_url && (
								<a
									href={social.portfolio_url}
									target='_blank'
									rel='noopener noreferrer'
									className='social-link'
								>
									<img src={portfolio} alt='' />
									<p>{social.portfolio_url}</p>
								</a>
							)}

							{social?.instagram_username && (
								<a
									href={`https://www.instagram.com/${social.instagram_username}`}
									target='_blank'
									rel='noopener noreferrer'
									className='social-link'
								>
									<img src={instagram} alt='' />
									<p>{social.instagram_username}</p>
								</a>
							)}

							{social?.twitter_username && (
								<a
									href={`https://twitter.com/${social.twitter_username}`}
									target='_blank'
									rel='noopener noreferrer'
									className='social-link'
								>
									<img src={twitter} alt='' />
									<p>{social.twitter_username}</p>
								</a>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='user-tabs'>
				<NavLink end to='' className='user-tab'>
					{({ isActive }) => (
						<>
							<img src={isActive ? imageFill : image} alt='' />
							<p>
								Photos <span className='count'>{total_photos}</span>
							</p>
						</>
					)}
				</NavLink>

				<NavLink to='likes' className='user-tab'>
					{({ isActive }) => (
						<>
							<img src={isActive ? heartFill : heart} alt='' />
							<p>
								Likes <span className='count'>{total_likes}</span>
							</p>
						</>
					)}
				</NavLink>
			</div>

			<div className='user-tab-output'>
				<Outlet context={{ user }} />
			</div>
		</section>
	);
};

export default User;
