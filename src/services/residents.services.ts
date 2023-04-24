import { CONFIG } from './config.services';
import Axios from 'axios';

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getResidentsService = async (): Promise<[boolean, any]> => {
	try {
		const { data } = await Axios.get(`${CONFIG.API_URL}/residents`, {
			headers: {
				'x-access-token': `Bearer ${localStorage.getItem('access_token')}`,
			},
		});

		return [true, data];
	} catch (error) {
		if (Axios.isAxiosError(error)) {
			return [false, error?.response?.data];
		}

		return [false, { 'message': 'Unexpected error. Try again later.' }];
	}
};
