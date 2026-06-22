import { useState , useEffect , useRef , useCallback} from 'react'

function App() {
   const [length , setLength] = useState(8); 
   const [integer, intSelected] = useState(false);
   const [char, charSelected] = useState(false);
   const [password , setPassword ] = useState("");

  const passwordRef = useRef(null)
  const PasswordGenerator = useCallback(()=>{
    let pass=""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (intSelected) str += "1234567890"
    if(charSelected) str += "!@#$%^&*><?"
    for(let i=0; i<=length ; i++){
       let char = Math.floor(Math.random()*str.length+1)
       pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,integer,char,password])
   
  const CopytoClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 60);
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    PasswordGenerator()
  },[length,integer,char,setPassword])
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center text-orange-400 mb-6">
          Password Generator
        </h1>

        <div className="flex mb-5">
          <input
            type="text"
            readOnly
            placeholder="Generated Password"
            value={password} ref={passwordRef}
            className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white outline-none"
          />

          <button onClick={CopytoClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition"
          >
            Copy
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-gray-300 mb-2">
            Password Length
          </label>

          <input
            type="range"
            min="8"
            max="40"
            className="w-full cursor-pointer"
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label htmlFor="" className="block text-gray-300 mb-2">Length : {length}</label>
        </div>

        <div className="flex items-center justify-between text-gray-300">

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="numbers"
              className="w-4 h-4" onChange={() => {
              intSelected((prev) => !prev);
          }}
            />
            <label htmlFor="numbers">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="characters"
              className="w-4 h-4" onChange={() => {
                  charSelected((prev) => !prev )
              }}
            />
            <label htmlFor="characters">
              Characters
            </label>
          </div>

        </div>

      </div>
    </div>
  )
}

export default App 
