const crypto=require("crypto");

//Dışarı açacağımız SHA256 Algoritması
const SHA256Algorithm=function(userMail){
    const fileBuffer=userMail;
    const hash=crypto.createHash("sha256")
    const fHex=hash.update(fileBuffer).digest('hex')
    return (fHex)
};
//Dışarı Açıyoruz
module.exports=SHA256Algorithm;

