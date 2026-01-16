
import { useEffect, useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Faders } from "phosphor-react";
import { Oval } from "react-loader-spinner";



type Workflow = {
  id: number;
  name: string;
  status: "active" | "paused";
  enabled: boolean; 
  owner: string;
  runs: {
  queued: number;
  running: number;
  success: number;
  failed: number;
};

  schedule: string;
  lastRun: string;
  nextRun: string;
};


const WorkflowTableContent = () => {
  const [activeTab, setActiveTab] =useState<"all" | "active" | "paused">("paused");
  // const [workflows, setWorkflows] = useState(workflowsData);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);



  useEffect(() => {
  const fetchWorkflows = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/workflows", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workflows");
      }

      const data = await res.json();
      setWorkflows(data);
    } catch (err) {
      setError("Unable to load workflows");
    } finally {
      setLoading(false);
    }
  };

  fetchWorkflows();
}, []);



  const counts = useMemo(() => {
  const total = workflows.length;
  const active = workflows.filter(w => w.status === "active").length;
  const paused = workflows.filter(w => w.status === "paused").length;

  return { total, active, paused };
}, [workflows]);


  // const filteredWorkflows = useMemo(() => {
  // if (activeTab === "all") return workflows;
  // return workflows.filter((w) => w.status === activeTab);
  //   }, [activeTab, workflows]);

            const filteredWorkflows = useMemo(() => {
            let result = workflows;

          
            if (activeTab !== "all") {
              result = result.filter((w) => w.status === activeTab);
            }

           
            if (searchTerm.trim()) {
              const term = searchTerm.toLowerCase();
              result = result.filter(
                (w) =>
                  w.name.toLowerCase().includes(term) ||
                  w.owner.toLowerCase().includes(term)||
                  w.status.toLowerCase().includes(term)
              );
            }

            return result;
          }, [workflows, activeTab, searchTerm]);

    
    const toggleWorkflow = (id: number) => {
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                enabled: !w.enabled,
                status: w.enabled ? "paused" : "active",
              }
            : w
        )
      );
    };

    
         if (loading) {
            return (
              <div className="flex-1 flex items-center justify-center text-gray-600">
                Loading workflows...
              </div>
            );
          }

          if (error) {
            return (
              <div className="flex-1 flex items-center justify-center text-red-600">
                {error}
              </div>
            );
          }


  return (
           

    <div className="flex-1 bg-[#eef3f7] px-6 font-dm-sans flex flex-col">
      {/* Tabs */}
      <div className="flex items-end gap-2 pt-3 border-b border-gray-300">
        <Tab
          label="All"
          count={counts.total}
          active={activeTab === "all"}
          onClick={() => setActiveTab("all")}
        />

        <Tab
          label="Active"
          count={counts.active}
          active={activeTab === "active"}
          onClick={() => setActiveTab("active")}
        />

        <Tab
          label="Paused"
          count={counts.paused}
          active={activeTab === "paused"}
          onClick={() => setActiveTab("paused")}
        />

      </div>

      
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3 flex-1">

          <div className="relative w-105">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {/* <input
              placeholder="Search by workflow and tasks"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white text-sm outline-none"
            /> */}
            <input
                placeholder="Search by workflow and tasks"
                value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                      onChange={(e) => {
                      setSearching(true);
                      setSearchTerm(e.target.value);
                      setTimeout(() => setSearching(false), 500);
                    }}

                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white text-sm outline-none"
              />

          </div>

        
          <select className="pl-0.5 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-500">
            <option>Created by</option>
          </select>

     
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-500">
            <input type="checkbox" />
            Only pinned
          </label>

        
          <button className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100  cursor-pointer">
            <Faders size={18} className="text-gray-600" />
          </button>
        </div>

        
        <button className="flex items-center gap-2 bg-[#1f5a94] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-90">
          <AddIcon fontSize="small" />
          Create Workflow
        </button>
      </div>

     
      <div className="flex-1 bg-white rounded-xl shadow-sm mt-2 overflow-auto">
  {/* Table Header */}
  <div className="grid grid-cols-[60px_2.5fr_1fr_1.5fr_1.5fr_1fr_1.5fr] px-4 py-3 text-[13px] text-gray-500 font-medium ">
    <div className="pr-3 border-r border-gray-300 ">State</div>
    <div className="pr-3 border-r border-gray-300  pl-1.5">Name</div>
    <div className="pr-3 border-r border-gray-300  pl-1.5">Owner</div>
    <div className="pr-3 border-r border-gray-300  pl-1.5">Runs</div>
    <div className="pr-3 border-r border-gray-300  pl-1.5">Schedule</div>
    <div className="pr-3 border-r border-gray-300  pl-1.5">Last Runs</div>
    <div className="pr-3 border-r border-gray-300  pl-1.5">Next Runs</div>
  </div>

  {/* Table Rows */}
        
    {searching ? (
            <div className="flex items-center justify-center py-10">
                <Oval
                  height={32}
                  width={32}
                  color="#1f5a94"
                  secondaryColor="#c3d5e6"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                  ariaLabel="search-loading"
                />
              </div>

          ) : filteredWorkflows.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-gray-500">
              No workflows found
            </div>
          ) : (
            filteredWorkflows.map((wf) => (
              <div
                key={wf.id}
                className="grid grid-cols-[60px_2.5fr_1fr_1.5fr_1.5fr_1fr_1.5fr]
                          px-4 py-3 text-sm hover:bg-gray-50"
              >
                
                <div className="flex items-center">
                  <button
                    onClick={() => toggleWorkflow(wf.id)}
                    className={`relative w-9 h-5 rounded-full transition
                      ${wf.enabled ? "bg-[#1f5a94]" : "bg-gray-300"}
                    `}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition
                        ${wf.enabled ? "left-4" : "left-0.5"}
                      `}
                    />
                  </button>
                </div>

       
                <div className="font-medium text-gray-800 text-sm">
                  {wf.name}
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-blue-100 text-[#1f5a94] px-2 rounded-full">
                      kubernetes
                    </span>
                    <span className="text-xs bg-blue-100 text-[#1f5a94] px-2 rounded-full">
                      spark
                    </span>
                  </div>
                </div>

              
                <div>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    {wf.owner}
                  </span>
                </div>

       
                <div className="flex gap-2">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full border text-xs text-gray-600">
                    {wf.runs?.queued ?? 0}
                  </span>
                  <span className="w-6 h-6 flex items-center justify-center rounded-full border border-green-500 text-green-600 text-xs">
                    {wf.runs?.running ?? 0}
                  </span>
                  <span className="w-6 h-6 flex items-center justify-center rounded-full border text-xs text-gray-600">
                    {wf.runs?.success ?? 0}
                  </span>
                  <span className="w-6 h-6 flex items-center justify-center rounded-full border border-red-500 text-red-600 text-xs">
                    {wf.runs?.failed ?? 0}
                  </span>
                </div>

               
                <div>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    {wf.schedule}
                  </span>
                </div>

        
                <div className="text-gray-500">{wf.lastRun}</div>


                <div className="text-gray-700">{wf.nextRun}</div>
              </div>
            ))
          )}


</div>

    </div>
  );
};

export default WorkflowTableContent;


const Tab = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition
      ${
        active
          ? "bg-blue-100 text-[#1f5a94]"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300/70 cursor-pointer"
      }`}
  >
    {label}
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
        active ? "bg-[#1f5a94] text-white" : "bg-gray-500/70 text-white  cursor-pointer"
      }`}
    >
      {count}
    </span>
    {active && (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1f5a94]" />
    )}
  </button>
);
