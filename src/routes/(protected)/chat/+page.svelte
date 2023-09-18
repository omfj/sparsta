<script>
	import { useCompletion } from 'ai/svelte';

	const { input, handleSubmit, completion, error } = useCompletion({
		api: '/api/openai',
	});
</script>

<div class="container max-w-lg space-y-4">
	{#if $error}
		<p>{$error}</p>
	{/if}
	<form class="space-y-4" on:submit={handleSubmit}>
		<fieldset>
			<input
				class="p-2 rounded-lg border shadow w-full"
				type="text"
				bind:value={$input}
				placeholder="Spør om hjelp..."
			/>
		</fieldset>

		<button class="inline-flex p-2 bg-blue-600 rounded-lg text-white hover:opacity-90" type="submit"
			>Generate Slogan</button
		>
	</form>

	<p class="text-lg">{$completion}</p>
</div>
