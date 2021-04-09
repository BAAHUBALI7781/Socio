module.exports.profile=function(req,res){
    return res.render('profile',{
        title:'Codeial'
    });
}
module.exports.home=function(req,res){
    return res.render('user');
}