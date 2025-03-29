import { Dog } from "../../interfaces/DogInterfaces"
import DogCard from "./DogCard";

interface Props {
    dogs: Dog[]
    styles: string
}

function DogList(props: Props){
    return (
        <ul className={props.styles}>
            {
                props.dogs.map(dog => <li key={dog.id}><DogCard dogInfo={dog} /></li> )
            }
        </ul>
    )
}

export default DogList