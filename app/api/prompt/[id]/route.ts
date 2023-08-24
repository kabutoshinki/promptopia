import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (res: any, { params }: any) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
export const PATCH = async (res: any, { params }: any) => {
  const { prompt, tag } = await res.json();
  try {
    await connectToDB();
    const existPrompt = await Prompt.findById(params.id);
    if (!existPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existPrompt.prompt = prompt;
    existPrompt.tag = tag;
    await existPrompt.save();
    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};
export const DELETE = async (res: any, { params }: any) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
