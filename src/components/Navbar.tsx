import { useAuth } from '../hooks/UseAuth';
import { Container } from './Container';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type TRoute = {
	path: string;
	name: string;
};

const NavOptions: { [key: number]: Array<TRoute> } = {
	// Admin
	1: [
		{ path: '/admin/register-staff', name: 'Register staff' },
		{ path: '/view-residents', name: 'View residents' },
		{ path: '/logout', name: 'Logout' },
	],
	// Staff
	2: [
		{ path: '/staff/register-resident', name: 'Register residents' },
		{ path: '/view-residents', name: 'View residents' },
		{ path: '/logout', name: 'Logout' },
	],
	// No access
	3: [{ path: '/login', name: 'Login' }],
};

export const Navbar = () => {
	const { isAuthenticated, getRole, user } = useAuth();
	const [options, setOptions] = useState(NavOptions[3]);

	useEffect(() => {
		const options = NavOptions[getRole() || 3];
		setOptions(options);
	}, [user, isAuthenticated]);

	return (
		<nav>
			<Container>
				<ul className="flex items-center justify-end p-4 gap-4 border-b-2">
					{options.map((option) => (
						<li
							key={option.path}
							className="bg-indigo-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-indigo-600 transition-colors"
						>
							<Link to={option.path}>{option.name}</Link>
						</li>
					))}
				</ul>
			</Container>
		</nav>
	);
};
