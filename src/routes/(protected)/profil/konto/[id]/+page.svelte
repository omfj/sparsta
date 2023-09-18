<script lang="ts">
	import { format } from 'date-fns';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let { transactions, bankAccount } = data;
</script>

<svelte:head>
	<title>Konto</title>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-4">
		<div class="space-y-2">
			<h1 class="text-3xl font-medium">
				{bankAccount.name} <span class="text-sm text-gray-500">({bankAccount.id})</span>
			</h1>
			{#if bankAccount.description}
				<p class="text-gray-600">{bankAccount.description}</p>
			{/if}
		</div>

		<p class="text-xl">Saldo: {bankAccount.balance} kr</p>
	</div>

	{#if transactions.length === 0}
		<p>Ingen transaksjoner på denne kontoen.</p>
	{:else}
		<ul class="grid grid-cols-1 lg:grid-cols-2 gap-4">
			{#each transactions as transaction}
				{@const didRecieve = transaction.to === bankAccount.id}
				<li class="rounded-lg bg-gray-100 shadow p-4">
					<div class="space-y-4">
						{#if didRecieve}
							<p class="text-lg font-medium">
								Mottatt: <span class="text-green-600">+{transaction.amount} kr</span>
							</p>
						{:else}
							<p class="text-lg font-medium">
								Overført: <span class="text-red-600">-{transaction.amount} kr</span>
							</p>
						{/if}
						<div>
							<p class="text-gray-800 text-lg">Beskrivelse:</p>
							<p class="text-gray-600">{transaction.description}</p>
						</div>
						<p>Dato: {format(new Date(transaction.date), 'dd.MM.yyy HH:mm')}</p>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
