import { Dog } from "../../interfaces/DogInterfaces"
import FavoriteDogListItem from "./FavoriteDogListItem";

interface Props {
    dogs: Dog[]
    remove: (dog:Dog)=>void
}

function FavoriteDogsList(props: Props){
    return (
        <ul>
            {
                props.dogs.map(dog => <li key={dog.id}><FavoriteDogListItem dogInfo={dog} remove={props.remove} /></li> )
            }
        </ul>
    )
}

export default FavoriteDogsList