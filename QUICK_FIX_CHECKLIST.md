# 🚀 Quick Fix Checklist - Changes Not Visible After Deployment

## ⚡ Most Likely Issues (Check These First!)

### 1. ✅ Vercel Environment Variable Missing

**Problem:** Frontend is still trying to connect to `localhost:5000` instead of your Render backend.

**Fix:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend-name.onrender.com/api
   ```
   ⚠️ Replace `your-backend-name` with your actual Render service name
5. **Redeploy:**
   - Go to **Deployments** tab
   - Click **⋯** on latest deployment
   - Click **Redeploy**
   - ✅ Uncheck "Use existing Build Cache"
   - Click **Redeploy**

---

### 2. ✅ Render CORS Configuration Missing

**Problem:** Backend is blocking requests from your frontend domain.

**Fix:**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **Environment** tab
4. Add/Update:
   ```
   Key: FRONTEND_ORIGIN
   Value: https://your-app.vercel.app,https://ionora.in
   ```
   ⚠️ Replace with your actual Vercel URL and custom domain
5. **Redeploy:**
   - Go to **Manual Deploy**
   - ✅ Check "Clear build cache"
   - Click **Deploy latest commit**

---

### 3. ✅ Clear Browser Cache

**Problem:** Your browser is showing the old cached version.

**Fix:**
- **Windows/Linux:** Press `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac:** Press `Cmd + Shift + R`
- Or open in **Incognito/Private mode**

---

## 🔍 How to Verify It's Fixed

### Step 1: Check Backend is Running
Open in browser:
```
https://your-backend-name.onrender.com/health
```
Should show: `{"status":"ok"}`

### Step 2: Check Frontend API Calls
1. Open your deployed site
2. Press `F12` to open DevTools
3. Go to **Network** tab
4. Refresh the page
5. Look for API requests
6. ✅ They should go to: `https://your-backend-name.onrender.com/api/...`
7. ❌ NOT to: `http://localhost:5000/api/...`

### Step 3: Check for Errors
In DevTools **Console** tab:
- ❌ No CORS errors
- ❌ No "Unable to reach API server" errors
- ✅ API calls should succeed

---

## 📝 Complete Environment Variables Checklist

### Vercel (Frontend) - Required:
```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com/api
```

### Vercel (Frontend) - Optional (if using Razorpay):
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key
```

### Render (Backend) - Required:
```
FRONTEND_ORIGIN=https://your-app.vercel.app,https://ionora.in
DATABASE_URL=your-postgres-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=10000
```

---

## ⏱️ Timeline

After making changes:
1. **Vercel redeploy:** 2-5 minutes
2. **Render redeploy:** 3-7 minutes
3. **DNS propagation:** Up to 48 hours (usually 1-2 hours)

**Total wait time:** ~5-10 minutes for deployments

---

## 🆘 Still Not Working?

1. **Check Render Service Status:**
   - Is it "Live" (green)?
   - Free tier services sleep after 15 min inactivity
   - First request after sleep takes ~30 seconds

2. **Check Vercel Build Logs:**
   - Go to **Deployments** → Click deployment → **Build Logs**
   - Look for errors or warnings

3. **Check Render Logs:**
   - Go to **Logs** tab
   - Look for startup errors or CORS issues

4. **Test API Directly:**
   ```bash
   curl https://your-backend-name.onrender.com/api/products
   ```

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Site loads at your domain
- ✅ No errors in browser console
- ✅ API calls in Network tab go to Render backend (not localhost)
- ✅ Data loads (products, cart, etc.)
- ✅ Changes are visible after hard refresh

---

**Need the full troubleshooting guide?** See `DEPLOYMENT_TROUBLESHOOTING.md`


