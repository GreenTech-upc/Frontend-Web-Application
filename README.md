# SkyCrop Frontend

## Development

Install dependencies with `npm install` and start the frontend with `npm run dev`.

The frontend uses the SkyCrop mock API deployed on Azure. Its base URL is configured in `.env` for development and production builds. A local API process is not required.

## Languages

English is the default language. Use the EN/ES selector in the header to switch languages. The selection is saved in the browser.

## Plots

- `/plots`: registered plots and search by name or location.
- `/plots/new`: registration with name, area in hectares, and location.
- `/plots/:id`: persisted plot details.

The API is a mock service hosted on Azure. Crop registration, maps, and telemetry are separate features.

Run `npm run build` to compile the application. Configure `VITE_SKYCROP_API_URL` for the target API when building for another environment.
