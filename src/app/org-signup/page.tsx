"use client";
import "../globals.css";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

export function SignupForm() {
  const orgNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [organization, setOrganization] = useState({ name: "" });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(organization);
    let res = await axios.post("/api/organizations/", { organization, user });

    console.log(res);
    let data = await res.data;
    console.log(data); 
  };

  return (
    <form action="#" method="post" onSubmit={handleSubmit} className="pt-10">
      <Card className="mx-auto min-w-[350px] max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your details below to create an organization and your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                name="name"
                type="text"
                placeholder="Organization Name"
                value={organization.name}
                onChange={handleOrgChange}
                ref={orgNameRef}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleUserChange}
                ref={firstNameRef}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleUserChange}
                ref={lastNameRef}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={user.email}
                onChange={handleUserChange}
                ref={emailRef}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="*******"
                value={user.password}
                onChange={handleUserChange}
                ref={passwordRef}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Signup
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

const Page = () => {
  return (
    <div className="pt-10">
      <SignupForm />
    </div>
  );
};

// export default Page;
export default dynamic(() => Promise.resolve(Page), { ssr: false });
