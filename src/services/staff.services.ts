import { TStaff } from '../typescript';
import { CONFIG } from './config.services';
import Axios from 'axios';

export const RegisterStaffRequest = async (newStaff: TStaff) => {
	try {
		const response = await Axios.post(
			`${CONFIG.API_URL}/admin/register-staff`,
			newStaff,
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
