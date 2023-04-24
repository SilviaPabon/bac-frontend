import { whoamiService } from '../services/session.services';
import { WithRetryRequest } from '../services/utils.services';
import { TUser } from '../typescript';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
	user: null as TUser | null,
	isLoading: true,
	setUser: (_user: TUser): void => {},
	setIsLoading: (_isLoading: boolean): void => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<TUser | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Recover the session from the local storage
	const recoverSession = async () => {
		const refreshToken = localStorage.getItem('refresh_token');
		if (!refreshToken) return;

		const [sucess, response] = await WithRetryRequest(whoamiService);
		if (!sucess) return;
		const { identification_card, name, mail, id_role } = response?.user;

		setIsLoading(true);
		setUser({
			identification_card,
			name,
			mail,
			role: id_role,
		});
		setIsLoading(false);
	};

	useEffect(() => {
		recoverSession();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
