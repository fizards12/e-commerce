import Carousel from '../molecules/Carousel'

const slides = [
    <div className="p-8 bg-blue-500 text-white text-center rounded-lg">Slide 1</div>,
    <div className="p-8 bg-red-500 text-white text-center rounded-lg">Slide 2</div>,
    <div className="p-8 bg-green-500 text-white text-center rounded-lg">Slide 3</div>,
]
const HomeCarousel = () => {
  return (
    <Carousel slides={slides}/>
    
  )
}

export default HomeCarousel