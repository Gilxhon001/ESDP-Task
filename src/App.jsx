import { useState } from "react";
import FileUpload from "./components/FileUpload.jsx";
import DataTable from "./components/DataTable.jsx";

function App() {
  const [fileData, setFileData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const linesPerPage = 20;

  return (
    <div className="flex flex-col items-center gap-5 bg-gradient-to-r from-cyan-500 to-blue-500 h-screen p-5">
      <FileUpload setFileData={setFileData} setLoading={setLoading} />
      <DataTable
        data={fileData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        linesPerPage={linesPerPage}
        loading={loading}
      />
    </div>
  );
}

export default App;
