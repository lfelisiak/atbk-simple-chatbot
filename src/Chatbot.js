import React, { useState, useRef, useEffect } from "react";
import chatData from "./chat-data.json";
import TappableOption from "./TappableOption";

/*

*/
const Chatbot = ({ visible }) => {
  const initialMessage = {
    sender: "bot",
    message: chatData.hola,
    options: Object.keys(chatData).filter((key) =>
      ["destino", "transporte", "alojamiento", "presupuesto"].includes(key)
    )
  };
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [breadcrumb, setBreadcrumb] = useState("");
  const [chat, setChat] = useState([
    {
      ...initialMessage
    }
  ]); // Iniciamos la conversación con el mensaje de bienvenida
  useEffect(() => {
    scrollToBottom();
  }, [chat, visible]);

  const setNewQuestion = (userInput) => {
    const currentKey = Object.keys(chatData).find((key) =>
      userInput.toLowerCase().includes(key.toLowerCase())
    );
    const currentData = chatData[currentKey];
    const isBackOption = userInput.toLowerCase() === "volver"; // Verificamos si el usuario seleccionó la opción de volver
    if (isBackOption) {
      const newMessage = {
        sender: "user",
        message: userInput
      }; // Creamos un nuevo mensaje de usuario
      const answer = {
        sender: "bot",
        message: chatData[breadcrumb]?.prompt
          ? chatData[breadcrumb].prompt
          : chatData[breadcrumb],
        options: chatData[breadcrumb]?.options
      }; // Creamos un nuevo mensaje de bot
      setChat([...chat, newMessage, answer]);
    } else {
      const newMessage = {
        sender: "user",
        message: userInput
      }; // Creamos un nuevo mensaje de usuario
      const answer = {
        sender: "bot",
        message: currentData?.prompt || currentData || chatData.error,
        options: currentData?.options || []
      }; // Creamos un nuevo mensaje de bot
      setChat([...chat, newMessage, answer]);
      setBreadcrumb(answer.message);
    }
  };
  const handleUserInput = (event) => {
    event.preventDefault();
    const userInput = event.target[0].value; // Obtenemos la respuesta del usuario
    if (!userInput) {
      return;
    }
    setNewQuestion(userInput);
    event.target.reset(); // Reseteamos el formulario
  };

  if (!visible) return;
  return (
    <div className="chatbot">
      <div className="chatbot__messages">
        {chat.map((message, index) => (
          <div key={index} className={`message message--${message.sender}`}>
            <p>
              {message.sender === "user" && "Tú: "}
              {message.message}
            </p>
            {message.sender === "bot" && message.options?.length > 0 && (
              <div class="options">
                {message.options?.map((option) => (
                  <TappableOption
                    option={option}
                    onTap={() => setNewQuestion(option)}
                  />
                ))}
              </div>
            )}
            <div ref={messageEndRef} />
            <br />
          </div>
        ))}
      </div>
      <section>
        <form onSubmit={handleUserInput}>
          <input type="text" placeholder="Escribe tu pregunta..." />
          <button type="submit"> Enviar </button>
        </form>
      </section>
    </div>
  );
};

export default Chatbot;
