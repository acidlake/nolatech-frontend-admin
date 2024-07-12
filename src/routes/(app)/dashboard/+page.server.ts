import type { UserPaginationData } from '@/types';
import type { PageServerLoad } from './$types';
import { userService } from '@/services/UserService';

export const load = (async ({ url, locals }) => {
    const users = await userService.listUsers(1, 5, 'desc');

    return {
        streamed: {
            users: new Promise<UserPaginationData>((resolve) => resolve(users))
        }
    };
}) satisfies PageServerLoad;