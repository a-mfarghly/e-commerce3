# Admin Login Guide

## How to Login as Admin

### Step 1: Access the Login Page

**Route:** `/login`

You can access the login page by navigating to:
```
http://localhost:3000/login
```

### Step 2: Login with Admin Credentials

Use your admin account credentials:
- **Email:** Your admin email address
- **Password:** Your admin password

### Step 3: Automatic Redirect

After successful login:
- **Admin users** (`role: "admin"`) will be automatically redirected to `/admin`
- **Regular users** will be redirected to `/` (home page)

### Step 4: Access Admin Dashboard

**Admin Dashboard Route:** `/admin`

Once logged in as admin, you can access:
- **Dashboard Overview:** `/admin`
- **Products Management:** `/admin/products` (to be created)
- **Orders Management:** `/admin/orders` (to be created)
- **Users Management:** `/admin/users` (to be created)
- **Categories Management:** `/admin/categories` (to be created)
- **Brands Management:** `/admin/brands` (to be created)

---

## Creating an Admin Account

### Option 1: Through the Backend/Database

You need to create a user account with `role: "admin"` in your database. This typically needs to be done through:

1. **Direct Database Access:**
   - Connect to your MongoDB database
   - Find or create a user document
   - Set the `role` field to `"admin"`

2. **API/Backend Tools:**
   - Use your backend API to create an admin user
   - Or use a database management tool

### Option 2: Update Existing User to Admin

If you have an existing user account:

1. Access your database
2. Find the user document by email
3. Update the `role` field:
   ```json
   {
     "role": "admin"
   }
   ```

### Example User Document Structure

```json
{
  "_id": "user_id_here",
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "role": "admin",
  "active": true,
  "addresses": [],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Route Protection

The admin dashboard is protected by `AdminRouteGuard` component which:

1. ✅ Checks if user is authenticated
2. ✅ Checks if user has `role: "admin"`
3. ✅ Redirects to `/login` if not authenticated
4. ✅ Redirects to `/` (home) if authenticated but not admin

---

## Admin API Endpoints

All admin API calls require authentication. The `adminApi.ts` service handles:

- **Products:** Create, Read, Update, Delete products
- **Orders:** View and update order status
- **Users:** Manage users (create, update, delete, toggle active)
- **Categories:** Manage categories
- **Brands:** Manage brands
- **Dashboard Stats:** Get dashboard statistics

**Base URL:** `https://ecommerce.routemisr.com/api/v1`

**Authentication:** Bearer token (stored in localStorage as `token`)

---

## Testing Admin Login

### Quick Test Steps:

1. **Create Admin User:**
   ```javascript
   // You'll need to do this through your backend/database
   // Set user.role = "admin"
   ```

2. **Login:**
   - Go to `/login`
   - Enter admin email and password
   - Submit form

3. **Verify:**
   - Should redirect to `/admin`
   - Should see admin dashboard with sidebar
   - Should not be able to access `/admin` without admin role

---

## Troubleshooting

### Issue: Login works but redirects to home instead of `/admin`

**Solution:** Check that your user object has `role: "admin"` in the database.

### Issue: Can't access `/admin` even after login

**Possible causes:**
1. User role is not set to "admin" in database
2. Token expired - try logging out and logging back in
3. User object in localStorage doesn't have correct role

**Solution:**
- Check localStorage: `localStorage.getItem('user')`
- Verify the JSON contains `"role": "admin"`
- If not, update the user in database and re-login

### Issue: Getting redirected to login when accessing `/admin`

**Solution:**
- Make sure you're logged in
- Check that token exists: `localStorage.getItem('token')`
- Verify token is valid (not expired)

---

## Security Notes

⚠️ **Important:**
- Admin routes are protected on the client-side
- Make sure your backend API also checks for admin role
- Never trust client-side authentication alone
- Always validate admin role on the server side
- Use HTTPS in production

---

## Quick Reference

| Route | Purpose | Access |
|-------|---------|--------|
| `/login` | Login page | Public |
| `/admin` | Admin dashboard | Admin only |
| `/admin/products` | Products management | Admin only |
| `/admin/orders` | Orders management | Admin only |
| `/admin/users` | Users management | Admin only |
| `/admin/categories` | Categories management | Admin only |
| `/admin/brands` | Brands management | Admin only |

