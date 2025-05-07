import { Link } from "react-router"


const MovieCard = ({movie}) => {
  return (
    <div key={movie._id} className="relative group m-4">
      <Link to={`/movies/${movie._id}`}>
      <img src={movie.image} alt={movie.name}  className="w-[20rem] h-[20rem] m-0 p-0 rounded group-hover:opacity-50 duration-400 easy-in-out"/></Link>

      <p className="absolute top-[85%] left-4 right-0 bottom-0 opacity-0 group-hover:opacity-100 duration-400 easy-in-out">{movie.name}</p>
    </div>
  )
}

export default MovieCard