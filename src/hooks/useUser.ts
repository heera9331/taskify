"use client";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let tmpUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(tmpUser);
  }, []);

  return user;
};

export default useUser;
