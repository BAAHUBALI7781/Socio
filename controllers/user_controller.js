module.exports.profile=function(req,res){
    return res.render('profile',{
        title:'Codeial User Profile'
    });
}
module.exports.home=function(req,res){
    return res.render('user');
}