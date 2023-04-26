const Account = require("../models/account");
const Wallet = require("../models/wallet");
const sha256 = require("../middleware/sha256");

/////LOGİN 
exports.getLogin = (req,res,next)=> {
    res.render('account/login',{
        path:'/login',
        title:'Giriş Ekranı'
    })
}
exports.postLogin = (req,res,next)=> {
    if(req.body.mail ==undefined && req.body.pw ==undefined)
    {
        console.log(req.body.mail)
        res.redirect('/register')
    }
    
    console.log(req.body.mail,req.body.pw)
    const mail=req.body.mail;
    const pw=req.body.pw;
    console.log(mail, pw);
    Account.findOne({
        where: {mail: mail},
    })
        .then(account=>{
            if(account) {
                if(account.pw === pw)
                {
                    //res.cookie('isAuthenticated', true);
                    req.session.isAuthenticated= true;
                    req.session.name=account.name;
                    req.session.sname=account.sname;
                    req.session.mail=account.mail;
                    req.session.type=account.type;

                    return res.redirect('/');
                }
                else
                return res.redirect('/');  
            }
            else
            {
                req.isAuthenticated= false;
                return res.redirect('/login');
            }
        })
        .catch(err =>{
            console.log(err);
    })
    
    
}
    

  ////////REGİSTER 
exports.getRegister = (req,res,next)=> {
    res.render('account/register',{
        path:'/register',
        title:'Giriş Ekranı'
    })
}
exports.postRegister = (req,res,next)=> {

    if(req.body.mail ==undefined && req.body.pw ==undefined && req.body.name ==undefined && req.body.sname ==undefined)
    {
        console.log(req.body.mail)
        res.redirect('/register')
    }


    Account.findOne({
        where: {mail: req.body.mail},
    })
    .then(account=> {
        if(account){
            res.redirect('/register')
        }
        else
        {
            Account.create({
                id:req.body.id,
                name:req.body.name,
                sname:req.body.sname,
                mail:req.body.mail,
                carbonamount:0,
                pw:req.body.pw,
                type:false
            })
            .then(result =>{
                console.log(result);
                res.redirect('/');
            })
            .catch(err =>{
                console.log(err);
            })
        }
    })
}
///////////SİFRE YENİLEME ROUTER
exports.getFPassword = (req,res,next)=> {
    res.render('account/forgot-password',{
        path:'/reset',
        title:'Giriş Ekranı'
    })
}
exports.postFPassword = (req,res,next)=> {
    res.redirect('/');
}

exports.getLogout=(req,res,next)=> {
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');

    })
    
}