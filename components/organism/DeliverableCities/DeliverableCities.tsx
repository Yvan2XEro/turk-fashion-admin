"use client";
import React from "react";
import EditCitySheet from "./EditCitySheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function DeliverableCities() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Deliverable Cities</h2>
        <EditCitySheet
          button={<Button size="sm">Add City</Button>}
          title="New City"
        />
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <Card className="p-2 flex items-center justify-between">
          <div>
            <h3>Dschang, Cameroon</h3>
            <p>232.44343, 23.434343</p>
          </div>

          <div>
            <Checkbox />
          </div>
        </Card>
        <Card className="p-2 flex items-center justify-between">
          <div>
            <h3>Dschang, Cameroon</h3>
            <p>232.44343, 23.434343</p>
          </div>

          <div>
            <Checkbox />
          </div>
        </Card>
        <Card className="p-2 flex items-center justify-between">
          <div>
            <h3>Dschang, Cameroon</h3>
            <p>232.44343, 23.434343</p>
          </div>

          <div>
            <Checkbox />
          </div>
        </Card>
        <Card className="p-2 flex items-center justify-between">
          <div>
            <h3>Dschang, Cameroon</h3>
            <p>232.44343, 23.434343</p>
          </div>

          <div>
            <Checkbox />
          </div>
        </Card>
      </div>
    </div>
  );
}
