import { Dog } from "../interfaces/DogInterfaces";

const fetchData = async ( url: string ) => {

  try {
    const response = await fetch(url, {
            
      method: "GET",
      credentials: 'include',
      headers: {
          "Content-Type": "application/json",
      }
    })
    if (!response.ok) {
      if(response.status !== 401){
       throw new Error('Error fetching data');
      }else{
        return { status: 401 }
      } 
    }
    return response.json()
  } catch (error) {
     console.log( "Error fetching data:", error )
     return null
  }
}

export async function fetchTheDogs(ids: string[]): Promise<Dog[] | null> {

  try {
    const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
    
      method: "POST",
      credentials: 'include',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(ids)
    })

    if (!response.ok) {
      throw new Error('Failed to fetch dogs');
    }

    return response.json()

  } catch (error) {
    console.log(error)
    return null
  }

}

interface DogBreedObject{
  status: number
  payload: {
    breeds: string[]
  }
}

export async function fetchDogBreeds(): Promise<DogBreedObject | null> {

  const data = await fetchData('https://frontend-take-home-service.fetch.com/dogs/breeds')

  if(data.status){

    return {
      status: data.status,
      payload: {breeds:[]}
    }

  }

  return {
    status: 200,
    payload: {breeds: [...data]}
  }
}


interface FetchResult{
  resultIds: string[]
  total?: number
  next?: string
  previous?: string
}

interface ResultObject{
  status: number
  payload: FetchResult
}


interface Match{
  match: string
}

interface MatchObject{
  status: number
  payload: {
    match: Promise<Match>
  }
}


export async function fetchDogIds(url: string): Promise<ResultObject | null > {

  const data= await fetchData(url)

  if(data.status){
    return {
      status: data.status,
      payload: {
        resultIds: [],
      }
    }
  }
  return {
    status: 200,
    payload: {...data}
  }
  
}


export async function fetchDogIdsByBreeds(breeds: string[], direction: string, from: number, size: number): Promise<ResultObject | null > {

  const breedParam = breeds.map( breed => `breeds=${breed}` ).join('&')

  const data= await fetchData(`https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:${direction}&from=${from}&size=${size}&${breedParam}`)

  if(data.status){
    return {
      status: data.status,
      payload: {
        resultIds: []
      }
    }
  }
  return {
    status: 200,
    payload: {...data}
  }
  
}


export async function fetchMatch(dogs: string[]): Promise<MatchObject | null > {

  try {
    const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
    
      method: "POST",
      credentials: 'include',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(dogs)
    })

    
    if (!response.ok) {
      return {
        status: response.status,
        payload: {
          match: Promise.resolve({
            match: ''
          })
        }
      }
    } 

    return {
      status: response.status,
      payload: {
        match: response.json()
      }
    }


  } catch (error) {
    console.log(error)
    return null
  }


  
  
}