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
		localStorage.setItem('access_token', data.access_token);
		localStorage.setItem('refresh_token', data.refresh_token);

		return [true, data];
	} catch (error) {
		if (Axios.isAxiosError(error)) {
			const response = error.response?.data;
			return [false, response];
		}

		return [false, { 'message': 'Unable to login. Try again later.' }];
	}
};
