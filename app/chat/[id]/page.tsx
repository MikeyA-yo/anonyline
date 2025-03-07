import { getRoom } from "@/components/db";
import RoomChat from "@/components/rooms/chat";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const  room = await getRoom(id);
  return (
    <>
      <RoomChat room={room} />
    </>
  );
}
 