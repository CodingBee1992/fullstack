import { Link } from "react-router"
import { useGetNewMoviesQuery } from "../../redux/api/apiSlice"
import SliderUtil from "../../components/SliderUtil"


const Header = () => {

    const {data}=useGetNewMoviesQuery()

  return (
    <div className="flex flex-col items-center justify-between md:items-start md:flex-row mt-4 ml-4 ">
        <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
            <Link to='/fullstack/' className="block p-2 mb-1 md:mb-2 text-lg rounded hover:bg-teal-700 duration-400 east-in-out">Home</Link>
            <Link to='/fullstack/movies' className="block p-2 mb-1 md:mb-2 text-lg rounded hover:bg-teal-700 duration-400 east-in-out">Browse movies</Link>
        </nav>

        <div className="w-full md:w-[80%] mr-0 md:mr-2">
            <SliderUtil data={data} />
        </div>
    </div>
  )
}

export default Header