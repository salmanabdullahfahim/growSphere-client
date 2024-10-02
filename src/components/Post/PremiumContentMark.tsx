import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Star } from "lucide-react";

const PremiumContentMark = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Star className="w-4 h-4 text-yellow-500 ml-1 hover:cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Premium Content</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PremiumContentMark;
