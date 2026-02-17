import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";




function AdminHeader({setOpen}) {
    const dispatch = useDispatch()

    function handleLogout(){
        dispatch(logoutUser())
        toast.success("Logged out successfully")
    }
    return ( 
        <header className="flex  items-center justify-between  px-4 py-3 bg-black">
       {/* <header className="flex fixed w-full z-40  items-center justify-between  px-4 py-3 bg-black"> */}
        <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block cursor-pointer bg-yellow-600 hover:bg-yellow-600 text-black rounded-sm px-4 py-2 text-sm font-medium shadow">
            <AlignJustify/>
            <span className="sr-only">Toggle menu</span>
        </Button>
        <div  className="flex  flex-1 justify-end lg:pr-4">
            <Button onClick={handleLogout} className="inline-flex gap-2 items-center bg-yellow-600 hover:bg-yellow-600 text-black rounded-sm px-4 py-2 text-sm font-medium shadow cursor-pointer">
                <LogOut/>
                Logout
            </Button>
        </div>
       </header>
     );
}

export default AdminHeader;