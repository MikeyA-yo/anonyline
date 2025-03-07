import RoomChat from "@/components/rooms/chat";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <RoomChat />
    </>
  );
}
