"use client";

import { useState, useRef } from "react";



import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth";

type Message = {
    sender: "user" | "viola";
    text: string;
  };

const VoiceAssistant = () => {
    const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModelSpeaking, setIsModelSpeaking] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  // 🎙️ Toggle speech recognition
  const toggleListening = () => {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    setLoading(true);
    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = async (event: SpeechRecognitionEvent) => {
        const userMessage = event.results[0][0].transcript;
        addMessage("user", userMessage);
        await sendToGemini(userMessage);
      };
     
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
    if(!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setIsListening(!isListening);
  };

  // 🧠 Send user message to Gemini API
  const sendToGemini = async (message: string) => {
    try {
      const res = await fetch("/api/viola", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.reply) {
        addMessage("viola", data.reply);
        setLoading(false);
        speak(data.reply);
      }
    } catch (error) {
      console.error("Error:", error);
      addMessage("viola", "Sorry, I encountered a network error.");
    }
  };

  // 💬 Add message to state
  const addMessage = (sender: "user" | "viola", text: string) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  // 🔊 Speak text aloud
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    setIsModelSpeaking(true);
    

    utterance.onend = () => {
        setIsModelSpeaking(false);
    }

    window.speechSynthesis.speak(utterance);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsModelSpeaking(false);
    window.speechSynthesis.cancel();
  }

    return (
        <div className="padding-container py-4">
            <div className="bg-white p-4 md:p-20 rounded-4xl w-full flex flex-col items-center justify-center">
            <p className="text-2xl mb-10">🎓 Hi {user?.name} — Your Teaching Copilot</p>
                {messages.length < 1 || isListening ?
                <Image src={"/assets/audio2.jpg"} alt="voice" width={200} height={200} />
                :
                <div className="w-full max-w-md bg-white shadow p-4 rounded-lg overflow-y-auto h-96 mb-4">
                {messages.map((m, i) => (
                  <div key={i} className={`mb-2 ${m.sender === "user" ? "text-right" : "text-left"}`}>
                    <p
                      className={`inline-block px-3 py-2 rounded-lg ${
                        m.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                      }`}
                    >
                      {m.text}
                    </p>
                  </div>
                ))}
                {loading &&
                <div className="flex items-center justify-center gap-2 mt-10">
                    <Spinner className="size-8" /><p>Loading</p>
                </div>
                }
              </div>
                }
                {isModelSpeaking ? 
                <Button onClick={stopListening} variant="outline" className=" h-12 min-w-40">Stop Listening</Button>
                :
                <Button disabled={loading}  onClick={toggleListening} className={`h-12 min-w-40 ${isListening ? "bg-white text-black border border-[#6166f2] hover:bg-[#efefef]" : "bg-[#6166f2] hover:bg-[#4348d8]"}  `}>{isListening ? "Stop Listening 🎙️" : "Speak to EduAi 🗣️"}</Button>
                }
            </div>
        </div>
    )
}

export default VoiceAssistant;