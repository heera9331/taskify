"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the function to get users from the API
const getUsers = async (orgId: string) => {
  console.log(orgId);
  const res = await axios.get(`/api/employees/search?orgId=${orgId}`);
  const data = await res.data;
  console.log("getUsers", data);
  return data.users || [];
};

// Define the interface for single user properties
interface SingleUserProp {
  id: string;
  firstName: string;
  lastName: string;
  onClick: (id: string) => void;
}

// Define the component to render a single user
const SingleUser = ({ id, firstName, lastName, onClick }: SingleUserProp) => {
  return (
    <Link
      href="#"
      className="cursor-pointer"
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="flex items-center">
        <Avatar className="hidden h-9 w-9 sm:flex">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarIcon className="h-5 w-5" />
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">{`${firstName} ${lastName}`}</p>
          <p className="text-sm text-muted-foreground">last active</p>
        </div>
      </div>
    </Link>
  );
};
// Define the component to render a single user
const Project = ({ id, name, onClick }: any) => {
  return (
    <Link
      href="#"
      className="cursor-pointer"
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="flex items-center">
        <Avatar className="hidden h-9 w-9 sm:flex">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarIcon className="h-5 w-5" />
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">{`${name} `}</p>
          <p className="text-sm text-muted-foreground">last active</p>
        </div>
      </div>
    </Link>
  );
};

// Define the component to render the list of users
const Members = ({ onClick }: any) => {
  const [users, setUsers] = useState<SingleUserProp[]>([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const fetchUsers = async () => {
      console.log(user);
      if (user.organizationId) {
        const tmpUsers = await getUsers(user.organizationId);
        console.log("temp users", tmpUsers);
        if (users) {
          setUsers(tmpUsers);
        }
      }
    };

    fetchUsers();

    const getProjects = async () => {
      let res = await axios.get(`/api/projects`);
      let data = await res.data;
      console.log(data);
      if (data.projects) {
        setProjects(data.projects);
      }
    };

    getProjects();
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Recent Chats</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 overflow-hidden">
        {users.map((user: SingleUserProp, idx: number) => (
          <SingleUser key={idx} {...user} onClick={onClick} />
        ))}
        {projects.map((project: any, idx: number) => (
          <Project key={idx} {...project} onClick={onClick} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Members;
