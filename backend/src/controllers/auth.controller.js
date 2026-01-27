// Auth Controller
exports.register = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Register route placeholder' });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Login route placeholder' });
    } catch (error) {
        next(error);
    }
};
