import { User } from "@prisma/client";
import { useState, useEffect, MouseEvent } from "react";
import prisma from "../prisma";

const useMenu = () => {
  const [msgUser, setUser] = useState<User | null>(null);

  const checkUser = async (e: Event) => {
    const { user } = (e.target as HTMLElement).dataset;

    if (user) {
      const queryparamstring = new URLSearchParams({ userId: user });
      const resp = await fetch("/api/findUser?" + queryparamstring.toString(), {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await resp.json();
      setUser(data);
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", checkUser);

    return () => {
      document.removeEventListener("contextmenu", checkUser);
    };
  }, []);

  return msgUser;
};

export default useMenu;
