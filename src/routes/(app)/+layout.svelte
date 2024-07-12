<script lang="ts">
	import { DashboardMainNav } from '$lib/components/modules/dashboard';
</script>

<div class="flex-col md:flex">
	<div class="container">
		<div class="border-b">
			<div class="flex h-16 items-center px-4">
				<DashboardMainNav class="mx-6" />
			</div>
		</div>
		<div class="flex-1 space-y-4 p-8 pt-6">
			<slot />
		</div>
	</div>
</div>
