# Deployment to Raspberry Pi 4

## Overview

```
Internet/LAN
     ↓
   Nginx (port 80)
     ↓
   Next.js (port 3000) ← managed by PM2
     ↓
   PostgreSQL (port 5432)
```

---

## Phase 1: Ubuntu Server Setup

### Install Ubuntu Server on Pi
- Download: https://ubuntu.com/download/raspberry-pi
- Use Raspberry Pi Imager to flash SD card
- Enable SSH during setup (or create empty `ssh` file in boot partition)

### First Boot
```bash
# SSH into Pi (find IP from router or use hostname)
ssh ubuntu@<pi-ip-address>

# Update system
sudo apt update && sudo apt upgrade -y

# Set timezone
sudo timedatectl set-timezone <your-timezone>

# Create non-root user (optional but recommended)
sudo adduser yourname
sudo usermod -aG sudo yourname
```

### Resources
- Ubuntu Server Pi Guide: https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi

---

## Phase 2: PostgreSQL

### Install
```bash
sudo apt install postgresql postgresql-contrib -y
```

### Create Database and User
```bash
# Switch to postgres user
sudo -u postgres psql

# In psql:
CREATE USER dashboard_user WITH PASSWORD 'your-secure-password';
CREATE DATABASE life_dashboard OWNER dashboard_user;
GRANT ALL PRIVILEGES ON DATABASE life_dashboard TO dashboard_user;
\q
```

### Run Migrations
```bash
# From your project directory
psql -U dashboard_user -d life_dashboard -f migrations/initial_001.sql
```

### Resources
- PostgreSQL Ubuntu Guide: https://www.postgresql.org/download/linux/ubuntu/
- PostgreSQL Basics: https://www.postgresqltutorial.com/

---

## Phase 3: Node.js

### Install Node.js 20 LTS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

### Clone and Build
```bash
# Clone your repo
git clone <your-repo-url>
cd life_dashboard

# Install dependencies
npm install

# Create .env file with database credentials
nano .env
# Add: DATABASE_URL=postgresql://dashboard_user:password@localhost:5432/life_dashboard

# Build for production
npm run build
```

### Resources
- Node.js Downloads: https://nodejs.org/en/download/package-manager

---

## Phase 4: PM2 (Process Manager)

PM2 keeps your app running after SSH disconnect and restarts on crash.

### Install
```bash
sudo npm install -g pm2
```

### Start App
```bash
cd life_dashboard
pm2 start npm --name "life-dashboard" -- start
```

### Useful Commands
```bash
pm2 status          # Check running processes
pm2 logs            # View logs
pm2 restart all     # Restart all apps
pm2 stop all        # Stop all apps
pm2 delete all      # Remove all from PM2
```

### Auto-start on Boot
```bash
pm2 startup         # Generates startup script
pm2 save            # Save current process list
```

### Resources
- PM2 Documentation: https://pm2.keymetrics.io/docs/usage/quick-start/

---

## Phase 5: Nginx (Reverse Proxy)

Nginx sits in front of your app, handles HTTP traffic, and later SSL.

### Install
```bash
sudo apt install nginx -y
```

### Configure
```bash
sudo nano /etc/nginx/sites-available/life-dashboard
```

Add:
```nginx
server {
    listen 80;
    server_name <pi-ip-or-hostname>;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/life-dashboard /etc/nginx/sites-enabled/
sudo nginx -t                    # Test config
sudo systemctl restart nginx     # Apply
```

### Resources
- Nginx Beginner Guide: https://nginx.org/en/docs/beginners_guide.html

---

## Phase 6 (Optional): SSL with Let's Encrypt

Only needed if exposing to internet (not just local network).

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

---

## Quick Reference

### Service Management (systemd)
```bash
sudo systemctl status postgresql    # Check status
sudo systemctl start postgresql     # Start
sudo systemctl stop postgresql      # Stop
sudo systemctl restart postgresql   # Restart
sudo systemctl enable postgresql    # Auto-start on boot
```

### Check What's Running
```bash
pm2 status                          # Node apps
sudo systemctl status nginx         # Nginx
sudo systemctl status postgresql    # PostgreSQL
```

### View Logs
```bash
pm2 logs                            # App logs
sudo tail -f /var/log/nginx/error.log   # Nginx errors
sudo tail -f /var/log/postgresql/*.log  # PostgreSQL logs
```

### Firewall (UFW)
```bash
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status
```

---

## Environment Variables

Create `.env` in project root (never commit this):
```
DATABASE_URL=postgresql://dashboard_user:password@localhost:5432/life_dashboard
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
NODE_ENV=production
```

Add `.env` to `.gitignore`:
```bash
echo ".env" >> .gitignore
```

---

## Deployment Checklist

- [ ] Ubuntu Server installed on Pi
- [ ] SSH access working
- [ ] PostgreSQL installed and running
- [ ] Database and user created
- [ ] Migrations run
- [ ] Node.js installed
- [ ] Repo cloned
- [ ] .env configured
- [ ] App built (`npm run build`)
- [ ] PM2 running app
- [ ] PM2 startup configured
- [ ] Nginx installed and configured
- [ ] Firewall configured
