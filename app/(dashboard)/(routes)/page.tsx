"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { BookCheck, ChartSpline, CircleCheck, CircleDashed, LayoutPanelTop, ListCheck, ListTodo } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SkillType } from "./skills/_components/data-table";
import Link from "next/link";
import LineChartComponent, { ChartAnalyticsType } from "../_components/LineChartSection";

type AnalyticsType = {
    total_lessons: number;
    total_assessments: number;
    total_skills: number;
}



export default function Home() {
    const [analytics, setAnalytics] = useState<AnalyticsType>();
    const [loading, setLoading] = useState<boolean>(false);
    const [chartData, setChartData] = useState<ChartAnalyticsType[]>([]);
    const user = useAuthStore((state) => (state.user))
    const [skills, setSkills] = useState<SkillType[]>([]);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);

                const [ analytics_count_res, skills_res, analytics_chart_res ] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/analytics/analytics`, {
                        headers: { Authorization: `Bearer ${user?.token}` },
                    }),
                    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/upskilling/skills`, {
                        headers: { Authorization: `Bearer ${user?.token}` },
                    }),
                    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/analytics/monthly`, {
                        headers: { Authorization: `Bearer ${user?.token}` },
                    }),
                ]);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const chartFormatted: ChartAnalyticsType[] = analytics_chart_res.data.map((item: any) => ({
                    name: item.month,        // e.g., "Oct-2025"
                    lesson: item.lesson,
                    upskill: item.upskilling,
                }));
                setLoading(false);
                setSkills(skills_res.data);
                setAnalytics(analytics_count_res.data);
                setChartData(chartFormatted);
                
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
        }
        fetchLesson();
    }, [user?.token]);

    return (
      <div className="padding-container">
        <div className="bg-purple-800 rounded-2xl shadow-xl shadow-blue-100 p-4 md:p-5 mb-4 -wfull text-white">
                <h4 className="text-base md:text-3xl">Empower Your Teaching with AI</h4>
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
                            <p className=" font-semibold">{analytics?.total_lessons}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl w-full flex items-center gap-4 p-2 md:p-4">
                        <ListCheck size={50} className="bg-purple-200 p-2 text-purple-800 rounded-xl" />
                        <div>
                            <p className=" text-gray-600">Total Assessments</p>
                            <p className=" font-semibold">{analytics?.total_assessments}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl w-full flex items-center gap-4 p-2 md:p-4">
                        <ListTodo size={50} className="bg-blue-200 p-2 text-blue-800 rounded-xl" />
                        <div>
                            <p className=" text-gray-600">Total Skills</p>
                            <p className=" font-semibold">{analytics?.total_skills}</p>
                        </div>
                    </div>
                </div>
                <div className="py-10">
                    <h2 className="flex items-center gap-2 font-semibold"><ChartSpline size={20} /> Analytics</h2>
                    <div className="rounded-2xl px-4 py-10 bg-white mt-2 flex items-center justify-center flex-col relative gap-6">
                        <span className="absolute left-0 rotate-270">Activities</span>
                        <LineChartComponent data={chartData}/>
                        <span>Months</span>
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
                    {skills.slice(0, 4).map((skill) => (
                    <Link key={skill.id} href={`/skills/${skill.id}`}>
                        <div className="py-2 border-b">
                            <p>{skill.title}</p>
                            <div className="flex items-center justify-between">
                                <div className="w-full flex items-center gap-2"><Progress value={skill?.progress_record?.progress} className=" w-[60%]" /><span className="text-xs">%{skill?.progress_record?.progress}</span></div>
                                {skill?.progress_record?.completed ? <CircleCheck className="text-green-500"/> : <CircleDashed />}
                            </div>
                        
                        </div>
                     </Link>
                ))}
        
                    <Link href={"/skills"}><Button className="w-full mt-4">View More</Button></Link>
                </div>
            </div>
        </div>
      </div>
    );
  }
  