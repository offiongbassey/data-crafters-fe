import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Login = () => {
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
                    <label>Email:</label>
                    <Input placeholder="Enter your email address" className="h-12 mb-4" name="email" />
                    <label>Password:</label>
                    <Input placeholder="Enter your password" className="h-12 mb-2" type="password" name="password" />
                    <p className="text-purple-600 text-sm mb-6">Forgot Password?</p>
                    <Link href="/"><Button className="h-12 w-full" >Login</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Login;