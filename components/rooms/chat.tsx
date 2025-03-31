"use client";
import { FaThumbsUp, FaThumbsDown, FaInfoCircle, FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import { Room } from "../types/room";
import { useState, useRef, useEffect } from "react";

import useAPI from "../hooks/useapi";
import { User } from "@supabase/supabase-js";
import { useRoom } from "../hooks/userooms";
import ChatContainer from "./chat-container";
import useChat from "../hooks/usechat";

export default function RoomChat({
  room: initialRoom,
  user,
}: {
  room: Room;
  user: User;
}) {
  const [showInfo, setShowInfo] = useState(false);
  const { run } = useAPI("rooms/update", "POST");
  const { Room, loading } = useRoom(initialRoom.name);
  const { chats } = useChat(initialRoom.id);
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const editRef = useRef<HTMLInputElement>(null); // Changed to only HTMLInputElement
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editContainerRef = useRef<HTMLDivElement>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const room: typeof initialRoom =
    !loading && Room && Room.length >= 1 ? Room[0] : initialRoom;
  const isOwner = user.id === room.owner;

  const hasVotedStay = room.members?.includes(user?.id);
  const hasVotedGo = room.enemies?.includes(user?.id);

  // Handle editing room properties
  useEffect(() => {
    if (editField && editRef.current) {
      // Use a small timeout to ensure the DOM has updated
      setTimeout(() => {
        if (editRef.current) {
          editRef.current.focus();
          // Position cursor at the end of the text
          if (typeof editRef.current.setSelectionRange === 'function') {
            const length = editValue.length;
            editRef.current.setSelectionRange(length, length);
          }
        }
      }, 0);
    }
  }, [editField, editValue]);

  // Handle clicking outside of edit field to cancel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (editContainerRef.current && 
          !editContainerRef.current.contains(event.target as Node)) {
        setEditField(null);
        setEditValue("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle image file selection
  const handleImageChange =async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const buffer = await file.arrayBuffer();
      const bufU8 = new Uint8Array(buffer as ArrayBuffer);
      const image = "data:image/png;base64,"+Buffer.from(bufU8).toString("base64");
      setImagePreview(image);
    }
  };

  // Handle saving edited field
  const handleSaveEdit =  () => {
    if (!editField) return;
    
    // Prepare update object
    const update: Record<string, any> = {};
    
    if (editField === "name" || editField === "description") {
      update[editField] = editValue;
    }
    
     run("rooms/update", "PUT", {
      name: room.name,
      update,
    });
    
    // Reset edit state
    setEditField(null);
    setEditValue("");
  };

  // Handle saving image
  const handleSaveImage =  () => {
    if (!imageFile) return;
    
    const imageUrl = imagePreview;
    
     run("rooms/update", "PUT", {
      name: room.name,
      update: {
        image: imageUrl,
      },
    });
    
    setImageFile(null);
    setImagePreview(null);
  };

  // Handle canceling image upload
  const handleCancelImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Handle starting edit for a field
  const startEdit = (field: string, value: string) => {
    // Set the value first, then the field to trigger the useEffect
    setEditValue(value);
    // Use setTimeout to ensure state updates before focusing
    setTimeout(() => {
      setEditField(field);
    }, 0);
  };

  // Show tooltip when hovering over editable elements
  const handleMouseEnter = () => {
    if (isOwner) {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 300);
  };

  // Editable component for room name and description
  const EditableField = ({ field, value, placeholder }: { field: string, value: string, placeholder: string }) => {

    if (editField === field) {
      return (
        <div className="flex w-auto items-center lg:flex-row md:flex-row flex-col gap-2" ref={editContainerRef}>
          <input
            ref={editRef}
            type="text"
            autoFocus
            value={editValue}
            onChange={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              setEditValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission
                handleSaveEdit();
              } else if (e.key === "Escape") {
                setEditField(null);
                setEditValue("");
              }
            }}
            className="bg-[#404249] text-[#EBD3F8] px-2 py-1 rounded-md focus:outline-none focus:ring-1 w-full focus:ring-[#7A1CAC]"
            placeholder={placeholder}
          />
          <div className="flex self-end gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              handleSaveEdit();
            }} 
            className="text-green-500 hover:text-green-400"
          >
            <FaCheck />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              setEditField(null);
              setEditValue("");
            }} 
            className="text-red-500 hover:text-red-400"
          >
            <FaTimes />
          </button>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className={`relative group ${isOwner ? 'cursor-pointer' : ''}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          if (isOwner) {
            startEdit(field, value);
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {value}
        {isOwner && showTooltip && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#1E1F22] text-[#EBD3F8] text-xs px-2 py-1 rounded whitespace-nowrap">
            Click to edit
          </div>
        )}
        {isOwner && (
          <span className="ml-2 text-[#7A1CAC] opacity-0 group-hover:opacity-100 transition-opacity">
            <FaPencilAlt size={10} />
          </span>
        )}
      </div>
    );
  };

  // Editable image component
  const EditableImage = () => {
    return (
      <div 
        className={`w-16 h-16 rounded-full bg-[#7A1CAC] flex items-center overflow-hidden justify-center relative ${isOwner ? 'cursor-pointer' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {imagePreview ? (
          <div className="relative w-full h-full">
            <img
              src={imagePreview}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black bg-opacity-50">
              <button onClick={handleSaveImage} className="text-green-500 hover:text-green-400 p-1">
                <FaCheck />
              </button>
              <button onClick={handleCancelImage} className="text-red-500 hover:text-red-400 p-1">
                <FaTimes />
              </button>
            </div>
          </div>
        ) : room.image ? (
          <>
            <img
              src={room.image}
              alt={room.name}
              onClick={() => isOwner && fileInputRef.current?.click()}
              className="w-full h-full object-cover hover:opacity-80 transition-opacity"
            />
            {isOwner && showTooltip && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1E1F22] text-[#EBD3F8] text-xs px-2 py-1 rounded whitespace-nowrap">
                Click to change image
              </div>
            )}
            {isOwner && (
              <div onClick={() => isOwner && fileInputRef.current?.click()} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                <FaPencilAlt className="text-[#EBD3F8]" />
              </div>
            )}
          </>
        ) : (
          <>
            <span className="text-xl m-2">🎭</span>
            {isOwner && showTooltip && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1E1F22] text-[#EBD3F8] text-xs px-2 py-1 rounded whitespace-nowrap">
                Click to add image
              </div>
            )}
            {isOwner && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                <FaPencilAlt className="text-[#EBD3F8]" />
              </div>
            )}
          </>
        )}
        {isOwner && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        )}
      </div>
    );
  };

  const handleStayVote = () => {
    const existingMembers: string[] = room.members || [];
    const existingEnemies: string[] = room.enemies || [];

    if (!existingMembers.includes(user?.id)) {
      // Remove from enemies if present
      const updatedEnemies = existingEnemies.filter((id) => id !== user?.id);

      run("rooms/update", "PUT", {
        name: room.name,
        update: {
          stay_votes: hasVotedGo ? room.stay_votes + 1 : room.stay_votes + 1,
          go_votes: hasVotedGo ? room.go_votes - 1 : room.go_votes,
          members: [...existingMembers, user?.id],
          enemies: updatedEnemies,
        },
      });
    }
  };

  const handleGoVote = () => {
    const existingEnemies: string[] = room.enemies || [];
    const existingMembers: string[] = room.members || [];

    if (!existingEnemies.includes(user?.id)) {
      // Remove from members if present
      const updatedMembers = existingMembers.filter((id) => id !== user?.id);

      run("rooms/update", "PUT", {
        name: room.name,
        update: {
          go_votes: hasVotedStay ? room.go_votes + 1 : room.go_votes + 1,
          stay_votes: hasVotedStay ? room.stay_votes - 1 : room.stay_votes,
          enemies: [...existingEnemies, user?.id],
          members: updatedMembers,
        },
      });
    }
  };

  // Update the button classes to include active state
  const stayButtonClass = `flex-1 flex items-center justify-center gap-2 ${
    hasVotedStay ? "bg-[#7A1CAC]" : "bg-[#404249]"
  } hover:bg-[#7A1CAC] transition-colors px-4 py-2 rounded-lg`;

  const goButtonClass = `flex-1 flex items-center justify-center gap-2 ${
    hasVotedGo ? "bg-[#7A1CAC]" : "bg-[#404249]"
  } hover:bg-[#7A1CAC] transition-colors px-4 py-2 rounded-lg`;

  return (
    <div className="flex h-[100dvh] w-full relative overflow-x-hidden">
      {/* Mobile Info Panel Overlay */}
      <div
        className={`fixed inset-0 bg-[#2B2D31] z-20 transition-transform duration-300 lg:hidden md:hidden 
        ${showInfo ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-4 right-4 text-[#EBD3F8] text-xl"
          >
            ✕
          </button>
          <div className="flex items-center gap-4 mb-4">
            <EditableImage />
            <div className="text-xl font-bold text-[#EBD3F8]">
              <EditableField field="name" value={room.name} placeholder="Room name" />
            </div>
          </div>
          <div className="text-[#a5a6a3] text-sm mb-6">
            <EditableField field="description" value={room.description} placeholder="Room description" />
          </div>

          <div className="bg-[#313338] rounded-lg p-4">
            <p className="text-[#EBD3F8] mb-3 text-sm font-medium">
              Should this room stay?
            </p>
            <div className="flex gap-4">
              <button onClick={handleStayVote} className={stayButtonClass}>
                <FaThumbsUp className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">Yes</span>
                <p>{room.stay_votes}</p>
              </button>
              <button onClick={handleGoVote} className={goButtonClass}>
                <FaThumbsDown className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">No</span>
                <p>{room.go_votes}</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Info Panel */}
      <div className="w-80 bg-[#2B2D31] lg:flex md:flex hidden flex-col">
        <div className="p-4 border-b border-[#1E1F22]">
          <div className="flex items-center gap-4 mb-4">
            <EditableImage />
            <div className="text-xl font-bold text-[#EBD3F8]">
              <EditableField field="name" value={room.name} placeholder="Room name" />
            </div>
          </div>
          <div className="text-[#a5a6a3] text-sm mb-6">
            <EditableField field="description" value={room.description} placeholder="Room description" />
          </div>

          {/* Room Vote Section */}
          <div className="bg-[#313338] rounded-lg p-4">
            <p className="text-[#EBD3F8] mb-3 text-sm font-medium">
              Should this room stay?
            </p>
            <div className="flex gap-4">
              <button onClick={handleStayVote} className={stayButtonClass}>
                <FaThumbsUp className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">Yes</span>
                <p>{room.stay_votes}</p>
              </button>
              <button onClick={handleGoVote} className={goButtonClass}>
                <FaThumbsDown className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">No</span>
                <p>{room.go_votes}</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full bg-[#313338] relative">
        {/* Mobile Info Button */}
        <button
          onClick={() => setShowInfo(true)}
          className="lg:hidden md:hidden fixed top-4 right-4 bg-[#7A1CAC] p-2 rounded-full text-[#EBD3F8] z-10"
        >
          <FaInfoCircle size={20} />
        </button>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-hidden h-[30vh] p-4 w-full">
          <div className="w-full lg:max-w-4xl mx-auto px-2 sm:px-4">
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="w-20 h-20 rounded-full bg-[#7A1CAC] flex items-center justify-center">
                <span className="text-4xl">💭</span>
              </div>
              <h1 className="lg:text-2xl text-center text-xl font-bold text-[#EBD3F8]">
                Welcome to {room.name}
              </h1>
              <p className="text-[#a5a6a3] text-center text-sm md:text-base">
                This is the beginning of the conversation. Keep it friendly and
                respectful!
              </p>
            </div>
          </div>
        </div>
        <ChatContainer user={user} room={room} chats={chats} />
      </div>
    </div>
  );
}
