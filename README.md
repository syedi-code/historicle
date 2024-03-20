# Historicle

A browser-based game where the player guesses a daily-rotating target year based on given historical events. Historicle is hosted online at [historiclega.me](https://historiclega.me/). Inspired by other browser "dailies" such as Wordle, PokeDoku, and Cine2Nerdle among others.

<hr style="border:none; height:3px; background-color:#cccccc;">

<div align="center">
  <img src="https://github.com/syedi-code/historicle/blob/main/src/img/site.png" alt="alt text" style="width:50%;">
</div>

<hr style="border:none; height:3px; background-color:#cccccc;">

## Run Locally

Historicle can be run locally by cloning the repository and using npm to start a local development server:

```
git clone https://github.com/syedi-code/historicle.git
cd historicle
npm install
npm run start
```

## Technologies
- [TypeScript](https://www.typescriptlang.org/)
- [React 18](https://react.dev/)
- [Node.js v16](https://nodejs.org/en)
- [API Ninjas' Historical Events API](https://api-ninjas.com/api/historicalevents)
- [Framer Motion](https://www.framer.com/motion/) for component animation
- [Netlify](https://www.netlify.com/) for deployment

## Project Structure
- `src/components` contains all React components
  -   `GameContainer` is the parent component and is where the bulk of the game logic takes place
- `src/data` contains the historical event parser
  -  `api-request.py` interfaces with the Historical Events API, cleaning and formatting the data before exporting it to `data.json`
  -  `data.json` contains the cleaned data, which is imported in the `GameContainer` component
  -  `api-request.py` is run automatically every day at midnight PST by GitHub Actions
