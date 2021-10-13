const { request } = require('express');
const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');
let transporter=nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SOCIO_GOOGLE_USER,
        pass: process.env.SOCIO_GOOGLE_PASS
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in sending mail');
                return;
            }
            else{
                mailHTML=template;
            }
        }
    )
    return mailHTML;
} 

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}