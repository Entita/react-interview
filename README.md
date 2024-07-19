## Getting Started

First, install packages:

```bash
npm i
```

And run the development server:

```bash
npm run dev
```

# Alveno - Frontend úkol

Soubor `types/supabase.ts` obsahuje typy entit vygenerované z backendu.

### Dokumentace API

Příklady pro `teams`, ale samozřejmě obdobně funguje i pro `employees`.

Read all rows

```Bash
curl 'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?select=*' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY"
```

With pagination

```Bash
curl 'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?select=*' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY" \
-H "Range: 0-9"
```

With filtering. Eg. `id=eq.<teamId>`

```Bash
curl 'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?id=eq.1&select=*' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY" \
-H "Range: 0-9"
```

Insert row - `id` a `createdAt` se automaticky vygenerují a **není** potřeba je posílat.

```Bash
curl -X POST 'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY" \
-H "Content-Type: application/json" \
-H "Prefer: return=minimal" \
-d '{ "some_column": "someValue", "other_column": "otherValue" }'
```

Update matching rows

```Bash
curl -X PATCH 'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?some_column=eq.someValue' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY" \
-H "Content-Type: application/json" \
-H "Prefer: return=minimal" \
-d '{ "other_column": "otherValue" }'
```

Delete matching rows

```Bash
curl -X DELETE 'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?some_column=eq.someValue' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY"
```

Read all teams with employee ids

```Bash
curl 'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?select=*,employees(id)' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY"
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
