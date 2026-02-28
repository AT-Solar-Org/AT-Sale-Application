# Deployment Setup Checklist

Use this checklist to ensure your CI/CD pipeline is properly configured.

## ✅ Setup Checklist

### Phase 1: Repository Files (Already Done! ✓)
- [x] GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- [x] Vercel configuration file created (`vercel.json`)
- [x] Documentation added to README
- [x] Deployment guide created (`.github/DEPLOYMENT.md`)
- [x] Quick setup guide created (`SETUP_SECRETS.md`)
- [x] Project linked to Vercel (`.vercel/` directory exists)

### Phase 2: Get Vercel Credentials (Action Required)
- [ ] Create Vercel token at https://vercel.com/account/tokens
  - Token name: "GitHub Actions Deploy"
  - Scope: Your personal Vercel account
  - Expiration: No expiration (or as per your security policy)
- [ ] Save your token securely (you won't see it again!)

### Phase 3: Configure GitHub Secrets (Action Required)
Go to: `https://github.com/YOUR_ORG/AT-Sale-Application/settings/secrets/actions`

Add these three secrets:

- [ ] **VERCEL_TOKEN**
  - Value: The token from Phase 2

- [ ] **VERCEL_ORG_ID**
  - Value: `team_XtqvOUCu6wPotNTSa4eIQXBq`

- [ ] **VERCEL_PROJECT_ID**
  - Value: `prj_Vyf2lS5gdfyAruTarLSiKVTlpHIv`

### Phase 4: Test Deployment (Action Required)
- [ ] Create a test branch
  ```bash
  git checkout -b test-ci-cd
  ```

- [ ] Make a small change and push
  ```bash
  echo "" >> README.md
  git add .
  git commit -m "test: verify CI/CD pipeline"
  git push origin test-ci-cd
  ```

- [ ] Create a Pull Request on GitHub

- [ ] Verify deployment in Actions tab
  - [ ] Check workflow runs successfully
  - [ ] Verify preview deployment URL in PR comments

- [ ] Merge PR to main branch

- [ ] Verify production deployment
  - [ ] Check Actions tab for production deployment
  - [ ] Visit your Vercel dashboard
  - [ ] Test the live production URL

## 🎉 Success Criteria

Your deployment is successful when:
1. ✅ Pull requests automatically get preview deployments
2. ✅ Preview URLs are commented on PRs
3. ✅ Merges to main automatically deploy to production
4. ✅ Deployments appear in your Vercel dashboard
5. ✅ Your site is accessible at the Vercel URL

## 📋 Quick Commands Reference

```bash
# Check workflow status
# Visit: https://github.com/YOUR_ORG/AT-Sale-Application/actions

# View Vercel deployments
# Visit: https://vercel.com/dashboard

# Manual deployment (if needed)
vercel --prod

# Check local project link
cat .vercel/project.json
```

## 🆘 Troubleshooting

If deployment fails:
1. Check the Actions tab for error logs
2. Verify all three secrets are correctly set
3. Ensure the Vercel token hasn't expired
4. Confirm project exists in your Vercel dashboard
5. See detailed troubleshooting in `.github/DEPLOYMENT.md`

## 📚 Documentation

- **Quick Setup:** [SETUP_SECRETS.md](SETUP_SECRETS.md)
- **Detailed Guide:** [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md)
- **Workflow File:** [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- **Main README:** [README.md](README.md)

---

**Next Step:** Complete Phase 2 and 3 to activate your CI/CD pipeline!
