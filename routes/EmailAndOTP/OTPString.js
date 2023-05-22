


const String  = "1234567890"

const OTPGenerator = (length) => {
    let OTPString = ""
    for(let index = 0; index<length; index++){

         OTPString += String.charAt(Math.floor(Math.random()*String.length))
    }
    return OTPString;
}

export default OTPGenerator;
