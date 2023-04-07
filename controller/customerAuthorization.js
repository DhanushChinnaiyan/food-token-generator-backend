import jwt from "jsonwebtoken";
import { Customer } from "../module/customer.js";


const customersignedIn = async(request,response,next) => {
    let customerloginToken ;
    if(request.headers){
        try {
            customerloginToken = request.headers["x-auth-customertoken"]
            const decode = jwt.verify(customerloginToken,"2e6a98abb5b23339ad")

            request.customer = await Customer.findById(decode.id).select("-password")
            next()
        } catch (error) {
            console.log("Header customer error",error)
            response.status(401).json({message:"Invalid Authorization"})
        }
    }
    if(!customerloginToken){
        return response.status(400).json({message:"Access denied"})
    }
}

export default customersignedIn;