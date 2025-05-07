import React from 'react'
import Header from './Movies/Header'
import MoviesContainerPage from './Movies/MoviesContainerPage'

const Home = () => {
  return (
    <div>
      <Header />

      <section className='mt-15'>
        <MoviesContainerPage />
      </section>
    </div>
  )
}

export default Home