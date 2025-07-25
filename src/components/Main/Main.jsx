import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import khayalIcon from "../../assets/biyometric.jpg";
import { Context } from '../../context/Context';
const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}= useContext(Context)


  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
        <img src={khayalIcon} alt="" />
        </div>
        <div className="main-container">

    {!showResult
    ?<>
    

            <div className="greet">
                <p><span>Hello and welcome.</span></p>
                <p>I'm here to assist you.</p>
            </div>
           <div className="cards">
  <div className="card" onClick={() => onSent("Help me plan an unforgettable, budget-friendly adventure. I’m not sure where to go next — any ideas? ")}>
    <p>Help me plan an unforgettable, budget-friendly adventure. I’m not sure where to go next — any ideas?</p>
    <img src={assets.compass_icon} alt="" />
  </div>
  <div className="card" onClick={() => onSent("Why do some cities feel full of life and energy, while others don’t? I’ve always wondered what makes a place truly vibrant.")}>
    <p>Why do some cities feel full of life and energy, while others don’t? I’ve always wondered what makes a place truly vibrant.</p>
    <img src={assets.bulb_icon} alt="" />
  </div>
  <div className="card" onClick={() => onSent(" My team feels awkward and disconnected. How can I turn them into a confident, high-performing group?")}>
    <p>My team feels awkward and disconnected. How can I turn them into a confident, high-performing group?</p>
    <img src={assets.message_icon} alt="" />
  </div>
  <div className="card" onClick={() => onSent(" This code is a complete mess, and I’m lost. Can you break it down for me like I’m five, but a little bit more detailed?")}>
    <p>This code is a complete mess, and I’m lost. Can you break it down for me like I’m five, but a little bit more detailed?</p>
    <img src={assets.code_icon} alt="" />
  </div>
</div>

    </>
    :<div className='result'>
        <div className="result-title">
            <img src={khayalIcon} alt=''/>
            <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading
            ?<div className='loader'>
                <hr />
                   <hr />
                      <hr />
            </div>
            : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
           
        </div>
    </div>
    }


            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=> setInput(e.target.value)} value={input} type="text"placeholder='Enter a prompt here' />
                
                 <div>
                 <img src={assets.gallery_icon} alt="" />
                 <img src={assets.mic_icon} alt="" />
                 {input? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> :null}
                 </div>
                </div>
                
                <p className="bottom-info">
                    Gemini can sometimes give inaccurate information.
                     Please verify important details, especially about people or sensitive topics.
                </p>
                </div>
        </div>
    </div>
  )
}

export default Main
