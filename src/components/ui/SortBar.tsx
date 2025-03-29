import { useState } from "react"

interface Props{
    breeds: string[]
    handleSort: (direction: string)=>void
    handleSelectChange: (values: string[])=>void
}

function SortBar(props: Props){

        const [ASC] = useState<string>("asc") 

        const [DESC] = useState<string>("desc") 

        const [sortDirection, setSortDirection] = useState<string>(ASC) 

        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {        
            props.handleSelectChange(Array.from(event.target.selectedOptions, option => option.value))
        }

        const handleSortDirectionAscending = () => {
            setSortDirection(ASC)
            props.handleSort(ASC)
        }

        const handleSortDirectionDescending = () => {
            setSortDirection(DESC)
            props.handleSort(DESC)
        }

    return (
        <div className="flex flex-row justify-end items-center gap-x-2 pb-4">
            
            <span className="mr-2">Sort: </span>
                     
            <button type="button" className="font-(family-name:--font-button) px-5 py-3 cursor-pointer border-1 border-gray-200 rounded-sm bg-neutral-50 disabled:opacity-50" onClick={handleSortDirectionAscending} aria-label="Ascending" title="Ascending" disabled={sortDirection === ASC}>
                <span className="scale-x-104 -scale-y-[45%] inline-block font-semibold">V</span>
            </button>
            
            <button type="button" className="font-(family-name:--font-button) px-5 py-3 cursor-pointer border-1 border-gray-200 rounded-sm bg-neutral-50 disabled:opacity-50" onClick={handleSortDirectionDescending} aria-label="Descending" title="Descending" disabled={sortDirection === DESC}>
                <span className="scale-x-104 scale-y-[45%] inline-block font-semibold">V</span>
            </button>
 
            <form>
                <select name="breeds" id="breeds" className="ml-5 text-center border-1 border-gray-200 p-4 rounded-sm bg-neutral-50" onChange={handleChange} multiple>

                    <option value="all">All breeds</option>

                    {
                        props.breeds.map((breed, index) => <option className="pt-3" value={breed} key={index}>{breed}</option>)
                    }
                    
                </select>
            </form>
        
        </div>
    )
}

export default SortBar