This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This project is configured with automated CI/CD deployment to Vercel using GitHub Actions.

### Setup Instructions

#### 1. Get Your Vercel Credentials

First, you need to retrieve your Vercel token and project information:

**Get Vercel Token:**
1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Create a new token with a descriptive name (e.g., "GitHub Actions Deploy")
3. Copy the token (you won't be able to see it again)

**Get Project IDs:**
Run this command in your project directory (after running `vercel link`):
```bash
cat .vercel/project.json
```

This will show you:
- `projectId` - Your Vercel Project ID
- `orgId` - Your Vercel Organization/User ID

#### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

**For Organization Repositories:**
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of these:

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | Your Vercel authentication token | From step 1 above |
| `VERCEL_ORG_ID` | Your Vercel organization/user ID | From `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | From `.vercel/project.json` |

#### 3. Deployment Workflow

The CI/CD pipeline will automatically:

- **On Pull Requests:** Deploy a preview version and comment the preview URL on the PR
- **On Push to Main:** Deploy to production

### Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Deployment Status

Check the **Actions** tab in your GitHub repository to monitor deployment status and view logs.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Vercel Deployment Documentation](https://vercel.com/docs) - learn about deploying to Vercel.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
