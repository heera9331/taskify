"use client";

import "../globals.css";
import axios, { AxiosResponse } from "axios";
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
import Loader from "../loading";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [user, setUser] = useState({
    email: "heera.madquick@gmail.com",
    password: "1234",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("user to be logged in");
    console.log(user);

    try {
      setLoading(true);
      let res = await axios.post("/api/auth/sign-in", user);
      setLoading(false);
      let data = await res.data;

      if (!data?.user) {
        setError("data missing");
      } else {
        localStorage.setItem("user", JSON.stringify(data?.user));
        router.push("/platform");
      }
    } catch (error) {
      console.log(error);
      console.log("error catched");
      let data = await error?.response?.data;
      let err = data?.error;
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form action="#" method="post" onSubmit={handleSubmit}>
      <Card className="mx-auto min-w-[350px] max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={user.email}
                onChange={handleChange}
                ref={emailRef}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="*******"
                value={user.password}
                onChange={handleChange}
                ref={passwordRef}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            {error && <p className="text-red-700">{error}</p>}
            {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

const Page = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Page;
