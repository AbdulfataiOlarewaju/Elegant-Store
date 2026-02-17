import {
  Hamburger,
  HamburgerIcon,
  HomeIcon,
  LogOut,
  MenuIcon,
  ShoppingCart,
  UserCogIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrraper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function HeaderRightCOntent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);


  useEffect(() => {
    dispatch(fetchCartItems({ userId: user?.id }));
  }, [dispatch]);

  console.log(cartItems, "cartItems");

  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-2">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          className="bg-transparent hover:bg-transparent font-bold cursor-pointer relative"
        >
          <ShoppingCart className="w-8 h-8" />
          <span className="absolute top-[-3px] right-2 text-sm">{cartItems?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}</span>
          <span className="sr-only">My Cart</span>
        </Button>
        <UserCartWrraper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="font-bold">
              {user?.userName[0].toUpperCase() +
                user?.userName.slice(1).toUpperCase().split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 text-white bg-black mt-9">
          <DropdownMenuLabel>
            Loged in as {user?.userName.toUpperCase()}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="font-semibold cursor-pointer"
          >
            <UserCogIcon className="mr-2 w-4 h-4 text-white dark:text-black" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="font-semibold cursor-pointer"
          >
            <LogOut className="w-4 mr-2 h-4 text-white dark:text-black" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SideRightContent({ setOpen }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  

  useEffect(() => {
    dispatch(fetchCartItems({ userId: user?.id }));
  }, [dispatch]);

  console.log(cartItems, "cartItems");

  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className="px-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          className="bg-transparent hover:bg-transparent font-bold cursor-pointer relative"
        >
          <ShoppingCart className="w-10 h-10" />
          <span className="absolute top-[-3px] right-2 text-sm">{cartItems?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}</span>
          <span className="sr-only">My Cart</span>
        </Button>
        <UserCartWrraper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer m-2 mt-8 text-sm">
            <AvatarFallback className="font-bold bg-black border-2 border-white">
              {user?.userName[0].toUpperCase() +
                user?.userName.slice(1).toUpperCase().split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="down" className="w-56 text-white bg-black mt-9">
          <DropdownMenuLabel>
            Loged in as {user?.userName.toUpperCase()}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account")
              setOpen(false)
            }}
            className="font-semibold cursor-pointer"
          >
            <UserCogIcon className="mr-2 w-4 h-4 text-white" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="font-semibold cursor-pointer"
          >
            <LogOut className="w-4 mr-2 h-4 text-white" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function MenuItems({ setOpen }) {
    const navigate = useNavigate();
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    function handleNavigate(getMenuItem){
        sessionStorage.removeItem('filters')
        const currentFilter = getMenuItem.id !== 'home' &&
        getMenuItem.id !== 'products' && getMenuItem.id !== 'search' ? {
            category : [getMenuItem.id]
        } : null
        sessionStorage.setItem('filters', JSON.stringify(currentFilter))
        if (location.pathname.includes('list') && currentFilter !== null) {
          setSearchParams({ category: getMenuItem.id })
        } else {
          navigate(getMenuItem.link)
        }
    }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:flex-row lg:items-center p-7 py-10 lg:p-0 gap-6 ">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Label onClick={() => { handleNavigate(item); setOpen(false); }} className="text-md font-medium cursor-pointer" key={item.id}>
          {item.label}
        </Label>
      ))}
    </nav>
  );
}

function ShoppingHeader() {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  console.log(user);

  return (
    <header className="sticky top-0 z-40 w-screen shadow-sm bg-black">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HomeIcon className="h-6 w-6 text-yellow-600" />
          <span className="font-bold text-yellow-600 text-xl">Elegant Store</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              className="lg:hidden bg-yellow-600 hover:bg-yellow-700 focus-visible:bg-yellow-700 cursor-pointer"
              size={"icon"}
            >
              <MenuIcon className="h-6 w-6 lg:hidden text-black" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-black text-white">
            <MenuItems setOpen={setOpen} />
            <SideRightContent setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block text-white">
          <MenuItems setOpen={setOpen} />
        </div>
        <div className="hidden lg:block">
          <HeaderRightCOntent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
