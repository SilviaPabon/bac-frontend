import { CONFIG } from './config.services';
import Axios from 'axios';

// Login service, returns a boolean indicating if the login was successful and the user data
export const loginService = async (
	mail: string,
	password: string,
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<[boolean, any]> => {
	try {
		const { data } = await Axios.post(
			`${CONFIG.API_URL}/session/login`,
			{
				mail,
				password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		// Save the access and refresh tokens in the local storage
		localStorage.setItem('access_token', data.accessToken);
		localStorage.setItem('refresh_token', data.refreshToken);

		return [true, data];
	} catch (error) {
		if (Axios.isAxiosError(error)) {
			const response = error.response?.data;
			return [false, response];
		}

		return [false, { 'message': 'Unable to login. Try again later.' }];
	}
};

export const refreshService = async (): Promise<boolean> => {
	try {
		const { data } = await Axios.get(`${CONFIG.API_URL}/session/refresh`, {
			headers: {
				'x-refresh-token': `Bearer ${localStorage.getItem('refresh_token')}`,
			},
		});

		// Save the access and refresh tokens in the local storage
		// console.log('[Refresh]', data);
		localStorage.setItem('access_token', data.accessToken);
		return true;
	} catch (_error) {
		return false;
	}
};

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const whoamiService = async (): Promise<[boolean, any]> => {
	try {
		const { data } = await Axios.get(`${CONFIG.API_URL}/session/whoami`, {
			headers: {
				'x-access-token': `Bearer ${localStorage.getItem('access_token')}`,
			},
		});

		// console.log('[Whoami]', data);
		return [true, data];
	} catch (error) {
		throw error;
	}
};
