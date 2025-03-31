export interface PaginationInfo {
    [total: string]: Any
    [previous: string]: string | undefined
    [next: string]: string | undefined
}

export interface PaginaitonSettings{
    limit: 25,
    position: 0,
}