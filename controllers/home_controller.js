const Post = require("../models/post");


module.exports.home=function(req,res){
    
    

    // Post.find({},function(err,Posts){
    //     return res.render('home',{
    //         title:'Codeial Home Page',
    //         posts:Posts
    //     });
    // })
    //Populate the whole user
    Post.find({}).populate('user').exec(function(err,Posts){
            // console.log();
            return res.render('home',{
                title:'Codeial Home Page',
                posts:Posts
            })
        
    });

}