<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from 'svelte-sonner';
	import { user } from '$lib/stores/user';
	import type { LayoutServerData } from './$types';
	import Footer from '$lib/components/Footer.svelte';

	export let data: LayoutServerData;

	$: user.set(data.user);
</script>

<Toaster />

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="px-4 flex-1">
		<slot />
	</main>

	<Footer />
</div>
