import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import WorkflowTable from "./WorkflowTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workflows" element={<WorkflowTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
