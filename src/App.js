import React, { useState } from "react";
import Chatbot from "./Chatbot";
import "./styles.css";
export default function App() {
  const [visible, setVisible] = useState(false);
  const handleButtonClick = () => setVisible(!visible);

  return (
    <section className="App">
      <Chatbot visible={visible} />
      <button
        class={`chatbot-visibility chatbot-visibility--${
          visible ? "open" : "closed"
        }`}
        onClick={handleButtonClick}
      >
        Asistente virtual
      </button>
    </section>
  );
}
