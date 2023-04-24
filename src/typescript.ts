// Types
export type TUser = {
	identification_card: string;
	name: string;
	mail: string;
	role: number;
};

export type TResident = {
	identification_card: string;
	name: string;
	mail: string;
	apartment: number;
};

// Forms
export type LoginFormData = {
	mail: string;
	password: string;
};

export type UpdateResidentFormData = {
	identification_card: string;
	name: string;
	mail: string;
	apartment: number;
};

// Interfaces
