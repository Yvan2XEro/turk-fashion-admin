"use client";
import React from "react";
import EditCitySheet from "./EditCitySheet";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { fetchWithAuth } from "@/lib/api/app-fetch";
import { City } from "@/lib/api/cities";
import CityCard from "./CityCard";

export default function DeliverableCities() {
  const query = useQuery({
    queryKey: ["deliverables-citties"],
    queryFn: async () => {
      try {
        const reponse = await fetchWithAuth("/deliverables-citties");
        const data = await reponse.json();
        if (reponse.ok) {
          return data as City[];
        }
        return Promise.reject(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
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
        {query.data?.map((city) => (
          <CityCard key={city.id} data={city} />
        ))}
      </div>
    </div>
  );
}
