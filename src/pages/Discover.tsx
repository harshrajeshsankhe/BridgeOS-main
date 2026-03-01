import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { matchSchemes, schemes } from "@/data/schemes";
import SchemeCard from "@/components/SchemeCard";
import VoiceInput from "@/components/VoiceInput";
import { Send, Bot, User, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "bot";
  text: string;
  schemes?: typeof schemes;
}

const parseQuery = (text: string) => {
  const lower = text.toLowerCase();
  const profile: any = {};
  if (lower.includes("widow") || lower.includes("विधवा")) profile.categories = ["Widow"];
  if (lower.includes("farmer") || lower.includes("किसान") || lower.includes("शेतकरी")) profile.occupation = "Farmer";
  if (lower.includes("student") || lower.includes("छात्र") || lower.includes("विद्यार्थी")) profile.occupation = "Student";
  if (lower.includes("unemployed") || lower.includes("बेरोजगार")) profile.occupation = "Unemployed";
  if (lower.includes("daily wage") || lower.includes("मजदूरी") || lower.includes("रोजंदारी")) profile.occupation = "Daily Wage";
  if (lower.includes("senior") || lower.includes("elderly") || lower.includes("वरिष्ठ") || lower.includes("ज्येष्ठ")) profile.categories = [...(profile.categories || []), "Senior Citizen"];
  if (lower.includes("disabled") || lower.includes("विकलांग") || lower.includes("अपंग")) profile.categories = [...(profile.categories || []), "Disabled"];
  const incomeMatch = lower.match(/[₹]?\s*(\d+)/);
  if (incomeMatch) profile.income = Number(incomeMatch[1]);
  if (lower.includes("bpl") || lower.includes("बीपीएल")) profile.bpl = true;
  if (lower.includes("below poverty") || lower.includes("गरीबी")) profile.bpl = true;
  return profile;
};

const scenarios = [
  { key: "scenario_farmer", query: "I am a farmer" },
  { key: "scenario_widow", query: "I am a widow with BPL card" },
  { key: "scenario_student", query: "I am a student" },
  { key: "scenario_unemployed", query: "I am unemployed with BPL" },
];

const Discover = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [simpleMode, setSimpleMode] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const isHi = i18n.language === "hi";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    const profile = parseQuery(text);
    const matched = matchSchemes(profile);

    let botText: string;
    if (matched.length > 0) {
      if (simpleMode) {
        botText = isHi
          ? `${matched.length} योजनाएं मिलीं:\n${matched.map((s) => `- ${s.nameHi}: ${s.benefitHi}`).join("\n")}`
          : `Found ${matched.length} schemes:\n${matched.map((s) => `- ${s.name}: ${s.benefit}`).join("\n")}`;
      } else {
        botText = isHi
          ? `आपकी प्रोफ़ाइल के आधार पर, मुझे ${matched.length} योजनाएं मिलीं:`
          : `Based on your profile, I found ${matched.length} schemes for you:`;
      }
    } else {
      botText = isHi
        ? "कृपया अपनी स्थिति के बारे में अधिक जानकारी दें - जैसे आय, व्यवसाय, या श्रेणी।"
        : "Please tell me more about your situation - like income, occupation, or category.";
    }

    const botMsg: Message = { role: "bot", text: botText, schemes: matched.length > 0 ? matched : undefined };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  };

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col bg-background">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container max-w-2xl">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-saffron">
                <Bot className="h-10 w-10 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t("talk_to_bridge")}</h2>
              <p className="mt-3 max-w-md text-muted-foreground">{t("chat_example")}</p>

              {/* Quick Scenario Buttons */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {scenarios.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => send(s.query)}
                    className="inline-flex h-12 items-center gap-2 rounded-xl border bg-card px-4 text-sm font-medium text-card-foreground hover:bg-muted transition-colors"
                  >
                    <Lightbulb className="h-4 w-4 text-primary" />
                    {t(s.key)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
            >
              {m.role === "bot" && (
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
              )}
              <div className={`max-w-[80%] ${m.role === "user" ? "order-first" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-base whitespace-pre-line ${
                    m.role === "user"
                      ? "gradient-saffron text-primary-foreground"
                      : "border bg-card text-card-foreground"
                  }`}
                >
                  {m.text}
                </div>
                {m.schemes && (
                  <div className="mt-3 flex flex-col gap-3">
                    {m.schemes.map((s) => (
                      <SchemeCard key={s.id} scheme={s} eligibility="eligible" />
                    ))}
                  </div>
                )}
              </div>
              {m.role === "user" && (
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-5 w-5" />
                </div>
              )}
            </motion.div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-card p-4">
        <div className="container flex max-w-2xl flex-col gap-2">
          {/* Simple words toggle */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setSimpleMode(!simpleMode)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                simpleMode ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {simpleMode ? t("simple_words") : t("normal_mode")}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="h-14 flex-1 rounded-xl border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={t("chat_placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
            />
            <VoiceInput onResult={(v) => { setInput(v); send(v); }} />
            <button
              onClick={() => send(input)}
              className="inline-flex h-14 w-14 items-center justify-center rounded-xl gradient-saffron text-primary-foreground shadow-warm transition-transform hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Discover;
