# Blog Platform - Docker & Ngrok Deployment Guide

This guide will help you deploy the blog platform using Docker and expose it to the internet using ngrok.

## Prerequisites

- Docker and Docker Compose installed
- Ngrok account (free tier works fine)
- MongoDB Atlas connection (already configured)

## 📦 Docker Deployment

### Step 1: Prepare Environment Variables

Copy the example environment file and update if needed:

```bash
cp .env.docker .env
```

Edit `.env` and verify/update these values:
```env
DB_URI=mongodb+srv://abdullahmed1575:abdu0326ahm070@cluster0.oocvv.mongodb.net/
JWT_TOKEN=s3cr3t!@#JWTk3y$%^2025
NODE_ENV=production
PORT=8000
```

> ⚠️ **Security Note**: Change the JWT_TOKEN to a strong random string in production!

### Step 2: Build and Start Docker Containers

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Check container status
docker-compose ps
```

This will:
- Build the backend Node.js container (port 8000)
- Build the frontend nginx container (port 80)
- Create a network for inter-container communication
- Set up volume for persistent uploads

### Step 3: Verify Deployment

1. **Check backend**: Open http://localhost:8000
   - You should see "Server is running..."

2. **Check frontend**: Open http://localhost
   - You should see the blog homepage

3. **Test the app**:
   - Register a new account
   - Create a post
   - Upload an image
   - View the post

## 🌐 Ngrok Deployment (Public Access)

### Step 1: Install Ngrok

**Option 1: Download Binary**
```bash
# Linux/Mac
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar xvzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin/
```

**Option 2: Use Package Manager**
```bash
# Ubuntu/Debian
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok

# Mac
brew install ngrok/ngrok/ngrok
```

### Step 2: Configure Ngrok

1. Sign up at https://ngrok.com (free account)
2. Get your auth token from https://dashboard.ngrok.com/get-started/your-authtoken
3. Configure ngrok:

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Step 3: Expose Your Blog

**Make sure Docker containers are running first!**

```bash
# Expose port 80 (frontend)
ngrok http 80
```

You'll see output like:
```
Forwarding   https://abc123.ngrok-free.app -> http://localhost:80
```

Your blog is now accessible at: **https://abc123.ngrok-free.app**

### Step 4: Share the Link

Copy the `https://` URL and share it with anyone! They can:
- View your blog
- Register accounts
- Create posts
- Comment on articles

## 🔧 Advanced Ngrok Configuration

### Custom Domain (Paid Feature)

Create `ngrok.yml`:
```yaml
version: "2"
authtoken: YOUR_AUTH_TOKEN
tunnels:
  blog:
    addr: 80
    proto: http
    domain: your-custom-domain.ngrok.io
```

Start with:
```bash
ngrok start blog
```

### Basic Authentication

Add password protection:
```bash
ngrok http 80 --basic-auth "username:password"
```

### Regional Endpoint

Choose region for better performance:
```bash
ngrok http 80 --region us    # United States
ngrok http 80 --region eu    # Europe
ngrok http 80 --region ap    # Asia Pacific
ngrok http 80 --region au    # Australia
ngrok http 80 --region sa    # South America
ngrok http 80 --region jp    # Japan
ngrok http 80 --region in    # India
```

## 🐳 Docker Commands Reference

### Container Management

```bash
# Stop all containers
docker-compose down

# Restart containers
docker-compose restart

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Rebuild after code changes
docker-compose up -d --build

# Remove everything (including volumes)
docker-compose down -v
```

### Debugging

```bash
# Access backend container shell
docker exec -it blog-backend sh

# Access frontend container shell
docker exec -it blog-frontend sh

# Check backend health
curl http://localhost:8000

# Check frontend health
curl http://localhost
```

### Database Access

```bash
# Backup uploads folder
docker cp blog-backend:/app/uploads ./uploads-backup

# Restore uploads folder
docker cp ./uploads-backup/. blog-backend:/app/uploads
```

## 🔒 Security Considerations

### For Production Deployment:

1. **Change JWT Secret**
   ```env
   JWT_TOKEN=USE_A_STRONG_RANDOM_SECRET_HERE
   ```

2. **Secure MongoDB**
   - Use environment variables for credentials
   - Create a separate database user with limited permissions
   - Enable IP whitelisting in MongoDB Atlas

3. **HTTPS Only**
   - Ngrok provides HTTPS by default ✅
   - For custom domains, configure SSL certificates

4. **Rate Limiting**
   - Consider adding rate limiting to prevent abuse
   - Ngrok has built-in rate limits on free tier

5. **Environment Variables**
   - Never commit `.env` file to git
   - Use Docker secrets for sensitive data in production

## 📊 Monitoring

### Check Container Health

```bash
# View resource usage
docker stats

# Check container health status
docker-compose ps
```

### View Application Logs

```bash
# All logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100 -f

# Specific service
docker-compose logs -f backend
```

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Check what's using port 80
sudo lsof -i :80

# Stop the conflicting service or change ports
# Edit docker-compose.yml:
ports:
  - "8080:80"  # Use port 8080 instead
```

### Build Fails

```bash
# Clean build
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Database Connection Issues

1. Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for testing)
2. Verify connection string in `.env`
3. Check backend logs: `docker-compose logs backend`

### Images Not Loading

1. Check uploads folder: `docker exec blog-backend ls -la /app/uploads`
2. Verify nginx proxy config
3. Check browser console for 404 errors

## 🎯 Quick Start Checklist

- [ ] Install Docker and Docker Compose
- [ ] Create `.env` file from `.env.docker`
- [ ] Run `docker-compose up -d --build`
- [ ] Verify app at http://localhost
- [ ] Install ngrok
- [ ] Configure ngrok auth token
- [ ] Run `ngrok http 80`
- [ ] Share the ngrok URL!

## 📞 Support

If you encounter issues:
1. Check logs: `docker-compose logs -f`
2. Verify ports: `docker-compose ps`
3. Check environment variables in `.env`
4. Ensure MongoDB Atlas is accessible

---

**Enjoy your deployed blog platform!** 🚀

Share your ngrok link and let others explore your blog!
