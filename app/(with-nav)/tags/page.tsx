"use client";
import React from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TagObj } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useCollectionData from "@/hooks/useCollectionData";
import EditTagSheet from "@/components/organism/EditTagForm/EditTagSheet";

const q = query(collection(db, "tags"), orderBy("updatedAt", "desc"));

export default function Page() {
  const { data: tags } = useCollectionData<TagObj>({
    q,
  });

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <EditTagSheet
          title="New Filter"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add Tag
            </Button>
          }
        />
      </div>
      <DataTable columns={columns} data={tags} />
    </div>
  );
}
