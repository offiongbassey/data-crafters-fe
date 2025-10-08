import { Button } from "@/components/ui/button";
import Image from "next/image";

const VoiceAssistant = () => {
    return (
        <div className="padding-container py-4">
            <div className="bg-white p-4 md:p-20 rounded-4xl w-full flex flex-col items-center justify-center">
                <Image src={"/assets/audio2.jpg"} alt="voice" width={200} height={200} />
                <p className="text-sm mb-10">Speak with Voila Assistant</p>
                <Button className=" h-12 min-w-40 bg-[#6166f2] hover:bg-[#4348d8]">Start</Button>
                {/* <Button variant="outline" className=" h-12 min-w-40">Stop</Button> */}
            </div>
        </div>
    )
}

export default VoiceAssistant;