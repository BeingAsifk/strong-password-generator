import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbAllow, setNumbAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  //useRef

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*_~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbAllow, charAllow, setPassword]);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  ////
  useEffect(() => {
    passwordGenerator();
  }, [length, numbAllow, charAllow, setPassword]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-10 my-36 text-yellow-500 bg-gray-800">
        <h1 className="text-white text-center mb-4 text-4xl ">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none w-full py-1 px-3"
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-green-700 "
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbAllow}
              id="numberInput"
              onChange={() => {
                setNumbAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
