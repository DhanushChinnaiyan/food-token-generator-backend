import nodemailer from 'nodemailer'


const mail = (OTP,Useremail) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        port:"465",
        auth: {
            user:"dhanushms4021@gmail.com",
            pass:"jqcszxqobfjtcmyd"
        },
        tls:{
            rejectUnauthorized:true
        }
    
    })
    
    const messagesubject = "Reset Your Password"
    const mailtext = `Your OTP - ${OTP}`
    
    const info = {
    from:"dhanushms4021@gmail.com",
    to:Useremail,
    subject:messagesubject,
    text:mailtext
    }
    
    transporter.sendMail(info,(err)=>{
    if(err){
        console.log("mail error ",err)
    }else{
        console.log("email has sent")
    }
    })
}

export default mail;
