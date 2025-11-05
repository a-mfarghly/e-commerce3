# Step-by-Step Guide: How to Login as Admin

## Quick Answer

**Login Route:** `/login` (or `http://localhost:3000/login`)

### Steps to Login as Admin:

1. **Go to the login page:** Navigate to `/login`
2. **Enter admin credentials:** Email and Password of an admin account
3. **Click Sign in:** The system will automatically redirect you to `/admin` if you're an admin

---

## How to Create/Get Admin Credentials

Since this project uses an **external API** (`https://ecommerce.routemisr.com/api/v1`), you have several options:

### Option 1: Use Existing Admin Account (If Available)

If you have access to an admin account:
1. Go to `/login`
2. Enter admin email and password
3. You'll be redirected to `/admin` automatically

### Option 2: Update Existing User to Admin (Using API)

If you have a regular user account and want to make it admin, you can use the admin API:

**Note:** This requires you to already have admin privileges or access to update users.

```javascript
// In browser console or a test page
const token = localStorage.getItem('token'); // Your auth token

// Update user role to admin
const updateUserToAdmin = async (userId) => {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        role: 'admin'
      })
    });
    
    const data = await response.json();
    console.log('User updated:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Use it: updateUserToAdmin('user_id_here');
```

### Option 3: Create New Admin User Through API

If the API allows creating admin users directly:

```javascript
// Check if API supports admin user creation
const createAdminUser = async () => {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'yourPassword123',
        rePassword: 'yourPassword123',
        phone: '+1234567890',
        role: 'admin' // If API supports this
      })
    });
    
    const data = await response.json();
    console.log('Admin user created:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Option 4: Contact Backend Provider

Since this uses `routemisr.com` API:
- Contact the service provider to create an admin account
- Or ask for existing admin credentials
- Or get access to the backend database to create/update admin users

---

## Testing Admin Login

### Step 1: Check Your Current User Role

Open browser console and check:
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Current user:', user);
console.log('User role:', user?.role);
```

### Step 2: Login Process

1. **Navigate to:** `http://localhost:3000/login`
2. **Enter credentials:**
   - Email: `your-admin-email@example.com`
   - Password: `your-admin-password`
3. **Click "Sign in"**
4. **Expected behavior:**
   - ✅ If role is `"admin"` → Redirects to `/admin`
   - ❌ If role is `"user"` → Redirects to `/` (home)

### Step 3: Verify Admin Access

After login, check:
```javascript
// In browser console
const user = JSON.parse(localStorage.getItem('user'));
if (user?.role === 'admin') {
  console.log('✅ Admin access confirmed!');
  // Navigate to: http://localhost:3000/admin
} else {
  console.log('❌ Not an admin. Current role:', user?.role);
}
```

---

## Troubleshooting

### Problem: Login redirects to home instead of `/admin`

**Solution:** Your user doesn't have admin role. Check:
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log(user?.role); // Should be "admin"
```

**Fix:** Update the user's role through the API or backend.

### Problem: Can't access `/admin` page

**Possible causes:**
1. User role is not `"admin"`
2. Token expired
3. User data not properly stored in localStorage

**Solution:**
1. Logout and login again
2. Check localStorage:
   ```javascript
   localStorage.getItem('token');
   localStorage.getItem('user');
   ```
3. Verify user object has `role: "admin"`

### Problem: "Authentication required" error

**Solution:** Make sure you're logged in:
```javascript
// Check if token exists
if (!localStorage.getItem('token')) {
  console.log('Not logged in. Go to /login');
} else {
  console.log('Logged in!');
}
```

---

## Quick Test Script

Run this in browser console to test admin login:

```javascript
// Test Admin Login Flow
const testAdminLogin = () => {
  // Step 1: Check current status
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) {
    console.log('❌ Not logged in. Please login first at /login');
    return;
  }
  
  const user = JSON.parse(userStr);
  
  // Step 2: Check role
  if (user.role === 'admin') {
    console.log('✅ Admin user confirmed!');
    console.log('User:', user.name);
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('\n👉 Navigate to: http://localhost:3000/admin');
  } else {
    console.log('❌ Not an admin user');
    console.log('Current role:', user.role);
    console.log('\n💡 To become admin, update user role through API or backend');
  }
};

// Run it
testAdminLogin();
```

---

## Important Notes

1. **This is a frontend-only project** - It doesn't manage the database directly
2. **Admin users must be created on the backend** - The external API controls user roles
3. **The login page automatically handles redirects** - Admin users go to `/admin`, regular users go to `/`
4. **Route protection is in place** - `/admin` is protected and requires admin role

---

## Summary

**To login as admin:**
1. Go to `/login`
2. Login with admin credentials (user with `role: "admin"`)
3. You'll be automatically redirected to `/admin`

**To create an admin account:**
- Contact the backend API provider (routemisr.com)
- Or use the API to update an existing user's role to `"admin"`
- Or access the backend database directly (if you have access)

