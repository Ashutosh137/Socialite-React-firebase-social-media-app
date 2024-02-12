import React, { useEffect, useState } from "react";

export default function Message() {
  const [messages, setmessages] = useState([]);
  const [newmessage, setnewmessage] = useState("");

  useEffect(() => {
    const data=()=>{
        
    }
  
    // return () => {
    //   second
    // }
  }, [newmessage])
  
  return (
    <div className="relative h-full">
      <div className="h-screen overflow-y-scroll scroll-hidden">
      {messages.map((message) => {
        return (
          <div className="">
            <p>{message?.content}</p>
          </div>
        );
      })}
      </div>

      <form
        action=""
        className="flex absolute bottom-0 w-full p-2 py-8 bg-gray-900 "
        onSubmit={(e) => {
          e.preventDefault();
          setmessages((prev) => [
            ...prev,
            { content: newmessage, time: new Date() },
          ]);
        }}
      >
        <input
          type="text"
          value={newmessage}
          onChange={(e) => setnewmessage(e.target.value)}
          placeholder="enter a message"
          className="w-full bg-stone-100 text-xl text-black"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
