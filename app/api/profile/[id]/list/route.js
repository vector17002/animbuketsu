import { connectToDB } from "@utils/database";
import WishList from "@models/wishlist";
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
    const {userId , animeName , status} = await req.json();
    try {
        await connectToDB();
        const List = await WishList.findOneAndUpdate({user : userId , animeName: animeName} , {
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