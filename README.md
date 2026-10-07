# SkyCrop Frontend

## Local development

Install dependencies with `npm install`. Start the development API with `npm run api` and run `npm run dev` in another terminal.

The development API runs at `http://localhost:3000/api/v1`, configured in `.env.development`. It stores registered plots in `server/db.json`. Keep personal test records out of commits.

## Plots

- `/plots`: registered plots and search by name or location.
- `/plots/new`: registration with name, area in hectares, and location.
- `/plots/:id`: persisted plot details.

The API is a local development substitute. Crop registration, maps, and telemetry are separate features.

Run `npm run build` to compile the application. Configure `VITE_SKYCROP_API_URL` for the target API when building for another environment.
