<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import type { UserPaginationData } from '@/types';
	export let data: UserPaginationData;
</script>

<div class="space-y-8">
	{#each data.data as user}
		<div class="flex items-center">
			<Avatar.Root class="h-9 w-9">
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
				<p class="text-sm text-muted-foreground">{user.email}</p>
			</div>
		</div>
	{/each}
</div>
