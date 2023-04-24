import { Container } from '../components/Container';
import { FormInput } from '../components/FormInput';
import { useAuth } from '../hooks/UseAuth';
import { UseToast } from '../hooks/UseToast';
import { loginService } from '../services/session.services';
import { LoginFormData } from '../typescript';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
	const { register, handleSubmit } = useForm<LoginFormData>();
	const { showErrorToast, showSuccessToast } = UseToast();
	const { login, isAuthenticated, user } = useAuth();
	const Navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			showErrorToast('You are already logged in');
			Navigate('/view-residents');
		}
	}, [user]);

	// Handle form submit
	const onSubmit = handleSubmit(async (data) => {
		if (data) {
			const [success, response] = await loginService(data.mail, data.password);
			console.log({ success, response });

			if (!success) {
				showErrorToast(response?.message || 'An error has occurred');
				return;
			}

			showSuccessToast(response?.message || 'Login successful');
			const { identification_card, name, mail, id_role } = response?.user;

			login({
				identification_card,
				name,
				mail,
				role: id_role,
			});

			// Redirect to the residents view
			Navigate('/view-residents');
		}
	});

	return (
		<Container>
			<div className='flex flex-col items-center my-4'>
				<h1 className='text-indigo-500 text-2xl'>Login</h1>
				<form onSubmit={onSubmit}>
					<FormInput
						registerCallback={register}
						fieldName='Mail'
						fieldId='Mail'
						fieldType="email"
						placeholder="Your email here"
					/>
					<FormInput
						registerCallback={register}
						fieldName='Password'
						fieldId='Password'
						fieldType="password"
						placeholder="Your password here"
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
