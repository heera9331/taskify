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
import { Calendar, CalendarIcon, Command, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Cross2Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

import { getProjectIdByName } from "@/lib/project";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "./date-picker";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import useFetch from "@/hooks/useFetch";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@radix-ui/react-select";
import Loader from "@/app/loading";

const CreateTask = ({ boardId = 1 }) => {
  const taskTitleRef = useRef(null);
  const taskDescriptionRef = useRef(null);
  const tastkProjectRef = useRef(null);
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [employees, setEmployees] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
    projectId: 0,
    projectName: "",
    dueDate: "",
    employee: "",
  });
  const { data, error, loading } = useFetch("/api/employees");

  const handleChange = (e: any) => {};

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("task to be created => ", task);
  };

  useEffect(() => {
    (async () => {
      console.log('data is => ', data);
      console.log('data is => ', data.employees);
      if (data && data?.employees) {
        setEmployees(data.employees);
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <div className="w-full flex gap-1 justify-between">
              <p>Task</p>
              <Plus />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter task details</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <form action="#" method="post">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="col-span-4">
                  Task title
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="task title"
                  value={task.title}
                  onChange={(e) => {
                    setTask({ ...task, title: e.target.value });
                  }}
                  ref={taskTitleRef}
                  className="col-span-4"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="taskDescription" className="col-span-4">
                  Task description
                </Label>
                <Textarea
                  id="taskDescription"
                  name="taskDescription"
                  placeholder="Task description"
                  value={task.description}
                  onChange={(e) => {
                    setTask({ ...task, description: e.target.value });
                  }}
                  ref={taskDescriptionRef}
                  className="col-span-4"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employees" className="col-span-4">
                  Assign to
                </Label>
                <Select value={task.employee}>
                  <SelectTrigger className="col-span-4">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.length}
                    {employees &&
                      employees.map(
                        (tmpEmp: {
                          id: string;
                          firstName: string;
                          lastName: string;
                        }) => {
                          return (
                            <SelectItem
                              key={tmpEmp.id}
                              value={`${tmpEmp.firstName} ${tmpEmp.lastName}`}
                            >
                              {`${tmpEmp.firstName} ${tmpEmp.lastName}`}
                            </SelectItem>
                          );
                        }
                      )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tastDescription" className="col-span-4">
                  Due date
                </Label>
                <DatePicker date={date} setDate={setDate} />
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

export default CreateTask;
