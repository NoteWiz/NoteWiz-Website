"use client";
import React, { useState } from "react";
import SignInComponent from "../login/SignInComponent";
import SignUpComponent from "../signup/SignUpComponent";

const Page = () => {
  const [state, setState] = useState(true);

  return <div>{state ? <SignInComponent /> : <SignUpComponent />}</div>;
};

export default Page;
