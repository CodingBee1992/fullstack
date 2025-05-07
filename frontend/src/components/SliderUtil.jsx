import Slider from 'react-slick'
import MovieCard from '../pages/Movies/MovieCard'

const SliderUtil = ({ data }) => {
	// const settings = {
	// 	dots: true,
	// 	infinite: true,
	// 	speed: 500,
	// 	slidesToShow: 4,
	// 	slidesToScroll: 2,
	// }
	return (
		<div className='flex'>
			{data?.map(movie => (
				<MovieCard key={movie._id} movie={movie} />
			))}
		</div>
	)
}

export default SliderUtil
