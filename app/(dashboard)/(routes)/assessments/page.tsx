import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const AssessmentsPage = () => {
    return (
        <div className="padding-container">
            <div className="flex gap-2 items-center justify-between">
            <h2 className="text-2xl font-semibold">Assessments</h2>
            <Link href="/assessments/create"><Button><Plus />New</Button></Link>
            </div>
            <div className="rounded-2xl p-4 bg-white mt-2 flex items-center justify-center flex-col min-h-96 gap-6">
                    <p>No assessment created</p>
                    <Button className="">Create One</Button>
            </div>
        </div>
    )
}

export default AssessmentsPage;