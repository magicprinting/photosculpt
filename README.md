# PhotoSculpt by Magic Printing

Turn your photos into tangible 3D printed art. A service by Magic Printing.

## 🚀 Development Setup

This project is a React application using TypeScript and Tailwind CSS. To develop locally, we recommend using **Vite**.

### 1. Prerequisites

*   **Node.js** (v18 or newer) installed on your computer.
*   **Git** installed.
*   A code editor like **VS Code**.

### 2. Initializing the Project

Open your terminal and run the following commands to scaffold a new project:

```bash
# Create a new Vite project with React and TypeScript
npm create vite@latest photo-sculpt -- --template react-ts

# Navigate into the project directory
cd photo-sculpt

# Install standard dependencies
npm install

# Install project specific libraries
npm install lucide-react @google/genai
```

### 3. Setting up Tailwind CSS

Since the code uses Tailwind utility classes, you need to set it up:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js` to look like this:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add the Tailwind directives to the top of `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Migrating the Files

Move the files provided in this codebase into your new local `src` folder:

*   `App.tsx` -> `src/App.tsx`
*   `types.ts` -> `src/types.ts`
*   `services/` -> `src/services/`
*   `components/` -> `src/components/`

*Note: You may need to remove the `importmap` script from `index.html` and ensure imports in files point to the installed node modules.*

### 5. Environment Variables (API Key)

Create a file named `.env` in the root directory (next to `package.json`) to store your Gemini API key.

If using Vite, variables must start with `VITE_`:

```
VITE_API_KEY=your_actual_api_key_here
```

**Important Code Update for Local Dev:**
In `src/services/geminiService.ts`, update the API key line to use Vite's env object:

```typescript
// Change this:
// const API_KEY = process.env.API_KEY || '';

// To this:
const API_KEY = import.meta.env.VITE_API_KEY || '';
```

### 6. Running Locally

```bash
npm run dev
```

Open your browser to the local URL provided (usually `http://localhost:5173`).

---

## 📦 Publishing to GitHub

1.  **Create a Repository**: Go to [GitHub.com](https://github.com) and create a new empty repository named `photo-sculpt`.

2.  **Initialize Git locally**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

3.  **Link and Push**:
    Replace `YOUR_USERNAME` with your GitHub username.
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/photo-sculpt.git
    git branch -M main
    git push -u origin main
    ```

## 🌐 Deployment

The easiest way to deploy this app for free is using **Vercel** or **Netlify**.

1.  Go to [Vercel.com](https://vercel.com) and sign up/login with GitHub.
2.  Click "Add New Project".
3.  Select your `photo-sculpt` repository.
4.  **Important**: In the Environment Variables section of the deployment settings, add your `VITE_API_KEY` with your actual Gemini API Key.
5.  Click **Deploy**.

Your friend can now access the app via the URL Vercel provides!
