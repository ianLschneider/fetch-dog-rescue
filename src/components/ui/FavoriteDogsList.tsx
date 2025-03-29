import { Dog } from "../../interfaces/DogInterfaces"
import FavoriteDogListItem from "./FavoriteDogListItem";

interface Props {
    dogs: Dog[]
}

function FavoriteDogsList(props: Props){
    return (
        <ul>
            {
                props.dogs.map(dog => <li key={dog.id}><FavoriteDogListItem dogInfo={dog} /></li> )
            }
        </ul>
    )
}

export default FavoriteDogsList