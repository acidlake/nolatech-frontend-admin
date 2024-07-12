<script lang="ts">
	import Download from 'lucide-svelte/icons/download';
	import Users from 'lucide-svelte/icons/users';
	import { RecentSales } from './index';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import DatePickerWithRange from '$lib/components/modules/date-picker/with-range.svelte';
	import type { UserPaginationData } from '@/types';

	export let data: UserPaginationData;
</script>

<div class="flex items-center justify-between space-y-2">
	<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
</div>
<Tabs.Root value="overview" class="space-y-4">
	<Tabs.List>
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="overview" class="space-y-4">
		<div class="grid gap-4">
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Usuarios Activos</Card.Title>
					<Users class="h-4 w-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{data.meta.totalRecords}</div>
				</Card.Content>
			</Card.Root>
		</div>
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
			<Card.Root class="col-span-12">
				<Card.Header>
					<Card.Title>Usuarios recientes</Card.Title>
					<Card.Description>Ultimos {data.meta.totalRecords} usuarios.</Card.Description>
				</Card.Header>
				<Card.Content>
					<RecentSales {data} />
				</Card.Content>
			</Card.Root>
		</div>
	</Tabs.Content>
</Tabs.Root>
