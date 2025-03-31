import { Dog } from "../../interfaces/DogInterfaces"

interface Props{
    dogInfo: Dog
    remove: (dog: Dog)=>void
}

function FavoriteDogListItem(props: Props){

    const remove = ()=>{
        props.remove(props.dogInfo)
    }
    return (
        <div className="flex w-full h-[50px] outline-1 outline-gray-200 rounded-l overflow-hidden">
           <figure className="min-w-[50px]! max-w-[50px]!">
           <img
            className="w-full h-full object-cover"
            src={props.dogInfo.img}
            alt={`picture of ${props.dogInfo.name}`}/>
            </figure>
            <p className="w-full flex items-center px-5 break-all">{props.dogInfo.name}</p>
            <button
            type="button" 
            title="remove"
            aria-label="remove"
            className="flex items-center pr-3"
            onClick={remove}>X</button>
        </div>
    )
}

export default FavoriteDogListItem