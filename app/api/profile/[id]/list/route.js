import { connectToDB } from "@utils/database";
import WishList from "@models/wishlist";
import { connect } from "mongoose";
export const GET = async (req , {params}) =>{
    try {
            await connectToDB();
            const List = await WishList.find({user: params.id})
            return new Response(JSON.stringify(List), {status: 201})
    } catch (error) {
        console.log(error);
        return new Response("Failed to find a list" , {status : 500})
    }
}
export const POST = async (req) =>{
    const {userId , animeName , status , del} = await req.json();
    if(del){
        try{
       await connectToDB();
       const List = await WishList.deleteOne({user : userId , animeName: animeName})
       return new Response(JSON.stringify(List) , {status : 201})
        }catch(error){
            console.log(error);
            return new Response("Failed to delete" , {status : 500})
        }
    }
    else{
    try {
        await connectToDB();
        const List = await WishList.findOneAndUpdate({user : userId , animeName: animeName}, {
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

 