import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router"

import { dogs, favoriteDogs, breeds} from "../temp-data/tempData.ts"

import DogList from "../components/ui/DogList.tsx"
import FavoriteDogsList from "../components/ui/FavoriteDogsList.tsx"

import SortBar from "../components/ui/SortBar.tsx"

import { Dog } from "../interfaces/DogInterfaces"

import {fetchDogs, fetchDogBreeds, fetchDogIds, fetchDogIdsByBreeds} from '../api/fetchDogs'

import unauthorizeUser from '../api/logout'

function HomePage() {
 
  const { logout } = useAuth()
  
  const navigate = useNavigate()
  
  const totatlDogsPerPage = 25;

  const [currentPosition, setCurrentPosition] = useState<number>(0)

  const [dogList, setDogList] = useState<Dog[] | null>([])

  const [dogBreeds, setDogbreeds] = useState<string[]>([])
  
  const [currentBreeds, setCurrentBreeds] = useState<string[]>([])

  const [currentSortDirection, setCurrentSortDirection] = useState<string>("asc")

  const handleLogout = async () => {
    await unauthorizeUser()
    logout()
    navigate("/login", { replace: true })
  }

  const handleSort = (direction: string) => {
    // await Unauthorize()
    // logout()
    // navigate("/login", { replace: true })
    setCurrentSortDirection(direction)
  }


  const handleSelect = (values: string[]) => {

    setCurrentSortDirection("asc")

    if(values.includes('all')){
      setCurrentBreeds([])
      listDogs( currentSortDirection, currentPosition * totatlDogsPerPage)
    }else{
      setCurrentBreeds(values)
      listDogsByBreeds(values, currentSortDirection, currentPosition * totatlDogsPerPage)
    }
    
  }

  const getDogsBreeds = useCallback( async () => {

    const response = await fetchDogBreeds()
    
    if(response){
  
       if(response.status !== 401){
          
        setDogbreeds(response.payload.breeds)

       }else{
  
         logout()
  
       }
 
    }else{
  
       console.log("ERROR fetching dog breeds ")
  
    }
 
  }, [ setDogbreeds, logout ])


  const listDogs = useCallback( async ( direction: string, from: number) => {
     
    const response = await fetchDogIds(direction, from, totatlDogsPerPage)
   
   if(response){
 
      if(response.status !== 401){
 
        const thelist = await fetchDogs(response.payload.resultIds)
 
        setDogList(thelist)
 
      }else{
 
        logout()
 
      }

    }else{
 
      console.log("ERROR getting available Dogs ")
 
    }

  }, [ setDogList, logout ])


  const listDogsByBreeds = useCallback( async (breeds: string[], direction: string, from: number) => {
  
   const response = await fetchDogIdsByBreeds(breeds, direction, from, totatlDogsPerPage)
   
   if(response){
 
      if(response.status !== 401){
 
        const thelist = await fetchDogs(response.payload.resultIds)
 
        setDogList(thelist)
 
      }else{
 
        logout()
 
      }

    }else{
 
      console.log("ERROR getting available Dogs ")
 
    }

  }, [ setDogList, logout ])

  // const handleSortDesc = async () => {
  //   const response = await fetchDogsDescending(currentPosition * totatlDogsPerPage)
  //   if(response){
  //     const thelist = await fetchDogs(response.resultIds)
  //     console.log("thelist: ",thelist)
  //     setDogList(thelist)
  //   }
  // }

  useEffect( ()=>{

    getDogsBreeds()

  }, [ getDogsBreeds ])

  useEffect( ()=>{

    if(!currentBreeds.length){
      listDogs( currentSortDirection, currentPosition * totatlDogsPerPage )
    }else{
      listDogsByBreeds(currentBreeds, currentSortDirection, currentPosition * totatlDogsPerPage)
    }
      

  }, [ listDogs, listDogsByBreeds, currentSortDirection, currentPosition, totatlDogsPerPage, currentBreeds ])

  return (

    <div className="min-w-[300px]  mx-auto hp-container">
 
          <button onClick={handleLogout}>Logout</button>
 
          <div className="flex flex-row flex-wrap py-4">             
 
              <main role="main" className="w-full sm:w-2/3 md:w-3/4 p-10 bg-gray-100 rounded-xl outline-1 outline-gray-200">

                <h2 className="text-[60px] font-semibold">Available Dogs</h2>

                <SortBar breeds={dogBreeds} handleSort={handleSort} handleSelectChange={handleSelect}/>

              { dogList &&  <DogList styles="flex flex-col lg:grid grid-cols-3 gap-x-5 gap-y-7" dogs={dogList} /> }

              </main>
 
              <aside className="w-full sm:w-1/3 md:w-1/4 px-5">
 
                  <div className="sticky top-5 p-4 w-full bg-gray-100 px-5 py-10 rounded-xl outline-1 outline-gray-200">

                      <FavoriteDogsList dogs={favoriteDogs} />

                  </div>

              </aside>

          </div>

    </div>

  )
}
   
export default HomePage
   