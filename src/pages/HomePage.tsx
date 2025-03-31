import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router"

import { dogs, favoriteDogs, breeds} from "../temp-data/tempData.ts"

import DogList from "../components/ui/DogList"
import FavoriteDogsList from "../components/ui/FavoriteDogsList"

import SortBar from "../components/ui/SortBar"
import Pagination from "../components/ui/Pagination"

import { Dog } from "../interfaces/DogInterfaces"
import { PaginationInfo, PaginaitonSettings } from "../interfaces/PaginationInfo"

import {fetchDogs, fetchDogBreeds, fetchDogIds, fetchDogIdsByBreeds} from '../api/fetchDogs'

import unauthorizeUser from '../api/logout'

function HomePage() {
 
  const { logout } = useAuth()
  
  const navigate = useNavigate()
  

  const [paginationSettings] = useState<PaginaitonSettings>({
    limit: 25,
    position: 0,
  })

  const [paginationInfo, setPaginaitonInfo] = useState<PaginationInfo>({
    total: '',
    previous: '',
    next: '',
  })

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
    setCurrentSortDirection(direction)
  }

  const handleSelect = (values: string[]) => {

    setCurrentSortDirection("asc")

    if(values.includes('all')){
      // setCurrentBreeds([])
      // listDogs( currentSortDirection, paginationInfo.position * paginationInfo.limit)
    }else{
      setCurrentBreeds(values)
      // listDogsByBreeds(values, currentSortDirection, paginationInfo.position * paginationInfo.limit)
    }
    
  }



  const handlePaginationChange = (value: string) => {
    console.log("value: ",value)
    const to = paginationInfo[value]
    console.log("to:",to)
    // listDogs( currentSortDirection, paginationInfo.position * paginationInfo.limit)
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
  
       console.log("ERROR fetching dog breeds")
  
    }
 
  }, [ setDogbreeds, logout ])


//   const listDogs = useCallback( async ( direction: string, from: number) => {
     
//     const response = await fetchDogIds(direction, from, 25)
   
//    if(response){
 
//       if(response.status !== 401){
 
//         const thelist = await fetchDogs(response.payload.resultIds)
 
//         setDogList(thelist)

//         // console.log(response.payload)

//         // setPaginationInfo(prev => ({
//         //   ...prev,
//         //   ['total']: 100,
//         // }))

// //        console.log(paginationInfo.total)

//         /* setPaginationInfo(prev => ({
//           ...prev,
//           ["total"]: response.payload.total ? response.payload.total : 0,
//           ["last"]: response.payload.total ? response.payload.total / prev.limit : null,
//           ["next"]: response.payload.next ?  response.payload.next: null,
//           ["previous"]: response.payload.previous ? response.payload.previous: null,
//         }))*/
//         //  updatePaginationInfo()
//       }else{
 
//         logout()
 
//       }

//     }else{
 
//       console.log("ERROR getting available Dogs ")
 
//     }

//   }, [ setDogList, logout ])


  const listDogsByBreeds = useCallback( async (breeds: string[], direction: string, from: number) => {
  
   const response = await fetchDogIdsByBreeds(breeds, direction, from, paginationInfo.limit)
   
   if(response){
 
      if(response.status !== 401){
 
        const thelist = await fetchDogs(response.payload.resultIds)
 
        setDogList(thelist)
 
        // setPaginationInfo(prev => ({
        //   ...prev,
        //   ["total"]: response.payload.total ? response.payload.total : null,
        //   ["last"]: response.payload.total ? response.payload.total - prev.limit : null,
        //   ["next"]: response.payload.next ? response.payload.next : null,
        //   ["previous"]: response.payload.previous ? response.payload.previous : null,
        // }))

      }else{
 
        logout()
 
      }

    }else{
 
      console.log("ERROR getting available Dogs ")
 
    }

  }, [ setDogList, logout ])


    
  const listDogs = useCallback( async ( direction: string, size: number, from: number, breeds?: []) => {
     
    const url = (!breeds ? `https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:${direction}&size=${size}&from=${from}` :
    `https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:${direction}&size=${size}&from=${from}&breeds=${breeds}`)

    const response = await fetchDogIds(url)
   
    if(response){
 
      if(response.status !== 401){
 
        const thelist = await fetchDogs(response.payload.resultIds)
 
        setDogList(thelist)

        setPaginaitonInfo( prev => (
          {
            ...prev,
            total:  response.payload.total,
            previous: response.payload.previous,
            next: response.payload.next,
          }
        ))

      }else{
 
        logout()
 
      }

    }else{
 
      console.log("ERROR getting available Dogs ")
 
    }

  }, [ setDogList, logout ])



  useEffect( ()=>{

    getDogsBreeds()

  }, [ getDogsBreeds ])

  // const pos = paginationInfo.position * paginationInfo.limit
  useEffect( ()=>{

    if(!currentBreeds.length){
      // const pos = paginationInfo.position * paginationInfo.limit
      // listDogs( currentSortDirection, pos)

      listDogs( currentSortDirection, paginationSettings.limit, paginationSettings.position)
    }else{
      // listDogsByBreeds(currentBreeds, currentSortDirection, paginationInfo.position * paginationInfo.limit)
    }
      

  }, [ listDogs, listDogsByBreeds, currentSortDirection, currentBreeds])

  return (

    <div className="min-w-[300px]  mx-auto hp-container">
 
          <button onClick={handleLogout}>Logout</button>
 
          <div className="flex flex-row flex-wrap py-4">             
 
              <main role="main" className="w-full sm:w-2/3 md:w-3/4 p-10 bg-gray-100 rounded-xl border-1 border-gray-200">

                <h2 className="text-[60px] font-semibold">Available Dogs</h2>

                <SortBar breeds={dogBreeds} handleSort={handleSort} handleSelectChange={handleSelect}/>

                { dogList &&  <DogList styles="flex flex-col lg:grid grid-cols-3 gap-x-5 gap-y-7" dogs={dogList} /> }

                {paginationInfo.total &&
                  <Pagination 
                  isFirst={paginationSettings.position < 1} 
                  isLast={ paginationInfo.total - paginationSettings.limit * paginationSettings.position === 0 } 
                  handleNavigate={handlePaginationChange} />
                }

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
   