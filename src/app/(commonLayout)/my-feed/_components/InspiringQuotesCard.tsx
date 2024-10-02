import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

const gardeningQuotes = [
  "To plant a garden is to believe in tomorrow. - Audrey Hepburn",
  "The glory of gardening: hands in the dirt, head in the sun, heart with nature. - Alfred Austin",
  "Gardening is the art that uses flowers and plants as paint, and the soil and sky as canvas. - Elizabeth Murray",
  "A garden is a grand teacher. It teaches patience and careful watchfulness. - Gertrude Jekyll",
];

const InspiringQuotesCard = () => {
  const randomQuote =
    gardeningQuotes[Math.floor(Math.random() * gardeningQuotes.length)];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Inspiring Gardening Quote
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg italic">{randomQuote}</p>
      </CardContent>
    </Card>
  );
};

export default InspiringQuotesCard;
