"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useState, useEffect } from 'react';

export function InputChat() {
  // const [value, setValue] = useState("");
  // const [message, setMessage] = useState(null);
  // const [previousChats, setPreviousChats] = useState([]);
  // const [currentTitle, setCurrentTitle] = useState(null);

  // const getMessages = async () => {
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       message: value
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };

  //   try {
  //     const response = await fetch('http://localhost:4000/connections', options);
  //     const data = await response.json();
  //     console.log(data);
  //     setMessage(data.choices[0].message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log(currentTitle, value, message);
  //   if (!currentTitle && value && message) {
  //     setCurrentTitle(value);
  //   }
  //   if (currentTitle && value && message) {
  //     setPreviousChats(previousChats => ([
  //       ...previousChats,
  //       {
  //         title: currentTitle,
  //         role: "user",
  //         content: value
  //       },
  //       {
  //         title: currentTitle,
  //         role: message.role,
  //         content: message.content
  //       }
  //     ]));
  //   }
  // }, [message, currentTitle]);

  // console.log(previousChats);

  //const cuurentChat = previousChats.filter( previousChats => previousChats.title === currentTitle)

  return (
    <div className="flex w-full items-center space-x-2 justify-between p-2 shadow-xl">
      <Input
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        placeholder="Enter prompt"
      />
      <Button type="submit" 
      // onClick={getMessages}
      >Enter</Button>
    </div>
  );
}

// code for new chat button:
/*
<button onClick= {createNewChat}> + New chat </button> --in design

//defining createNewChat funciton: to be inserted at top with other functions
const createNewChat = () => {
  setMessage(null)
  setValue("")
  setCurrentTitle(null) 
}
*/