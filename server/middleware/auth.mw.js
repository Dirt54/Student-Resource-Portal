exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

exports.isAdmin = function(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
}

exports.isActive = function(req, res, next) {
    if (req.user.classStatus === "active") {
        next();
    } else {
        res.sendStatus(403);
    }
}
