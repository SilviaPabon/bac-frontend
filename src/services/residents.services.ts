import { TResident } from '../typescript';
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
		throw error;
	}
};

export const getResidentDetails = async (
	id: string,
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<[boolean, any]> => {
	try {
		const { data } = await Axios.get(`${CONFIG.API_URL}/residents/${id}`, {
			headers: {
				'x-access-token': `Bearer ${localStorage.getItem('access_token')}`,
			},
		});

		return [true, data];
	} catch (error) {
		throw error;
	}
};

export const registerResidentService = async (newResident: TResident) => {
	try {
		const response = await Axios.post(
			`${CONFIG.API_URL}/staff/register-resident`,
			newResident,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': `Bearer ${localStorage.getItem('access_token')}`,
				},
			},
		);

		return [true, response.data];
	} catch (error) {
		throw error;
	}
};

export const updateResidentService = async (resident: TResident) => {
	try {
		const { data } = await Axios.put(
			`${CONFIG.API_URL}/staff/update-resident/${resident.identification_card}`,
			resident,
			{
				headers: {
					'x-access-token': `Bearer ${localStorage.getItem('access_token')}`,
				},
			},
		);

		return [true, data];
	} catch (error) {
		throw error;
	}
};

export const removeResidentService = async (id: string) => {
	try {
		const { data } = await Axios.delete(
			`${CONFIG.API_URL}/staff/delete-resident/${id}`,
			{
				headers: {
					'x-access-token': `Bearer ${localStorage.getItem('access_token')}`,
				},
			},
		);

		return [true, data];
	} catch (error) {
		throw error;
	}
};
