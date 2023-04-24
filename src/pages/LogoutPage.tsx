import { Container } from '../components/Container';
import { useAuth } from '../hooks/UseAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
