// Middleware per passare i messaggi flash alle viste
const msg_flash = (req, res, next) => {
    res.locals.msg_success = req.flash('success');
    res.locals.msg_error = req.flash('error');
    res.locals.msg_warning = req.flash('warning');
    next();
};

module.exports = msg_flash;
