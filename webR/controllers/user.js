const Material = require('../models/material');
const Wallet = require('../models/wallet');
const Accounts = require('../models/account');
const sha256 = require("../middleware/sha256");
exports.getMaterials = (req, res, next) => {
    console.log(req.session.name,);
    console.log(req.session.sname);
    console.log(req.session.type);
    console.log(req.session.walletid);


    Material.findAll({
        // where: { id: 1 },
        // attributes: {exclude:["carbonAmount","createdAt","updatedAt"]}
    })
        .then(materials => {
            
            //let type = null;
            console.log()
            //req.session.type === 0 ? type = false : type = true;
            //console.log(req.session.type)
            res.render('user/index',
            {
                title: 'Anasayfa',
                materials: materials,
                path: '/',
                name:req.session.name,
                sname:req.session.sname,
                isAuthenticated: req.session.isAuthenticated,
                isAuthorization: req.session.type,
            })
            // res.status(200).send(materials)
        })
        .catch((err) => {
            // res.status(500)
            console.log(err);
        })
}
exports.getWallet = (req,res,next)=> {
    console.log("geldi")

    Accounts.findOne({
        where: {mail:req.session.mail}
    })
    .then(account=>{
        if(account)
        {   
            Wallet.findAll({
            })
            .then(wallets=> {
                res.render('user/wallet',
                {
                    path:'/wallet',
                    title:'Cüzdan',
                    isAuthenticated:req.session.isAuthenticated,
                    name:req.session.name,
                    sname:req.session.sname,
                    carbonamount: account.carbonamount,
                    wallets: wallets
                })
            })
            .catch((err) => {
                // res.status(500)
                console.log(err);
            })     
        }
    })
      
}



exports.postWallet = (req,res,next)=> { 

Wallet.findOne({
    where: {walletid: req.body.mywalletid}
})
.then(wallet=>{
    if(wallet)
    if(wallet.walletpassword===req.body.mywalletpassword)
    if(req.body.transferrcoinamount<=wallet.rcoinamount && req.body.transferrcoinamount>0)
    {
        let values={
            rcoinamount: wallet.rcoinamount - req.body.transferrcoinamount
        }
        wallet.update(values);
        Wallet.findOne({
            where: {walletid: req.body.transferwalletid}
        })
        .then(wallet=>{
            if(wallet)
            {
                let value={
                    rcoinamount: wallet.rcoinamount + parseInt(req.body.transferrcoinamount)
                }
                wallet.update(value);
            }
        })
        

    }
})

 res.redirect('/wallet');
}
exports.postAddCarbon= (req,res,next)=>{

    console.log(req);
    if(req.body.carbonamount>0 && req.body.carbonamount<9999999999999999999999999999999999999999)
    {
        Material.findOne({
            where: {
                name: req.body.materialname
            }
        })
        .then(material=>{
            Accounts.findOne({
                where: {mail:req.session.mail}
            })
            .then(account=>{
                if(account)
                {   

                    let values={
                        carbonamount:account.carbonamount+(req.body.carbonamount*material.carbonvalue)
                    }
                    console.log(values)
                    account.update(values)
                    res.redirect('/');
                }
                })

        })
    }
    else
    {
        res.redirect('/');
    }  
}


exports.postCarbontoCoin = (req,res,next)=> { console.log("postCarbona geldi")
    
    Accounts.findOne({
        where: {mail: req.session.mail}
    })
    .then(account=>{ console.log("dönüşüm ok",account.carbonamount)
        if(account)
        {
            if(account.carbonamount>=req.body.tcarbonamount && req.body.tcarbonamount>=0) //dönüştürelecek carbon miktarı mevcut mu?
            {
                Wallet.findOne({
                    where: {walletid: req.body.transferwalletid}
                })
                .then(wallet=>{
                    if(wallet)
                    {
                        values={
                            rcoinamount: wallet.rcoinamount+(parseFloat(req.body.tcarbonamount)/1000000),
                        }
                        wallet.update(values);
                    }
                })
                values={
                    carbonamount: account.carbonamount-parseFloat(req.body.tcarbonamount)
                }
                account.update(values);
                res.redirect('/wallet');  
            }
            else
            {
                res.redirect('/wallet')  
            }
        }
    })
    .catch("cüzdan bulunamadı");
}

exports.getListMaterials=(req,res,next)=> {
    Material.findAll({

    })
    .then(materials => {
        res.render('user/materials',
        {
            title: 'Materyaller',
            materials: materials,
            path: '/material',
            name:req.session.name,
            sname:req.session.sname,
            isAuthenticated: req.session.isAuthenticated,
            isAuthorization: req.session.type,

        })
        // res.status(200).send(materials)
    })
    .catch((err) => {
        // res.status(500)
        console.log(err);
    })

}

exports.getNewWallet = (req,res,next)=> {
    res.render('user/new-wallet',{
        title: 'Yeni Cüzan',
        path: '/new-wallet',
        name:req.session.name,
        sname:req.session.sname,
        mail:req.session.mail,
        isAuthenticated: req.session.isAuthenticated,
        datems:Date.now(),
        date:Date()

    })
}
exports.postNewWallet = (req,res,next)=> {
    Wallet.create({
        walletid:sha256(req.body.recoverycode),
        walletpassword: req.body.walletpassword,
        carbonamount:0,
        rcoinamount:0
    })
    res.render('user/new-wallet',{
        title: 'Yeni Cüzan',
        path: '/new-wallet',
        isAuthenticated: req.session.isAuthenticated,
        walletid:sha256(req.body.recoverycode)
    })
}


