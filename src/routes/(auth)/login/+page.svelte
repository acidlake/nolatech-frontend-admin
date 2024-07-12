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

	$: error = null;

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
		event.preventDefault();
		error = null;
		try {
			const token = await authService.createIdentificationSession(loginUserData);
			authToken.set(token);
			goto('/dashboard');
		} catch (error) {
			error = error || 'Failed to login';
		}
	};

	$: console.log('error', error);
</script>

<UserAuthForm bind:loginUserData {handleAddCredentials} {handleSubmit} />

{#if error}
	<p class="text-center text-red-500">{error}</p>
{/if}
