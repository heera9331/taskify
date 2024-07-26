"use client";

import { ReactHTMLElement, useState } from "react";
import { Button } from "@/components/ui/button";
 
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

function CreateProject() {
  const projectTitleRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const [error, setError] = useState("");

  const [project, setProject] = useState({
    projectTitle: "",
    projectDescription: "",
  });

  const handleChange = (e: any) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("project to be created");
    console.log(project);
    try {
      let res = await axios.post("/api/projects", project);
      res = await res.data;
      console.log(res);
    } catch (error) {
      console.log(error);
      console.log("error catched");
      let data = await error?.response?.data;
      let err = data?.error;
      setError(err);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <div className="flex gap-1">
              <p>Project</p>
              <Plus />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter project details</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <form action="#" method="post">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectTitle" className="col-span-4">
                  Project Name
                </Label>
                <Input
                  id="projectTitle"
                  name="projectTitle"
                  type="text"
                  placeholder="m@example.com"
                  value={project.projectTitle}
                  onChange={handleChange}
                  ref={projectTitleRef}
                  className="col-span-4"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="col-span-4">
                  Project Description
                </Label>
                <Textarea
                  id="projectDescription"
                  name="projectDescription"
                  placeholder="m@example.com"
                  value={project.projectDescription}
                  onChange={handleChange}
                  ref={projectDescriptionRef}
                  className="col-span-4"
                  required
                />
              </div>
              {error && (
                <div className="">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </div>
          </form>

          <DialogFooter>
            <Button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateProject;
