<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="space-y-10">
	<h1 class="text-3xl font-bold text-center">Det har skjedd en feil!</h1>

	{#if $page.status === 401}
		<p class="text-center">Du er ikke logget inn.</p>

		<p class="text-center">Følg denne linken for å logge inn.</p>

		<div class="flex justify-center">
			<a href="/logg-inn" class="bg-blue-600 text-white rounded-md p-2">Logg inn</a>
		</div>
	{/if}

	{#if $page.status === 403}
		<p class="text-center">Du har ikke tilgang til denne siden.</p>
	{/if}

	{#if $page.status === 404}
		<p class="text-center">Siden du prøver å nå finnes ikke.</p>
	{/if}

	{#if $page.status === 500}
		<p class="text-center">Det har skjedd en feil på serveren.</p>
	{/if}
</div>
