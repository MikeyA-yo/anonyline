import { createSessionStorage } from "@/app/appwrite_config/appwrite-server-config";

export async function GET() {
  const {storage} = await createSessionStorage();
  const file = await storage.listFiles(process.env.PFP as string);
//   let fileU8 = new Uint8Array(file);

  // Now you can use fileId in your logic
  return Response.json({ file });
}