import '../index.css'
import '../App.css'

export default function LandingPage(){

    return (

        <div className='text-center width-full mx-10'>
        <h1 className='text-4xl mt-20'>Welcome</h1>

        <div className='max-w-prose mx-auto'>
        <div className='my-10'>
            <b>Story mode:</b>
            <p>
                Follow the main character along on their adventure through the city of the past.
                
                Go towards the flashing red marker on the map. Once you reach each destination, you will see the story progress.
            </p>
            <p>
                Please allow location access in order to use story mode
            </p>        
        </div>

        <div className='my-10'>
            <b>Exploration mode:</b>
            <p>
                Explore the locations that you visited in story mode.
                From the comfort of your home you can learn about the fascinating history of these places.
                Tap a pin on the map to read more about the location of your choice.
            </p>
        </div>
        
        <br/>
        <button 
            onClick={()=>{location.href='/giis_citytour_frontend/game/'}}
            className="bg-[#964b00] hover:bg-[#7b3f00] text-white font-bold py-2 px-4 rounded-lg m-1"
        >
            Enter Game
        </button>

        </div>
        </div>

    )
}