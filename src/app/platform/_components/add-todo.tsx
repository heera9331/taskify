"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { CalendarIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TodoType } from "@/lib/prism-types";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { getProjectIdByName } from "@/lib/project";
import { useToast } from "@/components/ui/use-toast";

const AddTodo = ({ todoBoardId }: { todoBoardId: number }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const { toast } = useToast();

  const [todo, setTodo] = useState<any>({
    title: "",
    description: "",
    dueDate: "",
    todoBoardId: todoBoardId,
    employeeId: 0,
    projectName: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    projects.forEach((project) => {
      let projectId = getProjectIdByName(project, todo.projectName);
      if (projectId) {
        setTodo({ ...todo, projectId });
        return;
      }
    });
    console.log("information to be submitted => ", todo);
    try {
      setLoading(true);
      let res = await axios.post("/api/todos", todo);
      console.log(res);

      return toast({
        role: "alert",
        title: "Successfully added",
        message: "new todo add to the list",
      });
    } catch (error) {
      setError("Error submitting the todo.");
    }
  };

  useEffect(() => {
    const getTodoBoards = async () => {
      try {
        let res = await axios.get("/api/projects");
        console.log(res);
        let data = await res.data;
        console.log(data);
        if (data && data?.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.log("error => ", error);
        setError("Error while getting todo boards");
      }
    };

    getTodoBoards();
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <div className="flex gap-1">
              <p>Todo</p>
              <Plus />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter todo details</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <form
            action="#"
            method="post"
            onSubmit={(e: any) => {
              handleSubmit(e);
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="col-span-4">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="todo title"
                  value={todo.title}
                  onChange={(e) => {
                    setTodo({ ...todo, title: e.target.value });
                  }}
                  className="col-span-4"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="col-span-4">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="todo description"
                  value={todo.description}
                  onChange={(e) => {
                    setTodo({ ...todo, description: e.target.value });
                  }}
                  className="col-span-4"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="col-span-4">
                  Due date
                </Label>
                <Popover>
                  <PopoverTrigger className="col-span-4" asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal ",
                        !todo.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 " />
                      {todo.dueDate ? (
                        format(new Date(todo.dueDate), "dd/MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      selected={todo.dueDate ? new Date(todo.dueDate) : null}
                      onChange={(date: Date) =>
                        setTodo({ ...todo, dueDate: date.toISOString() })
                      }
                      dateFormat="dd/MM/yyyy"
                      className="w-full p-2 z-10"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectTitle" className="col-span-4">
                  Choose project
                </Label>
                <Select
                  value={todo.projectName}
                  onValueChange={(e) => {
                    setTodo({ ...todo, projectName: e });
                  }}
                >
                  <SelectTrigger className="col-span-4">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects &&
                      projects.map((project: any) => {
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
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTodo;
