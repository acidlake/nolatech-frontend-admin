<script lang="ts">
	import { browser } from '$app/environment';
	import Seo from '@/components/shared/seo.svelte';
	import '../app.css';
</script>

{#if browser}
	<Seo />
	<slot></slot>
{/if}
