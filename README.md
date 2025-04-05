# 🛠️ Prerequisites & Setup Environment

Make sure the following software versions are installed on your macOS system:

- **XAMPP**: [Download XAMPP for macOS](https://www.apachefriends.org/index.html)
  - Tested with: `XAMPP 8.2.x` (includes Apache, PHP 8.2, MySQL)
- **PHP**: 8.2 or later (comes bundled with XAMPP)
- **Composer**: [Get Composer](https://getcomposer.org/)
- **Laravel Framework**: 10.48.11
- **Node.js**: 18.x or later
- **npm**: 9.x or later
- **Next.js**: 14.2.3
- **Git**: (optional but recommended)

---

# Running Laravel (Backend) and Next.js (Frontend) Together on macOS with XAMPP

This guide explains how to run a Laravel backend and a Next.js frontend simultaneously on macOS using XAMPP, with domain routing and CORS support.

---

## 📁 Project Structure

```bash
/Applications/XAMPP/xamppfiles/htdocs/
├── ihelpcare_backend      # Laravel backend
└── ihelpcare_frontend    # Next.js frontend
```

---

## ✅ Laravel Backend Setup (XAMPP)

### 1. Place Code in XAMPP htdocs
```bash
/Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend
```

### 2. Apache Virtual Host Configuration
Edit:
```bash
sudo nano /Applications/XAMPP/xamppfiles/etc/extra/httpd-vhosts.conf
```

Add:
```apache
<VirtualHost *:80>
    ServerName api.ihelp.test
    DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend/public"
    <Directory "/Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend/public">
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog "logs/api.ihelp.test-error_log"
    CustomLog "logs/api.ihelp.test-access_log" common
</VirtualHost>
```

### 3. Update /etc/hosts
```bash
sudo nano /etc/hosts
```
Add:
```bash
127.0.0.1 api.ihelp.test
```

### 4. Install Laravel Dependencies
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend
composer install
php artisan key:generate
```

### 5. Fix Permissions
```bash
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R $(whoami):staff storage bootstrap/cache
```

### 6. Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
```

### 7. Start Apache from XAMPP UI
- Open XAMPP Control Panel
- Start **Apache** and **MySQL**
- Visit: http://api.ihelp.test

---

## 🌐 Next.js Frontend Setup

### 1. Install Dependencies
```bash
/Applications/XAMPP/xamppfiles/htdocs/ihelpcare_frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev -p 3041
```
Frontend runs at:
```
http://localhost:3041
```

---

## 🧪 Test
- Open http://localhost:3041
- Signup/Login
- Verify API works without CORS errors

---

## 🔄 Useful Commands
```bash
# Restart Apache
sudo apachectl restart

# Laravel Migrations
php artisan migrate --seed

# Start Frontend
npm run dev -p 3041
```

---

## ✅ Done
You now have a working Laravel + Next.js fullstack setup on macOS using XAMPP, domain routing, and CORS support for development.

---

## 🗃️ Import MySQL Database

### 1. Open phpMyAdmin from XAMPP UI
- Start MySQL from the XAMPP Control Panel.
- Open http://localhost/phpmyadmin in your browser.

### 2. Create Database
- Click **New**, and create a database named: `ihelpcare_db`

### 3. Import SQL File
- Click on the `ihelpcare_db` database.
- Go to the **Import** tab.
- Choose the file: `ihelp.sql`
- Click **Go** to import the structure and data.

