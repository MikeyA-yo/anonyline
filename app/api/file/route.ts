import { createSessionStorage } from "@/app/appwrite_config/appwrite-server-config";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
) {
  const {storage} = await createSessionStorage();
  const file = await storage.listFiles(process.env.PFP as string);
//   let fileU8 = new Uint8Array(file);

  // Now you can use fileId in your logic
  return Response.json({ file });
}