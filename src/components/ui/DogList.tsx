import { Dog } from "../../interfaces/DogInterfaces"
import DogCard from "./DogCard";

interface Props {
    dogs: Dog[]
    styles: string
    favoriteDogs: Dog[]
    maxFavorites: number
    disableFavorites: boolean
    favorite: (dog: Dog)=>void
    unFavorite: (dog: Dog)=>void
}

function DogList(props: Props){

    return (
        <ul className={props.styles}>
            {
                props.dogs.map((dog,i) => <li key={dog.id}><DogCard dogInfo={dog} disabled={props.disableFavorites} maxFavorites={props.maxFavorites} favorite={props.favorite} unFavorite={props.unFavorite} isFavorite={props.favoriteDogs.includes(dog)}/></li> )
            }
        </ul>
    )
}

export default DogList