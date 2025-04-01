import { Link } from "react-router"
import { Dog } from "../../interfaces/DogInterfaces"
import { useState,useEffect } from "react"

interface Props{
    dogInfo: Dog
    disabled: boolean
    maxFavorites: number
    favorites: Dog[]
    favorite: (dog: Dog)=>void
    unFavorite: (dog: Dog)=>void
}

function DogCard(props: Props){

    const setAsFavorite = ()=>{
        props.favorite(props.dogInfo)
    }

    const unFavorite = ()=>{
        props.unFavorite(props.dogInfo)
    }

    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    useEffect(()=>{
        const favs = props.favorites.filter((el)=>el.id === props.dogInfo.id )
        if(favs.length){
            setIsFavorite(true)
        }else{
            setIsFavorite(false)    
        }
    },[setIsFavorite, props])

    return (
        <div className="flex flex-col w-full  min-h-[320px] outline-1 outline-gray-200 rounded-md overflow-hidden bg-white">

            <div className="h-[250px]">

                <img className="w-full h-full object-cover" alt={props.dogInfo.name} src={props.dogInfo.img} />

            </div>

            <div className="flex items-center justify-between">    
                <div className="flex flex-col items-center md:items-start px-4 pt-2 pb-3">

                    <span className="text-2xl font-medium">{props.dogInfo.name}</span>

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
                <div className="pr-5 text-size-xl">
                    {/* {!props.isFavorite ? */}
                    {!isFavorite ?
                        <button
                        type="button"
                        className="bg-white text-3xl"
                        title={props.disabled ? `Only ${props.maxFavorites} dogs allowed in favorites list` : "Add to Favorites"}
                        aria-label="Add to Favorites"
                        disabled={props.disabled}
                        onClick={setAsFavorite}>
                            ☆
                        </button>

                        :

                        <button
                        type="button"
                        className="bg-white text-xl mt-[4px] mr-[3px]"
                        title="Remove from Favorites"
                        aria-label="Remove from Favorites"
                        // disabled={props.disabled}
                        onClick={unFavorite}>
                            ⭐️
                        </button>

                    }
                </div>

            </div>

        </div>
    )
}

export default DogCard