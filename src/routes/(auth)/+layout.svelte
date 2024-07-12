<script lang="ts">
	import Seo from '@/components/shared/seo.svelte';
</script>

<Seo page="Authentication" />

<div class="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
				<p class="text-balance text-muted-foreground">
					Enter your email or username below to login to your account
				</p>
			</div>
			<div class="grid gap-4">
				<slot />
			</div>
		</div>
	</div>
	<div class="hidden bg-muted lg:block">
		<img
			src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
