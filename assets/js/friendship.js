class ToggleFriend{
    constructor(toggleElement){
        this.toggler=toggleElement;
        this.toggleFriend();
    }
    toggleFriend(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                type:'post',
                url:$(self).attr('href')
            })
            .done(function(data){
                console.log(data.data.toggle);
                if(data.data.toggle==1){
                    $('.toggle-friend-button').html('Remove Friend');
                }else{
                    $('.toggle-friend-button').html('Add Friend');   
                }

            })

        })
    }
}


