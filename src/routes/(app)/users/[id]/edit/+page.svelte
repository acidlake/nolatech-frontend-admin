<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/';
	import { Input } from '$lib/components/ui/input/';
	import { Label } from '$lib/components/ui/label/';
	import { userService } from '@/services/UserService';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { id } = $page.params;

	let newUser = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: ''
	};

	let error = '';
	let isLoading: boolean = false;

	$: if (id) {
		getUser(id);
	}

	async function getUser(userId: string) {
		try {
			const user = await userService.getUser(userId);
			newUser = {
				firstName: user.user.firstName,
				lastName: user.user.lastName
			};
		} catch (err) {
			error = err.message || 'Failed to fetch user details';
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		isLoading = true;
		event.preventDefault();
		error = '';
		try {
			if (id) {
				await userService.updateUser(id, newUser);
				goto('/users', { replaceState: true });
			}
		} catch (err) {
			isLoading = false;
			error = err.message || 'Failed to save user';
		}
	}

	async function handleCancel() {
		goto('/users', { replaceState: true });
	}
</script>

{#await getUser(id)}
	<p>Loading...</p>
{:then data}
	<form on:submit|preventDefault={handleSubmit} class="mt-4 flex flex-col gap-4">
		<div class="grid gap-2">
			<div class="flex items-center">
				<Label for="firstName" class="font-bold">First Name</Label>
			</div>
			<Input id="firstName" type="text" bind:value={newUser.firstName} required />
		</div>
		<div class="grid gap-2">
			<div class="flex items-center">
				<Label for="lastName" class="font-bold">Last Name</Label>
			</div>
			<Input id="lastName" type="text" bind:value={newUser.lastName} required />
		</div>
		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}
		<div class="flex justify-between gap-4 lg:gap-10">
			<Button on:click={() => goto('/users')} type="button" variant="outline" class="mt-4 w-full"
				>Cancelar</Button
			>
			<Button
				type="submit"
				disabled={isLoading}
				class="mt-4 w-full {isLoading ? 'cursor-wait' : 'cursor-pointer'}"
				>{isLoading ? 'Loading...' : 'Actualizar'}</Button
			>
		</div>
	</form>
{/await}
