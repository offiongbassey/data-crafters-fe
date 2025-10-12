"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginFormSchema, SignupFormSchema } from "@/lib/validationSchema";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuthStore } from "@/store/auth";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer <typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    const onSubmit =  async (data: z.infer<typeof SignupFormSchema>) => {

        try {
            setLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/auth/signup`, data);
            setLoading(false);
            
            toast.success("Account Created Successfully. Please login.");
            router.push("/login");
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
    return (
        <div className="flex h-screen">
            <div 
                style={{ backgroundImage: "url('/assets/woman2.jpg')"}}
                className="bg-center bg-cover bg-no-repeat p-4 items-start w-[30%] relative hidden md:flex justify-center"
            >
                <p className="text-white text-xl bg-zinc-600/40 p-2 w-full text-center">Simplifying learning for Teachers</p>
            </div>
            <div className="w-full md:w-[70%] flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center max-w-[520px] rounded-4xl md:shadow-sm shadow-zinc-300 p-4 md:p-20">
                    <h2 className="text-xl md:text-3xl font-bold text-center">Welcome to EduAI</h2>
                    <p className="text-gray-600 text-center text-sm mt-2 mb-10">We&apos;ve built a standard teaching assistant for you.</p>
                    
                   
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input
                                    type='text'
                                    className='p-5 w-full'
                                    placeholder='Enter your name'
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                            <FormItem className="mt-4">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input
                                    type='email'
                                    className='p-5 w-full'
                                    placeholder='Enter your email address'
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                            <FormItem className="mt-4">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input
                                    type='password'
                                    className='p-5 w-full'
                                    placeholder='Enter your password'
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                        
                        <Button disabled={loading} type="submit" className="h-12 w-full mt-6" >{loading ? <Spinner />: "Signup"}</Button>
                        <p className="text-sm mb-6 mt-4 text-center">Already have an account? <Link className="text-purple-600" href={"/login"}>Login</Link></p>
                        </form>
                    </Form>

                    
                </div>
            </div>
        </div>
    )
}

export default Login;