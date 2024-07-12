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

	let error = null;

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
		event.preventDefault();
		error = null;
		try {
			if (id) {
				await userService.updateUser(id, newUser);
				goto('/users');
			}
		} catch (err) {
			error = err.message || 'Failed to save user';
		}
	}

	$: console.log(newUser);
</script>

{#await getUser(id)}
	<p>Loading...</p>
{:then data}
	<form on:submit|preventDefault={handleSubmit} class="mt-4">
		<div class="grid gap-2">
			<div class="flex items-center">
				<Label for="firstName">First Name</Label>
			</div>
			<Input id="firstName" type="text" bind:value={newUser.firstName} required />
		</div>
		<div class="grid gap-2">
			<div class="flex items-center">
				<Label for="lastName">Last Name</Label>
			</div>
			<Input id="lastName" type="text" bind:value={newUser.lastName} required />
		</div>
		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}
		<Button type="submit" class="mt-4 w-full">{id ? 'Update User' : 'Create User'}</Button>
	</form>
{/await}
