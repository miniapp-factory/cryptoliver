import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import { useState } from "react";

export { generateMetadata };

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Rome", "Madrid"],
    answer: 0,
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "English", "French"],
    answer: 1,
  },
];

export default function Home() {
  return (
    <Lesson />
  );
}

function Lesson() {
  const [index, setIndex] = useState(0);
  const [balance, setBalance] = useState(100);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleSelect = (i: number) => {
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = questions[index].answer;
    if (selected === correct) {
      setScore(score + 1);
      setFeedback("Correct! +10");
    } else {
      setBalance(balance - 5);
      setFeedback("Wrong! -5");
    }
    setSelected(null);
    setTimeout(() => {
      setFeedback("");
      setIndex((prev) => (prev + 1) % questions.length);
    }, 1500);
  };

  return (
    <main className="flex flex-col gap-4 place-items-center place-content-center px-4 grow min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="w-full max-w-md bg-card p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{questions[index].question}</h2>
        <div className="grid grid-cols-1 gap-3">
          {questions[index].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-3 rounded-md text-left ${
                selected === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-4 w-full py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
          Submit
        </button>
        {feedback && (
          <p className="mt-4 text-center text-lg font-medium">{feedback}</p>
        )}
      </div>
      <div className="mt-6 flex gap-4">
        <span className="text-lg">Score: {score}</span>
        <span className="text-lg">Balance: ${balance}</span>
      </div>
    </main>
  );
}
