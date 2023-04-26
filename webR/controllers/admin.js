const Material = require("../models/material");


exports.getAddMaterial= (req, res, next) => {
    
    res.render('admin/add-material', {
        title: 'Yeni Materyel',
        path: '/add-material',
        name:req.session.name,
        sname:req.session.sname,
        isAuthenticated: req.session.isAuthenticated,
        isAuthorization: req.session.type,
    })
}

exports.postAddMaterial= (req, res, next) => {
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const carbonamount = req.body.carbonamount;
    Material.create({
        name:req.body.name,
        carbonvalue:req.body.carbonamount,
        imageUrl:req.body.imageUrl
    })
    
    .then(result =>{
        console.log(result);
        res.redirect('/');
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.getEditMaterial= (req, res, next) => {
    
    Material.findAll()
    .then(materials => {
        console.log()
        res.render('admin/edit-material',
        {
            title: 'Materyal Düzenle',
            materials: materials,
            path: '/edit-material',
            isAuthorization: req.session.type,
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

exports.postEditMaterial= (req, res, next) => {
    console.log("postdaaaaaaaaaaaaaaaa",req.body.carbonamount)
    if(req.body.carbonamount>0 && req.body.carbonamount<99*9*9*9)
    {
        console.log("ifde")
        Material.findOne({
            where: {
                name: req.body.materialname
            }
        })
        .then(material=>{
                    
            let values={
                carbonvalue: req.body.carbonamount
            }
            material.update(values)
            res.redirect('/admin/edit-material');
        })
    }
    else
    {
        res.redirect('/admin/edit-material');
    }  
}
