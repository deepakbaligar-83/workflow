import SideBar from './components/SideBar';
import WorkflowHeader from './components/WorkFlowHeader';
import WorkflowTableContent from './components/WorkflowTableContent';

const WorkflowTable = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />

      
      <div className="flex flex-col flex-1 overflow-hidden">
        <WorkflowHeader />
        <WorkflowTableContent />
      </div>
    </div>
  );
};

export default WorkflowTable;
