import React from 'react'
import { useGlobalState, setGlobalState } from 'react-global-state-hook'

export const Modal = () => {
    const [config, setConfig] = useGlobalState("modal", "")
    
    if (config === "") {
      return null
    }

    return (
      <div className="modal">
        <div className='inside'> 
          Are you 18 or over?
          <button onClick={() => setConfig("")}>Yes</button>
          <button>No</button>
        </div>
      </div>
    );
}