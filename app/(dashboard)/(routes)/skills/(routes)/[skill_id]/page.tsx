"use client";

import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import {
  CircleCheckBig,
  CircleDashed,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SkillType } from "../../_components/data-table";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import TestSection from "../../_components/TestSection";

const SkillPage = ({ params }: { params: Promise<{ skill_id: string }> }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { skill_id } = React.use(params);
  const [skill, setSkill] = useState<SkillType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoad, setUpdateLoad] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [testStage, setTestStage] = useState<number>(0);
  const [startTest, setStartTest] = useState<boolean>(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/upskilling/skills/${skill_id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setLoading(false);
        setSkill(res.data);
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
    };
    fetchLesson();
  }, [user?.token, skill_id]);

  const toggleNext = () => {
    if (!skill?.total_sections) return;
    if (currentSection === skill.total_sections - 1) {
      if (skill.progress_record.progress !== 100)
        return toast.error("Complete all the sections.");
      return setTestStage(1);
    }
    setCurrentSection((prev) => prev + 1);
    scrollToTop();
  };

  const togglePrev = () => {
    if (currentSection === 0) return;
    setCurrentSection((next) => next - 1);
    scrollToTop();
  };

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCompleteSection = async (section_id: number) => {
    try {
      setUpdateLoad(true);

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/upskilling/progress/update`,
        { skill_id: skill?.id, section_id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setUpdateLoad(false);
      toast.success("Section completed");

      const newProgress = res.data.progress;

      //Update the section as completed
      setSkill((prev) => {
        if (!prev) return prev;

        const updatedSections = prev.sections.map((section) =>
          section.id === section_id
            ? {
                ...section,
                completed: true,
                completed_at: new Date().toISOString(),
              }
            : section
        );

        const updatedProgressRecord = {
          ...prev.progress_record,
          progress: newProgress,
        };

        return {
          ...prev,
          sections: updatedSections,
          progress_record: updatedProgressRecord,
        };
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setUpdateLoad(false);
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
  };

  return (
    <div ref={sectionRef} className="px-4 md:px-14">
      <h1 className="px-4 mb-4">Skill</h1>
      {skill && !startTest ? (
        <div>
          <div className="flex flex-col md:flex-row gap-10 mb-6">
            <div
              style={{ backgroundImage: "url('/assets/skill.jpg')" }}
              className="bg-center rounded-2xl bg-cover bg-no-repeat items-end w-full md:w-[30%] relative hidden md:flex justify-start"
            >
              <div
                style={{ backgroundImage: `url(${skill.thumbnail_url})` }}
                className="bg-center rounded-2xl bg-cover bg-no-repeat p-4 items-end w-full h-full relative hidden md:flex justify-start"
              >
                <p className="text-white text-sm bg-gray-600/40 p-2 w-fit text-center">
                  {skill.title}
                </p>
              </div>
            </div>

            <div className="w-full md:w-[70%]">
              <h1 className="text-3xl md:text-4xl flex items-center justify-between font-semibold">
                {skill.title}
                <span className="text-xs text-purple-500 flex items-center gap-1">
                  <Clock size={14} />
                  {skill.estimated_duration}
                </span>
              </h1>
              <p className="border border-gray-200 text-sm md:text-base bg-gray-200 mt-2 rounded-t-2xl p-2">
                {skill.description}
              </p>
              <div className="flex items-center justify-start  mt-2 gap-2">
                <p className="border-gray-200 border px-4 text-xs md:text-base py-1">
                  <b>Level: </b>
                  {skill.level}
                </p>
                <p className="border-gray-200 border px-4 text-xs md:text-base py-1">
                  <b>Category: </b>
                  {skill.category}
                </p>
              </div>

              <div className="w-full flex items-center justify-start gap-1 mt-2">
                <Progress
                  value={skill?.progress_record?.progress}
                  className=" w-full"
                />{" "}
                <span className="text-sm">
                  %{skill?.progress_record?.progress}
                </span>
              </div>
            </div>
          </div>
          <hr />
          {testStage === 0 && skill.sections && skill.sections.length > 0 && (
            <div key={skill.sections[currentSection].id}>
              <div className="bg-white mt-6 padding-container py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm md:text-base flex items-center gap-2 font-semibold">
                    {skill.sections[currentSection].completed ? (
                      <CircleCheckBig className="text-green-600" size={20} />
                    ) : (
                      <CircleDashed size={20} />
                    )}
                    Section {currentSection + 1}:{" "}
                    {skill.sections[currentSection].title}
                  </h2>
                  {!skill.sections[currentSection].completed && (
                    <Button
                      disabled={updateLoad}
                      onClick={() =>
                        handleCompleteSection(skill.sections[currentSection].id)
                      }
                      variant={"outline"}
                    >
                      {updateLoad ? <Spinner /> : "Done"}
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm text-justify md:text-base bg-white padding-container my-4 py-4">
                {skill.sections[currentSection].content}
              </p>
              <div className="bg-white padding-container py-4">
                <h4 className="text-xl font-semibold mb-2">
                  External Resources:
                </h4>
                <div className="flex flex-col">
                  <Link
                    target="_blank"
                    className="flex text-sm md:text-base items-center gap-2"
                    href={skill.sections[currentSection].video_url}
                  >
                    <ExternalLink size={18} />
                    {skill.sections[currentSection].video_url}
                  </Link>
                  <Link
                    target="_blank"
                    className="flex text-sm md:text-base items-center gap-2"
                    href={skill.sections[currentSection].resource_url}
                  >
                    <ExternalLink size={18} />
                    {skill.sections[0].resource_url}
                  </Link>
                </div>
              </div>
            </div>
          )}
          {testStage === 1 && (
            <div className="my-10 bg-white rounded-2xl px-4 py-10 flex flex-col items-center justify-center">
              <Image
                src="/assets/test.png"
                alt="test"
                width={200}
                height={200}
              />
              <h2 className="text-3xl md:text-5xl font-semibold text-center">
                You made it!{" "}
              </h2>
              <p className="text-sm md:text-lg font-semibold mb-2">
                Let’s put your new skills to the test.
              </p>
              <p className="text-sm text-center md:text-base">
                <b>Duration:</b> 20 Minutes || <b>No of Qeustions:</b> 6{" "}
              </p>

              <Button
                onClick={() => setStartTest(true)}
                className="px-10 py-6 mt-4"
              >
                Start Test
              </Button>
            </div>
          )}

          <div className="flex items-center justify-end">
            <div className="my-10 gap-2 flex ">
              <Button
                onClick={togglePrev}
                disabled={currentSection === 0}
                variant={"outline"}
              >
                Prev
              </Button>
              <Button onClick={toggleNext} disabled={testStage == 1}>
                Next
              </Button>
            </div>
          </div>
        </div>
      ) :
      skill && startTest ?

      <TestSection setSkill={setSkill} title={skill.title} user_token={user?.token} skill_id={skill.id} test={skill.test} />
      :
      
      (
        <div className="flex items-center justify-center gap-2 mt-40">
          <Spinner className="size-8" />
          Loading
        </div>
      )}
    </div>
  );
};

export default SkillPage;
