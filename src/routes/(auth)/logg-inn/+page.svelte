<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				goto('/');
			}
		},
	});
</script>

<div class="container max-w-2xl">
	<h1 class="text-3xl font-medium mb-5">Login</h1>

	<form class="space-y-4" method="post" use:enhance>
		<div class="flex flex-col gap-2">
			<label for="email">E-post</label>
			<input
				name="email"
				id="email"
				type="email"
				class="p-2 border bg-gray-100 rounded"
				bind:value={$form.email}
			/>
			{#if $errors.email}
				<p class="text-red-500">{$errors.email}</p>
			{/if}
		</div>

		<div class="flex flex-col gap-2">
			<label for="password">Passord</label>
			<input
				type="password"
				name="password"
				id="password"
				class="p-2 border bg-gray-100 rounded"
				bind:value={$form.password}
				{...$constraints.password}
			/>
			{#if $errors.password}
				<p class="text-red-500">{$errors.password}</p>
			{/if}
		</div>

		<div>
			<button type="submit" class="bg-blue-600 text-white rounded-md p-2">Logg inn</button>
		</div>
	</form>
</div>
