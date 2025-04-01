export interface PaginationInfo {
    [total: string]: Any
    [prev: string]: string | undefined
    [next: string]: string | undefined
}

export interface PaginaitonSettings{
    limit: number,
    position: number,
}