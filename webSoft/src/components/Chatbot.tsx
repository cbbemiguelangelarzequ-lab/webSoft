import React, { useState } from 'react';
import './Chatbot.css';
import { sendChatMessage } from '../services/api';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: 'Hola, soy el asistente de Soft & Robotics Lab. ¿En qué puedo ayudarte?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages: Message[] = [...messages, { from: 'user' as const, text: trimmed }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendChatMessage(trimmed);
      setMessages([...newMessages, { from: 'bot' as const, text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          from: 'bot' as const,
          text: 'Ocurrió un error al hablar con la IA. Inténtalo de nuevo en un momento.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Asistente IA</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                <div className="bubble">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot">
                <div className="bubble bubble-loading">Pensando...</div>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Pregúntame sobre servicios, tecnología, etc."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      {!open && (
        <button className="chatbot-toggle" onClick={() => setOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
