<script lang="ts">
	import type { LoginDataType } from '@/types';

	import { Button } from '$lib/components/ui/button/';
	import { Input } from '$lib/components/ui/input/';
	import { Label } from '$lib/components/ui/label/';
	import type { EventHandler } from 'svelte/elements';

	export let loginUserData: LoginDataType;
	export let handleAddCredentials: (user: boolean) => void;
	export let handleSubmit: EventHandler<SubmitEvent>;
	export let isLoading: boolean = false;
</script>

<div class="grid gap-2">
	<Label for="email">Email / Username</Label>
	<Input
		id="email"
		type="text"
		bind:value={loginUserData.identification}
		placeholder="m@example.com or username"
		required
	/>
</div>
<form on:submit|preventDefault={handleSubmit}>
	<div class="grid gap-2">
		<div class="flex items-center">
			<Label for="password">Password</Label>
		</div>
		<Input id="password" type="password" bind:value={loginUserData.password} required />
	</div>
	<Button
		type="submit"
		disabled={isLoading}
		class="{isLoading ? 'cursor-wait' : 'cursor-pointer'} mt-4 w-full"
		>{isLoading ? 'Loading...' : 'Login'}</Button
	>
	<div class="mt-4 flex w-full flex-col rounded-lg border bg-gray-50 p-4 py-2 text-gray-600">
		<h3 class="font-semibold">Demo credentials:</h3>
		<div class="flex flex-col items-start gap-1 pt-2 text-sm">
			<button type="button" class="cursor-pointer" on:click={() => handleAddCredentials(false)}>
				Email: <span>juanperez@nolatech.com</span>
			</button>
			<button type="button" on:click={() => handleAddCredentials(true)}>
				Usuario: <span>juanperez</span>
			</button>
			<p>
				Password: <span>thepassword123#$</span>
			</p>
		</div>
	</div>
</form>
