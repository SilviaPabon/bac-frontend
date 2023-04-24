import { AuthContext } from '../context/AuthContext';
import { TUser } from '../typescript';
import { useContext } from 'react';

export const useAuth = () => {
	const { user, isLoading, setUser, setIsLoading } = useContext(AuthContext);

	// Check if user is authenticated
	const isAuthenticated = () => {
		return !isLoading && user;
	};

	const getRole = () => {
		return user?.role;
	};

	const login = (user: TUser) => {
		setIsLoading(true);
		setUser(user);
		setIsLoading(false);
	};

	return { isAuthenticated, getRole, login, user };
};
