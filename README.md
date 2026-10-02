# Pomodoro Timer

A minimal 25-minute Pomodoro timer built with React, Vite, and Tailwind CSS.

## Features

- 25-minute focus countdown with a circular progress ring
- Start, pause/resume, and reset controls
- Drift-resistant timing based on an end timestamp, so it stays accurate in background tabs
- Live countdown in the browser tab title
- Responsive layout with keyboard-focus styles

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting Started

### 1. Create the project

```bash
npm create vite@latest pomodoro-timer -- --template react
cd pomodoro-timer
npm install
```

### 2. Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Register the plugin in `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Replace the contents of `src/index.css` with:

```css
@import "tailwindcss";
```

### 3. Add the component

Replace `src/App.jsx` with the provided `App.jsx`. Make sure `src/main.jsx` imports `./index.css`.

### 4. Run it

```bash
npm run dev
```

Open the local URL printed in the terminal.

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the dev server         |
| `npm run build`   | Create a production build    |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Lint the source files        |

## Customization

Change the session length by editing the `DURATION` constant at the top of `App.jsx` (value in seconds).

## License

MIT
