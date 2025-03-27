import { getRoom } from "@/components/db";
import RoomChat from "@/components/rooms/chat";
import { getUser } from "@/components/user";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const  room = await getRoom(decodeURIComponent(id));
  const {error, data} = await getUser();
  if(!data.session?.user){
    redirect("/login");
  }
  return (
    <>
      <RoomChat room={room} user={data.session?.user} />
    </>
  );
}
 