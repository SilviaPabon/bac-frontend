import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
	const { user, isLoading } = useContext(AuthContext);

	// Check if user is authenticated
	const isAuthenticated = () => {
		return !isLoading && user;
	};

	const getRole = () => {
		return user?.role;
	};

	return { isAuthenticated, getRole };
};
