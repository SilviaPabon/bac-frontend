import { UseFormRegister } from 'react-hook-form';

interface IProps {
	fieldName: string;
	fieldId: string;
	fieldType: string;
	placeholder: string;
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	registerCallback: UseFormRegister<any>;
}

export const FormInput = ({
	registerCallback,
	fieldName,
	fieldId,
	fieldType,
	placeholder,
}: IProps) => {
	return (
		<div className='my-4'>
			<label htmlFor={fieldId} className='block text-gray-500 mb-1'>
				{fieldName}
			</label>
			<input
				{...registerCallback(fieldName.toLowerCase(), { required: true })}
				type={fieldType}
				placeholder={placeholder}
				className='border p-2 border-gray-300'
				id={fieldId}
			/>
		</div>
	);
};
