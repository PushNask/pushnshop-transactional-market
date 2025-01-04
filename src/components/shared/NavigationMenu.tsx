import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MobileNav } from "./navigation/MobileNav";
import { DesktopNav } from "./navigation/DesktopNav";

export function MainNav() {
  const { user, userRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <MobileNav 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userRole={userRole}
        user={user}
      />
      <DesktopNav 
        userRole={userRole}
        user={user}
      />
    </div>
  );
}