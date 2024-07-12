<script lang="ts">
	import { Button } from '$lib/components/ui/button/';
	import { Input } from '$lib/components/ui/input/';
	import { Label } from '$lib/components/ui/label/';
	import { userService } from '@/services/UserService.js';
	import { goto } from '$app/navigation';

	let newUser = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: ''
	};

	let error = null;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		try {
			const createdUser = await userService.createUser(newUser);
			console.log('User created:', createdUser);
			// Optionally, navigate to a success page or reload user list
			goto('/users'); // Navigate to users page after successful creation
		} catch (error) {
			console.error('Error creating user:', error);
			error = error.message || 'Failed to create user';
		}
	}
</script>

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
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="username">Username</Label>
		</div>
		<Input id="username" type="text" bind:value={newUser.username} required />
	</div>
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="email">Email</Label>
		</div>
		<Input id="email" type="email" bind:value={newUser.email} required />
	</div>
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="password">Password</Label>
		</div>
		<Input id="password" type="password" bind:value={newUser.password} required />
	</div>
	{#if error}
		<p class="text-red-500">{error}</p>
	{/if}
	<Button type="submit" class="mt-4 w-full">Create User</Button>
</form>
