import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TrendingCard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Trendings</CardTitle>
          <CardDescription>Gardening related</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #UrbanGardening
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #VerticalGardens
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #OrganicPestControl
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #HeirloomSeeds
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #CompostingTips
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #HydroponicSystems
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #PollinatorFriendly
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #IndoorHerbGarden
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #DroughtTolerantPlants
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #GardenToTable
          </p>
          <p className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            #SustainableGardening
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingCard;
