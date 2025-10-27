# Deployment Guide for ionora.in

## Current Status
✅ Code pushed to GitHub: https://github.com/B25-sm/ionora-website
✅ Build successful - All pages compiled successfully
✅ Domain metadata configured for ionora.in
❌ Not yet deployed to ionora.in domain

## Deployment Options for ionora.in

### Option 1: Vercel (Recommended for Next.js)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Import Project**:
   - Click "Add New Project"
   - Select repository: `B25-sm/ionora-website`
4. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
5. **Add Domain**:
   - Go to Project Settings → Domains
   - Add custom domain: `ionora.in`
   - Follow DNS configuration instructions
6. **Deploy**: Click "Deploy"

**Advantages**: 
- Free tier available
- Automatic deployments on git push
- Built-in SSL certificates
- Optimized for Next.js
- Fast global CDN

### Option 2: Netlify

1. **Go to Netlify**: https://app.netlify.com
2. **Sign up/Login** with GitHub
3. **New Site from Git**:
   - Connect to GitHub
   - Select repository: `ionora-website`
4. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Add Domain**:
   - Site Settings → Domain Management
   - Add custom domain: `ionora.in`
6. **Deploy**: Click "Deploy site"

### Option 3: Self-Hosted (VPS/Server)

If you have a VPS with ionora.in DNS access:

```bash
# On your server
git clone https://github.com/B25-sm/ionora-website.git
cd ionora-website
npm install
npm run build
npm start

# Configure Nginx/PM2 for production
```

## Current Configuration

- **Framework**: Next.js 15.5.6
- **Build Status**: ✅ Successful
- **Color Palette**: Deep Navy (#0A2238) + Light Grey (#EBEBEB)
- **Domain Target**: ionora.in

## DNS Configuration

After choosing a hosting provider, configure DNS records:

```
A Record:    @ -> [Provider IP Address]
CNAME:       www -> [Provider domain]

Example for Vercel:
CNAME:  @ -> cname.vercel-dns.com
CNAME:  www -> cname.vercel-dns.com
```

## Post-Deployment Checklist

- [ ] Website loads at ionora.in
- [ ] HTTPS/SSL certificate active
- [ ] All pages accessible
- [ ] Images loading correctly
- [ ] Forms/links working
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Analytics configured (optional)

## Quick Deploy Commands

```bash
# Test build locally
npm run build
npm start

# Deploy to Vercel (if CLI installed)
npm i -g vercel
vercel --prod
```

---

**Need Help?** 
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Next.js Deployment: https://nextjs.org/docs/deployment
