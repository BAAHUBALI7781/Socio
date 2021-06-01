class PostComments{constructor(e){this.postId=e,this.postContainer=$(`#post-${e}`),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(" .delete-comment-button",this.postContainer).each(function(){t.deleteComment($(this))})}createComment(t){let o=this;this.newCommentForm.submit(function(e){e.preventDefault();$.ajax({type:"post",url:"/comment/add-comment",data:$(this).serialize(),success:function(e){e=o.newCommentDom(e.data.comment);o.deleteComment($(" .delete-comment-button",e)),new ToggleLike($(" .toggle-like-button",e)),$(`#post-comments-${t}`).prepend(e),new Noty({theme:"relax",text:"Comment added!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})}newCommentDom(e){return console.log(e),$(`
            <li id="comment-${e._id}">
                <div id="comment">
                    <small id="comment_creator_detail">
                        <span id="comment-creator">${e.user.user_name}</span>
                        <a class="delete-comment-button" href="/comment/destroy/${e._id}">X</a>   
                    </small>
                    <p>
                        ${e.content}
                    </p>
                   
                </div>
                <div id="comment_likes" class="like_section">
                    <a href="/like/toggle/?id=${e._id}&type=Comment" class="toggle-like-button" data-likes="0" href>0 Like</a>
                </div>
            </li> 
        `)}deleteComment(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})}}