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

