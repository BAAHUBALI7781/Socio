{
    let createPost=function(){
        let postForm=$('#post_form');

        postForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/new-post',
                data:postForm.serialize(),
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    notify('Post Created');
                },error:function(err){
                    console.log("Error occured");
                }
            })
        });


    }
    let newPostDom=function(post){
        console.log(post.user);
        return $(`
        <li id="post-${post._id}">
        <div id="post_head">
            <small><p>${post.user.user_name}</p></small>
            <small><a class="delete-post-button" href="/post/destroy/${post._id}">Delete</a></small>
            
        </div>
        
        <b>
            <p class="post_content">
                ${post.content}
            </p>
        </b>
        
        <div class="post-comments">
                <form id="comment_form" action='/comment/add-comment' method="POST">
                    <input type="text" name="content" placeholder="Add comment..." required>
                    <input type="hidden" name="post" value="${post.id}">
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
                
            })
        }
    
    populate_all_delete();    
    createPost();

}