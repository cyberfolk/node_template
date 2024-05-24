// Middleware per passare i messaggi flash alle viste
const msg_flash = (req, res, next) => {
    res.locals.msg_succes = req.flash('msg_succes');
    res.locals.msg_error = req.flash('msg_error');
    next();
};

module.exports = msg_flash;
