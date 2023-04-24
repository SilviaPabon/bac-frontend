import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

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
