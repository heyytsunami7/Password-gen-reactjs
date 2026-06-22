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
  <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
    <div className="w-full max-w-sm bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="bg-orange-500 px-6 py-5">
        <h1 className="text-white font-semibold text-lg">Password Generator</h1>
        <p className="text-orange-200 text-xs mt-0.5">Strong, unique, ready to use</p>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">

        {/* Password block */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
          <p className="text-xs text-stone-400 mb-1.5">Your password</p>
          <input
            ref={passwordRef} type="text" readOnly value={password}
            className="w-full bg-transparent font-mono text-sm text-stone-800 tracking-wider outline-none mb-3"
          />
          <button onClick={CopytoClipboard}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-medium py-2 rounded-lg transition-all">
            Copy to clipboard
          </button>
        </div>

        {/* Length */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-stone-600">Length</label>
            <span className="text-xs font-mono font-semibold text-stone-800 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-md">
              {length}
            </span>
          </div>
          <input type="range" min="8" max="40" value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer" />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>8</span><span>40</span>
          </div>
        </div>

        <hr className="border-stone-100" />

        {/* Options */}
        <div>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-medium mb-2.5">Include</p>
          <label className="flex items-center gap-3 mb-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-orange-500 cursor-pointer"
              onChange={() => intSelected(p => !p)} />
            <span className="text-sm text-stone-600">Numbers (0–9)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-orange-500 cursor-pointer"
              onChange={() => charSelected(p => !p)} />
            <span className="text-sm text-stone-600">Symbols (!@#$...)</span>
          </label>
        </div>

        {/* Regenerate */}
        <button onClick={PasswordGenerator}
          className="w-full py-2.5 text-sm text-stone-500 hover:text-stone-800 hover:bg-stone-50 border border-stone-200 hover:border-stone-300 rounded-xl transition-all">
          Generate new password
        </button>

      </div>
    </div>
  </div>
)
}

export default App 
