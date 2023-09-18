<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { user } = data;
</script>

<div class="space-y-8 container max-w-2xl">
	<div class="space-y-4">
		<h1 class="text-2xl">
			Velkommen tilbake, <br />
			<span class="font-medium">
				{user.firstName}
				{user.lastName}
			</span>
		</h1>

		<p class="text-lg">Din e-post: {user.email}</p>
	</div>

	<div class="text-lg">
		<h2>Administer din konto</h2>

		<div class="flex flex-col gap-2 w-full">
			<a
				href="/profil/konto"
				class="block no-underline hover:underline rounded-lg p-2 bg-gray-200 text-center"
				>Dine kontoer</a
			>
		</div>
	</div>
</div>
