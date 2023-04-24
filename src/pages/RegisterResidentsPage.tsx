import { Container } from '../components/Container';
import { FormInput } from '../components/FormInput';
import { useAuth } from '../hooks/UseAuth';
import { UseToast } from '../hooks/UseToast';
import { registerResidentService } from '../services/residents.services';
import { WithRetryRequest } from '../services/utils.services';
import { RegisterResidentFormData } from '../typescript';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const RegisterResidentsPage = () => {
	const { register, handleSubmit } = useForm<RegisterResidentFormData>();
	const { showErrorToast, showSuccessToast } = UseToast();
	const { getRole, isAuthenticated } = useAuth();
	const Navigate = useNavigate();

	useEffect(() => {
		console.log(getRole());
		if (!isAuthenticated() || getRole() !== 2) {
			showErrorToast('You are not allowed to access this page');
			Navigate('/view-residents');
		}
	}, []);

	const onSubmit = handleSubmit(async (data) => {
		if (data) {
			const [success, response] = await WithRetryRequest(() =>
				registerResidentService(data),
			);

			if (!success) {
				showErrorToast(response.message || 'An error has occurred');
				return;
			}

			showSuccessToast('Resident registered successfully');
			Navigate('/view-residents');
		}
	});

	return (
		<Container>
			<div className='flex flex-col items-center my-4'>
				<h1 className='text-indigo-500 text-2xl'>Register Resident</h1>
				<form onSubmit={onSubmit}>
					<FormInput
						registerCallback={register}
						fieldName='Name'
						fieldId='name'
						fieldType="text"
						placeholder="Resident name here"
					/>
					<FormInput
						registerCallback={register}
						fieldName='Mail'
						fieldId='Mail'
						fieldType="email"
						placeholder="Resident email here"
					/>
					<FormInput
						registerCallback={register}
						fieldName='Identification Card'
						fieldId='identification_card'
						fieldType="number"
						placeholder="Resident identification card here"
					/>
					<FormInput
						registerCallback={register}
						fieldName='Apartment Number'
						fieldId='apartment'
						fieldType="number"
						placeholder="Resident apartment number here"
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
