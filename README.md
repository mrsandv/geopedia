# GEOPEDIA

This project is a React Native app created to learn about the countries in the world. It allows you to search and view detailed information about countries like the name, code, languages, currency, and the emoji flag, and it also allows you to save your favorite countries.

![Geopedia home](https://x27ogsxot4y4om7r.public.blob.vercel-storage.com/home.jpeg)

## Stack and design

- React native
- Expo as framework and router
- Apollo Client as GraphQL driver
- React Native Paper for UI management.
- Async Storage to provide features of local storage management.

## Some additional features

- Dynamic sections/routes based on query params.
- Full TypeScript implementation
- Memoized components to avoid unnecessary renders
- Dark/light mode and full UI theme integration.

## File tree

- app/: RootComponent for the expo-router system; every subfolder is a route/section, and the ones wrapped by brackets allow the queryParams extraction to customize the screens.

- components/: Custom components, reusable sections.

- types/: To define data schemes for TS and reference inside the code base.

- utils/: Features used across many sections, including filters, async storage, Apollo Client, and GraphQL static queries.

- assets/: splash icons, logos for the app.

## How to start

###.env

This project includes a .env.example. Fill the env variables for Expo with the necessary values.

1. Clone this repository and add EXPO_PUBLIC_GRAPHQL_URI

> Check [Countries](https://github.com/trevorblades/countries), by Trevorblades, i use the local version of his project to query with no limits the countries info.

2. Install dependencies.

```bash
npm install
```

3. Start the development server; use the general one or a custom target [iOS, Android, web] provided by package.json scripts.

```bash
npm run start
```

4. Turn on your device or emulator and scan the QR code

## Some captures

> ## Happy coding!

![Geopedia home dark](https://x27ogsxot4y4om7r.public.blob.vercel-storage.com/home-dark.jpeg)

![Country list](https://x27ogsxot4y4om7r.public.blob.vercel-storage.com/country-list.jpeg)

![Filter](https://x27ogsxot4y4om7r.public.blob.vercel-storage.com/filter.jpeg)

![Detail and favorites](https://x27ogsxot4y4om7r.public.blob.vercel-storage.com/detail-favorites.jpeg)

![Actions](https://x27ogsxot4y4om7r.public.blob.vercel-storage.com/actions.jpeg)
