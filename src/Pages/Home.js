import React from 'react'
import { useEffect, useState, useReducer } from 'react'

import Gun from 'gun'; // eslint-disable-line no-use-before-define

const gun = Gun()

const initialState = {
  messages: []
}

function reducer(state, message) {
  return {
      messages: [message, ...state.messages]    
  }
}

const Home = () => {

  const [formState, setFormState] = useState({name: '', message: ''})
  const [state, dispatch] = useReducer(reducer, initialState)


  // How do we know which informations a peer is storing????
  useEffect(()=>{
    const messages = gun.get('messages')

    messages.map().once(message=>{    // Syncs the local state with the states from the peers
        dispatch({
            name: message.name,
            message: message.message,
            createdAt: message.createdAt
        })
    })
  }, [])

  function saveMessage() {
    const messages = gun.get('messages')
    console.log(messages)
    messages.set({
        name: formState.name,
        message: formState.message,
        createdAt: Date.now()
    })
    setFormState({
        name: '',
        message: '',
    })
  }

  function onChange(e){
    setFormState({...formState, [e.target.name]: e.target.value })
  }

  return (
    <div>
        <input onChange={onChange} placeholder="Name" name="name" value={formState.name}>
        </input>
        <input onChange={onChange} placeholder="Message" name="message" value={formState.message}>
        </input>
        <button onClick={saveMessage}>Send Message</button>
        {   
            
            state.messages.map(message=>(
                <div key={message.createdAt}>
                    <h2>{message.message}</h2>
                    <h3>From: {message.name}</h3>
                    <h4>Created At: {message.createdAt}</h4>
                </div>
            ))
        }
    </div>
  )
}

export default Home