import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userRole?: string | null;
  user: any;
}

export const MobileNav = ({ isOpen, setIsOpen, userRole, user }: MobileNavProps) => {
  return (
    <>
      <div className="lg:hidden w-full">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {!user && (
            <div className="flex gap-2">
              <Button variant="ghost" asChild size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-background border-t lg:hidden">
          <nav className="container px-4 py-6">
            <div className="space-y-4">
              <Link
                to="/categories"
                className="block p-2 hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Browse Categories
              </Link>

              <Link
                to="/featured"
                className="block p-2 hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Featured Products
              </Link>

              {typeof userRole === "string" && userRole === "seller" && (
                <>
                  <Link
                    to="/seller"
                    className="block p-2 hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Seller Dashboard
                  </Link>
                  <Link
                    to="/seller/add"
                    className="block p-2 hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Add New Product
                  </Link>
                </>
              )}

              {typeof userRole === "string" && userRole === "admin" && (
                <>
                  <Link
                    to="/admin"
                    className="block p-2 hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    to="/admin/manage"
                    className="block p-2 hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Management
                  </Link>
                </>
              )}

              {user && (
                <Link
                  to="/dashboard"
                  className="block p-2 hover:bg-accent rounded-md font-medium text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};