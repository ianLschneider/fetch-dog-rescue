import { Dog } from "../../interfaces/DogInterfaces"

interface Props{
    dogInfo: Dog
}

function FavoriteDogListItem(props: Props){
    return (
        <div className="w-full min-h-[50px] outline-1 outline-gray-200 rounded-l">
            <p>{props.dogInfo.name}</p>
        </div>
    )
}

export default FavoriteDogListItem