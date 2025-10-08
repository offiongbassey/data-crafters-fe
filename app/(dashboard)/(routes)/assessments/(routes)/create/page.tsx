import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateAssessment = () => {
    return (
        <div className="padding-container mt-10">
            <h2 className="font-semibold text-2xl">Create An Assessment</h2>
            <div className="rounded-2xl bg-white p-4 md:p-10 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label>Topic</label>
                        <Input className="h-12" placeholder="Enter topic" name="topic" />
                    </div>
                    <div>
                        <label>Subject</label>
                        <Input className="h-12" placeholder="Enter Subject" name="subject" />
                    </div>
                    <div>
                        <label>Grade</label>
                        <Input className="h-12" placeholder="Grade" name="grade" />
                    </div>
                    <div>
                        <label>Duration</label>
                        <Input className="h-12" placeholder="Duration" name="duration" />
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <Button className="w-40">Create</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateAssessment;