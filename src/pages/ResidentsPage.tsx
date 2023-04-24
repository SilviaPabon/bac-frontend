import { Container } from '../components/Container';
import { useAuth } from '../hooks/UseAuth';
import { UseToast } from '../hooks/UseToast';
import { getResidentsService } from '../services/residents.services';
import { TResident } from '../typescript';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ResidentsPage = () => {
	const [loading, setLoading] = useState(true);
	const [residents, setResidents] = useState<TResident[]>();
	const Navigation = useNavigate();
	const { isAuthenticated, user, getRole } = useAuth();
	const { showErrorToast } = UseToast();

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
			<table className='my-4 w-full text-left'>
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
							<td className='px-2 py-4 max-w-xs overflow-hidden'>
								{/*Admin options */}
								{getRole() === 1 && (
									<button
										type='button'
										className='py-2 px-4 bg-red-500 text-white rounded-md'
									>
										Delete
									</button>
								)}
								{/*Staff options */}
								{getRole() === 2 && (
									<Link
										to={`/resident/${resident.identification_card}`}
										className='py-2 px-4 bg-sky-500 text-white rounded-md'
									>
										Update
									</Link>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
};
