# 👍 Likes System Documentation

## Features
✅ Like a post  
✅ Unlike a post  
✅ Get like count per post  
✅ Same user can only like a post once (unique constraint)  
✅ Get all users who liked a post  
✅ Check if current user liked a post

---

## Database Schema

### Likes Table
```sql
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)  -- Only one like per user per post
);
```

---

## API Endpoints

### 1. Like a Post
**POST** `/api/likes/:postId`

**Required:**
- Authentication: YES (JWT Token)
- Post ID in URL

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Response (201 Created):**
```json
{
  "message": "Post liked successfully",
  "like": {
    "id": 1,
    "post_id": 1,
    "user_id": 5,
    "created_at": "2025-01-28T10:30:00Z"
  },
  "likeCount": 1
}
```

**Error Cases:**
- `404 Not Found`: Post doesn't exist
- `409 Conflict`: User already liked this post

---

### 2. Unlike a Post
**DELETE** `/api/likes/:postId`

**Required:**
- Authentication: YES (JWT Token)
- Post ID in URL

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "message": "Post unliked successfully",
  "likeCount": 0
}
```

**Error Cases:**
- `404 Not Found`: Post doesn't exist or user hasn't liked it

---

### 3. Get Like Count
**GET** `/api/likes/:postId/count`

**Required:**
- Post ID in URL

**Response (200 OK):**
```json
{
  "postId": 1,
  "likeCount": 5
}
```

---

### 4. Get All Likes for a Post
**GET** `/api/likes/:postId`

**Required:**
- Post ID in URL

**Response (200 OK):**
```json
{
  "postId": 1,
  "likeCount": 2,
  "likes": [
    {
      "id": 1,
      "post_id": 1,
      "user_id": 5,
      "username": "john_doe",
      "created_at": "2025-01-28T10:30:00Z"
    },
    {
      "id": 2,
      "post_id": 1,
      "user_id": 3,
      "username": "jane_smith",
      "created_at": "2025-01-28T10:35:00Z"
    }
  ]
}
```

---

### 5. Check if User Liked a Post
**GET** `/api/likes/:postId/check`

**Required:**
- Authentication: YES (JWT Token)
- Post ID in URL

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "postId": 1,
  "userId": 5,
  "liked": true
}
```

---

## Testing with Thunder Client

1. **Import the collection**: `.thunder-collection.json`
2. **Update the JWT Token**:
   - Replace `YOUR_JWT_TOKEN_HERE` with your actual JWT token from login
   - The token should be obtained from: `POST /api/auth/login`
3. **Change Post ID**: Replace `1` in URLs with the actual post ID you want to test

### Test Flow:
1. Register a user: `POST /api/auth/register`
2. Login: `POST /api/auth/login` → Get JWT token
3. Create a post: `POST /api/posts` (with authorization)
4. Like the post: `POST /api/likes/{postId}` (with authorization)
5. Get like count: `GET /api/likes/{postId}/count`
6. Check if user liked: `GET /api/likes/{postId}/check` (with authorization)
7. Unlike the post: `DELETE /api/likes/{postId}` (with authorization)

---

## Implementation Details

### Model: `like.model.js`
- `create()`: Create a new like
- `deleteByPostAndUser()`: Delete a like
- `checkLike()`: Check if user liked a post
- `getCountByPostId()`: Get like count for a post
- `getLikesByPostId()`: Get all users who liked a post

### Controller: `like.controller.js`
- `likePost()`: Handle like request
- `unlikePost()`: Handle unlike request
- `getLikeCount()`: Get like count
- `getPostLikes()`: Get all likes for a post
- `checkUserLike()`: Check if current user liked

### Routes: `like.routes.js`
- `POST /api/likes/:postId` → Like a post
- `DELETE /api/likes/:postId` → Unlike a post
- `GET /api/likes/:postId/count` → Get like count
- `GET /api/likes/:postId` → Get all likes
- `GET /api/likes/:postId/check` → Check user like

---

## Key Features

### 1. Unique Constraint
```sql
UNIQUE(post_id, user_id)
```
This ensures a user can only like each post once. If they try to like again, they'll get a 409 Conflict error.

### 2. Cascade Delete
```sql
REFERENCES posts(id) ON DELETE CASCADE
REFERENCES users(id) ON DELETE CASCADE
```
When a post or user is deleted, their likes are automatically deleted.

### 3. Timestamps
Every like is recorded with a `created_at` timestamp for tracking when users liked posts.

---

## Error Handling

| Status | Error | Message |
|--------|-------|---------|
| 404 | Post Not Found | "Post not found" |
| 409 | Already Liked | "You already liked this post" |
| 404 | Not Liked | "You didn't like this post" |
| 500 | Server Error | Database or server error |

---

## Next Steps

1. Initialize the database: `node src/init-db.js`
2. Start the server: `npm run dev`
3. Test with Thunder Client using the provided collection
4. Integrate like count and user like status into your frontend

