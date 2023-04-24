// Types
export type TUser = {
	identification_card: string;
	name: string;
	mail: string;
	role: number;
};

export type TStaff = {
	identification_card: string;
	name: string;
	mail: string;
	role: number;
	password?: string;
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

export type RegisterStaffFormData = {
	identification_card: string;
	name: string;
	mail: string;
	password: string;
	role: string;
};

// Interfaces
