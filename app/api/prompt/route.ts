import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (res: any) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all prompt", { status: 500 });
  }
};
