# Deployment Setup Guide

This guide will help you set up automated deployments from your organization repository to your personal Vercel account.

## Prerequisites

- A Vercel account (personal)
- Admin access to the GitHub organization repository
- Vercel CLI installed (`npm install -g vercel`)

## Step-by-Step Setup

### Step 1: Link Your Project to Vercel

If you haven't already linked your project:

```bash
cd d:\AT-Sale-Application
vercel link
```

Follow the prompts:
1. **Set up and deploy**: Choose "Yes"
2. **Scope**: Select your personal Vercel account
3. **Link to existing project**: Choose "No" for new project or "Yes" if already created
4. **Project name**: Enter your desired project name

This creates a `.vercel` directory with your project configuration.

### Step 2: Retrieve Vercel Credentials

#### A. Get Your Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **Create Token**
3. Name it something like "GitHub Actions - AT-Sale-Application"
4. Set the scope (choose your personal account)
5. Set expiration as needed (No Expiration recommended for production)
6. Click **Create Token**
7. **Copy the token immediately** (you won't see it again!)

#### B. Get Project IDs

Run this command in your project directory:

```bash
# Windows (PowerShell)
Get-Content .vercel/project.json

# Windows (CMD)
type .vercel\project.json

# Mac/Linux
cat .vercel/project.json
```

You'll see output like:
```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

Copy both values.

### Step 3: Configure GitHub Repository Secrets

1. Go to your GitHub repository: `https://github.com/YOUR_ORG/AT-Sale-Application`
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** button

Add these three secrets:

#### Secret 1: VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Secret**: Paste your token from Step 2A
- Click **Add secret**

#### Secret 2: VERCEL_ORG_ID
- **Name**: `VERCEL_ORG_ID`
- **Secret**: Paste the `orgId` value from Step 2B
- Click **Add secret**

#### Secret 3: VERCEL_PROJECT_ID
- **Name**: `VERCEL_PROJECT_ID`
- **Secret**: Paste the `projectId` value from Step 2B
- Click **Add secret**

### Step 4: Verify Setup

1. Make a small change to any file in your repository
2. Commit and push to a new branch:
   ```bash
   git checkout -b test-deployment
   git add .
   git commit -m "test: verify deployment pipeline"
   git push origin test-deployment
   ```
3. Create a Pull Request
4. Go to the **Actions** tab in your GitHub repository
5. You should see a workflow running
6. Once complete, check for a comment on your PR with the preview URL

### Step 5: Deploy to Production

1. Merge your PR to the `main` branch
2. The workflow will automatically deploy to production
3. Check the **Actions** tab for the deployment status
4. Visit your Vercel dashboard to see the production deployment

## Workflow Behavior

### Pull Requests
- Automatically creates a **preview deployment**
- Posts the preview URL as a comment on the PR
- Allows you to test changes before merging

### Main Branch (Production)
- Automatically deploys to **production**
- Updates your live site at your-project.vercel.app

## Troubleshooting

### Error: "Invalid token"
- Double-check that you copied the full token
- Make sure the token hasn't expired
- Verify the secret name is exactly `VERCEL_TOKEN` (case-sensitive)

### Error: "Project not found"
- Verify `VERCEL_PROJECT_ID` is correct
- Make sure you've run `vercel link` successfully
- Check that the project exists in your Vercel dashboard

### Error: "Permission denied"
- Verify `VERCEL_ORG_ID` matches your personal account
- Make sure the token has the correct scope

### Deployment succeeds but site doesn't update
- Check the deployment logs in Vercel dashboard
- Verify environment variables are set correctly in Vercel
- Clear your browser cache

## Managing Secrets

### Updating Secrets
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click on the secret name
3. Click **Update secret**
4. Enter new value and save

### Rotating Tokens
For security, it's good practice to rotate tokens periodically:
1. Create a new token in Vercel
2. Update the `VERCEL_TOKEN` secret in GitHub
3. Delete the old token in Vercel

## Additional Configuration

### Environment Variables

To add environment variables to your Vercel deployment:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add your variables for each environment (Production/Preview/Development)

These will be automatically used during deployment.

### Custom Domains

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Security Notes

- ✅ Vercel tokens grant full access to your Vercel account - keep them secret!
- ✅ Organization repository secrets are only accessible to repository admins
- ✅ Secrets are encrypted and never exposed in logs
- ✅ Use specific scopes when creating tokens (limit to specific teams/projects if possible)
- ✅ Regularly rotate your tokens for enhanced security

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
