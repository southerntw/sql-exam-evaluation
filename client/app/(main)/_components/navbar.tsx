"use client";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="px-10 w-full py-5 bg-neutral-50 flex items-center justify-between">
      <p>Logo Here</p>
      <Button
        className="p-4"
        size="default"
        variant="outline"
        onClick={() => {}}
      >
        Logout
      </Button>
    </div>
  );
};
