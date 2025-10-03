"use client";
import { useCart } from "@/providers/cartProvider";
import { useWish } from "@/providers/wishListProvider";
import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
const Navbar = () => {
  const { status } = useSession();

  const items = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Brands",
      path: "/brands",
    },
    {
      name: "Products",
      path: "/products",
    },
  ];
  const { cartDetails } = useCart();
  const { wishListDetails } = useWish();
  return (
    <section className="py-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              EXCLUSIVE
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {items.map((item) => {
                return (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.path}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className=" mt-6 lg:mt-0 gap-x-4 hidden lg:flex">
            <Link href="/wishlist" className="relative">
              {wishListDetails && (
                <>
                  <Badge
                    variant="destructive"
                    className="w-2 h-4 absolute start-3.5 top-0 z-40"
                  >
                    {wishListDetails.count}
                  </Badge>
                </>
              )}
              <Heart className="w-[32px] h-[32px]" />
            </Link>
            <Link href="/cart" className="relative">
              {cartDetails && (
                <>
                  <Badge
                    variant="destructive"
                    className="w-2 h-4 absolute start-3.5 top-0 z-40"
                  >
                    {cartDetails.numOfCartItems}
                  </Badge>
                </>
              )}
              <ShoppingCart className="w-[32px] h-[32px] " />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="w-[32px] h-[32px] relative" />
              </DropdownMenuTrigger>

              {status === "loading" ? (
                "loading....."
              ) : status === "authenticated" ? (
                <>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem>My Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </>
              ) : (
                ""
              )}
            </DropdownMenu>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              "loading....."
            ) : status === "authenticated" ? (
              ""
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    EXCLUSIVE
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {items.map((item) => {
                    return (
                      <div key={item.name}>
                        <Link href={item.path}>{item.name}</Link>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status === "loading" ? (
                    "loading....."
                  ) : status === "authenticated" ? (
                    ""
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex gap-x-4 mt-6 ">
                  <Link href="/wishlist" className="relative">
                    {wishListDetails && (
                      <>
                        <Badge
                          variant="destructive"
                          className="w-2 h-4 absolute start-3.5 top-0 z-40"
                        >
                          {wishListDetails.count}
                        </Badge>
                      </>
                    )}
                    <Heart className="w-[32px] h-[32px]" />
                  </Link>
                  <Link href="/cart" className="relative">
                    {cartDetails && (
                      <>
                        <Badge
                          variant="destructive"
                          className="w-2 h-4 absolute start-3.5 top-0 z-40"
                        >
                          {cartDetails.numOfCartItems}
                        </Badge>
                      </>
                    )}
                    <ShoppingCart className="w-[32px] h-[32px] " />
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <User className="w-[32px] h-[32px] relative" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <Link href="/profile">
                        <DropdownMenuItem>My Profile</DropdownMenuItem>
                      </Link>
                      {status === "loading" ? (
                        "loading....."
                      ) : status === "authenticated" ? (
                        <>
                          <DropdownMenuItem
                            onClick={() => signOut({ callbackUrl: "/login" })}
                          >
                            Log out
                          </DropdownMenuItem>
                        </>
                      ) : (
                        ""
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
