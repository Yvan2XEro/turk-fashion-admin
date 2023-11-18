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
import { EditProductSheet } from "@/components/organism/EditProductSheet";
import { EditProductForm } from "@/components/organism/EditProductForm";

const q = query(
  collection(db, "products"),
  //   orderBy("timestamp", "desc"),
  limit(10)
);

export default function page() {
  const [products, setProducts] = React.useState<Product[]>([]);
  useEffect(() => {
    const subscriber = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setProducts((oldArray) => [...oldArray, doc.data() as Product]);
      });
    });
    return () => subscriber();
  }, []);
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
        >
          <EditProductForm />
        </EditProductSheet>
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
