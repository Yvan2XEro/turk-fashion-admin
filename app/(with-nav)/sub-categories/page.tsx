"use client";
import React from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Filter, SubCategory } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useCollectionData from "@/hooks/useCollectionData";
import { EditSubCategorySheet } from "@/components/organism/EditSubCategoryForm";

const q = query(collection(db, "subcategories"), orderBy("updatedAt", "desc"));

export default function Page() {
  const { data: categiries } = useCollectionData<SubCategory>({
    q,
  });

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <EditSubCategorySheet
          title="New Category"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add Sub Category
            </Button>
          }
        />
      </div>
      <DataTable columns={columns} data={categiries} />
    </div>
  );
}
