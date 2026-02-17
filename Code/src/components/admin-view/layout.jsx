import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { Outlet } from "react-router-dom";
import { useState } from "react";


function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false)
    return ( 
        <div className="flex min-h-screen ">
            {/* sidebar */}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
            <div className="flex flex-1 flex-col">
                {/* adminheader */}
                <AdminHeader setOpen={setOpenSidebar}/>
                <main className="flex flex-1 flex-col bg-[#0d0c0cfd] p-4 md:p-6 lg:w-full w-screen">
                    <Outlet/>
                </main>
            </div>
        </div>
     );
}

export default AdminLayout;   