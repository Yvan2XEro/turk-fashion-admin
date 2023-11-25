import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginForm } from "@/components/organism/LoginForm";
const montSerat = Montserrat({ subsets: ["latin"] });

export default function page() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div></div>
        <Card className="rounded-none h-screen">
          <CardContent className="flex items-center justify-center h-full">
            <Card className="min-w-[400px]">
              <CardContent className="py-8">
                <h1 className={cn("font-bold text-4xl", montSerat.className)}>
                  Turk Fashion
                </h1>
                <h2>Admin back office</h2>
                <LoginForm />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
