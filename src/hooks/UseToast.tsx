import { toast } from 'react-toastify';

export const UseToast = () => {
	const showSuccessToast = (message: string) => {
		toast.success(message, {
			position: 'top-right',
			theme: 'light',
			autoClose: 4000,
		});
	};

	const showErrorToast = (message: string) => {
		toast.error(message, {
			position: 'top-right',
			theme: 'light',
			autoClose: 4000,
		});
	};

	const showInfoToast = (message: string) => {
		toast.info(message, {
			position: 'top-right',
			theme: 'light',
			autoClose: 4000,
		});
	};

	return {
		showSuccessToast,
		showErrorToast,
		showInfoToast,
	};
};
