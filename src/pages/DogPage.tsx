import { useEffect, useCallback, useState } from "react";

import { useParams, Link } from "react-router";

import { Dog } from "../interfaces/DogInterfaces";

import { fetchTheDogs } from "../api/fetchDogs";

import  BackHomeButton  from '../components/ui/BackHomeButton'


function DogPage() {

  const {id} = useParams()

  const [dogInfo, setDogInfo] = useState<Dog[]>([])

  const showTheDog =  useCallback( async ()=>{

    if(id){
      const theDog = await fetchTheDogs([id])
      if(theDog)setDogInfo(theDog)
    }

  },[ id ])

  useEffect(()=>{
    showTheDog()
  },[showTheDog])

  return (
    <div>
      <header className="my-[10px]">
        <BackHomeButton />
      </header>
      <main className="w-full p-10 bg-gray-100 rounded-xl border-1 border-gray-200 text-center">
        {dogInfo.length > 0 &&
          <>
          <h2 className="text-5xl font-bold mt-[20px]">Your Match Is {dogInfo[0].name}!</h2>
          <img className="w-full h-auto max-w-[600px] my-[30px] mx-auto" src={dogInfo[0].img} alt={`picture of ${dogInfo[0].name}`} />

          <div className="flex gap-2 justify-center font-medium text-stone-900 dark:text-gray-400">

              <span>Age: {dogInfo[0].age}</span>

              <span>·</span>

              <span>breed: {dogInfo[0].breed}</span>

              <span>·</span>

              <span>Location: <Link 
                                to={`https://duckduckgo.com/?q=${dogInfo[0].zip_code}&ia=maps&iaxm=maps`} 
                                target="_blank" rel="noopener"
                                className="underline underline-offset-3">
                                {dogInfo[0].zip_code}
                              </Link>
              </span>
          </div>
          
          </>
        }
        
      </main>
      <footer></footer>
    </div>
  )
}
   
export default DogPage
   