{
    let createComment=function(){
        let commentForm=$('#comment_form');
        commentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comment/add-comment',
                data:commentForm.serialize(),
                success:function(data){
                    // console.log(data.data.comment);
                    let newComment=showCommentDOM(data.data.comment);
                    $('.comments-list>ul').prepend(newComment);
                },error:function(err){
                    console.log("Error");
                }
            })
        })
    }
    let showCommentDOM=function(comment){
        console.log(comment);
        return $(`
        <li class="comment-list-${comment._id}">
            <div id="comment">
                <small id="comment_creator_detail">
                    <span id="comment-creator">${comment.user.user_name}</span>
                        <a href="/comment/destroy/${comment._id}">X</a>
                    
                
                </small>
                <p>
                    ${comment.content}
                </p>
            
        </div>
    </li>  
        `)
    }
    createComment();
}