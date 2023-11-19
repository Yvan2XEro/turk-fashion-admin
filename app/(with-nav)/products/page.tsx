"use client";
import React, { useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Product } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EditProductSheet } from "@/components/organism/EditProductForm";
import useCollectionData from "@/hooks/useCollectionData";

const q = query(
  collection(db, "products"),
  orderBy("updatedAt", "desc"),
  limit(10)
);

export default function page() {
  const { data: products } = useCollectionData<Product>({
    q,
  });

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <EditProductSheet
          title="New product"
          button={
            <Button size="sm" variant="ghost" className="">
              <Plus />
              Add Product
            </Button>
          }
        />
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
