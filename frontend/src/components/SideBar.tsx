import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { RiDashboardLine } from "@remixicon/react";
import { IconListCheck } from "@tabler/icons-react";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-[#1f5a94] text-white font-dm-sans flex flex-col py-5
      rounded-r-2xl relative transition-all duration-300
      ${collapsed ? "w-20 px-2" : "w-64 px-2"}`}
    >
      {/* Collapse Button */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-6 top-10 bg-[#c3d5e6] rounded-full p-2 cursor-pointer shadow border border-white flex items-center justify-center"
      >
        <ChevronLeftIcon
          sx={{
            width: 28,
            height: 28,
            color: "#1f5a94",
            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Logo */}
      <div className="mb-6 px-3">
        {collapsed ? (
          <div className="text-xl font-semibold text-center">
            W
            <div className="h-px bg-white/80 mt-3 -mb-2" />
          </div>
        ) : (
          <div className="text-lg tracking-wider">
            Workflow App
            <div className="h-px bg-white/80 mt-3 -mb-2" />
          </div>
        )}
      </div>


      {/* MAIN NAV */}
      <nav className="flex flex-col gap-1.5 text-md mt-3">
        <NavItem icon={<AddIcon />} label="New" collapsed={collapsed} />

        <NavItem
          icon={<img src="/note1.png" className="w-6 h-6 object-contain" />}
          label="Workspace"
          collapsed={collapsed}
        />

        <NavItem
          icon={<AccessTimeIcon fontSize="small" />}
          label="Recent"
          collapsed={collapsed}
        />

        <NavItem
          icon={<CategoryOutlinedIcon fontSize="small" />}
          label="Catalog"
          collapsed={collapsed}
        />

        {/* Active Workflow */}
        <ActiveItem collapsed={collapsed} />

        <NavItem
          icon={<CloudOutlinedIcon fontSize="small" />}
          label="Compute"
          collapsed={collapsed}
        />
      </nav>

      {/* SQL */}
      {!collapsed && (
        <SectionLabel label="SQL" />
      )}

      <NavItem
        icon={<img src="/sqleditor.png" className="w-6 h-6 object-contain" />}
        label="SQL Editor"
        collapsed={collapsed}
      />

      <NavItem
        icon={<RiDashboardLine fontSize="small" />}
        label="Dashboard"
        collapsed={collapsed}
      />

      {/* DATA ENGINEERING */}
      {!collapsed && (
        <SectionLabel label="Data Engineering" />
      )}

      <NavItem
        icon={<IconListCheck size={20} />}
        label="Job Runs"
        collapsed={collapsed}
      />

      {/* MACHINE LEARNING */}
      {!collapsed && (
        <SectionLabel label="Machine Learning" />
      )}

      <NavItem
        icon={<img src="/ROBO.png" className="w-6 h-6 object-contain" />}
        label="Play Ground"
        collapsed={collapsed}
      />

      <div className="flex-1" />
    </div>
  );
};

export default SideBar;

/* ---------------- COMPONENTS ---------------- */
const NavItem = ({
  label,
  icon,
  collapsed,
}: {
  label: string;
  icon: React.ReactNode;
  collapsed?: boolean;
}) => (
  <div className="relative group">
    <div
      className={`flex items-center px-2 py-2 rounded-md cursor-pointer
        hover:bg-[#2b6cb0] transition-all duration-300
        ${collapsed ? "justify-center" : "gap-3"}
      `}
    >
      {icon}

      {/* Animated text */}
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300
          ${collapsed
            ? "opacity-0 w-0 translate-x-2"
            : "opacity-100 w-auto translate-x-0"}
        `}
      >
        {label}
      </span>
    </div>

    {/* Tooltip (only when collapsed) */}
    {collapsed && (
      <div className="absolute left-16 top-1/2 -translate-y-1/2
        bg-gray-600 text-white text-xs px-2 py-1 rounded-md ml-2.5
        opacity-0 group-hover:opacity-100 transition
        whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </div>
);


const ActiveItem = ({ collapsed }: { collapsed: boolean }) => (
  <div className="relative group">
    <div
      className={`flex items-center px-3 py-2 rounded-xl border
        bg-blue-300/10 border-amber-50 mt-1 
        transition-all duration-300
        ${collapsed ? "justify-center" : "gap-3"}
      `}
    >
      <img src="/zigzag.png" className="w-5 h-5 object-contain" />

      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300
          ${collapsed
            ? "opacity-0 w-0 translate-x-2"
            : "opacity-100 w-auto translate-x-0"}
        `}
      >
        Workflow
      </span>
    </div>

    {collapsed && (
      <div className="absolute left-16 top-1/2 -translate-y-1/2
        bg-gray-600 text-white text-xs px-3 py-1 rounded-md
        opacity-0 group-hover:opacity-100 transition ml-2.5
        whitespace-nowrap z-50">
        Workflow
      </div>
    )}
  </div>
);

const SectionLabel = ({ label }: { label: string }) => (
  <div className="mt-6 text-sm uppercase tracking-widest text-gray-400/70 px-3 py-2">
    {label}
  </div>
);
