"use client";
import React from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Category } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useCollectionData from "@/hooks/useCollectionData";
import { EditCategorySheet } from "@/components/organism/EditCategoryForm";

const q = query(
  collection(db, "categories"),
  // orderBy("updatedAt", "desc"),
  limit(10)
);
// const { data: categories } = useCollectionData<Category>({
//   q: query(collection(db, "categories")),
// });

export default function page() {
  const { data: categiries } = useCollectionData<Category>({
    q,
  });

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <EditCategorySheet
          title="New Category"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add Category
            </Button>
          }
        />
      </div>
      <DataTable columns={columns} data={categiries} />
    </div>
  );
}
