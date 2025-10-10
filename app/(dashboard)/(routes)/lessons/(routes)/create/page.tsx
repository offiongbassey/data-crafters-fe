"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateLessonFormScehema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const CreateLesson = () => {
    const router = useRouter();
        const [loading, setLoading] = useState<boolean>(false);
        const form = useForm<z.infer <typeof CreateLessonFormScehema>>({
            resolver: zodResolver(CreateLessonFormScehema),
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

        const onSubmit = async (data: z.infer<typeof CreateLessonFormScehema>) => {
            console.log("Data: ", data);
        }

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
                                    <Select>
                                        <SelectTrigger className="w-full py-6">
                                            <SelectValue placeholder="Grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="6">6</SelectItem>
                                            <SelectItem value="7">6</SelectItem>
                                            <SelectItem value="8">8</SelectItem>
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
                                    <Select>
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
                                    <Input
                                        type='number'
                                        className='p-5 w-full'
                                        placeholder='Enter Number of Questions'
                                        {...field}
                                    />
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
                                    <Select>
                                        <SelectTrigger className="w-full py-6">
                                            <SelectValue placeholder="Curriculum" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">English</SelectItem>
                                            <SelectItem value="20">From db</SelectItem>
                                        
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
                    <Button type="submit" className="w-40">Create</Button>
                </div>
                </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateLesson;