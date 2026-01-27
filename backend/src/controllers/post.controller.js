// Post Controller
exports.getAllPosts = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Get all posts placeholder' });
    } catch (error) {
        next(error);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Create post placeholder' });
    } catch (error) {
        next(error);
    }
};
