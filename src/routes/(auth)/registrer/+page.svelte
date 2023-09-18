<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	let { form, errors, constraints, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				goto('/');
			}
		},
	});
</script>

<div class="container max-w-2xl">
	<h1 class="text-3xl font-medium mb-5">Registrer deg</h1>

	<form class="space-y-4" method="post" use:enhance>
		<div class="flex flex-col gap-2">
			<label for="email">E-mail</label>
			<input
				type="email"
				name="email"
				id="email"
				class="p-2 border bg-gray-100 rounded"
				bind:value={$form.email}
				{...$constraints.email}
			/>
			{#if $errors.email}
				<p class="text-red-500">{$errors.email.join(', ')}</p>
			{/if}
		</div>

		<div class="flex flex-col gap-2">
			<label for="firstName">Fornavn</label>
			<input
				type="text"
				name="firstName"
				id="firstName"
				class="p-2 border bg-gray-100 rounded"
				bind:value={$form.firstName}
				{...$constraints.firstName}
			/>
			{#if $errors.firstName}
				<p class="text-red-500">{$errors.firstName.join(', ')}</p>
			{/if}
		</div>

		<div class="flex flex-col gap-2">
			<label for="lastName">Etternavn</label>
			<input
				type="text"
				name="lastName"
				id="lastName"
				class="p-2 border bg-gray-100 rounded"
				bind:value={$form.lastName}
				{...$constraints.lastName}
			/>
			{#if $errors.lastName}
				<p class="text-red-500">{$errors.lastName.join(', ')}</p>
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
				<p class="text-red-500">{$errors.password.join(', ')}</p>
			{/if}
		</div>

		<div class="flex flex-col gap-2">
			<label for="passwordConfirm">Bekreft passord</label>
			<input
				type="password"
				name="passwordConfirm"
				id="passwordConfirm"
				class="p-2 border bg-gray-100 rounded"
				bind:value={$form.passwordConfirm}
				{...$constraints.passwordConfirm}
			/>
			{#if $errors.passwordConfirm}
				<p class="text-red-500">{$errors.passwordConfirm.join(', ')}</p>
			{/if}
		</div>

		<div>
			<button type="submit" class="bg-blue-600 text-white rounded-md p-2">Registrer deg</button>
		</div>
	</form>
</div>
