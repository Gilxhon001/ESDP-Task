import { useState } from 'react';
import FileUpload from './components/FileUpload.jsx';
import DataTable from './components/DataTable.jsx';

function App() {
    const [fileData, setFileData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const linesPerPage = 20;

    return (
        <div className="App">
            <FileUpload setFileData={setFileData} />
            <DataTable data={fileData} currentPage={currentPage} linesPerPage={linesPerPage} />
        </div>
    );
}

export default App;
