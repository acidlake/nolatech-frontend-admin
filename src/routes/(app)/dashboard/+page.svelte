<script lang="ts">
	import { DashboardPage } from '@/components/modules/dashboard/';

	export let data;

	$: ({ users } = data.streamed);
</script>

{#await users}
	<div class="flex items-center justify-center">Cargando...</div>
{:then data}
	<DashboardPage {data} />
{/await}
