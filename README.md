# Running Laravel (Backend) and Next.js (Frontend) Together on macOS with XAMPP

This guide explains how to run a Laravel backend and a Next.js frontend simultaneously on macOS using XAMPP, with domain routing and CORS support.

---

## 📁 Project Structure

```bash
/Applications/XAMPP/xamppfiles/htdocs/
├── ihelpcare_backend          # Laravel backend
└── ihelpcare_frontend # Next.js frontend
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

### 4. Laravel Environment Setup
```env
APP_URL=http://api.ihelp.test
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Install Laravel Dependencies
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend
composer install
cp .env.example .env
php artisan key:generate
```

### 6. Fix Permissions
```bash
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R $(whoami):staff storage bootstrap/cache
```

### 7. Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
```

### 8. Start Apache from XAMPP UI
- Open XAMPP Control Panel
- Start **Apache** and **MySQL**
- Visit: http://api.ihelp.test

---

## 🌐 Next.js Frontend Setup

### 1. Project Directory
Place frontend in:
```bash
~/Documents/ihelpcare_Website_frontend
```

### 2. Configure .env.local
```env
APP_NAME="iHelp"
API_BASE_URL="http://api.ihelp.test"
API_SUFFIX_URL="/api/v1"
```

### 3. Install Dependencies
```bash
cd ~/Documents/ihelpcare_Website_frontend
npm install
```

### 4. Start Development Server
```bash
npm run dev -p 3041
```
Frontend runs at:
```
http://localhost:3041
```

---

## 🔐 Laravel CORS Configuration
Edit `config/cors.php`:
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3041'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```
Then clear config:
```bash
php artisan config:clear
php artisan cache:clear
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
