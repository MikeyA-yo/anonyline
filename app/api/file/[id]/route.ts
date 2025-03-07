import { createSessionStorage } from "@/app/appwrite_config/appwrite-server-config";
import { NextRequest } from "next/server";

export async function GET(
  _:NextRequest,
  { params }: { params: { id: string } }
) {
  const fileId = (await params).id;
  const {storage} = await createSessionStorage();
  const file = await storage.getFileView(process.env.PFP as string, fileId);
  const fileU8 = new Uint8Array(file);
  const fileArr = Array.from(fileU8);
  // Now you can use fileId in your logic
  return Response.json({ id: fileId, file: fileArr });
}