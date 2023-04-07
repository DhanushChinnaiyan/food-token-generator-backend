import jwt from "jsonwebtoken";
import { Owner } from "../module/owner.js";


const ownersignedIn = async(request,response,next) => {
    let ownerloginToken ;
    if(request.headers){
        try {
            ownerloginToken = request.headers["x-auth-ownertoken"]
            const decode = jwt.verify(ownerloginToken,"2e6a98abb5b23339ad")

            request.owner = await Owner.findById(decode.id).select("-password")
            next()
        } catch (error) {
            console.log("Header owner error",error)
            response.status(401).json({message:"Invalid Authorization"})
        }
    }
    if(!ownerloginToken){
        return response.status(400).json({message:"Access denied"})
    }
}

export default ownersignedIn;