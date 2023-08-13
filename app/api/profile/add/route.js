import { connectToDB } from "@utils/database";
import WishList from "@models/wishlist";
export const POST = async (req) =>{
    const {userId , animeImg , animeName ,episodes} = await req.json();
    try {
        await connectToDB();
            const newList = new WishList({
                user: userId,
                animeImg,
                animeName,
                episodes
            })
                await newList.save();
            
            return new Response(JSON.stringify(newList) , {
                status: 201})
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new list" , {status : 500})
    }
}

