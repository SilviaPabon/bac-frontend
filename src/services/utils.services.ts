import { refreshService } from './session.services';
import Axios from 'axios';

export const WithRetryRequest = async (
	callback: Function,
	retried = false,
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<[boolean, any]> => {
	try {
		return await callback();
	} catch (error) {
		const accessToken = localStorage.getItem('access_token');

		if (Axios.isAxiosError(error)) {
			if ((error.response?.status === 401 && !retried) || !accessToken) {
				await refreshService();
				return await WithRetryRequest(callback, true);
			}

			return [false, error?.response?.data];
		}

		return [false, { 'message': 'Unexpected error. Try again later.' }];
	}
};
