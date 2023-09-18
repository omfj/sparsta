<script lang="ts">
	import { X } from 'lucide-svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { invalidateAll } from '$app/navigation';

	const {
		elements: { trigger, overlay, content, title, close, portalled },
		states: { open },
	} = createDialog({
		forceVisible: true,
	});

	export let data: PageData;
	const { user } = data;
	$: accounts = data.accounts;

	const { form, errors, reset, enhance } = superForm(data.createBankAccountForm, {
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				reset();
				open.set(false);

				invalidateAll();
			}
		},
	});
</script>

<div class="flex h-full gap-2">
	<aside class="h-full max-w-[200px] w-full space-y-2">
		<h2 class="text-2xl font-medium">Kontoer</h2>

		<button
			use:melt={$trigger}
			class="inline-flex items-center w-full justify-center text-white px-4 py-3
    font-medium leading-none bg-gray-600 hover:opacity-90"
		>
			Lag en konto
		</button>

		<div class="flex flex-col w-full divide-y divide-gray-500">
			{#each accounts as account}
				<a
					href="/profil/konto/{account.id}"
					class="bg-gray-200 h-full w-full p-2 hover:bg-gray-300"
					data-sveltekit-reload
				>
					<p class="text-xl">
						{account.name}
					</p>

					<p class="text-gray-600">
						{account.balance} kr
					</p>
				</a>
			{/each}
		</div>
	</aside>

	<div class="w-[1px] bg-gray-200" />

	<main class="w-full">
		<slot />
	</main>
</div>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<form
			method="post"
			action="/profil/konto/lag"
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
      max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
          p-6 shadow-lg"
			use:melt={$content}
			use:enhance
		>
			<h2 use:melt={$title} class="m-0 text-lg font-medium text-black">Lag bank konto</h2>

			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-black" for="name">Navn</label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                  rounded-sm border border-solid px-3 leading-none text-black"
					id="name"
					name="name"
					bind:value={$form.name}
				/>
				{#if $errors.name}
					<p class="text-red-500 text-sm">{$errors.name}</p>
				{/if}
			</fieldset>
			<fieldset class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-black" for="description">Beskrivelse</label>
				<input
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                  rounded-sm border border-solid px-3 leading-none text-black"
					id="description"
					name="description"
					bind:value={$form.description}
				/>
				{#if $errors.description}
					<p class="text-red-500 text-sm">{$errors.description}</p>
				{/if}
			</fieldset>
			<fieldse class="mb-4 flex items-center gap-5">
				<label class="w-[90px] text-right text-black" for="type">Kontotype</label>
				<select
					class="inline-flex h-8 w-full flex-1 items-center justify-center
                  rounded-sm border border-solid px-3 leading-none text-black"
					id="type"
					name="type"
					bind:value={$form.type}
				>
					<option value="savings">Sparekonto</option>
					<option value="checking">Brukskonto</option>
				</select>
				{#if $errors.type}
					<p class="text-red-500 text-sm">{$errors.type}</p>
				{/if}
			</fieldse>
			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                  bg-zinc-100 px-4 font-medium leading-none text-zinc-600"
				>
					Avbryt
				</button>
				<button
					type="submit"
					class="inline-flex h-8 items-center justify-center rounded-sm
                  bg-magnum-100 px-4 font-medium leading-none"
				>
					Lag konto
				</button>
			</div>
			<button
				use:melt={$close}
				aria-label="close"
				class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
          items-center justify-center rounded-full p-1 text-magnum-800
              hover:bg-magnum-100 focus:shadow-magnum-400"
			>
				<X class="square-4" />
			</button>
		</form>
	{/if}
</div>
