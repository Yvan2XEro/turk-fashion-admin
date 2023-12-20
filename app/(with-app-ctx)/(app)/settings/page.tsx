import { DeliverableCities } from "@/components/organism/DeliverableCities";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <h1 className="font-bold uppercase text-xl">Settings</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DeliverableCities />
      </div>
    </div>
  );
}
