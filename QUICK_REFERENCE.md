# 🚀 Quick Reference - Likes System

## API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/likes/:postId` | ✓ | Like a post |
| DELETE | `/api/likes/:postId` | ✓ | Unlike a post |
| GET | `/api/likes/:postId/count` | ✗ | Get like count |
| GET | `/api/likes/:postId` | ✗ | Get all likes |
| GET | `/api/likes/:postId/check` | ✓ | Check if I liked |

## HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 201 | Created | Like added successfully |
| 200 | OK | Unlike, count, or check successful |
| 400 | Bad Request | Missing/invalid data |
| 401 | Unauthorized | No/invalid JWT token |
| 404 | Not Found | Post not found or didn't like |
| 409 | Conflict | Already liked this post |
| 500 | Server Error | Database error |

## Authentication Header

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Example Responses

### Like Post (201)
```json
{
  "message": "Post liked successfully",
  "like": {
    "id": 1,
    "post_id": 5,
    "user_id": 3,
    "created_at": "2025-01-28T10:30:00Z"
  },
  "likeCount": 1
}
```

### Unlike Post (200)
```json
{
  "message": "Post unliked successfully",
  "likeCount": 0
}
```

### Get Like Count (200)
```json
{
  "postId": 5,
  "likeCount": 3
}
```

### Get All Likes (200)
```json
{
  "postId": 5,
  "likeCount": 2,
  "likes": [
    {
      "id": 1,
      "post_id": 5,
      "user_id": 3,
      "username": "alice",
      "created_at": "2025-01-28T10:30:00Z"
    },
    {
      "id": 2,
      "post_id": 5,
      "user_id": 7,
      "username": "bob",
      "created_at": "2025-01-28T10:35:00Z"
    }
  ]
}
```

### Check If Liked (200)
```json
{
  "postId": 5,
  "userId": 3,
  "liked": true
}
```

## Files Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── like.model.js          ← Like database operations
│   │   ├── post.model.js          ← Updated with findById()
│   │   └── user.model.js
│   ├── controllers/
│   │   ├── like.controller.js     ← Like business logic
│   │   ├── post.controller.js
│   │   └── user.controller.js
│   ├── routes/
│   │   ├── like.routes.js         ← Like endpoints
│   │   ├── post.routes.js
│   │   └── user.routes.js
│   ├── app.js                      ← Updated with like routes
│   ├── server.js
│   └── init-db.js                  ← Updated with likes table
```

## Testing Flow

1. **Register** → Get user ID
2. **Login** → Get JWT token
3. **Create Post** → Get post ID
4. **Like Post** → Get like object
5. **Check Count** → Verify like count
6. **Get Likes** → See who liked
7. **Check Personal** → Verify I liked
8. **Unlike** → Remove like
9. **Recheck** → Verify removed

## Database Schema

```sql
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)
);
```

## Key Features

✅ Unique constraint: One like per user per post  
✅ Cascade delete: Remove likes when post/user deleted  
✅ Authentication: Protected endpoints with JWT  
✅ Error handling: Proper status codes and messages  
✅ Timestamps: Track when posts were liked  

## Running Tests

```bash
# 1. Start database initialization
node src/init-db.js

# 2. Start server
node src/server.js
# Server runs on http://localhost:5000

# 3. Open Thunder Client
# Import .thunder-collection.json

# 4. Follow LIKES_TESTING_GUIDE.md
```

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| 401 Unauthorized | Add valid JWT token in Authorization header |
| 404 Post not found | Make sure post exists, use correct post ID |
| 409 Already liked | Unlike first, then like again |
| 404 Didn't like | Can't unlike - you didn't like this post |

## Frontend Integration

```javascript
// Example React hook
const [liked, setLiked] = useState(false);

const toggleLike = async (postId) => {
  try {
    if (liked) {
      // Unlike
      const res = await fetch(`/api/likes/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setLiked(false);
    } else {
      // Like
      const res = await fetch(`/api/likes/${postId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setLiked(true);
    }
  } catch (err) {
    console.error('Like error:', err);
  }
};
```

## Documentation Files

- 📖 **LIKES_SYSTEM_DOCS.md** - Complete API reference
- 🧪 **LIKES_TESTING_GUIDE.md** - Step-by-step testing
- 🎨 **VISUAL_GUIDE.md** - Architecture & diagrams
- ✅ **IMPLEMENTATION_SUMMARY.md** - What was built
- 📋 **QUICK_REFERENCE.md** - This file

---

**Everything is ready to test!** 🎉

Start with LIKES_TESTING_GUIDE.md
