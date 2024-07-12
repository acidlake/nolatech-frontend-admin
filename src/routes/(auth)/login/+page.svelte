<script lang="ts">
	import type { LoginDataType } from '@/types';
	import UserAuthForm from '@/components/modules/auth-form/user-auth-form.svelte';
	import type { EventHandler } from 'svelte/elements';
	import { authService } from '@/auth';
	import { authToken } from '@/stores/authStore';
	import { goto } from '$app/navigation';

	let loginUserData: LoginDataType = {
		identification: '',
		password: ''
	};

	let error = '';

	let isLoading: boolean = false;

	function handleAddCredentials(user: boolean) {
		const demoPassword: string = 'thepassword123#$';
		if (!user) {
			loginUserData.identification = 'juanperez@nolatech.com';
			loginUserData.password = demoPassword;
		} else {
			loginUserData.identification = 'juanperez';
			loginUserData.password = demoPassword;
		}
	}

	const handleSubmit: EventHandler<SubmitEvent> = async (event) => {
		isLoading = true;
		event.preventDefault();
		try {
			const token = await authService.createIdentificationSession(loginUserData);
			authToken.set(token);
			goto('/dashboard', { replaceState: true });
			error = '';
			isLoading = false;
		} catch (error) {
			isLoading = false;
			error = error || 'Failed to login';
			error = 'Failed to login';
		}
	};
</script>

<UserAuthForm bind:loginUserData {handleAddCredentials} {handleSubmit} bind:isLoading />

{#if error}
	<p class="text-center text-red-500">{error}</p>
{/if}
