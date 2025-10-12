"use client";

import { Clock } from "lucide-react";
import { SkillType, TestType } from "./data-table";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  title: string;
  test: TestType;
  skill_id: number;
  user_token?: string;
  setSkill: React.Dispatch<React.SetStateAction<SkillType | undefined>>;
};

type TestQuestionType = {
  id: number;
  user_answer: string;
};

const TestSection = ({ title, skill_id, setSkill,  test, user_token }: Props) => {
  const [currentTest, setCurrentTest] = useState<number>(0);
  const [testQuestions, setTestQuestions] = useState<TestQuestionType[]>([]);
  const [timeLeft, setTimeLeft] = useState(test.time_limit * 60);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);


  const handleSubmit = useCallback(async () => {
    clearInterval(0); 
    if(test.status === "completed") return;

    const data = {
        skill_id: skill_id,
        answers: testQuestions
    }
    // await submitTest(test.id, testQuestions);
    try {
        setLoading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/upskilling/submit-test`, data, {
            headers: {
                Authorization: `Bearer ${user_token}`,
              },
        });
        setLoading(false);
        toast.success(`${res?.data?.message}. You scored ${res?.data?.score}`);
        setSkill(prev => prev ? {...prev, test: res.data.test }: prev );
        setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoading(false);
        if (error.response) {
            // Server responded with a non-2xx status
            return toast.error(error.response.data.detail);
        } else if (error.request) {
            // Request made but no response received
        } else {
            // Something else happened
        }
        toast.error("Something went wrong. Try again later");
      }
  }, [testQuestions, skill_id, user_token, test.status, setSkill]);

  useEffect(() => {
    if (test?.questions?.length > 0) {
      const initialState = test.questions.map((q) => ({
        id: q.id,
        user_answer: "",
      }));
      setTestQuestions(initialState);
    }
  }, [test]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, handleSubmit]);

  const handleOptionChange = (questionId: number, selectedKey: string) => {
    setTestQuestions((prev) =>
      prev.map((item) =>
        item.id === questionId ? { ...item, user_answer: selectedKey } : item
      )
    );
  };

  const question = test.questions[currentTest];
  const userAnswer =
    testQuestions.find((q) => q.id === question.id)?.user_answer || "";


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
        {test.status === "completed" ? 
         <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-white p-4">
                <h2 className="text-md md:text-2xl font-semibold">
                Test Result/Feedback on {title}
                </h2>
                <p className="text-sm md:text-2xl font-semibold">
                    <span className="text-sm text-gray-600">Score: </span>
                    {test.score}
                    
                    
                
                    {/* <span className="flex items-center gap-2 text-sm">
                        <Clock size={18} />
                        {test.time_limit} Minutes
                    </span> */}
                </p>
            </div>
   
         <div className="flex flex-col mb-6 justify-between gap-4 mt-4">

            {test.questions.map((item, index) => 
           <div key={item.id} className="w-full bg-white p-4">
             <h4 className=" text-sm md:text-base font-bold ">
               Question {index + 1}: <br />
             </h4>
             <p className="mb-4 text-sm md:text-xl">{item.question}</p>
             <hr />
             <div className="space-y-3 mt-4">
               {Object.entries(item.options).map(([key, value]) => (
                 <div key={key} className="flex items-center space-x-2 md:text-2xl">
                   <Checkbox
                     id={`${item.id}-${key}`}
                     checked={item.correct_answer === key}
                     className={`size-4 md:size-8 ${item.user_answer === key && item.user_answer !== item.correct_answer ? "border-red-500": "border-gray-500"}`}
                     onCheckedChange={() => handleOptionChange(item.id, key)}
                   />
                   <Label
                     htmlFor={`${item.id}-${key}`}
                     className="cursor-pointer text-sm md:text-xl font-light"
                   >
                     {value}
                   </Label>
                 </div>
               ))}
             </div>
             <p className="text-sm md:text-base text-gray-600 mt-4"><b>Feedback:</b> {item.explanation}</p>
            
           </div>
           )}
          
         </div>
         </div>
        :

    <div>
      <h2 className="text-2xl bg-white p-4 font-semibold flex items-center justify-between gap-2">
        Test on {title}
        <span className="flex items-center gap-2 text-sm">
          <Clock size={18} />
          {test.time_limit} Minutes
        </span>
      </h2>

      <div className="flex justify-between gap-4 mt-4">
        <div className="w-full md:w-[80%] bg-white p-4">
          <h4 className="font-bold ">
            Question {currentTest + 1}: <br />
          </h4>
          <p className="mb-4 text-xl">{question.question}</p>
          <hr />
          <div className="space-y-3 mt-4">
            {Object.entries(question.options).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2 text-2xl">
                <Checkbox
                  id={`${question.id}-${key}`}
                  checked={userAnswer === key}
                  className="size-8 border-gray-500"
                  onCheckedChange={() => handleOptionChange(question.id, key)}
                />
                <Label
                  htmlFor={`${question.id}-${key}`}
                  className="cursor-pointer text-xl font-light"
                >
                  {value}
                </Label>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentTest((p) => Math.max(0, p - 1))}
              disabled={currentTest === 0}
            >
              Prev
            </Button>
            {currentTest === test.total_questions - 1 ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>Submit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center my-10">
                      Are you sure you really want to submit?
                    </DialogTitle>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={loading} onClick={handleSubmit} type="button">
                      {loading ? <Spinner/> : "Yes, Submit"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                onClick={() =>
                  setCurrentTest((p) =>
                    Math.min(test.questions.length - 1, p + 1)
                  )
                }
              >
                Next
              </Button>
            )}
          </div>
        </div>
        <div className="w-full md:w-[20%] bg-white p-4">
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-2 border-r pr-8">
              <p
                className={`text-2xl font-semibold ${
                  timeLeft <= 60 ? "text-red-600" : ""
                }`}
              >
                {minutes}
              </p>
              <p className="text-gray-500">minutes</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p
                className={`text-2xl font-semibold ${
                  timeLeft <= 60 ? "text-red-600" : ""
                }`}
              >
                {seconds.toString().padStart(2, "0")}
              </p>
              <p className="text-gray-500">seconds</p>
            </div>
          </div>
          <div className=" mt-6 border-t py-6">
            <p className="text-sm text-gray-500 mb-2">Question Tracker</p>
            <div className="grid grid-cols-3 gap-3">
              {testQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className={`p-2 rounded-2xl border text-center border-green-400 ${
                    question.user_answer !== ""
                      ? "bg-green-600 text-white border-none"
                      : ""
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
        }
    </div>
  );
};

export default TestSection;
