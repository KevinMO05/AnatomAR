import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, X } from "lucide-react";

const ChatBot = ({ onClose }) => {
  // Configuración estática - Reemplaza con tu API Key real
  const API_KEY = "AIzaSyAW90KhvuWBvB0D80W-tP-sffC1CW-vZrM";
  const BOT_AVATAR = "/anatom.svg"; // o la ruta donde tengas tu imagen

  // Prompt del sistema que define cómo actúa el bot
  const SYSTEM_PROMPT = `Eres Anatom, un chatbot educativo especializado en anatomía humana. Tu tarea es enseñar de forma clara, respetuosa y amigable, usando un lenguaje simple y apropiado para niños de educación primaria. Responde solo preguntas relacionadas con el cuerpo humano y la anatomía. Si alguien hace preguntas que no tienen que ver con la anatomía humana o que no son apropiadas para niños, responde amablemente que no puedes hablar de ese tema porque estás diseñado solo para enseñar sobre el cuerpo humano. No des consejos médicos.`;

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy AnatomAR, tu asistente virtual de anatomía humana. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Función para llamar a la API de Gemini
  const callGeminiAPI = async (prompt) => {
    try {
      const fullPrompt = `${SYSTEM_PROMPT}\n\nUsuario: ${prompt}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Respuesta inesperada de la API");
      }
    } catch (error) {
      console.error("Error al llamar a Gemini API:", error);
      return "Lo siento, hubo un error al procesar tu solicitud. Por favor, verifica que la API Key esté configurada correctamente e intenta de nuevo.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);

    try {
      const botResponse = await callGeminiAPI(currentInput);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Lo siento, no pude procesar tu mensaje. Intenta de nuevo más tarde.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <img
              src={BOT_AVATAR}
              alt="Mascota del proyecto"
              className="h-6 w-6 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">Asistente Virtual</h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-blue-500"
                      : "bg-white border border-gray-300"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <img
                      src={BOT_AVATAR}
                      alt="Mascota del proyecto"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-gray-300">
                  <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                </div>
              </div>
              <div className="bg-white text-gray-800 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  <span className="text-sm text-gray-500">Escribiendo...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm focus:outline-none"
            rows="1"
            disabled={isLoading}
            style={{ minHeight: "40px", maxHeight: "120px" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Presiona Enter para enviar, Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
