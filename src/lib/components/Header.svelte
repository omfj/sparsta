<script lang="ts">
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores/user';
</script>

<header class="px-4 py-2">
	<div class="flex flex-row items-center">
		<div class="flex-1">
			<h1>
				<a class="text-xl font-semibold p-2 hover:bg-gray-100 rounded" href="/">Sparsta Bank</a>
			</h1>
		</div>

		<nav class="ml-5">
			<ul class="flex items-center">
				{#if $user}
					<li>
						<a class="block p-2 rounded hover:bg-gray-100" href="/profil">Din profil</a>
					</li>
					<li>
						<a class="block p-2 rounded hover:bg-gray-100" href="/overfor">Overfør penger</a>
					</li>
					<li>
						<a class="block p-2 rounded hover:bg-gray-100" href="/chat">Chat</a>
					</li>
					<li>
						<form action="/logg-ut" method="POST" use:enhance>
							<button class="block p-2 rounded hover:bg-gray-100" type="submit"> Logg ut</button>
						</form>
					</li>
				{:else}
					<li>
						<a class="block p-2 rounded hover:bg-gray-100" href="/logg-inn"> Logg inn</a>
					</li>
					<li>
						<a class="block p-2 rounded hover:bg-gray-100" href="/registrer"> Registrer deg</a>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</header>
<hr class="mb-5" />
