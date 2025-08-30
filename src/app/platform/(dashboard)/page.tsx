"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";

import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import useFetch from "@/hooks/useFetch";
import Loader from "@/app/loading";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import CreateTask from "../_components/create-task";
import { DialogHeader } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import CreateProject from "../_components/create-project";
import TaskBoardForm from "../_components/task-board-form";
import AddTodo from "../_components/add-todo";


const getTodoBoards = async () => {
  let res = await axios.get("/api/projects");
  let data = await res.data;
  if (data && data?.todoBoards) {
    return data?.todoBoards || [];
  }
  return [];
};

export function Dashboard() {
  const [taskBoards, setTaskBoards] = useState([]);
  const [todoBoards, setTodoBoards] = useState([]);

  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      let boards = await getTodoBoards();
      
    };

  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-red900">
      <div className="flex flex-col pt-2 pl-2">
        <aside></aside>
        <main className="flex flex-wrap gap-2">
          {taskBoards.map((board: any) => (
            <Card key={board.id} className="min-w-[250px]">
              <CardHeader>
                <CardTitle>{board.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CreateTask boardId={board.id} />
              </CardContent>
            </Card>
          ))}
          <TaskBoardForm />
          <AddTodo todoBoardId={1} />
          <Toaster />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
