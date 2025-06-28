# DevConnect API Testing Guide

## Available Routes

### Authentication Routes (`/api/auth`)

- `GET /api/auth` - Welcome message
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Post Routes (`/api/posts`)

- `GET /api/posts` - Get all posts
- `POST /api/posts/addPost` - Create new post
- `PUT /api/posts/like/:id` - Like a post (protected)
- `PUT /api/posts/unlike/:id` - Unlike a post (protected)

### User Routes (`/api/user`)

- Check the user.js file for available routes

### Profile Routes (`/api/profile`)

- Check the profile.js file for available routes

## Testing Steps

### 1. Register a User

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Create a Post

```bash
POST http://localhost:5000/api/posts/addPost
Content-Type: application/json

{
  "user": "USER_ID_FROM_LOGIN",
  "text": "This is my first post!",
  "name": "Test User",
  "avatar": "https://example.com/avatar.jpg"
}
```

### 4. Like a Post (Protected Route)

```bash
PUT http://localhost:5000/api/posts/like/POST_ID
Content-Type: application/json
auth-token: YOUR_JWT_TOKEN

```

### 5. Unlike a Post (Protected Route)

```bash
PUT http://localhost:5000/api/posts/unlike/POST_ID
Content-Type: application/json
auth-token: YOUR_JWT_TOKEN

```

## Important Notes

1. **JWT Token**: After login/register, you'll receive a JWT token. Use this token in the `auth-token` header for protected routes.

2. **User ID**: When creating posts, use the user ID from the JWT token payload.

3. **Post ID**: When liking/unliking posts, use the actual post ID from the database.

4. **Environment Variables**: Make sure you have a `.env` file with:
   ```
   JWT_SECRET=your_secret_key_here
   MONGODB_URI=your_mongodb_connection_string
   ```

## Common Issues Fixed

1. ✅ Fixed router typo in auth.js
2. ✅ Fixed middleware to properly set req.user
3. ✅ Added protected middleware to unlike route
4. ✅ Fixed model references in Post.js
5. ✅ Added registration route
