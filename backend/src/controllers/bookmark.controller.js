import BookmarkModel from "../models/bookmark.model.js";

export const toggleBookmark = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;
    const result = await BookmarkModel.toggle({ userId, postId: Number(postId) });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookmarks = await BookmarkModel.findByUser(userId);
    res.json(bookmarks);
  } catch (err) {
    next(err);
  }
};

export const checkBookmark = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;
    const bookmarked = await BookmarkModel.isBookmarked(userId, Number(postId));
    res.json({ bookmarked });
  } catch (err) {
    next(err);
  }
};
