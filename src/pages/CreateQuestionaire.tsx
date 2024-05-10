import React, { useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import Grid from "@mui/material/Grid";
import { Token, Question } from "../types";
import { CiSquareRemove } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { server } from "../main";

export interface IProps {
  token: Token;
  toMain: () => void;
}

export const CreateQuestionaire = ({ token, toMain }: IProps) => {
  const [questionsIds, setQuestionsIds] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleBack = () => {
    toMain();
  };

  const qList: Question[] = [
    {
      id: "1",
      question: "What is the capital of Italy?",
      multipleChoice: false,
      answer: "Rome",
      incorrectAnswers: [],
      tags: ["geography", "capital cities"],
      difficulty: 1,
    },
    {
      id: "2",
      question: "Who is the author of '1984'?",
      multipleChoice: true,
      answer: "George Orwell",
      incorrectAnswers: ["J.K. Rowling", "Stephen King", "Ernest Hemingway"],
      tags: ["literature", "authors"],
      difficulty: 4,
    },
    {
      id: "3",
      question: "What is the chemical symbol for oxygen?",
      multipleChoice: false,
      answer: "O",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 3,
    },
    {
      id: "4",
      question: "Who is the lead singer of the band Queen?",
      multipleChoice: true,
      answer: "Freddie Mercury",
      incorrectAnswers: ["John Lennon", "Mick Jagger", "David Bowie"],
      tags: ["music", "bands"],
      difficulty: 2,
    },
    {
      id: "5",
      question: "What is the largest ocean on Earth?",
      multipleChoice: false,
      answer: "Pacific Ocean",
      incorrectAnswers: [],
      tags: ["geography", "oceans"],
      difficulty: 2,
    },
    {
      id: "6",
      question: "Who painted the famous painting 'Starry Night'?",
      multipleChoice: true,
      answer: "Vincent van Gogh",
      incorrectAnswers: ["Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      tags: ["art", "paintings"],
      difficulty: 4,
    },
    {
      id: "7",
      question: "What is the main ingredient in guacamole?",
      multipleChoice: false,
      answer: "Avocado",
      incorrectAnswers: [],
      tags: ["food", "ingredients"],
      difficulty: 1,
    },
    {
      id: "8",
      question: "What is the chemical symbol for sodium?",
      multipleChoice: false,
      answer: "Na",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 5,
    },
    {
      id: "9",
      question: "Who wrote the play 'Hamlet'?",
      multipleChoice: true,
      answer: "William Shakespeare",
      incorrectAnswers: ["Jane Austen", "Charles Dickens", "Fyodor Dostoevsky"],
      tags: ["literature", "plays"],
      difficulty: 3,
    },
    {
      id: "10",
      question: "What is the tallest mountain in Africa?",
      multipleChoice: false,
      answer: "Mount Kilimanjaro",
      incorrectAnswers: [],
      tags: ["geography", "mountains"],
      difficulty: 4,
    },
    {
      id: "11",
      question: "Who is the creator of the Harry Potter series?",
      multipleChoice: true,
      answer: "J.K. Rowling",
      incorrectAnswers: [
        "J.R.R. Tolkien",
        "George R.R. Martin",
        "Suzanne Collins",
      ],
      tags: ["literature", "authors"],
      difficulty: 2,
    },
    {
      id: "12",
      question: "What is the chemical symbol for gold?",
      multipleChoice: false,
      answer: "Au",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
    {
      id: "13",
      question: "Who painted the famous painting 'The Persistence of Memory'?",
      multipleChoice: true,
      answer: "Salvador Dalí",
      incorrectAnswers: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh"],
      tags: ["art", "paintings"],
      difficulty: 2,
    },
    {
      id: "14",
      question: "What is the currency of Japan?",
      multipleChoice: false,
      answer: "Japanese yen",
      incorrectAnswers: [],
      tags: ["economics", "currencies"],
      difficulty: 1,
    },
    {
      id: "15",
      question: "Who is the first woman to win a Nobel Prize?",
      multipleChoice: true,
      answer: "Marie Curie",
      incorrectAnswers: ["Amelia Earhart", "Rosa Parks", "Mother Teresa"],
      tags: ["history", "Nobel Prize"],
      difficulty: 2,
    },
    {
      id: "16",
      question: "What is the chemical symbol for helium?",
      multipleChoice: false,
      answer: "He",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
    {
      id: "17",
      question: "Who directed the movie 'The Shawshank Redemption'?",
      multipleChoice: true,
      answer: "Frank Darabont",
      incorrectAnswers: [
        "Quentin Tarantino",
        "Steven Spielberg",
        "Martin Scorsese",
      ],
      tags: ["movies", "directors"],
      difficulty: 2,
    },
    {
      id: "18",
      question: "What is the main ingredient in hummus?",
      multipleChoice: false,
      answer: "Chickpeas",
      incorrectAnswers: [],
      tags: ["food", "ingredients"],
      difficulty: 1,
    },
    {
      id: "19",
      question: "Who wrote the novel 'Pride and Prejudice'?",
      multipleChoice: true,
      answer: "Jane Austen",
      incorrectAnswers: ["Charlotte Brontë", "Emily Dickinson", "Leo Tolstoy"],
      tags: ["literature", "authors"],
      difficulty: 2,
    },
    {
      id: "20",
      question: "What is the chemical symbol for carbon?",
      multipleChoice: false,
      answer: "C",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
  ];

  const showInanswers = (incorrectAnswers: string[]) => {
    const s = "";
    incorrectAnswers.forEach((a) => s.concat(a));
    return s;
  };

  const showQuestion = (q: Question, index: number) => {
    const bg =
      questionsIds.find((id) => id === q.id) !== undefined
        ? "#54D167"
        : index % 2 === 0
        ? "#e4e4e7"
        : "#f5f5f5";

    return (
      <div>
        <div className="flex p-2 m-4 rounded-xl" style={{ background: bg }}>
          <div className="min-w-[200px] pl-4 pt-2 font-bold rounded-lg border-1 border-black">
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
          <div className="text-xl ml-3 w-[100%]">
            <div className="flex">
              <div className="mr-2">Q:</div>
              <div className="font-semibold">{`${q.question}`}</div>
            </div>
            <div className="flex">
              <div className="mr-2">A:</div>
              <div className="">
                <div className="flex">
                  <div className="font-semibold">{`${q.answer}`}</div>
                </div>
              </div>
            </div>
            {q.multipleChoice && (
              <div className="underline mt-3">Incorrect Answers</div>
            )}
            {q.incorrectAnswers.map((a, index) => (
              <div>{`${index + 1}) ${q.incorrectAnswers[index]}`}</div>
            ))}
          </div>

          <div className="min-w-[100px] flex items-center">
            {questionsIds.find((id) => id === q.id) === undefined && (
              <button
                className="w-[80px] h-[25px] text-cyan-900 text-5xl rounded-md flex justify-center items-center"
                type="button"
                onClick={() => setQuestionsIds(questionsIds.concat(q.id))}
              >
                <CiSquarePlus />
              </button>
            )}
            {questionsIds.find((id) => id === q.id) !== undefined && (
              <div>
                <div></div>
                <button
                  className="w-[80px] h-[25px] text-cyan-900 text-5xl rounded-md flex justify-center items-center"
                  type="button"
                  onClick={() =>
                    setQuestionsIds(questionsIds.filter((id) => id !== q.id))
                  }
                >
                  <CiSquareRemove />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Container w="80%" h="100%">
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
          <div className="text-4xl text-brown font-bold ml-6">
            New Questionnaire
          </div>
          <div className="mt-5 pl-6 pr-12">
            <input
              className="p-2.5 w-[100%] border-2 border-gray-300 rounded-md"
              type="text"
              placeholder="Title"
              value={title}
              onChange={onTitleChange}
              required
            />
          </div>
          <div className="mt-2 pl-6 pr-12">
            <input
              className="p-2.5 w-[30%] border-2 border-gray-300 rounded-md"
              type="text"
              placeholder="Filter"
              value={""}
              onChange={() => {}}
              required
            />
            <button
              className="p-2 ml-2 w-[100px] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
              type="submit"
            >
              Filter
            </button>
          </div>
          <div className="mb-3"></div>
          <div className="p-2 h-[700px] overflow-y-auto rounded-md">
            {qList.map((q, index) => showQuestion(q, index))}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="p-2 w-[40%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
              type="submit"
            >
              Create Questionnaire
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
