
class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comment/add-comment',
                data: $(self).serialize(),
                success: function(data){
                    console.log(data.data.comment);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    new ToggleLike($(' .toggle-like-button',newComment));
                    
                    
                    new Noty({
                        theme: 'relax',
                        text: "Comment added!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        return $(`
            <li id="comment-${comment._id}">
                <div id="comment">
                    <small id="comment_creator_detail">
                        <span id="comment-creator">${comment.user.user_name}</span>
                        <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>   
                    </small>
                    <p>
                        ${comment.content}
                    </p>
                   
                </div>
                <div id="comment_likes" class="like_section">
                    <a href="/like/toggle/?id=${comment._id}&type=Comment" class="toggle-like-button" data-likes="0" href>0 Like</a>
                </div>
            </li> 
        `);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}
