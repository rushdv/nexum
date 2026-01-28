import LikeModel from "../models/like.model.js";

export const toggleLike = async (req, res, next) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user.id;
        const result = await LikeModel.toggle({ userId, postId });
        res.json(result);
    } catch (err) {
        next(err);
    }
};
