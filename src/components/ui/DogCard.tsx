import { Link } from "react-router"
import { Dog } from "../../interfaces/DogInterfaces"

interface Props{
    dogInfo: Dog
}

function DogCard(props: Props){
    return (
        <div className="flex flex-col w-full  min-h-[320px] outline-1 outline-gray-200 rounded-md overflow-hidden bg-white">

            <div className="h-[250px]">

                <img className="w-full h-full object-cover" alt={props.dogInfo.name} src={props.dogInfo.img} />

            </div>

            <div className="flex flex-col items-center md:items-start px-4 pt-2 pb-3">    
                
                <span className="text-2xl font-medium">{props.dogInfo.name}</span>
                {/* <Link to={`/Dog/${props.dogInfo.id}`}>{props.dogInfo.name}</Link> */}
                <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">

                    <span>{props.dogInfo.breed}</span>

                    <span>·</span>

                    <span>{props.dogInfo.age}</span>

                </span>
                <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                    located in: 
                    <Link 
                    to={`https://duckduckgo.com/?q=${props.dogInfo.zip_code}&ia=maps&iaxm=maps`} 
                    target="_blank" rel="noopener">
                    {props.dogInfo.zip_code}
                    </Link>
                </span>
                

            </div>

        </div>
    )
}

export default DogCard