"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable, { SkillType } from "./_components/data-table";

const SkillsPage = () => {
    const [skills, setSkills] = useState<SkillType[]>([]);
    const user = useAuthStore((state) => state.user);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/upskilling/skills`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                      },
                });
                setLoading(false);
    
                setSkills(res.data);
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
        fetchSkill();
    }, [user?.token]);

    return (
        <div className="padding-container">
            <div className="flex gap-2 items-center justify-between">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <Link href={"/skills/create"}><Button><Plus />New</Button></Link>
            </div>

            <div className="bg-white my-10">
                <DataTable data={skills} />
            </div>
            {/* <div className="rounded-2xl p-4 bg-white mt-2 flex items-center justify-center flex-col min-h-96 gap-6">
                    <p>No lesson created</p>
                    <Button className="">Create One</Button>
            </div> */}
        </div>
    )
}

export default SkillsPage;