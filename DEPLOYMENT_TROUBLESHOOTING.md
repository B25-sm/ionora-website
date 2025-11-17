# Deployment Troubleshooting Guide

## Why Changes Aren't Visible After Deployment

After pushing to Git and deploying to Vercel (frontend) and Render (backend), if changes aren't visible, check these common issues:

---

## ✅ Checklist: Fix Deployment Issues

### 1. **Vercel Environment Variables** (CRITICAL)

The frontend needs to know where your backend API is located.

**In Vercel Dashboard:**
1. Go to your project → **Settings** → **Environment Variables**
2. Add/Update these variables:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

**Important Notes:**
- Replace `your-backend.onrender.com` with your actual Render backend URL
- The URL should NOT end with a trailing slash (the code handles this)
- Must start with `https://`
- After adding/updating, **redeploy** your Vercel project

**How to Redeploy:**
- Go to **Deployments** tab
- Click the three dots (⋯) on the latest deployment
- Select **Redeploy**

---

### 2. **Render Backend Environment Variables** (CRITICAL)

The backend needs to allow requests from your frontend domain.

**In Render Dashboard:**
1. Go to your backend service → **Environment** tab
2. Add/Update this variable:

```
FRONTEND_ORIGIN=https://your-vercel-app.vercel.app,https://ionora.in
```

**Important Notes:**
- Include BOTH your Vercel preview URL AND your custom domain
- Separate multiple origins with commas (no spaces)
- Must include `https://` protocol
- After updating, **restart** your Render service

**How to Restart:**
- Go to **Events** tab
- Click **Manual Deploy** → **Clear build cache & deploy**

---

### 3. **Clear Build Cache**

Both platforms cache builds. Clear them to ensure fresh builds:

**Vercel:**
- Go to **Deployments** → Latest deployment → **⋯** → **Redeploy**
- Check **"Use existing Build Cache"** → **Uncheck it**
- Click **Redeploy**

**Render:**
- Go to **Manual Deploy** → Check **"Clear build cache"**
- Click **Deploy latest commit**

---

### 4. **Verify Backend is Running**

Test your backend API directly:

```bash
# Replace with your Render backend URL
curl https://your-backend.onrender.com/health
```

Expected response:
```json
{"status":"ok"}
```

If this fails, your backend isn't running properly on Render.

---

### 5. **Check Domain Configuration**

**Vercel Domain Setup:**
1. Go to **Settings** → **Domains**
2. Verify your custom domain (`ionora.in`) is added
3. Check DNS records match Vercel's instructions:
   - A Record or CNAME pointing to Vercel
4. Wait for DNS propagation (can take up to 48 hours, usually 1-2 hours)

**Test Domain:**
```bash
# Check if domain resolves
nslookup ionora.in
```

---

### 6. **Verify Git Push**

Ensure your changes are actually in the repository:

```bash
# Check recent commits
git log --oneline -5

# Verify you're on the correct branch
git branch

# Check if remote is up to date
git status
```

**If changes aren't pushed:**
```bash
git add .
git commit -m "Your commit message"
git push origin main  # or your branch name
```

---

### 7. **Check Browser Cache**

Your browser might be caching the old version:

1. **Hard Refresh:**
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Clear Cache:**
   - Open DevTools (F12)
   - Right-click refresh button → **Empty Cache and Hard Reload**

3. **Test in Incognito/Private Mode:**
   - This bypasses cache completely

---

### 8. **Check Vercel Build Logs**

1. Go to **Deployments** → Click on a deployment
2. Check **Build Logs** for errors
3. Look for:
   - Build failures
   - Environment variable warnings
   - Missing dependencies

---

### 9. **Check Render Logs**

1. Go to your Render service → **Logs** tab
2. Look for:
   - Server startup errors
   - Database connection issues
   - Environment variable errors
   - CORS errors

---

### 10. **Verify API Connection**

Open browser DevTools (F12) → **Network** tab:
1. Visit your deployed site
2. Look for API requests
3. Check if they're going to:
   - ❌ `http://localhost:5000` (wrong - using default)
   - ✅ `https://your-backend.onrender.com/api` (correct)

If you see `localhost`, your `NEXT_PUBLIC_API_URL` isn't set in Vercel.

---

## 🔧 Quick Fix Steps (Do These First)

1. **Set Vercel Environment Variable:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
   ```

2. **Set Render Environment Variable:**
   ```
   FRONTEND_ORIGIN=https://your-app.vercel.app,https://ionora.in
   ```

3. **Redeploy Both:**
   - Vercel: Redeploy with cleared cache
   - Render: Manual deploy with cleared cache

4. **Wait 2-5 minutes** for deployments to complete

5. **Hard refresh** your browser (`Ctrl + Shift + R`)

---

## 🐛 Common Error Messages

### "Unable to reach the API server"
- **Cause:** `NEXT_PUBLIC_API_URL` not set or incorrect
- **Fix:** Set correct backend URL in Vercel env vars

### CORS errors in browser console
- **Cause:** `FRONTEND_ORIGIN` not set in Render or doesn't include your domain
- **Fix:** Add your frontend URL(s) to Render `FRONTEND_ORIGIN`

### "404 Not Found" on API calls
- **Cause:** Backend URL missing `/api` suffix
- **Fix:** Ensure `NEXT_PUBLIC_API_URL` ends with `/api`

### Changes not visible after deployment
- **Cause:** Build cache or browser cache
- **Fix:** Clear build cache and hard refresh browser

---

## 📋 Environment Variables Summary

### Vercel (Frontend)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

### Render (Backend)
```
FRONTEND_ORIGIN=https://your-app.vercel.app,https://ionora.in
DATABASE_URL=your-postgres-connection-string
JWT_SECRET=your-secret-key
PORT=10000
NODE_ENV=production
# ... other backend env vars
```

---

## ✅ Verification Steps

After fixing the above, verify:

1. ✅ Backend health check works: `https://your-backend.onrender.com/health`
2. ✅ Frontend loads at your domain
3. ✅ Browser DevTools Network tab shows API calls to Render backend (not localhost)
4. ✅ No CORS errors in browser console
5. ✅ Changes are visible (hard refresh if needed)

---

## 🆘 Still Not Working?

1. **Check Render Service Status:**
   - Is the service "Live" (not sleeping)?
   - Render free tier services sleep after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds

2. **Check Vercel Deployment Status:**
   - Is deployment "Ready" (green checkmark)?
   - Any build errors?

3. **Test API Directly:**
   ```bash
   curl https://your-backend.onrender.com/api/products
   ```

4. **Check DNS Propagation:**
   - Use https://dnschecker.org to verify DNS records

5. **Review Both Platform Logs:**
   - Vercel build logs
   - Render runtime logs

---

**Need More Help?**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Check both platform's status pages for outages



