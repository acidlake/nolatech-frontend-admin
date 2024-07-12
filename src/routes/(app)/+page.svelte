<script lang="ts">
	import { goto } from '$app/navigation';

	if (localStorage.getItem('authToken')) {
		goto('/dashboard');
	} else {
		goto('/login');
	}
</script>
