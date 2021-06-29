{
    let createPost=function(){
        let postForm=$('#post_form');

        postForm.submit(function(e){
            e.preventDefault();
            var dataForm = new FormData(postForm[0]);
            console.log("FormData",dataForm);
            $.ajax({
                type:'post',
                url:'/post/new-post',
                data:dataForm,
                processData: false,
                contentType: false, 
                success:function(data){
                    console.log(data);
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    new PostComments(data.data.post._id);
                    new ToggleLike($(' .toggle-like-button',newPost));
                    notify('Post Created');
                },error:function(err){
                    console.log("Error occured");
                }
            });
            $('#post_form_text').val('');
            e.target.element.file-upload.value='';           
        });
    }
    let newPostDom=function(post){
        if(post.avatar){
            return $(`
                <li class="seperate_post" id="post-${post._id}">
                <div id="post_head">
                    <small><p>${post.user.user_name}</p></small>
                    <small><a class="delete-post-button" href="/post/destroy/${post._id}">Delete</a></small>
                    
                </div>
                
                <b>
                    <p class="post_content">
                        ${post.content}
                    </p>
                        <div class="post-image-container">
                            <img class="post-image" src="${post.avatar}" alt="Post Image">    
                        </div>
                </b>
                <div class="like_section">
                    <a href="/like/toggle/?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">
                        0 Like
                    </a>    
                </div>
                <hr>
                <div class="post-comments">
                        <form class="comment_form" id="post-${post._id}-comments-form" action='/comment/add-comment' method="POST">
                            <input type="text" name="content" placeholder="Add comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <button type="submit">Add</button>
                        </form>
                    
                </div>
                <div class="comments-list">
                    <ul id="post-comments-${post.id}">
                        
                    </ul>
                </div>
                
            </li>
        `)}
        else{
            return $(`
                <li class="seperate_post" id="post-${post._id}">
                <div id="post_head">
                    <small><p>${post.user.user_name}</p></small>
                    <small><a class="delete-post-button" href="/post/destroy/${post._id}">Delete</a></small>
                    
                </div>
                
                <b>
                    <p class="post_content">
                        ${post.content}
                    </p>
                </b>
                <div class="like_section">
                    <a href="/like/toggle/?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">
                        0 Like
                    </a>    
                </div>
                
                <div class="post-comments">
                        <form class="comment_form" id="post-${post._id}-comments-form" action='/comment/add-comment' method="POST">
                            <input type="text" name="content" placeholder="Add comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <button type="submit">Add</button>
                        </form>
                    
                </div>
                <div class="comments-list">
                    <ul id="post-comments-${post.id}">
                        
                    </ul>
                </div>
                
            </li>
        `)
        }
    }
        
    
        let deletePost=function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();
                $.ajax({
                    type:'get',
                    url:$(deleteLink).prop('href'),
                    success:function(data){
                        $(`#post-${data.data.post_id}`).remove();
                        notify('Post Deleted');
                    },error:function(err){
                        console.log("Error");
                    }
                })
            })
        }

        let notify=function(printText){
            new Noty({
                theme:'relax',
                text:printText,
                type:'success',
                layout:'topRight',
                timeout:1500

            }).show();
        }

        let populate_all_delete=function(){
            $('#posts-list-container>ul>li').each(function(){
                let element=$(this);
                deletePost($(' .delete-post-button'),element);
                let postId = element.prop('id').split("-")[1]
                new PostComments(postId);

            })
        }
    
    populate_all_delete();    
    createPost();

}