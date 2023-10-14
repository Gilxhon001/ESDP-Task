function FileUpload({ setFileData }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContents = event.target.result;
                const lines = fileContents.split('\n');
                setFileData(lines);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
                <input className="block w-full text-sm text-slate-500 bg-gray-50 rounded-lg
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100"
                       type="file"
                       accept=".txt"
                       onChange={handleFileUpload}
                />
        </div>
    );
}

export default FileUpload;
