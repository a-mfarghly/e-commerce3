# Admin Credentials

## Local Admin Login Credentials

You can now login as admin using the following credentials stored locally:

**Email:** `admin@admin.com`  
**Password:** `admin123`

---

## How to Login

1. Go to `/login` (or `http://localhost:3000/login`)
2. Enter the admin credentials:
   - **Email:** `admin@admin.com`
   - **Password:** `admin123`
3. Click "Sign in"
4. You will be automatically redirected to `/admin` dashboard

---

## Files Created

1. **`src/data/adminCredentials.ts`** - Contains admin credentials
2. **`src/services/localAuth.ts`** - Service functions for local admin authentication
3. **Updated `src/components/AuthProvider.tsx`** - Checks local admin credentials first before API

---

## How It Works

1. When you login, the system first checks if your credentials match the local admin credentials
2. If they match, you're logged in as admin with `role: "admin"`
3. If they don't match, it tries the API login (regular user login)
4. After successful admin login, you're redirected to `/admin` dashboard

---

## Changing Admin Credentials

To change the admin email or password, edit the file:
**`src/data/adminCredentials.ts`**

```typescript
export const adminCredentials = {
  admin: {
    email: "your-admin-email@example.com",  // Change this
    password: "your-secure-password",         // Change this
    name: "Admin User",
    role: "admin",
    phone: "+1234567890",
    _id: "admin_local_user"
  }
};
```

After changing the credentials, you'll need to restart your development server.

---

## Security Note

⚠️ **Important:** These credentials are stored in the frontend code and are visible to anyone who has access to the codebase. This is fine for development and testing, but for production:

1. Never commit real admin credentials to version control
2. Use environment variables for sensitive credentials
3. Implement proper backend authentication
4. Use secure password hashing

---

## Testing

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Enter:
   - Email: `admin@admin.com`
   - Password: `admin123`
4. You should be redirected to `/admin` after login

---

## Troubleshooting

**Problem:** Login redirects to home instead of `/admin`

**Solution:** 
- Make sure you're using the exact credentials: `admin@admin.com` / `admin123`
- Check browser console for any errors
- Verify the credentials in `src/data/adminCredentials.ts`

**Problem:** "Invalid email or password" error

**Solution:**
- Check that email and password match exactly (case-sensitive for password)
- Email comparison is case-insensitive, but password is case-sensitive
- Check browser console for detailed error messages

