<script lang="ts">
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils.js';
	import { authService } from '@/auth';

	let className: string | undefined | null = undefined;
	export { className as class };

	const handleLogout = async () => {
		try {
			await authService.destroySession();
			localStorage.removeItem('authToken');
			goto('/login');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	<a href="/dashboard" class="text-sm font-medium transition-colors hover:text-primary">
		Dashboard
	</a>

	<a
		href="/users"
		class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Usuarios
	</a>
	<a
		href="#"
		on:click|preventDefault={handleLogout}
		class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Salir
	</a>
</nav>
