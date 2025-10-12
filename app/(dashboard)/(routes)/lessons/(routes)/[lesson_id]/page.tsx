"use client";

import React, { useEffect, useState } from "react";
import { LessonType } from "../../_components/data-table";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { Asterisk, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LessonPage = ({ params }: { params: Promise<{ lesson_id: string }>}) => {
    const { lesson_id } = React.use(params);
    const [lesson, setLesson] = useState<LessonType>();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useAuthStore((state) => (state.user))

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/lessons/${lesson_id}`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                      },
                });
                setLoading(false);
                setLesson(res.data);
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
    }, [user?.token, lesson_id]);

    return (
        <div className="padding-container">
            <h1 className="px-4">Lesson Plan</h1>
            {loading ?
                <div className="flex items-center justify-center gap-2 mt-40">
                    <Spinner className="size-8" />Loading
                </div>
                :
                <div className="flex items-stretch justify-between gap-4 p-4">
                  
                   <div className="w-full md:w-[75%] bg-white rounded-2xl p-4">
                    
                        <h2 className="text-2xl font-semibold">{lesson?.content.lesson_title}</h2>
                        <div className="">
                            <p className="text-xl font-semibold">{lesson?.topic}</p>
                            <div className="flex justify-between items-center gap-6">
                                <div className="flex gap-6">
                                    <p>{lesson?.subject}</p>|
                                    <p className="text-base text-gray-600 flex items-center gap-2"><Clock size={18} />{lesson?.content.duration}</p>
                                </div>
                                <Link href={`/assessments/${lesson_id}`}><Button className="bg-purple-500 mb-4">View Assessment</Button></Link>
                            </div>
                        </div>
                        <hr/>
                        <h2 className="text-purple-800 mt-4 font-semibold text-xl">Lesson Objective:</h2>
                        <ul className="list-decimal pl-4">
                            {lesson?.content.lesson_objectives.map((objective, key) => (
                                <li key={key}>{objective}</li>
                            ))}
                        </ul>

                        <h2 className="text-purple-800 mt-4 font-semibold text-xl">Instructional Materials:</h2>
                        <ul  className="list-decimal pl-4">
                            {lesson?.content.instructional_materials.map((material, key) => (
                                <li key={key}>{material}</li>
                            ))}
                        </ul>
                        <h2 className="text-purple-800 mt-4 font-semibold text-xl">Introduction:</h2>
                        <p>{lesson?.content?.lesson_introduction}</p>
                        <h2 className="text-purple-800 mt-4 font-semibold text-xl">Summary:</h2>
                        <p>{lesson?.content?.summary}</p>
                        <h2 className="text-purple-800 mt-4 font-semibold text-xl">Extension Activity:</h2>
                        <p>{lesson?.content?.extension_activity}</p>
                        <h2 className="text-purple-800 mt-4 font-semibold text-xl">Teacher Reflection :</h2>
                        <p>{lesson?.content?.teacher_reflection}</p>
                   </div>

                   <div 
                    className="w-full md:w-[35%] bg-white p-4 rounded-2xl"
                   >
                       <h2 className="text-purple-800 font-semibold text-xl">Lesson Development:</h2>
                       <div className="grid grid-cols-1 gap-4 mb-4">
                            {lesson?.content.lesson_development.map((dev, key) => (
                                <div key={key} className="">
                                    <h4 className="text-gray-700 font-semibold text-base flex gap-2"><Asterisk />{dev.activity}</h4>
                                    <p className="pl-4 text-justify text-sm">{dev.details}</p>
                                    <p className="text-gray-600 text-sm text-end flex gap-2 items-center justify-end"><Clock size={18} />{dev.time}</p>
                                </div>
                            ))}
                       </div>
                        <hr/>
                       <h2 className="text-purple-800 mt-4 font-semibold text-xl">Learner Activities:</h2>
                       <div className="grid grid-cols-1 gap-4">
                            {lesson?.content.learner_activities.map((act, key) => (
                                <div key={key} className="">
                                    <h4 className="text-gray-700 font-semibold text-base flex gap-2"><Asterisk />{act.activity}</h4>
                                    <p className="pl-4 text-justify text-sm">{act.details}</p>
                                    <p className="text-gray-600 text-sm text-end flex gap-2 items-center justify-end"><Clock size={18} />{act.time}</p>
                                </div>
                            ))}
                       </div>
                   </div>
                </div>
            }

        </div>
    )
}

export default LessonPage;