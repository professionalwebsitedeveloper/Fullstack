# Data for Countries - Step 3

A React application that displays information about countries including capital, area, languages, flag, and **weather report for the capital city**.

## Setup Instructions

### 1. Get an OpenWeatherMap API Key

1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key from your account dashboard
4. **Note:** It may take a few minutes for a newly generated API key to become active

### 2. Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder with your actual API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies and Run

```bash
npm install
npm run dev
```

**Important:** After adding the API key to `.env.local`, you must **restart the development server** for the changes to take effect.

## Features

- Search for countries by name
- View country details: capital, area, and languages
- Display country flag
- **Show weather report for the capital city** including:
  - Current temperature
  - Weather conditions with icon
  - Humidity
  - Wind speed

## Browser Compatibility

Note: If using Firefox and experiencing HTTPS errors with the weather API, try using Chrome instead. This is a known issue with how some APIs handle mixed content.

## Notes

- The API key is stored in `.env.local` which is not committed to version control (see `.gitignore`)
- Never commit your actual API keys to source control
- The `VITE_` prefix is required for environment variables to be exposed to the client-side code
