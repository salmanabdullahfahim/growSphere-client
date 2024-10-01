import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import verified from "@/assets/tick.png";

const VerifiedLogo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image src={verified} alt="verified" width={22} height={22} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Verifeid</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerifiedLogo;
