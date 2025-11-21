# PhotoSculpt by Magic Printing

Turn your photos into tangible 3D printed art. A service by Magic Printing.

---

## 💻 Local Development

This project is a React application using TypeScript and Vite.

### 1. Prerequisites
*   **Node.js** (v18 or newer)
*   **Git**
*   Code Editor (e.g., VS Code)

### 2. Installation
Run these commands in your terminal:

```bash
# 1. Install dependencies
npm install

# 2. Install specific packages for this app
npm install lucide-react @google/genai
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_KEY=your_google_gemini_api_key_here
```

### 4. Start the App
```bash
npm run dev
```
Open the local URL shown (usually `http://localhost:5173`).

---

## 🚀 Deploying a React App to GitHub Pages

Below is a comprehensive guide to deploying this app to GitHub Pages.

### Prerequisites
*   Node and npm are installed.
*   Git is installed.
*   A GitHub account.

### Procedure

#### 1. Create an empty repository on GitHub
1.  Sign into your GitHub account.
2.  Create a new repository (e.g., named `photo-sculpt`).
3.  Select **Public**.
4.  **Important:** Leave "Initialize this repository with a README" **unchecked**.

#### 2. Set up the Project
Since you already have the source code, ensure you are in the project root folder in your terminal.

#### 3. Install the `gh-pages` package
Install the package that handles the deployment logic:

```bash
npm install gh-pages --save-dev
```

#### 4. Configure `vite.config.ts` (Important for Vite)
When hosting on GitHub Pages at a URL like `username.github.io/repo-name`, you must set the base path.
Create or update `vite.config.ts` in your project root:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPLACE 'repo-name' WITH YOUR ACTUAL GITHUB REPOSITORY NAME
  base: '/repo-name/', 
})
```

#### 5. Add a `homepage` property to `package.json`
Open `package.json` and add the `homepage` field. 

Format: `https://{username}.github.io/{repo-name}`

```json
{
  "name": "photo-sculpt",
  "version": "0.0.0",
  "homepage": "https://yourusername.github.io/photo-sculpt",
  ...
}
```

#### 6. Add deployment scripts to `package.json`
In `package.json`, update the `scripts` section.

**Note:** Unlike standard React apps that build to a `build` folder, Vite builds to a `dist` folder. We must tell `gh-pages` to deploy the `dist` folder.

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
```

#### 7. Add a "remote" that points to the GitHub repository
Link your local files to the empty repository you created in Step 1.

```bash
# Initialize git if you haven't already
git init
git add .
git commit -m "Initial commit"

# Link to GitHub (Replace placeholders with your info)
git remote add origin https://github.com/YOUR_USERNAME/photo-sculpt.git
```

#### 8. Deploy the React app
Run the deploy command:

```bash
npm run deploy
```

**What happens here:**
1.  `predeploy` runs: Vite builds your app into the `dist` folder.
2.  `deploy` runs: `gh-pages` takes that `dist` folder and pushes it to a special branch named `gh-pages` on your GitHub repo.

#### 9. Configure GitHub Pages Settings
1.  Go to your repository on GitHub.
2.  Click **Settings** tab.
3.  Click **Pages** in the left sidebar.
4.  Under **Build and deployment** > **Branch**:
    *   Select `gh-pages`
    *   Select `/ (root)`
5.  Click **Save**.

Your app should now be live at the URL shown at the top of that page!

#### 10. Store your Source Code (Optional but Recommended)
The step above only pushed the *built* website. To save your actual source code (React files) to GitHub:

```bash
git push -u origin main
```
