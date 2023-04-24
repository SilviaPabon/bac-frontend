import { Container } from '../components/Container';
import { FormInput } from '../components/FormInput';
import { useAuth } from '../hooks/UseAuth';
import { UseToast } from '../hooks/UseToast';
import { RegisterStaffRequest } from '../services/staff.services';
import { WithRetryRequest } from '../services/utils.services';
import { RegisterStaffFormData } from '../typescript';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const RegisterStaffPage = () => {
	const { register, handleSubmit } = useForm<RegisterStaffFormData>();
	const { showErrorToast, showSuccessToast } = UseToast();
	const { getRole, isAuthenticated } = useAuth();
	const Navigate = useNavigate();

	useEffect(() => {
		console.log(getRole());
		if (!isAuthenticated() || getRole() !== 1) {
			showErrorToast('You are not allowed to access this page');
			Navigate('/view-residents');
		}
	}, []);

	const onSubmit = handleSubmit(async (data) => {
		const ROLES_IDS: {
			[key: string]: number;
		} = {
			ADMIN: 1,
			WATCHMAN: 2,
		};

		if (data) {
			// Validate the role
			const { role } = data;
			if (!['ADMIN', 'WATCHMAN'].includes(role.toUpperCase())) {
				showErrorToast('The role must be ADMIN or WATCHMAN');
				return;
			}

			// Send the request
			const [success, response] = await WithRetryRequest(() =>
				RegisterStaffRequest({
					...data,
					role: ROLES_IDS[role.toUpperCase()] || 2,
				}),
			);

			if (!success) {
				showErrorToast(response.message || 'An error has occurred');
				return;
			}

			showSuccessToast('Staff registered successfully');
			Navigate('/view-residents');
		}
	});

	return (
		<Container>
			<div className='flex flex-col items-center my-4'>
				<h1 className='text-indigo-500 text-2xl'>Register Staff</h1>
				<form onSubmit={onSubmit}>
					<FormInput
						registerCallback={register}
						fieldName='Name'
						fieldId='name'
						fieldType="text"
						placeholder="Staff name here"
					/>
					<FormInput
						registerCallback={register}
						fieldName='Mail'
						fieldId='Mail'
						fieldType="email"
						placeholder="Staff email here"
					/>
					<FormInput
						registerCallback={register}
						fieldName='Identification Card'
						fieldId='identification_card'
						fieldType="number"
						placeholder="Staff identification card here"
					/>
					<FormInput
						registerCallback={register}
						fieldName='Role'
						fieldId='role'
						fieldType="string"
						placeholder="Staff role (Admin, watchman)"
					/>
					<FormInput
						registerCallback={register}
						fieldName='Password'
						fieldId='Password'
						fieldType="password"
						placeholder="Staff password here"
					/>
					<input
						type='submit'
						value='Submit'
						className='w-full bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 transition-colors cursor-pointer'
					/>
				</form>
			</div>
		</Container>
	);
};
