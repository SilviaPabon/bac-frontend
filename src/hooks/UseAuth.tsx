import { AuthContext } from '../context/AuthContext';
import { TUser } from '../typescript';
import { useContext } from 'react';

export const useAuth = () => {
	const { user, isLoading, setUser, setIsLoading } = useContext(AuthContext);

	// Check if user is authenticated
	const isAuthenticated = () => {
		return !isLoading && user && user.identification_card;
	};

	const getRole = () => {
		return user?.role;
	};

	const login = (user: TUser) => {
		setIsLoading(true);
		setUser(user);
		setIsLoading(false);
	};

	const logoout = () => {
		setIsLoading(true);
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		setUser({} as TUser);
		setIsLoading(false);
	};

	return { isAuthenticated, getRole, login, user, logoout };
};
