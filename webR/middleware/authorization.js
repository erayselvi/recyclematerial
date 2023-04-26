module.exports = (req, res, next) => {
    if(!req.session.type==1){
        return res.redirect('/');
    }
    next();
}