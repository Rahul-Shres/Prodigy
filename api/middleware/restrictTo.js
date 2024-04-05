// Define a middleware function named restrictTo that takes variable number of roles as arguments using the rest parameter syntax.
const restrictTo = (...roles) => async (req, res, next) => {
    // Extract the roles of the user making the request from the 'role' property of 'req.user'.
    const userRoles = req.user.role;

    // Check if none of the user's roles match any of the specified roles.
    if (!roles.includes(userRoles)) { // Check if the 'roles' array includes the user's role.
        // If none of the specified roles match the user's role, send a 400 status response with a message indicating lack of permission.
        return res.status(400).json({
            message: "Sorry, You don't have the permission"
        });
    } else {
        // If any of the specified roles match the user's role, allow the request to proceed to the next middleware.
        next();
    }
};

// Export the restrictTo middleware function for use in other modules.
module.exports = restrictTo;
