import { connectToDB } from "@utils/database";
import WishList from "@models/wishlist";
import toast from "react-hot-toast";
export const GET = async (req , {params}) =>{
    try {
            await connectToDB();
            const List = await WishList.find({user: params.id})
            return new Response(JSON.stringify(List), {status: 201})
    } catch (error) {
        toast.error("Failed to find WishList");
        return new Response("Failed to find a list" , {status : 500})
    }
}
export const POST = async (req) =>{
    const {id , status , del} = await req.json();
    if(del){
    try{
       await connectToDB();
       const List = await WishList.deleteOne({_id: id })
       return new Response(JSON.stringify(List) , {status : 201})
        }catch(error){
            toast.error("Failed to delete");
            return new Response("Failed to delete" , {status : 500})
        }
    }
    else{
    try {
        await connectToDB();
        const List = await WishList.findOneAndUpdate({_id : id}, {
            $set: {
                status: status
            }
        },{
            useFindAndModify : false
        })
        return new Response(JSON.stringify(List) , {status : 201})       
    } catch (error) {
        console.log(error);
        return new Response("Failed" , {status : 500})
    }
}
}
 