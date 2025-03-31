import { useState } from "react"

interface Props{
    isFirst: boolean
    isLast: boolean
    handleNavigate: (to: string)=>void
}

function Pagination(props: Props){

    const handlePaginationButtonclick = (event: React.MouseEvent<HTMLButtonElement>) =>{
        if(!(event.target instanceof HTMLButtonElement))return
        if(event.target.dataset.name)props.handleNavigate(event.target.dataset.name)
    }

    const isFirst = () => props.isFirst ? 'opacity-50' : ''
    const isLast = () => props.isLast ? 'opacity-50' : ''

    return(
        <div className="flex gap-10 mt-20 justify-center align-center">
            
            <div className={isFirst() + ' flex gap-3'}>
                <button 
                type="button"
                title="first page" 
                aria-label="first page" 
                data-name="first" 
                className='bg-gray-10'
                disabled={
                    props.isFirst
                }
                onClick={handlePaginationButtonclick}>&lt;&lt; <span className="pointer-events-none underline underline-offset-3">first Page</span></button>

                <button 
                type="button" 
                title="previous page" 
                aria-label="previous page" 
                data-name="previous" 
                className='bg-gray-100'
                disabled={
                    props.isFirst
                }
                onClick={handlePaginationButtonclick}>&lt; <span className="pointer-events-none underline underline-offset-3">Previous Page</span></button>
            </div>
            <div className={isLast() + ' flex gap-3'}>
                <button type="button"
                title="next page" 
                aria-label="next page" 
                data-name="next" 
                className='bg-gray-100'
                disabled={
                    props.isLast
                }
                onClick={handlePaginationButtonclick}><span className="pointer-events-none underline underline-offset-3">Next Page</span> &gt;</button>

                <button 
                type="button" 
                title="last page" 
                aria-label="last page" 
                data-name="last" 
                className='bg-gray-100'
                disabled={
                    props.isLast
                }
                onClick={handlePaginationButtonclick}><span className="pointer-events-none underline underline-offset-3">Last Page</span> &gt;&gt;</button>
            </div>
        </div>
    )
}

export default Pagination