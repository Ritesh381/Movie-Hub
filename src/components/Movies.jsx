import React from 'react'
import Trending from './Trending'
import Banner from './Banner'
import './main.css'
import Discover from './Discover'

function Movies() {
  return (
    <div >
      <Banner />
      <Trending />
      <br />
      <Discover />
    </div>
  )
}

export default Movies