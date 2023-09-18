<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const fullName = `${data.user.firstName} ${data.user.lastName}`;
</script>

<svelte:head>
	<title>{fullName} sin profil</title>
</svelte:head>

<slot />
