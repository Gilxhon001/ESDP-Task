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
            <div>
                <input type="text"
                       id="search-input"
                       placeholder="Search for anything"
                       className="focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-sky-500
                                  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                  block w-96 p-2.5"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div ref={tableRef} style={{ overflowY: 'scroll' }} className="rounded-lg p-5 h-full flex justify-center items-start bg-gray-50">
                <table>
                    <tbody>
                    {filteredData.map((line, index) => (
                        <tr key={index} className="border-solid border-2 border-sky-500">
                            <td className="p-2 whitespace-pre">{index}) {line}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;
