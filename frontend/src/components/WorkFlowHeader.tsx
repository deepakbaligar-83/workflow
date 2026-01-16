import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import LogoutIcon from "@mui/icons-material/Logout";

const WorkflowHeader = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center font-dm-sans justify-between px-6 py-6 bg-[#eef3f7]">
      
      <div className="ml-5">
        <h1 className="text-lg font-semibold text-gray-900">
          Workflow List
        </h1>
        <p className="text-sm text-gray-500">
          A short description will be placed right over here
        </p>
      </div>

      
      <div className="flex items-center gap-4 relative">

       
        <div className="relative w-115">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search data, notebooks, recents and more"
            className="w-full pl-11 pr-16 py-2.5 rounded-full border border-gray-400 bg-white text-sm outline-none"
          />
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400">
            <KeyboardCommandKeyIcon sx={{ fontSize: 16 }} />
            <span>+</span>
            <span className="text-sm">K</span>
          </div>
        </div>


        <button className="p-2 rounded-full hover:bg-gray-200/60">
          <NotificationsNoneOutlinedIcon className="text-gray-800" />
        </button>

        <div className="relative" ref={menuRef}>
          <img
            src="https://i.pinimg.com/1200x/b8/29/f6/b829f61fa1cc54ff81f1202d0750d4c0.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-md object-cover cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />


          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg  z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm rounded-lg shadow-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <LogoutIcon fontSize="small" />
                Log Out
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default WorkflowHeader;
