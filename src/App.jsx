import { useState } from "react";
import "./App.css";
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTypewriter, Cursor } from "react-simple-typewriter";

function App() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = async () => {
    const ai = await requestToGroqAI(content.value);
    setData(ai);
    setInputValue("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior (form submission)
      handleSubmit();
    }
  };
  const [typeEffect] = useTypewriter({
    words: ["Halo", "こんにちは", "bonjour", "안녕하세요", "مرحبا", "Привет"],
    typeSpeed: 100,
    deleteSpeed: 40,
    loop: true,
  });
  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto">
      <h1 className="text-3xl text-green-400 font-extrabold mb-1 flex">
        tanyaNasril-AI
      </h1>

      {data ? null : (
        <h3 className="text-white font-bold mb-1">
          <span className="mr-1 text-red-600">{typeEffect}👋</span>
          welcome, ask anything here
        </h3>
      )}
      {data ? null : (
        <p className=" text-gray-600 font-bold text-xs">
          Copyright 2024 | Nasril ilham Sa{" "}
        </p>
      )}

      {data ? (
        <SyntaxHighlight language="swift" style={darcula} wrapLongLines={true}>
          {data}
        </SyntaxHighlight>
      ) : null}

      <div className="flex fixed bottom-0 justify-center w-screen bg-[#1e1e1e]">
        <form className="flex gap-4 py-2 rounded-[50px] px-2 bg-slate-800 text-white transition duration-300 ease-in-out transform hover:shadow-lg hover:shadow-green-500 mb-4 md:w-11/12 lg:w-9/12">
          <input
            type="text"
            placeholder="ketik permintaan disini"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="py-2 px-4 text-md w-full border-none outline-none bg-slate-800"
            id="content"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 py-2 px-4 font-bold text-white rounded-[50px] hover:bg-green-800"
          >
            ↑
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
