'use client'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface IProps{
    currentPage:number;
    totalPages:number;
    handlePageChange:(page:number) =>void;
}

const CustomPagaintion = ({currentPage,totalPages,handlePageChange}:IProps) => {
  return (
    <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                            href="#" 
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink 
                                    href="#" 
                                    isActive={page === currentPage} 
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext 
                                href="#" 
                                onClick={() => handlePageChange(currentPage + 1)} 
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
  )
}

export default CustomPagaintion
