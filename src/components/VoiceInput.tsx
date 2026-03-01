import { useState, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";
import { useUserStore } from "@/stores/userStore";

interface VoiceInputProps {
  onResult: (text: string) => void;
  className?: string;
}

const langMap: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  bn: "bn-IN",
  te: "te-IN",
};

const VoiceInput = ({ onResult, className = "" }: VoiceInputProps) => {
  const [listening, setListening] = useState(false);
  const language = useUserStore((s) => s.language);

  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = langMap[language] || "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      onResult(text);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  }, [language, onResult]);

  return (
    <button
      type="button"
      onClick={startListening}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full transition-all ${
        listening
          ? "animate-voice-pulse bg-primary text-primary-foreground"
          : "bg-saffron-light text-primary hover:bg-primary hover:text-primary-foreground"
      } ${className}`}
      aria-label="Voice input"
    >
      {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </button>
  );
};

export default VoiceInput;
