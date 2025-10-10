"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { CreateLessonFormSchema } from "@/lib/validationSchema";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

type CurriculumType = {
    id: number;
    title: string;
}

const CreateLesson = () => {
    const router = useRouter();
        const [loading, setLoading] = useState<boolean>(false);
        const [curriculums, setCurriculums] = useState<CurriculumType[]>([]);
        const user = useAuthStore((state) => state.user);

        const form = useForm<z.infer <typeof CreateLessonFormSchema>>({
            resolver: zodResolver(CreateLessonFormSchema),
            defaultValues: {
                curriculum_unit_id: 0,
                topic: "",
                subject: "",
                grade: 0,
                duration: 0,
                no_of_questions: 5,
                lesson_outcome: "Student should be able to explain and understand"
            }
        });

        useEffect(() => {
            const fetchLesson = async () => {
                try {
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/curriculum`, {
                        headers: {
                            Authorization: `Bearer ${user?.token}`,
                          },
                    });
                    setCurriculums(res.data);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } catch (error: any) {
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

        const onSubmit = async (data: z.infer<typeof CreateLessonFormSchema>) => {
            console.log("Data: ", data);

            try {
                setLoading(true);
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/lessons`, data, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                      },
                });
                setLoading(false);
    
                console.log("data: ", res);
                toast.success("Lesson Created Successfully.");
                router.push("/lessons");
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

        const handleGradeChange = (grade: string) => {
            form.setValue("grade", Number(grade));
        }

        const handleDurationChange = (duration: string) => {
            form.setValue("duration", Number(duration));
        }

        const handleCurriculumChange = (curr: string) => {
            form.setValue("curriculum_unit_id", Number(curr));
        }

        const handleNoOfQuestionsChange = (no: string) => {
            form.setValue("no_of_questions", Number(no));
        }

        console.log("curriculums:", curriculums)

    return (
        <div className="padding-container mt-10">
            <h2 className="font-semibold text-2xl">Create A Lesson</h2>
            <div className="rounded-2xl bg-white p-4 md:p-10 mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    
                    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <FormField
                                control={form.control}
                                name='subject'
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                    <Input
                                        type='text'
                                        className='p-5 w-full'
                                        placeholder='Enter Subject'
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                        />

                        <FormField
                                control={form.control}
                                name='topic'
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Topic</FormLabel>
                                    <FormControl>
                                    <Input
                                        type='text'
                                        className='p-5 w-full'
                                        placeholder='Enter Topic'
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                        />
                   
                        <FormField
                                control={form.control}
                                name='grade'
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grade</FormLabel>
                                    <FormControl>
                                    <Select
                                        onValueChange={(grade) => {
                                            handleGradeChange(grade)
                                        }}
                                    >
                                        <SelectTrigger className="w-full py-6">
                                            <SelectValue placeholder="Grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1,2,3,4,5].map((item) => (
                                            <SelectItem key={item} value={item.toString()}>{item}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                        />

                        <FormField
                                control={form.control}
                                name='duration'
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                    <Select
                                        onValueChange={(duration) => {
                                            handleDurationChange(duration)
                                        }}
                                    >
                                        <SelectTrigger className="w-full py-6">
                                            <SelectValue placeholder="Duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">10 Mins</SelectItem>
                                            <SelectItem value="20">20 Mins</SelectItem>
                                            <SelectItem value="30">30 Mins</SelectItem>
                                            <SelectItem value="40">40 Mins</SelectItem>
                                            <SelectItem value="50">50 Mins</SelectItem>
                                            <SelectItem value="60">1 Hour</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                        />

                        <FormField
                                control={form.control}
                                name='no_of_questions'
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Questions</FormLabel>
                                    <FormControl>
                                    <Select
                                        onValueChange={(no) => {
                                            handleNoOfQuestionsChange(no)
                                        }}
                                    >
                                        <SelectTrigger className="w-full py-6">
                                            <SelectValue placeholder="Grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1,2,3,4,5,6,7,8,9,10].map((item) => (
                                            <SelectItem key={item} value={item.toString()}>{item}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                        />

                        <FormField
                                control={form.control}
                                name='curriculum_unit_id'
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Curriculum</FormLabel>
                                    <FormControl>
                                    <Select
                                        onValueChange={(curr) => {
                                            handleCurriculumChange(curr)
                                        }}
                                    >
                                        <SelectTrigger className="w-full py-6">
                                            <SelectValue placeholder="Curriculum" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {curriculums.map((curr) => (
                                                <SelectItem key={curr.id} value={curr.id.toString()}>{curr.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                        />
                    

                </div>
                <FormField
                                control={form.control}
                                name='lesson_outcome'
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lesson Outome</FormLabel>
                                    <FormControl>
                                    <Textarea className="" {...field} placeholder="type learning outcomes" ></Textarea>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                        />
                       
                <div className="flex justify-center mt-10">
                    <Button disabled={loading} type="submit" className="w-40">{loading ? <Spinner/> : "Create"}</Button>
                </div>
                </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateLesson;