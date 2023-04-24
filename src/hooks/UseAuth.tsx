import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
	const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);
	return { user, setUser, isLoading, setIsLoading };
};
