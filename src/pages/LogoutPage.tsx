import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import { useEffect } from 'react';
import { Container } from '../components/Container';

export const LogoutPage = () => {
	const { logoout, user } = useAuth();
	const Navigate = useNavigate();

	useEffect(() => {
		console.log('Loging out');
		logoout();
	}, []);

	useEffect(() => {
		Navigate('/login');
	}, [user]);

	return (
		<Container>
			<p className='text-center text-gray-500 my-4'>Log out...</p>
		</Container>
	);
};
