"use client";
import React, { useContext } from "react";
import { authContext } from "../context-providers/auth-provider";

function Signout() {
  const authInfo = useContext(authContext);
  async function clickHandler() {
    await authInfo?.signout();
  }
  return (
    <span className="cursor-pointer" onClick={clickHandler}>
      Signout
    </span>
  );
}

export default Signout;
