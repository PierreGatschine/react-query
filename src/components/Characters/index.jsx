import React from 'react'
import { useQuery } from 'react-query'
import Character from '../Character'
import { useState } from 'react'


export default function Characters() {

  const [page, setPage] = useState(1)
  
  const fetchCharacters = async ({queryKey}) => {
    console.log(queryKey)
    const response = await fetch( `https://rickandmortyapi.com/api/character?page=${queryKey[1]}` )
    return response.json() 
  }
  
  const {data, status, isPreviousData, isLoading, isError} = useQuery(["characters", page], fetchCharacters, { keepPreviousData: true })

  //console.log(data)
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className='characters'>
      {data.results.map(character => (
          <Character character={character} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage((old) => Math.max(old - 1, 1))}>
          Previous
        </button>
        <button disabled={isPreviousData && !data.info.next} onClick={() => setPage((old) => old + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
