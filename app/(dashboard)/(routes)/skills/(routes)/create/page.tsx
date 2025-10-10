"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";

const loadingTexts = [
    "We are preparing the best for you...",
    "Orchestrating your skill flow...",
    "Your Upskilling journey will be ready soon!"
  ];

const CreateSkill = () => {
  const [stage, setStage] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleLevelChange = (level: string) => {
    setLevel(level);
  }

  const toggleNext = () => {
    if(title === "") return toast.error("Title is required")
    setStage((prev) => prev + 1);
  }

  const togglePrev = () => {
    setStage((prev) => prev - 1);
  }

  const handleSubmit = async () => {
    if(level === "") return toast.error("Level is required");
    const data = { title, level };
    setStage(3);

    try {
        setLoading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/upskilling/skills`, data, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
              },
        });
        setLoading(false);
        setStage(2);

        toast.success(`Your skill ${title} is ready!`);
        router.push(`/skills/${res.data.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoading(false);
        setStage(2);
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
  }

  return (
    <div className="padding-container">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-4 max-w-[600px]">
        {stage === 1 ?
          <div className="flex flex-col items-center justify-center">
            <Image
              src={"/assets/skill-learn.jpg"}
              className="rounded-2xl mb-10"
              alt="learn"
              width={300}
              height={300}
            />
            <h2 className="text-3xl md:text-7xl font-bold">
              What <span className="text-purple-700">Skill</span> would <br />
              you like <span className="text-purple-700">To Learn?</span>
            </h2>
            <Input
                value={title}
                onChange={handleTitleChange}
              className="h-14 mt-10"
              type="text"
              placeholder="Type your desired skill here. e.g. Presentation"
            />
          </div>
          : stage === 2 ?

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-7xl text-center mt-20 font-bold mb-6">
                What&apos;s your current level?
            </h2>
            <Select
                onValueChange={(level) => {
                    handleLevelChange(level)
                }}
            >
                <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value={"beginner"}>Beginner</SelectItem>
                <SelectItem value={"intermediate"}>Intermediate</SelectItem>
                <SelectItem value={"expert"}>Expert</SelectItem>
                </SelectContent>
            </Select>
            </div>
          

          :
          <div className="flex flex-col items-center justify-center mt-36">
            <Spinner className="size-60" />
                        <TypeAnimation
                            sequence={[
                            ...loadingTexts.flatMap((text) => [text, 2000]), // display each for 2s
                            ]}
                            wrapper="p"
                            cursor={true}
                            repeat={Infinity}
                            speed={60}
                            style={{ fontSize: "1.25rem", fontWeight: 500, textAlign: "center" }}
                        />
          </div>
          
            }

            {stage === 1 ? 
            <Button
                onClick={toggleNext}
            className="w-full h-14">
                Next <ArrowRight />
            </Button>
            :
            stage === 2 &&

            <Button
                onClick={handleSubmit}
            className="w-full h-14">
                Proceed 
            </Button>
             }

            {stage === 2 &&
            <Button onClick={togglePrev} variant={"outline"} className="w-full h-14">
            <ArrowLeft />Prev
            </Button>
            }
          
        </div>
        
      </div>
    </div>
  );
};

export default CreateSkill;
