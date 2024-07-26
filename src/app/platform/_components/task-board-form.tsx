"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Command, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Cross2Icon } from "@radix-ui/react-icons";

import { useRef, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProjectIdByName } from "@/lib/project";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

interface ProjectType {
  id: string;
  name: string;
  description?: string;
}

const getProjects = async () => {
  let res = await axios.get("/api/projects");
  let data = await res.data;
  console.log(data);
  if (data) {
    return data.projects;
  }
  return [];
};

const TaskBoardForm = () => {
  const boardNameRef = useRef(null);
  const projectIdRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const { toast } = useToast();
  const [taskBoard, setTaskBoard] = useState({
    name: "",
    projectName: "",
    projectId: 0,
  });

  const handleChange = (e: any) => {
    console.log(e);
    setTaskBoard({ ...taskBoard, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("taskboard to be created => ", taskBoard);
    projects.forEach((project) => {
      let projectId = getProjectIdByName(project, taskBoard.projectName);
      if (projectId) {
        setTaskBoard({ ...taskBoard, projectId });
        return;
      }
    });

    let res = await axios.post("/api/taskboards", taskBoard);
    let data = await res.data;
    toast({
      title: "Alert",
      description: "Taskboard created successfully",
    });
  };

  useEffect(() => {
    (async () => {
      let projects = await getProjects();
      setProjects(projects);
    })();
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <div className="flex gap-1">
              <p>Task Board</p>
              <Plus />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter board details</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <form action="#" method="post">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectTitle" className="col-span-4">
                  Board Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="board name"
                  value={taskBoard.name}
                  onChange={(e) => {
                    setTaskBoard({ ...taskBoard, name: e.target.value });
                  }}
                  ref={boardNameRef}
                  className="col-span-4"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectTitle" className="col-span-4">
                  Choose project
                </Label>
                <Select
                  value={taskBoard.projectName}
                  onValueChange={(e) => {
                    setTaskBoard({ ...taskBoard, projectName: e });
                  }}
                >
                  <SelectTrigger className="col-span-4">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects &&
                      projects.map((project: ProjectType) => {
                        return (
                          <SelectItem key={project.id} value={project.name}>
                            {project.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                {error && <span className="text-red-800">{error}</span>}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskBoardForm;
