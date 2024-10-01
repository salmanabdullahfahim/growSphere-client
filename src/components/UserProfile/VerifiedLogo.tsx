import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import verified from "@/assets/tick.png";

const VerifiedLogo = ({ wi, he }: { wi: number; he: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image src={verified} alt="verified" width={wi} height={he} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Verifeid</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerifiedLogo;
