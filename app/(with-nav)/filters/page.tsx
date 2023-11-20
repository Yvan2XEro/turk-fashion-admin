"use client";
import React from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Filter } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useCollectionData from "@/hooks/useCollectionData";
import { EditFilterSheet } from "@/components/organism/EditFilterForm";

const q = query(
  collection(db, "filters"),
  // orderBy("updatedAt", "desc"),
  limit(10)
);
// const { data: categories } = useCollectionData<Category>({
//   q: query(collection(db, "categories")),
// });

export default function page() {
  const { data: categiries } = useCollectionData<Filter>({
    q,
  });

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <EditFilterSheet
          title="New Category"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add Filter
            </Button>
          }
        />
      </div>
      <DataTable columns={columns} data={categiries} />
    </div>
  );
}
