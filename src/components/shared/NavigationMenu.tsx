import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function MainNav() {
  const { user, userRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <div className="flex items-center justify-between w-full lg:hidden">
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

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:hidden fixed inset-0 top-16 z-50 bg-background border-t`}
      >
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

            {userRole === "seller" && (
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

            {userRole === "admin" && (
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
          </div>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      to="/categories"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Browse Categories
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Explore our wide range of products across different categories
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/featured"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">Featured</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Check out our featured products
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {userRole === "seller" && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Seller</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/seller"
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        Dashboard
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/seller/add"
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        Add New Product
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}

          {userRole === "admin" && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/admin"
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        Dashboard
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/admin/manage"
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        Admin Management
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}

          {!user && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/login"
                    className={cn(
                      "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    Login
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}