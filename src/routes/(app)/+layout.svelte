<script lang="ts">
	import {
		DashboardMainNav,
		Search,
		TeamSwitcher,
		UserNav
	} from '$lib/components/modules/dashboard';
</script>

<div class=" flex-col md:flex">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<TeamSwitcher />
			<DashboardMainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<Search />
				<UserNav />
			</div>
		</div>
	</div>
	<div class="flex-1 space-y-4 p-8 pt-6">
		<slot />
	</div>
</div>
