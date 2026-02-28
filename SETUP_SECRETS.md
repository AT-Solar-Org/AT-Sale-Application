# Quick Setup - GitHub Secrets Configuration

## Your Vercel Project Details

Based on your `vercel link` configuration, here are your project details:

```
Project ID: prj_Vyf2lS5gdfyAruTarLSiKVTlpHIv
Organization ID: team_XtqvOUCu6wPotNTSa4eIQXBq
```

## GitHub Secrets to Configure

Go to your GitHub organization repository settings and add these secrets:

### 1. VERCEL_TOKEN
- **Name:** `VERCEL_TOKEN`
- **Value:** [Get from https://vercel.com/account/tokens]
- **How to get:**
  1. Visit https://vercel.com/account/tokens
  2. Click "Create Token"
  3. Name it "GitHub Actions Deploy"
  4. Select your personal account scope
  5. Click Create and copy the token

### 2. VERCEL_ORG_ID
- **Name:** `VERCEL_ORG_ID`
- **Value:** `team_XtqvOUCu6wPotNTSa4eIQXBq`

### 3. VERCEL_PROJECT_ID
- **Name:** `VERCEL_PROJECT_ID`
- **Value:** `prj_Vyf2lS5gdfyAruTarLSiKVTlpHIv`

## Adding Secrets to GitHub

1. Go to: `https://github.com/YOUR_ORG/AT-Sale-Application/settings/secrets/actions`
2. Click **"New repository secret"**
3. Add each of the three secrets above
4. Click **"Add secret"** for each one

## Test Your Setup

After adding the secrets:

```bash
# Create a test branch
git checkout -b test-deployment

# Make a small change
echo "# Test Deployment" >> README.md

# Commit and push
git add .
git commit -m "test: CI/CD deployment pipeline"
git push origin test-deployment
```

Then create a Pull Request and check the Actions tab to see the deployment in progress!

## ⚠️ Security Note

**IMPORTANT:** The VERCEL_TOKEN is sensitive! It grants access to your Vercel account.
- Never commit it to your repository
- Never share it publicly
- Keep it stored only in GitHub Secrets
- Rotate it periodically for security

---

For detailed instructions, see [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md)
