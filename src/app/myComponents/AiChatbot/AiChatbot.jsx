"use client"
import React, { useState } from 'react';
import './AiChatbot.css';
import ReactMarkdown from "react-markdown";

export default function AiChatbot() {



  const [userData, setUserData] = useState([])
  const [AiData, setAiData] = useState([])


  const [inputValue, setInputValue] = useState("");
  const inputHandler = (e) => {
    setInputValue(e.target.value)
  }

  const userInputHandler = async () => {


    if (inputValue.trim() === "") {
      return;
    }

    console.log(inputValue);
    const copydata = [...userData];
    copydata.push(inputValue)
    setUserData(copydata)

    setInputValue("")
    const copyAiData = [...AiData];
    copyAiData.push("typing...")
    setAiData(copyAiData)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: inputValue
        })
      })
      const data = await response.json()

      const copyAiData = [...AiData];
      copyAiData.push(data.message)
      setAiData(copyAiData)

    } catch (error) {
      console.log("unable to fetch data");
      const copyAiData = [...AiData];
      copyAiData.push("Unable to get response.");
      setAiData(copyAiData);
    }

    console.log(userData);

    console.log(AiData);


  }
  return (
    <div className="ai-chatbot-container">
      {/* Sidebar */}

      {/* Main Chat Area */}
      <div className="chatbot-main">
        {
          userData.map((el, index, arr) => {
            return (
              <div key={index} className="messages-container">

                {/* User Message */}
                <div className="message-wrapper user">
                  <div className="message-header">

                    <div className="user-avatar"></div>
                    <span className="message-question">{el}</span>
                  </div>
                </div>

                {/* AI Response */}
                <div className="message-wrapper ai">
                  <div className="ai-header">ChatBot</div>
                  <div className="ai-content">
                    {AiData[index] === "typing..." ? (
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <span>
                        <ReactMarkdown>{AiData[index]}</ReactMarkdown>
                      </span>
                    )}
                  </div>
                </div>

                {AiData[index] !== "typing..." && <hr className='message-divider' />}
              </div>

            )
          })}



        {/* Floating Input Area */}
        <div className="input-area-wrapper">
          <div className="input-container">
            <div className="input-icon">
              <div className="add-icon-container">


                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="add-icon"
                  fill="none"
                >
                  <path
                    d="M4.666,19.63a6.765,6.765,0,0,1-.148-9.713l6.8-6.8a4.845,4.845,0,1,1,6.852,6.851l-6.8,6.8a2.992,2.992,0,0,1-4.132,0,2.927,2.927,0,0,1,0-4.133L12.673,7.2a1,1,0,0,1,1.414,1.414L8.65,14.049a.925.925,0,0,0,0,1.3.945.945,0,0,0,1.3,0l6.8-6.8a2.845,2.845,0,0,0-4.023-4.023l-6.8,6.8a4.766,4.766,0,0,0,.1,6.843,4.93,4.93,0,0,0,6.807-.273l7.984-7.984a1,1,0,1,1,1.414,1.414l-7.984,7.984A7.122,7.122,0,0,1,9.223,21.4,6.607,6.607,0,0,1,4.666,19.63Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

            </div>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  userInputHandler();
                }
              }}
              onChange={inputHandler}
              value={inputValue}
              type="text"
              placeholder="Ask anything..."
            />
            <button onClick={userInputHandler} className="send-btn">


              <svg
                className='send-icon'
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>



      </div>
    </div >
  );
}
