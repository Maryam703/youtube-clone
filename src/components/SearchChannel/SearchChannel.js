import React, { useContext } from 'react'
import Context from '../../Context/Context'
import SearchCHannelCard from '../SearchChannelCard/SearchCHannelCard'

export default function SearchChannel() {
  const { search } = useContext(Context)

  return (
    <>
      {search && <div>{search.map((item) => {
        return (
          <SearchCHannelCard
            file={item.file}
            id={item.id}
            name={item.name}
            email={item.email}
            subscribers={item.subscribers} />
        )
      })}</div>}
    </>
  )
}
