import { useState } from "react"

interface Props{
    breeds: string[]
    buttonsDisabled: boolean
    handleSort: (direction: string)=>void
    handleSelectChange: (values: string[])=>void
}

function SortBar(props: Props){

        const ASC  = "asc"
        const DESC = "desc"

        const [sortDirection, setSortDirection] = useState<string>(ASC) 

        const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {        
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
        <div className="flex flex-col md:flex-row justify-end items-center gap-x-2 pb-4">
            <div className="flex gap-x-2 items-center mb-[20px]">
                <span className={props.buttonsDisabled ? "opacity-35 " : "" + "mr-2"}>Sort: </span>
                        
                <button type="button" className="font-(family-name:--font-button) px-5 py-3 border-1 border-gray-200 rounded-sm bg-neutral-50 disabled:opacity-50" onClick={handleSortDirectionAscending} aria-label="Ascending" title="Ascending" disabled={props.buttonsDisabled || sortDirection === ASC}>
                    <span className="scale-x-104 -scale-y-[45%] inline-block font-semibold">V</span>
                </button>
                
                <button type="button" className="font-(family-name:--font-button) px-5 py-3 border-1 border-gray-200 rounded-sm bg-neutral-50 disabled:opacity-50" onClick={handleSortDirectionDescending} aria-label="Descending" title="Descending" disabled={props.buttonsDisabled || sortDirection === DESC}>
                    <span className="scale-x-104 scale-y-[45%] inline-block font-semibold">V</span>
                </button>
            </div>
            <form>
                <select name="breeds" id="breeds" className="ml-5 text-center border-1 border-gray-200 p-4 rounded-sm bg-neutral-50" onChange={handleSelectChange} multiple>

                    <option value="all">All breeds</option>

                    {
                        props.breeds.map((breed, index) => <option className="px-4 py-1" value={breed} key={index}>{breed}</option>)
                    }
                    
                </select>
            </form>
        
        </div>
    )
}

export default SortBar