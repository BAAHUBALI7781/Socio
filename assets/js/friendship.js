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
                    new Noty({
                        theme: 'relax',
                        text: `Added to your friend list`,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }else{
                    $('.toggle-friend-button').html('Add Friend');  
                    new Noty({
                        theme: 'relax',
                        text: `Removed from your friend list`,
                        type: 'error',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show(); 
                }

            })

        })
    }
}


