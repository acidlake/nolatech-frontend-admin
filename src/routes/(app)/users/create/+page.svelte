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

	let error = '';
	let isLoading = false;

	async function handleSubmit(event: SubmitEvent) {
		isLoading = true;
		event.preventDefault();
		try {
			const createdUser = await userService.createUser(newUser);
			goto('/users', { replaceState: true });
		} catch (error) {
			isLoading = false;
			console.error('Error creating user:', error);
			error = error.message || 'Failed to create user';
		}
	}

	function handleCancel() {
		goto('/users', { replaceState: true });
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="mt-4 flex flex-col gap-4">
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="firstName" class="font-bold">Nombre</Label>
		</div>
		<Input id="firstName" type="text" bind:value={newUser.firstName} required />
	</div>
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="lastName" class="font-bold">Apellidos</Label>
		</div>
		<Input id="lastName" type="text" bind:value={newUser.lastName} required />
	</div>
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="username" class="font-bold">Nombre de Usuario</Label>
		</div>
		<Input id="username" type="text" bind:value={newUser.username} required />
	</div>
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="email" class="font-bold">Email</Label>
		</div>
		<Input id="email" type="email" bind:value={newUser.email} required />
	</div>
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="password" class="font-bold">Password</Label>
		</div>
		<Input id="password" type="password" bind:value={newUser.password} required />
	</div>
	{#if error}
		<p class="text-red-500">{error}</p>
	{/if}
	<div class="flex justify-between gap-4 lg:gap-10">
		<Button on:click={handleCancel} type="button" variant="outline" class="mt-4 w-full"
			>Cancelar</Button
		>
		<Button
			type="submit"
			disabled={isLoading}
			class="mt-4 w-full {isLoading ? 'cursor-wait' : 'cursor-pointer'}"
			>{isLoading ? 'Loading...' : 'Crear'}</Button
		>
	</div>
</form>
