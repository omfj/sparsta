<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	$: accounts = data.accounts;

	let { form, errors, enhance } = superForm(data.addMoneyForm, {
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				invalidateAll();
			}
		},
	});
</script>

<form method="post" action="?/addMoney" class="space-y-4" use:enhance>
	<fieldset class="flex flex-col gap-4">
		<label class="text-lg font-medium" for="bankAccountId">Bankkonto</label>
		<select
			name="bankAccountId"
			class="rounded-lg border p-2"
			id="bankAccountId"
			placeholder="Velg konto"
			bind:value={$form.bankAccountId}
		>
			<option value="" selected disabled>Velg konto</option>
			{#each accounts as account}
				<option value={account.id}>{account.name} ({account.id})</option>
			{/each}
		</select>
		{#if $errors.bankAccountId}
			<p class="text-red-500 text-sm">{$errors.bankAccountId}</p>
		{/if}
	</fieldset>
	<fieldset class="flex flex-col gap-4">
		<label class="text-lg font-medium" for="amount">Beløp</label>
		<input
			type="number"
			name="amount"
			class="rounded-lg border p-2"
			id="amount"
			bind:value={$form.amount}
			placeholder="Skriv inn et beløp"
		/>
		{#if $errors.amount}
			<p class="text-red-500 text-sm">{$errors.amount}</p>
		{/if}
	</fieldset>

	{#if $form.bankAccountId}
		<p class="text-lg font-medium">
			Kontoen har nå {accounts.find((account) => account.id === $form.bankAccountId)?.balance} kr
		</p>
	{/if}

	<button
		type="submit"
		class="inline-flex h-8 items-center justify-center
  bg-magnum-100 px-4 font-medium leading-none bg-blue-600 rounded-md text-white hover:opacity-90"
	>
		Legg til penger
	</button>
</form>
