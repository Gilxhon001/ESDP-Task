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
            <input type="file" accept=".txt" onChange={handleFileUpload} />
        </div>
    );
}

export default FileUpload;
