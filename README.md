# Sparsta

Enkel bank app laget med SvelteKit.

Dette er min innlevering for kodeoppgaven til Stacc - Future of Fintech høst 2023. [Se oppgaven her](https://github.com/stacc/stacc-challenge-public/tree/budgeting-and-savings).

Prøv live på [sparsta.vercel.app](https://sparsta.vercel.app/).

## Demo

![](./.github/demo.mp4)

## Hvordan kjøre

1. Klon repoet

```bash
git clone git@github.com:omfj/sparsta
```

2. Installer avhengigheter

```bash
cd sparsta
pnpm install
```

3. Start databasen

```bash
docker compose up -d
```

4. Kjør migrasjoner

```bash
pnpm db:migrate
```

5. Kjør appen

```bash
pnpm dev
```

Gå til [localhost:5173](http://localhost:5173) for å se nettsiden.

## Hvordan bruke

### Opprett bruker

Gå til [localhost:5173/registrer](http://localhost:5173/registrer) og opprett en bruker.

### Logg inn

Gå til [localhost:5173/logg-inn](http://localhost:5173/logg-inn) og logg inn med brukeren du opprettet.

### Legg til konto

Gå til [localhost:5173/profil/konto](http://localhost:5173/profil) og legg til en konto.

## Se transaksjoner

Gå til [localhost:5173/profil/konto](http://localhost:5173/profil) og velg en konto for å se dens transaksjoner.

### Legg til transaksjon

Gå til [localhost:5173/overfor](http://localhost:5173/overfor) og fyll inn skjemaet.

## Stack

- [SvelteKit](https://kit.svelte.dev/) - En av de bedre fullstack rammeverkene, lett å behandle state, routing og mutasjoner.
- [TailwindCSS](https://tailwindcss.com/) - Gjør at man komemr fort i gang med design.
- [Drizzle ORM](https://orm.drizzle.team/) - Enkel ORM som ikke har for mye overhead og abstraksjoner.
- [PostgreSQL](https://www.postgresql.org/) - Lett å bruke og lett å sette opp.
