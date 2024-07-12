import { PUBLIC_API_URL } from "$env/static/public";
import { setAuthToken, authToken } from "./stores/authStore";
import type { LoginDataType, IUserInterface, User, UserPaginationData, AuthTokenResponse } from "./types";

const API_URL = PUBLIC_API_URL;

class AuthServiceUtil {
    private getAuthToken(): string | null {
        let token: string | null;
        authToken.subscribe((value) => {
            token = value;
        })();
        // @ts-ignore
        return token;
    }

    public async createIdentificationSession(data: LoginDataType): Promise<AuthTokenResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData);
                throw new Error(errorData.error || 'Failed to login');
            }

            const responseData: AuthTokenResponse = await response.json();
            setAuthToken(responseData.token);
            return responseData;
        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Failed to login'); // Re-throwing the error for the caller to handle
        }
    }

    public async destroySession(): Promise<void> {
        setAuthToken(null);
    }

    public async listUsers(page: number, limit: number, sort: string): Promise<UserPaginationData> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_URL}/users?page=${page}&limit=${limit}&sort=${sort}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch users');
        }

        return await response.json();
    }

    public async getUser(id: string): Promise<User> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_URL}/users/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user');
        }

        return await response.json();
    }

    public async updateUser(id: string, user: Partial<User>): Promise<User> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update user');
        }

        return await response.json();
    }

    public async deleteUser(id: string): Promise<User> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete user');
        }

        return await response.json();
    }

}

export const authService = new AuthServiceUtil();