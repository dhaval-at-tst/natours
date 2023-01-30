const routeYetNotDefined = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
}

exports.getAllUsers = routeYetNotDefined;
exports.getUser = routeYetNotDefined;
exports.createUser = routeYetNotDefined;
exports.updateUser = routeYetNotDefined;
exports.deleteUser = routeYetNotDefined;