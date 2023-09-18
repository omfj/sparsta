<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	let { accounts } = data;

	let { form, errors, enhance, reset } = superForm(data.transferMoneyForm, {
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				reset();

				invalidateAll();
			}
		},
	});

	$: selectedBalance = $form.from
		? accounts.find((account) => account.id === $form.from)!.balance
		: (false as const);
	$: canTransfer = selectedBalance && $form.amount && selectedBalance >= $form.amount;
</script>

<div class="container max-w-2xl">
	<h1 class="text-2xl font-medium mb-4">Overfør penger</h1>

	<form method="post" action="?/transfer" class="space-y-4" use:enhance>
		<fieldset class="flex flex-col gap-4">
			<label class="text-lg font-medium" for="from">Fra</label>
			<select
				name="from"
				class="rounded-lg border p-2"
				id="from"
				placeholder="Velg konto"
				bind:value={$form.from}
			>
				<option value="" selected disabled>Velg konto</option>
				{#each accounts as account}
					<option value={account.id}>{account.name} ({account.id})</option>
				{/each}
			</select>
			{#if $form.from}
				<p class="text-lg font-medium">
					Kontoen har nå {selectedBalance} kr
				</p>
			{/if}
			{#if $errors.from}
				<p class="text-red-500 text-sm">{$errors.from}</p>
			{/if}
		</fieldset>
		<fieldset class="flex flex-col gap-4">
			<label class="text-lg font-medium" for="to">Til</label>
			<input
				name="to"
				class="rounded-lg border p-2"
				id="to"
				placeholder="Velg konto"
				bind:value={$form.to}
			/>
			{#if $errors.to}
				<p class="text-red-500 text-sm">{$errors.to}</p>
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
			{#if !canTransfer && $form.amount > 0}
				<p>Du har ikke nok penger på konto</p>
			{:else if selectedBalance}
				<p>
					Du har nå {selectedBalance - $form.amount} kr igjen på kontoen
				</p>
			{/if}
		</fieldset>
		<fieldset class="flex flex-col gap-4">
			<label class="text-lg font-medium" for="description">Beskrivelse</label>
			<textarea
				name="description"
				class="rounded-lg border p-2"
				id="description"
				placeholder="Skriv inn en melding"
				bind:value={$form.description}
			/>
			{#if $errors.description}
				<p class="text-red-500 text-sm">{$errors.description}</p>
			{/if}
		</fieldset>

		<button
			type="submit"
			class="inline-flex h-8 items-center justify-center px-4 font-medium leading-none bg-blue-600 rounded-md text-white hover:opacity-90"
		>
			Overfør penger
		</button>
	</form>
</div>
