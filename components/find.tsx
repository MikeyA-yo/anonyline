"use client";
import { FaSearch } from "react-icons/fa";
import useAPI from "./hooks/useapi";
import { useEffect, useReducer, useState } from "react";
import RoomForm from "./roomform";
import { Models } from "node-appwrite";
import Loading from "./loading";
import useRooms from "./hooks/userooms";
import useUsers from "./hooks/useusers";
import { desc } from "motion/react-client";


function resultReducer (state:any, action:any){
  return {...state, [action.type]:action.value}
}
export default function Find({user}:{user:Models.User<Models.Preferences>}) {
  const {Rooms, error, loading} = useRooms();
  const {Users, error:e, loading:userLoad} = useUsers();
  const [isCreate, setIsCreate] = useState(false);
  const [input, setInput] = useState("");
  const [result, dispatch] = useReducer(resultReducer, {
    result:[],
    room:[],
    user:[]
  })
  useEffect(()=>{
    if(Rooms){
      dispatch({type:"room", value:Rooms.documents});
    }
    if(Users){
      dispatch({type:"user", value:formatUser(Users.documents)})
    }
  },[Rooms, Users])
  useEffect(()=>{
    dispatch({type:"result", value:[...result.room], ...result.user})
  },[result.room, result.user])
  useEffect(()=>{
    if(input.length > 0){
      dispatch({type:"result", value:[...result.room, ...result.user].filter((room:any)=>room.$id.toLowerCase().includes(input.toLowerCase()))})
    }else if (input.length === 0){
      dispatch({type:"result", value:[...result.room, ...result.user]}) 
    }
  }, [input, result.room, result.user])
  return (
    <>
      <div className="h-screen px-5 overflow-auto w-full bg-[#313338] flex flex-col items-center gap-4">
        <div className="flex text-center flex-col items-center pt-20 gap-2">
          <div className="bg-[#7A1CAC] rounded-full h-24 w-24 items-center justify-center flex">
            <FaSearch className="h-12 w-12 fill-[#EBD3F8]" />{" "}
          </div>
          <h1 className="text-2xl font-bold text-[#EBD3F8]">Find a chat</h1>
          <p className="font-bold text-lg text-[#a5a6a3]">
            Join an existing room, or create a new one, or connect with other
            anonymous users
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <input
            className="bg-[#2B2D31] text-[#EBD3F8] rounded-full w-full p-4"
            type="text"
            placeholder="Search for a chat, enter a room code"
            onChange={(e)=>{
              setInput(e.target.value);
            }}
          />
        </div>
        {loading && <Loading />}
        {isCreate && <RoomForm user={user} close={(b)=>{
          setIsCreate(false);
        }} />}
        {result.result.length === 0 && !loading && <NotFound create={()=>{
          setIsCreate(true);
        }} />}
        {result.result.length > 0 && <RoomGrid rooms={result.result} />}
      </div>
    </>
  );
}

function NotFound({create}:{create: () => void}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-[#EBD3F8]">
        No results found
      </h1>
      <p className="text-[#a5a6a3] text-center">  
        Try searching for something else or <span className="cursor-pointer underline" onClick={()=>{
          create();
        }}>Create a new room</span>
      </p>
    </div>
  );
}

function RoomGrid({rooms}:{rooms:any[]}){
  const {res, loading, run} = useAPI(`file/${rooms[0].name}`);
  const [images, setImages] = useState<image[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Check which rooms need images
    const lackingRooms = checkRoomImageDB(rooms);
    
    if (lackingRooms.length > 0) {
      // Fetch images for rooms that don't have them
      lackingRooms.forEach(room => {
        run(`file/${room.name}`, "GET");
      });
    } else {
      // All rooms have images, extract and set them
      const extractedImages = extractImages(rooms);
      // Only set images if they have valid data
      if (extractedImages.every(img => img.file)) {
        setImages(extractedImages);
        setReady(true);
      }
    }
  }, [rooms]);

  useEffect(() => {
    // Process new image data when received
    if (res?.file && !checkExistingImage(res.id, images)) {
      const uintArrFile = new Uint8Array(res.file);
      const buffer = Buffer.from(uintArrFile);
      const base64String = "data:image/png;base64," + buffer.toString('base64');
      
      if (base64String) {
        setImages(prev => [...prev, { id: res.id, file: base64String }]);
        
        // Update room with new image
        run(`rooms/update`, "PUT", {
          name: res.id,
          update: { image: base64String }
        });
      }
    }
  }, [res]);

  useEffect(() => {
    // Mark as ready when all images are loaded and valid
    if (images.length === rooms.length && images.every(img => img.file)) {
      setReady(true);
    }
  }, [images, rooms]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-24">
        {loading && <Loading />}
        {!loading && ready && rooms.map((room:any, i)=>{
          let image = findImage(room.name, images)
          if (image.length > 0)  return <RoomCard name={room.name} description={room.description} image={image} key={i} />
        })}
      </div>
    </>
  )
}

function RoomCard({name, description, image}:RoomCardProps){
  return (
    <>
      <div className="flex flex-col lg:h-80 md:h-80 h-72 cursor-pointer" onClick={()=>{
        window.location.pathname = `/chat/${name}`
      }}>
        <div className="w-full overflow-hidden h-full">
          <img src={image} alt={name} className="h-full  transition-all duration-200 ease-in-out hover:scale-150 w-full object-cover rounded-lg" />
        </div>
        <div className="flex flex-col justify-center h-full w-full bg-[#2B2D31] rounded-lg p-5">
          <h1 className="text-3xl font-bold text-[#EBD3F8]">{name}</h1>
          <p className="text-[#a5a6a3]">{description}</p> 
        </div>
      </div>
    </>
  )
}
function checkExistingImage(id:string, images:image[]){
  for (let i = 0; i < images.length; i++) {
    if (images[i].id === id){
      return true;
    }
  }
  return false;
}
type image ={
  id:string,
  file: string,
}
function findImage(name:string, images:image[]){
  for (let i = 0; i < images.length; i++) {
    if (images[i].id === name){
      return images[i].file;
    }
  }
  return "";
}
// function to check which rooms don't have the image field of base64 encoding, and returns an array of those lacking
function checkRoomImageDB(rooms:any[]){
  let lacking = [];
   for (let i = 0; i < rooms.length; i++){
      if (!rooms[i]?.image){
        lacking.push(rooms[i]);
      }
   }
   return lacking;
}
function extractImages (rooms:any[]){
  let images = [];
  for (let i = 0; i < rooms.length; i++){
    images.push({id:rooms[i].name, file:rooms[i].image});
  }
  return images
}
function formatUser(user:any[]){
  let users = [];
  for (let i = 0; i < user.length; i++){
    users.push({name:"user", image:"/anonymous-1.png", $id:user[i].$id, description:"An anonymous user" });
  }
  return users
}
type RoomCardProps = {
  name:string,
  description:string,
  image:string
}
