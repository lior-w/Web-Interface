import React, { useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Question } from "./CreateQuestion";
import Grid from "@mui/material/Grid";

export interface IProps {
  toMain: () => void;
  onSubmit: (
    question: string,
    multipleChoice: boolean,
    correctAnswer: string,
    IncorrectAnswers: string[],
    tags: string[],
    difficulty: number | null
  ) => void;
}

export const CreateQuestionaire = ({ toMain, onSubmit }: IProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleBack = () => {
    toMain();
  };

  const qList: Question[] = [
    {
      id: 1,
      question:
        "What is the capital of Italy?What is the capital of Italy?What is the capital of Italy?What is the capital of Italy?What is the capital of Italy?What is the capital of Italy?What is the capital of Italy?What is the capital of Italy?",
      multipleChoice: false,
      correctAnswer: "Rome",
      incorrectAnswers: [],
      tags: ["geography", "capital cities"],
      difficulty: 1,
    },
    {
      id: 2,
      question: "Who is the author of '1984'?",
      multipleChoice: true,
      correctAnswer: "George Orwell",
      incorrectAnswers: ["J.K. Rowling", "Stephen King", "Ernest Hemingway"],
      tags: ["literature", "authors"],
      difficulty: 4,
    },
    {
      id: 3,
      question: "What is the chemical symbol for oxygen?",
      multipleChoice: false,
      correctAnswer: "O",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 3,
    },
    {
      id: 4,
      question: "Who is the lead singer of the band Queen?",
      multipleChoice: true,
      correctAnswer: "Freddie Mercury",
      incorrectAnswers: ["John Lennon", "Mick Jagger", "David Bowie"],
      tags: ["music", "bands"],
      difficulty: 2,
    },
    {
      id: 5,
      question: "What is the largest ocean on Earth?",
      multipleChoice: false,
      correctAnswer: "Pacific Ocean",
      incorrectAnswers: [],
      tags: ["geography", "oceans"],
      difficulty: 2,
    },
    {
      id: 6,
      question: "Who painted the famous painting 'Starry Night'?",
      multipleChoice: true,
      correctAnswer: "Vincent van Gogh",
      incorrectAnswers: ["Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      tags: ["art", "paintings"],
      difficulty: 4,
    },
    {
      id: 7,
      question: "What is the main ingredient in guacamole?",
      multipleChoice: false,
      correctAnswer: "Avocado",
      incorrectAnswers: [],
      tags: ["food", "ingredients"],
      difficulty: 1,
    },
    {
      id: 8,
      question: "What is the chemical symbol for sodium?",
      multipleChoice: false,
      correctAnswer: "Na",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 5,
    },
    {
      id: 9,
      question: "Who wrote the play 'Hamlet'?",
      multipleChoice: true,
      correctAnswer: "William Shakespeare",
      incorrectAnswers: ["Jane Austen", "Charles Dickens", "Fyodor Dostoevsky"],
      tags: ["literature", "plays"],
      difficulty: 3,
    },
    {
      id: 10,
      question: "What is the tallest mountain in Africa?",
      multipleChoice: false,
      correctAnswer: "Mount Kilimanjaro",
      incorrectAnswers: [],
      tags: ["geography", "mountains"],
      difficulty: 4,
    },
    {
      id: 11,
      question: "Who is the creator of the Harry Potter series?",
      multipleChoice: true,
      correctAnswer: "J.K. Rowling",
      incorrectAnswers: [
        "J.R.R. Tolkien",
        "George R.R. Martin",
        "Suzanne Collins",
      ],
      tags: ["literature", "authors"],
      difficulty: 2,
    },
    {
      id: 12,
      question: "What is the chemical symbol for gold?",
      multipleChoice: false,
      correctAnswer: "Au",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
    {
      id: 13,
      question: "Who painted the famous painting 'The Persistence of Memory'?",
      multipleChoice: true,
      correctAnswer: "Salvador Dalí",
      incorrectAnswers: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh"],
      tags: ["art", "paintings"],
      difficulty: 2,
    },
    {
      id: 14,
      question: "What is the currency of Japan?",
      multipleChoice: false,
      correctAnswer: "Japanese yen",
      incorrectAnswers: [],
      tags: ["economics", "currencies"],
      difficulty: 1,
    },
    {
      id: 15,
      question: "Who is the first woman to win a Nobel Prize?",
      multipleChoice: true,
      correctAnswer: "Marie Curie",
      incorrectAnswers: ["Amelia Earhart", "Rosa Parks", "Mother Teresa"],
      tags: ["history", "Nobel Prize"],
      difficulty: 2,
    },
    {
      id: 16,
      question: "What is the chemical symbol for helium?",
      multipleChoice: false,
      correctAnswer: "He",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
    {
      id: 17,
      question: "Who directed the movie 'The Shawshank Redemption'?",
      multipleChoice: true,
      correctAnswer: "Frank Darabont",
      incorrectAnswers: [
        "Quentin Tarantino",
        "Steven Spielberg",
        "Martin Scorsese",
      ],
      tags: ["movies", "directors"],
      difficulty: 2,
    },
    {
      id: 18,
      question: "What is the main ingredient in hummus?",
      multipleChoice: false,
      correctAnswer: "Chickpeas",
      incorrectAnswers: [],
      tags: ["food", "ingredients"],
      difficulty: 1,
    },
    {
      id: 19,
      question: "Who wrote the novel 'Pride and Prejudice'?",
      multipleChoice: true,
      correctAnswer: "Jane Austen",
      incorrectAnswers: ["Charlotte Brontë", "Emily Dickinson", "Leo Tolstoy"],
      tags: ["literature", "authors"],
      difficulty: 2,
    },
    {
      id: 20,
      question: "What is the chemical symbol for carbon?",
      multipleChoice: false,
      correctAnswer: "C",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
  ];

  const showIncorrectAnswers = (incorrectAnswers: string[]) => {
    const s = "";
    incorrectAnswers.forEach((a) => s.concat(a));
    return s;
  };

  const showQuestion = (q: Question, index: number) => {
    const bg = index % 2 === 0 ? "#e4e4e7" : "#f5f5f5";
    return (
      <button>
        <div className="flex p-2" style={{ background: bg }}>
          <div className="border-1 border-black min-w-[100%]">
            <div className="flex">
              <div className="mr-2">Q:</div>
              <div className="font-semibold">{`${q.question}`}</div>
            </div>
            <div className="flex">
              <div className="mr-2">A:</div>
              <div className="">
                <div className="flex">
                  <div className="font-semibold">{`${q.correctAnswer}`}</div>
                </div>
              </div>
            </div>
            {q.multipleChoice && (
              <div className="underline">Incorrect Answers</div>
            )}
            {q.incorrectAnswers.map((a, index) => (
              <div>{`${index + 1}) ${q.incorrectAnswers[index]}`}</div>
            ))}
          </div>
          <div className="min-w-[200px] pl-4  border-1 border-black">
            <div>{`${
              q.multipleChoice ? "Multiple-choice" : "Open-question"
            }`}</div>
            <div className="">{`Difficulty: ${q.difficulty}`}</div>
            <div className="mb-2"></div>
            {q.tags.length > 0 && <div className="underline">Tags</div>}
            <div className="mb-2">
              {q.tags.map((t) => (
                <div className="mr-1">{`#${t}`}</div>
              ))}
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <Container w="80%" h="auto">
      <div className="p-1 flex justify-end">
        <button
          className="text-3xl text-brown font-bold cursor-pointer hover:text-amber-700"
          type="button"
          onClick={handleBack}
        >
          <IoArrowForwardCircle />
        </button>
      </div>
      <div className="flex flex-row">
        <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
          <div className="text-4xl text-brown font-bold">New Questionaire</div>
          <div className="mb-3"></div>
          <div className="h-[400px] border-1 overflow-y-auto bg-neutral-100 rounded-md">
            {qList.map((q, index) => showQuestion(q, index))}
          </div>
        </div>
      </div>
    </Container>
  );
};
