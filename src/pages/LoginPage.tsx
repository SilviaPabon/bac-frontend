import { useForm } from 'react-hook-form';
import { Container } from '../components/Container';
import { FormInput } from '../components/FormInput';
import { LoginFormData } from '../typescript';

export const LoginPage = () => {
	const { register, handleSubmit } = useForm<LoginFormData>();

	// Handle form submit
	const onSubmit = handleSubmit((data) => {
		console.log(data);
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
