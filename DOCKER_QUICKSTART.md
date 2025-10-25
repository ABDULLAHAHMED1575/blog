# 🚀 Quick Start with Docker & Ngrok

Deploy your blog in 5 minutes!

## 1️⃣ Setup Environment

```bash
# Copy environment variables
cp .env.docker .env
```

## 2️⃣ Start Docker

```bash
# Build and start
docker-compose up -d --build

# View logs (optional)
docker-compose logs -f
```

✅ **App running at**: http://localhost

## 3️⃣ Expose with Ngrok

```bash
# Install ngrok (if not installed)
# Visit: https://ngrok.com/download

# Authenticate (first time only)
ngrok config add-authtoken YOUR_TOKEN_FROM_NGROK_DASHBOARD

# Expose your blog to the internet
ngrok http 80
```

## 4️⃣ Share Your Link!

Copy the `https://` URL from ngrok output:
```
Forwarding   https://abc123.ngrok-free.app -> http://localhost:80
```

**Share this link with anyone!** 🌍

---

## 🛠️ Common Commands

```bash
# Stop containers
docker-compose down

# Restart
docker-compose restart

# View logs
docker-compose logs -f

# Rebuild after changes
docker-compose up -d --build
```

## 📱 What Your Users Can Do

With your ngrok link, users can:
- ✅ View all blog posts
- ✅ Register accounts
- ✅ Login and create posts
- ✅ Upload images
- ✅ Comment on articles
- ✅ Delete their own posts

## 🔒 Security Note

**Before sharing publicly:**
1. Change JWT_TOKEN in `.env` to a strong random string
2. Consider adding ngrok password protection:
   ```bash
   ngrok http 80 --basic-auth "username:password"
   ```

## 📖 Full Documentation

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**That's it! Your blog is live!** 🎉
