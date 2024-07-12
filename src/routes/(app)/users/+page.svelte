<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';

	import { userService } from '@/services/UserService.js';
	import type { UserPaginationData } from '@/types';

	let users: UserPaginationData = loadData();

	async function loadData() {
		const users = await userService.listUsers(1, 10, 'name');
		return users;
	}

	async function deleteUser(userId: string) {
		if (confirm('Are you sure you want to delete this user?')) {
			try {
				await userService.deleteUser(userId);
				refreshData();
			} catch (error) {
				console.error(error);
			}
		}
	}

	async function refreshData() {
		setTimeout(async () => {
			users = await loadData();
		}, 1000);
	}

	$: if (users) {
	}

	$: console.log(users);
</script>

{#await users}
	<p>Loading...</p>
{:then data}
	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between">
			<h1 class="text-3xl">Usuarios</h1>
			<Button on:click={() => goto('/users/create')}>Agregar usuario</Button>
		</div>
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
				<thead
					class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="p-4">
							<div class="flex items-center">
								<input
									id="checkbox-all-search"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
								/>
								<label for="checkbox-all-search" class="sr-only">checkbox</label>
							</div>
						</th>
						<th scope="col" class="px-6 py-3"> Nombre </th>
						<th scope="col" class="px-6 py-3"> Apellidos </th>
						<th scope="col" class="px-6 py-3"> Usuario </th>
						<th scope="col" class="px-6 py-3"> Email </th>
						<th scope="col" class="px-6 py-3"> Status </th>

						<th scope="col" class="px-6 py-3"> Accion </th>
					</tr>
				</thead>
				<tbody>
					{#each data?.data as user}
						<tr
							class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
						>
							<td class="w-4 p-4">
								<div class="flex items-center">
									<input
										id="checkbox-table-search-1"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
									/>
									<label for="checkbox-table-search-1" class="sr-only">checkbox</label>
								</div>
							</td>
							<th
								scope="row"
								class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
							>
								{user.firstName}
							</th>
							<td class="px-6 py-4"> {user.lastName} </td>
							<td class="px-6 py-4"> {user.username} </td>
							<td class="px-6 py-4"> {user.email} </td>
							<td class="px-6 py-4"> {user.status} </td>

							<td class="flex items-center px-6 py-4">
								<a
									href="/users/{user.id}/edit"
									class="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</a
								>
								<a
									href="#"
									on:click|preventDefault={() => deleteUser(user.id)}
									class="ms-3 font-medium text-red-600 hover:underline dark:text-red-500">Remove</a
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/await}
