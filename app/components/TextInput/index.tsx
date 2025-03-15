"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

export function TextInput() {
  const [text, setText] = useState("");
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="추출을 원하는 keyword를 입력하세요."
        className="w-72 px-4 py-2 border rounded-lg border-gray-400 outline-none focus:border-rose-500"
      />
      <button
        type="button"
        onClick={() => {}}
        className="p-2 bg-rose-400 text-white rounded-lg shadow-md hover:bg-rose-500 transition"
      >
        <Plus />
      </button>
    </div>
  );
}
