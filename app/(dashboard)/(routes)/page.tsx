import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookCheck, CircleCheck, CircleDashed, LayoutPanelTop, ListCheck, ListTodo } from "lucide-react";
import Image from "next/image";

const SKILLS = [
    {
        title: "Robotics Intro",
        progress: 67,
    },
    {
        title: "Assessment and Evaluation Methods",
        progress: 45,
    },
    {
        title: "Creative Problem Solving",
        progress: 87,
    },
    {
        title: "Curriculum Development",
        progress: 100,
    }
]

export default function Home() {
    return (
      <div className="padding-container">
        <div className="bg-purple-800 rounded-2xl shadow-xl shadow-blue-100 p-4 md:p-5 mb-4 -wfull text-white">
                <h4 className="text-base md:text-3xl">Empower Your Teaching with AI <span className="text-sm md:text-4xl">🎯</span></h4>
                <p className="hidden md:block text-sm text-gray-200">Create structured, engaging, and curriculum-aligned lessons in seconds.
                Our AI-powered assistant helps you design lesson plans, teaching aids, and assessments — personalized to your subject, context, and students.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:gap-8">
            <div className="w-full md:w-[70%]">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="bg-white rounded-2xl w-full flex items-center gap-4 p-2 md:p-4">
                        <BookCheck size={50} className="bg-green-200 p-2 text-green-800 rounded-xl" />
                        <div>
                            <p className=" text-gray-600">Total Lessons</p>
                            <p className=" font-semibold">20</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl w-full flex items-center gap-4 p-2 md:p-4">
                        <ListCheck size={50} className="bg-purple-200 p-2 text-purple-800 rounded-xl" />
                        <div>
                            <p className=" text-gray-600">Total Assessments</p>
                            <p className=" font-semibold">4</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl w-full flex items-center gap-4 p-2 md:p-4">
                        <ListTodo size={50} className="bg-blue-200 p-2 text-blue-800 rounded-xl" />
                        <div>
                            <p className=" text-gray-600">Total Tasks</p>
                            <p className=" font-semibold">10</p>
                        </div>
                    </div>
                </div>
                <div className="py-10">
                    <h2 className="flex items-center gap-2 font-semibold"><LayoutPanelTop size={20} /> Recent Lessons</h2>
                    <div className="rounded-2xl px-4 py-36 bg-white mt-2 flex items-center justify-center flex-col gap-6">
                        <p>No lesson created</p>
                        <Button className="">Create One</Button>
                    </div>

                </div>
            </div>
            <div className="w-full md:w-[30%] bg-white rounded-2xl p-4">
                <h4 className="font-semibold">Progress</h4>
                <div>
                    <div className="flex items-center justify-center hover:scale-105 duration-500 transition-all">
                    <div className="rounded-full border-4 border-purple-50">
                            <div className="rounded-full border-2 border-purple-200 px-4 py-3 overflow-hidden">
                                    <Image src="/assets/avatar.jpg" alt="pics" width={70} height={70} />
                                </div>
                    </div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-4">Progress through learning to achieve success</p>
                    <hr className="my-4"/>
                    {SKILLS.map((skill, key) => (
                    <div key={key} className="py-2 border-b">
                        <p>{skill.title}</p>
                        <div className="flex items-center justify-between">
                            <div className="w-full flex items-center gap-2"><Progress value={skill.progress} className=" w-[60%]" /><span className="text-xs">%{skill.progress}</span></div>
                            {skill.progress === 100 ? <CircleCheck className="text-green-500"/> : <CircleDashed />}
                        </div>
                        
                    </div>
                ))}
        
                    <Button className="w-full mt-4">View More</Button>
                </div>
            </div>
        </div>
      </div>
    );
  }
  