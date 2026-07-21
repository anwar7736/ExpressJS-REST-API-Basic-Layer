exports.admin = (req, res, next) => {
    console.log("This is our admin middleware.");
    next();
}