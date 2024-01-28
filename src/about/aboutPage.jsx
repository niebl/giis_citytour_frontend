import '../index.css'
import '../App.css'
import useSourcesData from './useSourcesData'
import { backendURL } from '../atoms'

import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

export default function AboutPage(){
    const setBackendURL = useSetRecoilState(backendURL)
    useEffect(() => {
        setBackendURL(import.meta.env.VITE_BACKEND_URL)
    })

    const sourcesData = useSourcesData()
       
    let sources = <p>loading...</p>
    if(sourcesData != undefined){
        //format sources
        sources = (
            <ul>
            {sourcesData.sources.map((source, index) => {
                return (<li key="index">{source.long_citation}</li>)
            })}
            </ul>
        )
    }

    return (

        <div className='text-center width-full mx-10'>
        <h1 className='text-4xl mt-20'>About</h1>

        <div className='max-w-prose mx-auto'>
        <div className='my-10'>
            <div>
                <b>Source-code:</b>
                <p><a href="https://github.com/niebl/giis_citytour_frontend">github.com/niebl/giis_citytour_frontend</a></p>
                <p><a href="https://github.com/niebl/giis_citytour_backend">github.com/niebl/giis_citytour_backend</a></p>
            </div>
            <br />
            <b>Authors</b>
            <ul>
                <li><a href="https://github.com/JamesOkemwa">James Okemwa Ondieki</a></li>
                <li><a href="https://github.com/Alaiya">Alex Rump</a></li>
                <li><a href="https://github.com/niebl">Caro Niebl</a></li>
            </ul>        
        </div>

        <div className='my-10'>
            {/* <b>Sources:</b> */}
            <b>
                The presented educational texts were based on the following sources:
            </b>
            <div>
                {sources}
            </div>
        </div>
        
        <br/>
        <button 
            onClick={()=>{location.href='/giis_citytour_frontend/game/'}}
            className="bg-[#964b00] hover:bg-[#7b3f00] text-white font-bold py-2 px-4 rounded-lg m-1"
        >
            return to the App
        </button>

        </div>
        </div>

    )
}