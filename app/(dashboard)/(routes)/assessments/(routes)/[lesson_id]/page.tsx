"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { Asterisk, Clock } from "lucide-react";
import { AssessmentType } from "../../../lessons/_components/data-table";

const AssessmentPage = ({ params }: { params: Promise<{ lesson_id: string }>}) => {
    const { lesson_id } = React.use(params);
    const [assessment, setAssessment] = useState<AssessmentType>();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useAuthStore((state) => (state.user))

    console.log("Praams:", lesson_id);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/assessments/${lesson_id}`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                      },
                });
                setLoading(false);
                setAssessment(res.data);
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

    console.log("Lesson:", assessment);

    return (
        <div className="padding-container">
            <h1 className="px-4 text-2xl font-semibold">Assessment</h1>
            {loading ?
                <div className="flex items-center justify-center gap-2 mt-40">
                    <Spinner className="size-8" />Loading
                </div>
                :
                <div className="flex flex-col gap-4 p-4">
                    {assessment?.content.questions.map((item, key) => (
                    <div key={key}>
                        <h2>{item.question}</h2> 
                        <ol className="list-[lower-alpha] pl-6 mb-4">
                            {item.options.map((option, key) => {
                                const optionValue = String(Object.values(option)[0]);
                                return  <li key={key}>{optionValue}</li>
                                
                            })}
                        </ol>
                        <p className="text-gray-600">Answer:<b className="text-black">{item.answer}</b></p>
                    </div>
                ))}
                  
                </div>
            }

        </div>
    )
}

export default AssessmentPage;