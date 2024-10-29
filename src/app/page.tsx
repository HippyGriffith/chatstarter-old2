"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { SignInButton } from "@clerk/nextjs";

/*interface Message {
  sender: string;
  content: string;
}*/

export default function Home() {
  /*
  const [messages, setMessages] = useState<Message[]>([
    { sender: "Alice", content: "Hello, world!" },
    { sender: "Bob", content: "Hi, Alice!" },
  ]);*/

  const messages = useQuery(api.functions.message.list);
  const createMessage = useMutation(api.functions.message.create);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page from refeshing on submit
    /*setMessages([...messages, { sender: "Alice", content: input }]);*/
    createMessage({ sender: "Alice", content: input });
    setInput("");
  };

  return (
    // question mark indicates that messages may be undefined
    <div>
      <Authenticated>
        <div>
          {messages?.map(
            (message: { sender: string; content: string }, index: number) => (
              <div key={index}>
                <strong>{message.sender}</strong>: {message.content}
              </div>
            )
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              id="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </div>
  );
}
