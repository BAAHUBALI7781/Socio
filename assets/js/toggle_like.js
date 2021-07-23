
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
            console.log($(self).attr('href'));
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),
            })
            .done(function(data){
                let attribute=`data-${data.data.cat}`;
                let likes=parseInt($(self).attr(attribute));
                if(data.data.deleted==true){
                    likes-=1;
                    $(self).css('color','rgb(17, 17, 48)');
                }
                else
                {
                    likes+=1;
                    $(self).css('color','red');
                }
                // console.log(likes);
                $(self).attr(attribute, likes);
                if(data.data.cat=='like')
                    $(self).html(`<i class="like far fa-thumbs-up"></i> ${likes}`);
                if(data.data.cat=='heart')
                    $(self).html(`<i class="like far fa-heart"></i> ${likes}`);
                if(data.data.cat=='laugh')
                    $(self).html(`<i class="far fa-thumbs-down"></i>  ${likes}`);
            })
            .fail(function(err){
                console.log("Error in liking post/comment");
            })
        })
    }
}