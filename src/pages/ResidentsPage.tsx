import { Container } from '../components/Container';
import { useAuth } from '../hooks/UseAuth';
import { UseToast } from '../hooks/UseToast';
import {
	getResidentsService,
	removeResidentService,
} from '../services/residents.services';
import { TResident } from '../typescript';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WithRetryRequest } from '../services/utils.services';

export const ResidentsPage = () => {
	const [loading, setLoading] = useState(true);
	const [residents, setResidents] = useState<TResident[]>();
	const Navigation = useNavigate();
	const { isAuthenticated, user, getRole } = useAuth();
	const { showErrorToast, showSuccessToast } = UseToast();

	useEffect(() => {
		if (!isAuthenticated()) {
			showErrorToast('You must be logged in to access this page');
			Navigation('/login');
		}
	}, [isAuthenticated, user]);

	const fetchResidents = async () => {
		setLoading(true);
		const [success, data] = await getResidentsService();

		if (!success) {
			showErrorToast('An error has occurred');
			setResidents([]);
			return;
		}

		setResidents(data.residents);
	};

	useEffect(() => {
		fetchResidents();
	}, []);

	useEffect(() => {
		setLoading(false);
	}, [residents]);

	const handleRemoveResident = async (id: string) => {
		const [success, response] = await WithRetryRequest(() =>
			removeResidentService(id),
		);

		if (!success) {
			showErrorToast(response.message || 'An error has occurred');
			return;
		}

		showSuccessToast('Resident removed successfully');
		setLoading(true);
		fetchResidents();
	};

	if (loading) {
		return (
			<Container>
				<p className='text-center text-gray-500 my-4'>Loading...</p>
			</Container>
		);
	}

	if (!residents || residents.length === 0) {
		return (
			<Container>
				<p className='text-center text-gray-500 my-4'>No residents found</p>
			</Container>
		);
	}

	return (
		<Container>
			<h1 className='py-4 text-xl font-bold'>Residents:</h1>
			<table className='w-full text-left'>
				<thead className='border-b'>
					<tr>
						<th className='p-2'>Identification Card</th>
						<th className='p-2'>Fullname</th>
						<th className='p-2'>Mail</th>
						<th className='p-2'>Apartment</th>
						<th className='p-2'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{residents.map((resident, index) => (
						<tr
							key={resident.identification_card}
							className={`border-b ${
								index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
							}`}
						>
							<td className='px-2 py-4 max-w-xs overflow-hidden'>
								{resident.identification_card}
							</td>
							<td className='px-2 py-4 max-w-xs overflow-hidden'>
								{resident.name}
							</td>
							<td className='px-2 py-4 max-w-xs overflow-hidden'>
								{resident.mail}
							</td>
							<td className='px-2 py-4 max-w-xs overflow-hidden'>
								{resident.apartment}
							</td>
							<td className='flex gap-2 px-2 py-4 max-w-xs overflow-hidden'>
								{/*Admin options */}
								{getRole() === 1 && (
									<p className='text-gray-500'>No actions for this user...</p>
								)}
								{/*Staff options */}
								{getRole() === 2 && (
									<>
										<Link
											to={`/resident/${resident.identification_card}`}
											className='py-2 px-4 bg-sky-500 text-white rounded-md'
										>
											Update
										</Link>
										<button
											onClick={() =>
												handleRemoveResident(resident.identification_card)
											}
											type='button'
											className='py-2 px-4 bg-red-500 text-white rounded-md'
										>
											Delete
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
};
