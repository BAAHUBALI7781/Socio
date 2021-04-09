module.exports.home=function(req,res){
    return res.render('home',{
        title:'Codeial'
    });
}   
module.exports.practise=function(req,res){
    return res.end('<h1>Practise is up</h1>');
}   
