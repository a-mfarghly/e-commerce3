# Wishlist API Integration Guide

## Overview
This guide explains how the wishlist functionality is integrated with the Route E-commerce API.

## APIs Used

### 1. Get Wishlist
- **Endpoint**: `GET /api/v1/wishlist`
- **Headers**: `Authorization: Bearer <jwt_token_here>`
- **Response**: Array of wishlist products

### 2. Add to Wishlist
- **Endpoint**: `POST /api/v1/wishlist`
- **Headers**: `Authorization: Bearer <jwt_token_here>`
- **Body**: `{ "productId": "PRODUCT_ID" }`
- **Response**: Updated wishlist array

### 3. Remove from Wishlist
- **Endpoint**: `DELETE /api/v1/wishlist/:productId`
- **Headers**: `Authorization: Bearer <jwt_token_here>`
- **Response**: Updated wishlist array

## Components

### WishlistProvider
- Manages wishlist state and operations
- Provides `toggle`, `addToWishlist`, `removeFromWishlist` functions
- Handles API calls with fallback to mock data
- Manages loading states and error handling

### Heart Component
- Reusable heart icon for wishlist toggle
- Shows loading state during API calls
- Handles click events and error display

### ProductCard
- Uses Heart component for wishlist functionality
- Integrates with cart functionality

## Usage Examples

### Basic Toggle
```tsx
import { useWishlist } from "@/components/WishlistProvider";

function MyComponent() {
  const { toggle, isInWishlist, loading } = useWishlist();
  
  const handleToggle = async (productId: string) => {
    try {
      await toggle(productId);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <button onClick={() => handleToggle('product123')}>
      {isInWishlist('product123') ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
  );
}
```

### Using Heart Component
```tsx
import Heart from "@/components/Heart";

function ProductCard({ product }) {
  return (
    <div>
      <Heart productId={product._id} />
    </div>
  );
}
```

## Error Handling

The system handles various error scenarios:

1. **Authentication Errors (401)**: 
   - Clears invalid tokens
   - Redirects to login page
   - Shows appropriate error messages

2. **Network Errors**: 
   - Falls back to mock data
   - Shows user-friendly error messages

3. **API Errors**: 
   - Logs detailed error information
   - Shows generic error messages to users

## State Management

- **wishlistItems**: Array of current wishlist products
- **wishlistCount**: Number of items in wishlist
- **loading**: Boolean indicating if operation is in progress
- **isInWishlist**: Function to check if product is in wishlist

## Real-time Updates

The system uses custom events to synchronize wishlist state across components:
- `wishlistUpdated`: Dispatched when wishlist changes
- Components listen for this event to refresh their state

## Mock Data Fallback

When the API is unavailable, the system falls back to mock data stored in localStorage:
- Products are stored as IDs in localStorage
- Mock product data is used to populate the wishlist
- All operations work seamlessly with mock data

## Best Practices

1. Always handle errors gracefully
2. Show loading states during API calls
3. Provide clear feedback to users
4. Use the Heart component for consistent UI
5. Test with both real API and mock data

