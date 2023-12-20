import { Card } from "@/components/ui/card";
import { City } from "@/lib/api/cities";
import React from "react";
import EditCitySheet from "./EditCitySheet";
import { Badge } from "@/components/ui/badge";

type TProps = {
  data: City;
};
export default function CityCard({ data }: TProps) {
  return (
    <Card className="p-2 flex items-center justify-between">
      <EditCitySheet
        button={
          <div className="cursor-pointer">
            <h3>
              {data.name}, {data.country}
            </h3>
            <p>
              lat: {data.lat}, lng: {data.lng}
            </p>
          </div>
        }
        title="Edit City"
        data={data}
        id={data.id}
      />

      <div>
        {data.isActive && <Badge>Active</Badge>}
        {!data.isActive && <Badge variant="outline">Inactive</Badge>}
      </div>
    </Card>
  );
}
