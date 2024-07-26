"use client";

/**
 * @author Heera Singh
 * @date 15-07-2024
 * @description sigup page
 */

import Link from "next/link";
import Loader from "../loading";
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
import { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [user, setUser] = useState({
    email: "heera9331@gmail.com",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSumbit = async () => {
    setLoading(true);
    let res = await axios.get(`/api/employees/${user.email}`);
    setLoading(false);
    console.log(res);
    let data = await res.data;
    console.log(data);

    if (data?.employees) {
      setIsWorking(true);
    } else {
      setError("Your are not working on any of the company");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Card className="mx-auto min-w-[350px] max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Singup</CardTitle>
        <CardDescription>Enter your email to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              value={user.email}
              required
            />
          </div>
          {isWorking && (
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="m@example.com"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                value={user.password}
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              handleSumbit();
            }}
          >
            Submit
          </Button>

          {error && <p>{error}</p>}

          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link href="/sign-in" className="underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const Page = () => {
  return (
    <>
      <SignupForm />
    </>
  );
};

export default Page;
