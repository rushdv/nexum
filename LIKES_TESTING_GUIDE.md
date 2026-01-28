# 🧪 Likes System Testing Guide with Thunder Client

## Setup Instructions

### 1. Install Thunder Client Extension
If not already installed:
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Thunder Client"
4. Click Install

### 2. Import the Collection
1. Open Thunder Client (click the icon in the left sidebar)
2. Click "Collections" 
3. Click the three dots menu
4. Select "Import"
5. Choose the `.thunder-collection.json` file from the root directory

---

## Testing Workflow

### Step 1: Register a New User
**Endpoint**: `POST /api/auth/register`

```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Expected Response (201)**:
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "testuser@example.com",
    "created_at": "2025-01-28T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**📌 Copy the token** - You'll need it for authenticated requests!

---

### Step 2: Login
**Endpoint**: `POST /api/auth/login`

```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Expected Response (200)**:
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "testuser@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**📌 Copy this token for the next steps!**

---

### Step 3: Create a Post
**Endpoint**: `POST /api/posts`

**Headers**:
```
Authorization: Bearer {YOUR_JWT_TOKEN}
Content-Type: application/json
```

**Body**:
```json
{
  "content": "This is my first post! 🎉"
}
```

**Expected Response (201)**:
```json
{
  "id": 1,
  "user_id": 1,
  "content": "This is my first post! 🎉",
  "created_at": "2025-01-28T10:15:00Z"
}
```

**📌 Note the post ID (1 in this example) - You'll need it for like operations!**

---

### Step 4: Like the Post ❤️
**Endpoint**: `POST /api/likes/1`

**Headers**:
```
Authorization: Bearer {YOUR_JWT_TOKEN}
Content-Type: application/json
```

**Body**: (empty - no body needed)

**Expected Response (201)**:
```json
{
  "message": "Post liked successfully",
  "like": {
    "id": 1,
    "post_id": 1,
    "user_id": 1,
    "created_at": "2025-01-28T10:20:00Z"
  },
  "likeCount": 1
}
```

✅ **Success!** You just liked a post!

---

### Step 5: Try to Like Again (Should Fail)
**Endpoint**: `POST /api/likes/1`

**Headers**: Same as above

**Expected Response (409)**:
```json
{
  "message": "You already liked this post"
}
```

✅ **Correct!** This validates the unique constraint - one like per user per post!

---

### Step 6: Get Like Count
**Endpoint**: `GET /api/likes/1/count`

**Headers**: None required

**Expected Response (200)**:
```json
{
  "postId": 1,
  "likeCount": 1
}
```

✅ Shows that 1 user has liked the post

---

### Step 7: Get All Likes for the Post
**Endpoint**: `GET /api/likes/1`

**Headers**: None required

**Expected Response (200)**:
```json
{
  "postId": 1,
  "likeCount": 1,
  "likes": [
    {
      "id": 1,
      "post_id": 1,
      "user_id": 1,
      "username": "testuser",
      "created_at": "2025-01-28T10:20:00Z"
    }
  ]
}
```

✅ Shows who liked the post and when

---

### Step 8: Check if Current User Liked the Post
**Endpoint**: `GET /api/likes/1/check`

**Headers**:
```
Authorization: Bearer {YOUR_JWT_TOKEN}
```

**Expected Response (200)**:
```json
{
  "postId": 1,
  "userId": 1,
  "liked": true
}
```

✅ Returns `true` because the current user liked it

---

### Step 9: Unlike the Post
**Endpoint**: `DELETE /api/likes/1`

**Headers**:
```
Authorization: Bearer {YOUR_JWT_TOKEN}
```

**Expected Response (200)**:
```json
{
  "message": "Post unliked successfully",
  "likeCount": 0
}
```

✅ Like removed successfully!

---

### Step 10: Verify Unlike
**Endpoint**: `GET /api/likes/1/check`

**Headers**:
```
Authorization: Bearer {YOUR_JWT_TOKEN}
```

**Expected Response (200)**:
```json
{
  "postId": 1,
  "userId": 1,
  "liked": false
}
```

✅ Now returns `false` because we unliked it!

---

### Step 11: Verify Like Count Changed
**Endpoint**: `GET /api/likes/1/count`

**Expected Response (200)**:
```json
{
  "postId": 1,
  "likeCount": 0
}
```

✅ Like count is back to 0!

---

## Testing Multiple Users Liking

To test multiple users liking the same post:

1. **Register User 2**
   - Create another user (e.g., "user2")
   - Copy their JWT token

2. **Like the Same Post**
   - Use User 2's token to like post 1
   - You should get a 201 response

3. **Check Like Count**
   - `GET /api/likes/1/count` should now return `likeCount: 2`

4. **Get All Likes**
   - `GET /api/likes/1` should show both users

---

## Error Test Cases

### Test: Like Non-existent Post
**Endpoint**: `POST /api/likes/999`

**Expected Response (404)**:
```json
{
  "message": "Post not found"
}
```

---

### Test: Unlike Non-existent Post
**Endpoint**: `DELETE /api/likes/999`

**Expected Response (404)**:
```json
{
  "message": "Post not found"
}
```

---

### Test: Like Without Authentication
**Endpoint**: `POST /api/likes/1`
**Headers**: (Don't include Authorization header)

**Expected Response (401)**:
```json
{
  "message": "Unauthorized"
}
```

---

## Quick Thunder Client Setup

1. **Set Environment Variables** (Optional but helpful):
   - In Thunder Client settings, create variables for:
     - `base_url`: `http://localhost:5000`
     - `token`: Your JWT token (update after each login)
     - `post_id`: The post ID you're testing with

2. **Use Variables in URLs**:
   - Instead of: `http://localhost:5000/api/likes/1`
   - Write: `{{base_url}}/api/likes/{{post_id}}`

3. **Store Token Automatically**:
   - In the login response, you can add a test to extract and save the token:
   ```javascript
   var data = JSON.parse(responseBody);
   tests["token"] = data.token;
   ```

---

## Summary of Features Tested ✅

- ✅ Like a post (with unique constraint validation)
- ✅ Unlike a post
- ✅ Get like count for a post
- ✅ Get all users who liked a post
- ✅ Check if current user liked a post
- ✅ Authentication requirements
- ✅ Error handling for non-existent posts
- ✅ Prevent duplicate likes from same user

---

## Troubleshooting

**Issue**: Getting 401 Unauthorized
- **Solution**: Make sure your JWT token is valid and included in the Authorization header

**Issue**: Getting 404 Not Found for likes
- **Solution**: Make sure the post exists by creating a post first (Step 3)

**Issue**: Getting 409 Conflict on like
- **Solution**: You've already liked that post - this is expected! Try unliking first

**Issue**: Server not responding
- **Solution**: Make sure the backend is running with `node src/server.js` on port 5000

