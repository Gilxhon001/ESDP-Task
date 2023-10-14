import {useState, useRef, useCallback, useEffect} from 'react';

function DataTable({ data, linesPerPage }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const tableRef = useRef(null);

    const handleScroll = useCallback(() => {
        const table = tableRef.current;
        if (table) {
            const { scrollHeight, scrollTop, clientHeight } = table;
            if (scrollHeight - scrollTop <= clientHeight) {
                // User has reached the bottom of the table, load more data.
                setCurrentPage((prevPage) => prevPage + 1);
            }
        }
    }, []);

    // Attach the scroll event listener to the table.
    useEffect(() => {
        const table = tableRef.current;
        if (table) {
            table.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (table) {
                table.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    const startIndex = (currentPage - 1) * linesPerPage;
    const endIndex = startIndex + linesPerPage;
    const filteredData = data
        .filter((line) => line.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, endIndex); // Load only up to the endIndex.

    return (
        <>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div ref={tableRef} style={{ height: '400px', overflowY: 'scroll' }}>
                <table>
                    <tbody>
                    {filteredData.map((line, index) => (
                        <tr key={index}>
                            <td>{line}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;
