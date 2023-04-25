import { Container } from '../components/Container';
import { FormInput } from '../components/FormInput';
import { UseToast } from '../hooks/UseToast';
import {
	getResidentDetails,
	updateResidentService,
} from '../services/residents.services';
import { WithRetryRequest } from '../services/utils.services';
import { TResident, UpdateResidentFormData } from '../typescript';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateResidentPage = () => {
	const { register, handleSubmit } = useForm<UpdateResidentFormData>();
	const [loading, setLoading] = useState(true);
	const [resident, setResident] = useState<TResident>();
	const { id } = useParams();
	const { showErrorToast, showSuccessToast } = UseToast();
	const Navigate = useNavigate();

	const fetchResident = async () => {
		if (!id) return;

		const [success, data] = await WithRetryRequest(() =>
			getResidentDetails(id),
		);

		if (!success) {
			showErrorToast('An error has occurred');
			return;
		}

		setResident(data.resident);
	};

	useEffect(() => {
		fetchResident();
	}, [id]);

	useEffect(() => {
		setLoading(false);
	}, [resident]);

	if (loading) {
		return (
			<Container>
				<p className='text-center text-gray-500 my-4'>Loading...</p>
			</Container>
		);
	}

	// Handle form submit
	const onSubmit = handleSubmit(async (data) => {
		if (data && id) {
			const [success, _] = await WithRetryRequest(() =>
				updateResidentService(data, id),
			);

			if (!success) {
				showErrorToast('An error has occurred');
				return;
			}

			showSuccessToast('Resident updated successfully');
			Navigate('/view-residents');
		}
	});

	return (
		<Container>
			<div className='flex flex-col items-center my-4'>
				<h1 className='text-indigo-500 text-2xl'>Update resident</h1>
				<form onSubmit={onSubmit}>
					<FormInput
						registerCallback={register}
						fieldName='Name'
						fieldId='name'
						fieldType="text"
						placeholder="Name here"
						defaultValue={resident?.name}
					/>
					<FormInput
						registerCallback={register}
						fieldName='Mail'
						fieldId='mail'
						fieldType="email"
						placeholder="Email here"
						defaultValue={resident?.mail}
					/>
					<FormInput
						registerCallback={register}
						fieldName='Apartment'
						fieldId='apartment'
						fieldType="number"
						placeholder="Appartment number here"
						defaultValue={resident?.apartment}
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
