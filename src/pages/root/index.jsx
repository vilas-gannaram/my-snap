import { useState } from 'react';

import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './index.scss';

const Root = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [input, setInput] = useState('');

	return (
		<div className='header-wrapper'>
			<header className='header-container'>
				<nav className='primary-navigation-container'>
					<Link to='/' className='logo-container'>
						<img className='logo' src='/logo/1.png' alt='logo' />
					</Link>

					<form
						onSubmit={(e) => {
							e.preventDefault();

							if (!input) return;
							navigate(`search/photos/${input}`);
							setInput('');
						}}
						className='primary-navigation-form'
					>
						<input
							type='text'
							name='search'
							onChange={(e) => {
								setInput(e.target.value);
							}}
							value={input}
							placeholder='Search for high resolution photos...	'
						/>
						<button type='submit' className='material-symbols-outlined'>
							search
						</button>
					</form>
				</nav>
			</header>

			<main className='main-container'>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
