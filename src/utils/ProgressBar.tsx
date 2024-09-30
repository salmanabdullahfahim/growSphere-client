"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const Progressbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#1a9f42"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Progressbar;
