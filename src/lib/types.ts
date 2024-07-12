export type LoginDataType = {
	identification: string;
	password: string;
};

export type AuthTokenResponse = {
	token: string;
};

export enum UserStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	DELETED = 'DELETED'
}

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc'
}

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	status: UserStatus;
	created_at: string;
	updated_at: string;
}

export type PaginationMeta = {
	page: number;
	limit: number;
	totalRecords: number;
	totalPages: number;
	prevPage: number | null;
	nextPage: number | null;
}

export type PaginationData<T> = {
	meta: PaginationMeta;
	data: T[];
}

export type UserPaginationData = PaginationData<User>;


export interface IUserInterface {
	createIdentificationSession: (user: LoginDataType) => Promise<string>;
	destroySession: () => Promise<void>;
	listUsers: (page: number, limit: number, sort: string) => Promise<UserPaginationData>;
	getUser: (id: string) => Promise<User>;
	updateUser: (id: string, user: User) => Promise<User>;
	deleteUser: (id: string) => Promise<string>;
	createUser: (user: User) => Promise<string>;
}