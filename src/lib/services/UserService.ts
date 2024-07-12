import type { IUserInterface, LoginDataType, User, UserPaginationData } from "@/types";
import { authService } from "@/auth";

class UserService implements IUserInterface {
    async createIdentificationSession(user: LoginDataType): Promise<string> {
        return await authService.createIdentificationSession(user);
    }

    async destroySession(): Promise<void> {
        return await authService.destroySession();
    }

    async listUsers(page: number, limit: number, sort: string): Promise<UserPaginationData> {
        return await authService.listUsers(page, limit, sort);
    }

    async getUser(id: string): Promise<User> {
        return await authService.getUser(id);
    }

    async updateUser(id: string, user: Partial<User>): Promise<User> {
        return await authService.updateUser(id, user);
    }

    async createUser(user: User): Promise<string> {
        return await authService.createUser(user);
    }

    async deleteUser(id: string): Promise<string> {
        return await authService.deleteUser(id);
    }
}

export const userService = new UserService();