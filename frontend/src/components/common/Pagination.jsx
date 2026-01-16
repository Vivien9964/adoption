const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    // Helper function to add pages to the array
   const addPages = (pages, from, to) => {

        for( let i = from; i <= to; i++) {
            pages.push(i);
        }
   }


   // Function to determine what is shown in the pagination
   const getPageNumbers = (currentPage, totalPages) => {

    const pages = [];
    const visibleRange = 1;
    
    // If the number of pages smaller than the default, show all
    if( totalPages <= 4) {
        addPages(pages, 1, totalPages);
        return pages;
    }

    // Always show the first page 
    pages.push(1)

    // Always show the next and previous pages from the current page
    let start = currentPage - visibleRange;
    let end = currentPage + visibleRange;

    if (start < 2) {
        start = 2;
    }

    if (end > totalPages - 1) {
        end = totalPages - 1;
    }

    // Skipped pages after 2
    if (start > 2) {
        pages.push("...");
    }

    // Middle pages
    addPages(pages, start, end);

    // Skipped pages before last page
    if (end < totalPages - 1) {
        pages.push("...");
    }

    // Always show the last page
    pages.push(totalPages);

    return pages;

   }

   if( totalPages <= 1) {
    return null;
   }



    return (
        <div className="flex justify-center items-center gap-2 mt-6">

            {/* Previous page button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                px-3 py-2 rounded-lg font-medium text-gray-600
                hover:bg-yellow-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                Previous
            </button>

            {/* Insert ... or page button */}
            <div className="flex items-center gap-1">
                {getPageNumbers(currentPage, totalPages).map((page, index) => (
                    page === "..." ? (
                        <span 
                            key={index}
                            className="px-2 text-gray-400"
                        >
                            ...
                        </span>
                    ) : (
                        
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-lg font-bold transition-all
                                ${currentPage === page
                                    ? 'bg-yellow-400 text-yellow-900 shadow-md scale-105'
                                    : 'bg-sky-100 text-gray-600 hover:bg-yellow-200'
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>
            
            {/* Next page button */}
            <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg font-medium text-gray-600 
                       hover:bg-yellow-100 disabled:opacity-40 
                       disabled:cursor-not-allowed transition-colors"
        >
            Next
        </button>

        </div>
    )
}

export default Pagination;