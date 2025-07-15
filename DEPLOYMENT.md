# GitHub Pages Deployment Guide

## 🚀 Deploying Your Resume Website

Your website is ready to be deployed to GitHub Pages! Follow these steps:

### Option 1: Deploy from Main Branch (Recommended)

1. **Go to your GitHub repository**
   - Visit: https://github.com/mohan949/prasadmohan949.github.io

2. **Navigate to Settings**
   - Click on the "Settings" tab in your repository

3. **Find the Pages section**
   - Scroll down to "Pages" in the left sidebar

4. **Configure GitHub Pages**
   - Source: Select "Deploy from a branch"
   - Branch: Select "main"
   - Folder: Select "/ (root)"
   - Click "Save"

5. **Wait for deployment**
   - GitHub will take a few minutes to build and deploy your site
   - You'll see a green checkmark when it's ready

6. **Access your site**
   - Your website will be available at: https://mohan949.github.io/prasadmohan949.github.io/
   - Or if you rename the repo to just `mohan949.github.io`, it will be at: https://mohan949.github.io/

### Option 2: Using GitHub Actions (Advanced)

If you want automatic deployments with build steps:

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

### 🔧 Troubleshooting

**Site not loading?**
- Check if GitHub Pages is enabled in Settings
- Wait 10-15 minutes for initial deployment
- Clear browser cache

**404 Error?**
- Ensure index.html is in the root directory
- Check if the branch name is correct

**Custom Domain?**
- Add a CNAME file with your domain
- Configure DNS settings with your domain provider

### 📝 Repository Naming Note

For a cleaner URL, consider renaming your repository from `prasadmohan949.github.io` to `mohan949.github.io` (matching your username). This will make your site available at `https://mohan949.github.io/` instead of `https://mohan949.github.io/prasadmohan949.github.io/` 