
class ToggleLike{
    constructor(toggleElement){
        this.toggler=toggleElement;
        this.toggleLike();
    }
    toggleLike(){
        // console.log(this);
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),
            })
            .done(function(data){
                let likes=parseInt($(self).attr('data-likes'));
                if(data.data.deleted==true){
                    likes-=1;
                }
                else
                    likes+=1;
                // console.log(likes);
                $(self).attr('data-likes', likes);
                $(self).html(`${likes} Likes`);
            })
            .fail(function(err){
                console.log("Error in liking post/comment");
            })
        })
    }
}