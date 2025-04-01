import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router"

import DogList from "../components/ui/DogList"
import FavoriteDogsList from "../components/ui/FavoriteDogsList"

import SortBar from "../components/ui/SortBar"
import Pagination from "../components/ui/Pagination"

import { Dog } from "../interfaces/DogInterfaces"
import { PaginationInfo, PaginaitonSettings } from "../interfaces/PaginationInfo"

import {fetchTheDogs, fetchDogBreeds, fetchDogIds, fetchDogIdsByBreeds, fetchMatch} from '../api/fetchDogs'

import unauthorizeUser from '../api/logout'

function HomePage() {
 
  const { logout } = useAuth()
  
  const navigate = useNavigate()
  
  const [paginationSettings, setPaginationSettings] = useState<PaginaitonSettings>({
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
  // const [currentBreeds, setCurrentBreeds] = useState<string[]>([])

  const [favoriteDogs, setFavoritedDogs] = useState<Dog[]>([])
  const [disableFavorites, setDisableFavorites] = useState<boolean>(false)

  const [disableSort, setDisableSort] = useState<boolean>(false)

  const [currentSortDirection, setCurrentSortDirection] = useState<string>("asc")

  const MAX_FAVORITE_DOGS = 100
  const BASE_URL = 'https://frontend-take-home-service.fetch.com'



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


  const getMatch = async ()=>{
    //fetch match based off list 

    const ids = favoriteDogs.map(d => d.id)

    const response = await fetchMatch(ids)
 
    if(response){
 
      if(response.status !== 401){
        
        if(response){
          const m = await response.payload.match

          navigate(`/your-match/${m.match}`)
        }

      }else{
 
        logout()

      }

    }else{
 
      console.log("ERROR getting available Dogs ")
 
    }

  }
  
  const listDogs = useCallback( async ( url : string ) => {

    const fURL = BASE_URL + url

    const response = await fetchDogIds(fURL)
   
    if(response){
 
      if(response.status !== 401){
 
        const thelist = await fetchTheDogs(response.payload.resultIds)
 
        setDogList(thelist)

        setPaginaitonInfo( prev => (
          {
            ...prev,
            total:  response.payload.total,
            previous: response.payload.prev,
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
  


  const listDogsByURL = useCallback( async (url: string) => {
    console.log("listDogsByURL")
    listDogs(url)
  }, [ listDogs ])

  const listDogsBySettings = useCallback( async (direction: string, size: number, from: number) => {
    console.log("listDogsBySettings")
    const url = `/dogs/search?sort=breed:${direction}&size=${size}&from=${from}`
    listDogs(url)
  }, [ listDogs ])

  const listDogsByBreeds = useCallback( async (direction: string, size: number, from: number, breeds: string[]) => {
    console.log("listDogsByBreeds")

    const url = `/dogs/search?sort=breed:${direction}&size=${size}&from=${from}`
   
    const fURL = BASE_URL + url

    const response = await fetchDogIdsByBreeds(fURL, breeds)
   
    if(response){
 
      if(response.status !== 401){
 
        const thelist = await fetchTheDogs(response.payload.resultIds)
 
        setDogList(thelist)

        setPaginaitonInfo( prev => (
          {
            ...prev,
            total:  response.payload.total,
            previous: response.payload.prev,
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



  const handleLogout = async () => {
    await unauthorizeUser()
    logout()
    navigate("/login", { replace: true })
  }
  
  const handleSort = (direction: string) => {
    setCurrentSortDirection(direction)
      
    listDogsBySettings(direction, paginationSettings.limit, paginationSettings.position)

  }

  const handleSelect = (values: string[]) => { 

    if(values.includes('all')){
      setDisableSort(false)
      listDogsBySettings(currentSortDirection, paginationSettings.limit, 0)
    }else{
      setDisableSort(true)
      listDogsByBreeds(currentSortDirection, paginationSettings.limit, paginationSettings.position, values)
    }
    
  }

  const handlePaginationChange = (value: string) => {

    let pos = paginationSettings.position

    switch(value){

      case 'previous': 
        pos--
        listDogs( paginationInfo[value] )
        break;
      case 'next':
        pos++
        listDogs( paginationInfo[value] )
        break;
      case 'first':
        pos = 0
        listDogsBySettings( currentSortDirection, paginationSettings.limit, pos )
        break;

      case 'last':
        pos = paginationInfo.total - paginationSettings.limit
        listDogsBySettings( currentSortDirection, paginationSettings.limit, pos )
        break;
    }

    setPaginationSettings(prev =>(
      {
        ...prev,
        ['position']: pos
      }
    ))
  }


  const handleAddToFavorites = (dog: Dog) => {
    setFavoritedDogs([
      dog,
      ...favoriteDogs
    ]);

    if(favoriteDogs.length === MAX_FAVORITE_DOGS - 1){
      setDisableFavorites(true)
    }
  }

  const handleRemoveFromFavorites = (dog: Dog) => {
    setFavoritedDogs(
      favoriteDogs.filter(fId =>
        fId.id !== dog.id
      )
    )
    // console.log(dogList)
    if(favoriteDogs.length === MAX_FAVORITE_DOGS)setDisableFavorites(false)
  }


  const handleSubmitFavorites = ()=>{
    getMatch()
  }


  useEffect( ()=>{

    getDogsBreeds()

  }, [ getDogsBreeds ])

  useEffect( ()=>{
    listDogsByURL('/dogs/search?sort=breed:asc&size=25&from=0')
  }, [ listDogsByURL ])

  return (

    <div className="min-w-[300px]  mx-auto hp-container">
 
          <button onClick={handleLogout}>Logout</button>
 
          <div className="flex flex-col-reverse sm:flex-row flex-wrap py-4">             
 
              <main role="main" className="w-full mt-[20px] sm:mt-0 sm:w-2/3 md:w-3/4 p-10 bg-gray-100 rounded-xl border-1 border-gray-200">

                <h2 className="text-[40px]/[42px] lg:text-[60px]/[62px] font-semibold mb-[20px]">Available Dogs</h2>

                <SortBar breeds={dogBreeds} buttonsDisabled={disableSort} handleSort={handleSort} handleSelectChange={handleSelect}/>

                { dogList &&  
                  <DogList styles="flex flex-col lg:grid grid-cols-3 gap-x-5 gap-y-7" 
                  dogs={dogList}
                  favoriteDogs={favoriteDogs}
                  disableFavorites={disableFavorites}
                  maxFavorites={MAX_FAVORITE_DOGS}
                  favorite={handleAddToFavorites} 
                  unFavorite={handleRemoveFromFavorites} /> }

                {paginationInfo.total &&
                  <Pagination 
                  isFirst={paginationSettings.position < 1} 
                  isLast={paginationInfo.total - paginationSettings.limit === paginationSettings.position} 
                  handleNavigate={handlePaginationChange} />
                }

              </main>
 
              <aside className="w-full sm:w-1/3 md:w-1/4 px-5">
 
                  <div className="sticky min-h-[200px] top-5 p-4 w-full bg-gray-100 px-5 py-5 rounded-xl outline-1 outline-gray-200 text-center">
                    <h3 className="font-bold">Favorites</h3>
                    <small>Favorite up to {MAX_FAVORITE_DOGS} dogs to find your match</small>
                    {favoriteDogs.length > 0 &&
                      <>
                      <button 
                        type="button" 
                        title="Submit Favorites" 
                        aria-label="Submit Favorites" 
                        className="w-full bg-indigo-700 text-white rounded-full py-2 mt-2 mb-4"
                        onClick={handleSubmitFavorites}>Submit Favorites</button>

                      <FavoriteDogsList dogs={favoriteDogs} remove={handleRemoveFromFavorites}/>
                      </>
                    }
                   
                  </div>

              </aside>

          </div>

    </div>

  )
}
   
export default HomePage
   