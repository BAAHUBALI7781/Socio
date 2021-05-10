const queue=require('../config/kue');

const commentMailer=require('../mailers/comment_mailer');

queue.process('emails',function(job,done){
    console.log("Emails worker in process");
    commentMailer.newComment(job.data);
    done();
})