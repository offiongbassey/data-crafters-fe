"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/lib/validationSchema";
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

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer <typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit =  async (data: z.infer<typeof LoginFormSchema>) => {

        try {
            setLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/auth/login`, data);
            setLoading(false);

            console.log("data: ", res);
            useAuthStore.getState().setUser(res.data);
            toast.success("Login Successful");
            router.push("/");
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
                style={{ backgroundImage: "url('assets/woman2.jpg')"}}
                className="bg-center bg-cover bg-no-repeat p-4 items-start w-[30%] relative hidden md:flex justify-center"
            >
                <p className="text-white text-xl bg-zinc-600/40 p-2 w-full text-center">Simplifying learning for Teachers</p>
            </div>
            <div className="w-full md:w-[70%] flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center max-w-[520px] rounded-4xl md:shadow-sm shadow-zinc-300 p-4 md:p-20">
                    <h2 className="text-xl md:text-3xl font-bold text-center">Welcome back to EduAI</h2>
                    <p className="text-gray-600 text-center text-sm mt-2 mb-10">We&apos;ve built a standard teaching assistant for you.</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                            <FormItem>
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

                        <p className="text-purple-600 text-sm mb-6">Forgot Password?</p>
                        <Button disabled={loading} type="submit" className="h-12 w-full" >{loading ? <Spinner />: "Login"}</Button>
                        </form>
                    </Form>

                    
                </div>
            </div>
        </div>
    )
}

export default Login;