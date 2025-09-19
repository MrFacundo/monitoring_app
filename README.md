# Monitoring App

<p align="center">
	<img src="./repo_assets/desktop.png" alt="Desktop Screenshot" width="600" />
	<br />
	<br />
	<img src="./repo_assets/mobile.png" alt="Mobile Screenshot" width="350" />
</p>

## Setup

1. **Build the Docker image:**
	```sh
	docker build -t monitoring-app .
	```

2. **Run the container:**
	```sh
	docker run -p 3000:3000 monitoring-app
	```

3. **Access the app:**
	Open your browser and go to [http://localhost:3000](http://localhost:3000)

---

This will build and serve the production build of the app using a minimal static server.

---

## Desgin and features:
Table implementation:

- A **table layout** was chosen for the retrieved items to provide richer functionality.
- **Material UI** was used in the table to quickly implement interactive features and a modern interface with minimal custom code.  Built-in support includes keyboard navigation: `Tab` moves focus between headers, and `Enter` sorts by the selected column.

Optimizations:
- **Memoization** was used in the `EarthquakeList`, `EarthquakeMap`, `TimeSelector` components to avoid unnecessary re-renders.
- **Debounced Data Fetching:** Earthquake data is fetched with a 300ms debounce to prevent excessive network requests when the time range changes rapidly.