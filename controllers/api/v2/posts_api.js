module.exports.posts=function(req,res){
    return res.json(200,{
        message:'In Posts v2',
        posts:[]
    })
}