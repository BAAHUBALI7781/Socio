{let t=function(){let e=$("#post_form");e.submit(function(t){t.preventDefault(),$.ajax({type:"post",url:"/post/new-post",data:e.serialize(),success:function(t){var e=o(t.data.post);$("#posts-list-container>ul").prepend(e),s($(" .delete-post-button",e)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",e)),n("Post Created")},error:function(t){console.log("Error occured")}})})},o=function(t){return console.log(t.user),$(`
        <li class="seperate_post" id="post-${t._id}">
        <div id="post_head">
            <small><p>${t.user.user_name}</p></small>
            <small><a class="delete-post-button" href="/post/destroy/${t._id}">Delete</a></small>
            
        </div>
        
        <b>
            <p class="post_content">
                ${t.content}
            </p>
        </b>
        <div class="like_section">
            <a href="/like/toggle/?id=${t._id}&type=Post" class="toggle-like-button" data-likes="0">
                0 Like
            </a>    
        </div>
        
        <div class="post-comments">
                <form class="comment_form" id="post-${t._id}-comments-form" action='/comment/add-comment' method="POST">
                    <input type="text" name="content" placeholder="Add comment..." required>
                    <input type="hidden" name="post" value="${t._id}">
                    <button type="submit">Add</button>
                </form>
            
        </div>
        <div class="comments-list">
            <ul id="post-comments-${t.id}">
                
            </ul>
        </div>
        
    </li>
        `)},s=function(e){$(e).click(function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),n("Post Deleted")},error:function(t){console.log("Error")}})})},n=function(t){new Noty({theme:"relax",text:t,type:"success",layout:"topRight",timeout:1500}).show()},e=function(){$("#posts-list-container>ul>li").each(function(){let t=$(this);s($(" .delete-post-button"),t);var e=t.prop("id").split("-")[1];new PostComments(e)})};e(),t()}