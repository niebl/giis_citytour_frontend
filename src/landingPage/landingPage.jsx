import '../index.css'
import '../App.css'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
  } from "@material-tailwind/react";
import { useState } from 'react';

export default function LandingPage(){
    const [open, setOpen] = useState(-1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (

        <div className='text-center width-full mx-10'>
        <h1 className='text-4xl mt-20'>Welcome</h1>

        <div className='max-w-prose mx-auto'>
        <Accordion open={open === 1}>
            <AccordionHeader onClick={()=>handleOpen(1)}>
                {open == -1 && <b className='text-red-700'>Click me!</b>}
                {open != -1 && "Intro"}
            </AccordionHeader>
            <AccordionBody className="text-black text-lg">
                <Typography className="text-black text-lg">
                Welcome to Münster Historical City Tours.
                </Typography><br />
                <Typography className="text-black text-lg">
                This app offers an interactive exploration of the history of the city of Münster. The experience has been designed for students of the German “Mittelstufe”, so grades 7 to 10. 
                At the current time, the app offers two different experiences in two different modes. First a tour of the historical city core based on Münster in the 1530s, and second a tour of the harbor of Münster based on the 1950s. Both experiences involve a story mode, inviting the users to step into the shoes of someone living at the time of the tour, as well as an exploration mode, that is more focused on learning the actual history of the monuments visited. 
                But don’t worry, even if you are doing a tour, you can switch between the two modes.
                Be warned though: While the exploration mode works fine from a home PC, the same cannot be said for the story mode, as it relies on you physically visit the places in question.
                </Typography><br />
                <Typography className="text-black text-lg">
                This said, we hope that you’ll have fun.
                </Typography>
            
            </AccordionBody>
        </Accordion>
        <h1 className='text-2xl mt-5'>How to use</h1>
        <p className='text-black'><b className='text-red-700'>Important: </b>Mind your sorroundings when using your phone while walking!</p>
        <Accordion open={open === 2}>
            <AccordionHeader onClick={()=>handleOpen(2)}>Story Mode</AccordionHeader>
            <AccordionBody className="text-black text-lg">
                <Typography className="text-black text-lg">
                In this mode you can follow a story in a historical setting through the eyes of a character in history. As you follow the story, it is important that you complete the different story locations in order. Visiting one point of interest, allows you to see the next point and walk to it, learning the next bit of story through it. If you get lost, you can use the “I'm Lost” button for help to see the route to the next point of interest.
                </Typography>
            </AccordionBody>
        </Accordion>
        <Accordion open={open === 3}>
            <AccordionHeader onClick={()=>handleOpen(3)}>Exploration Mode</AccordionHeader>
            <AccordionBody className="text-black text-lg">
                <Typography className="text-black text-lg">
                In this mode you can simply click at the different points of interest, activating them through it. While in Story Mode you get little story tidbits from a story set in the time, the Exploration Mode is based on factual information about the historical monuments. 
                </Typography>
            </AccordionBody>
        </Accordion>
        
        <h1 className='text-2xl mt-5'>Scenarios</h1>
        <Accordion open={open === 4}>
            <AccordionHeader onClick={()=>handleOpen(4)}>Medieval Münster</AccordionHeader>
            <AccordionBody className="text-black text-lg">
                <Typography className="text-black text-lg">
                The city of Münster was founded in the year 793 after Charlemagne send out missionaries to the Münsterland, which went ahead to erect the first cathedral. The city grew around the cathedral over the next centuries.
                </Typography><br/>
                <Typography className="text-black text-lg">
                In modern days, we often imagine the Middle Ages as time of little change, but this couldn’t be less true in terms of the ways the city developed. While we do now have exact numbers of the development of the population of Münster, we knew that it grew from a mostly monetary settlement to a thriving city over the course of the Middle Ages.
                </Typography><br/>
                <Typography className="text-black text-lg">
                In the late medieval period Münster was especially known for the pigs being kept in and around the city. This went so far that the city was commonly known as “the city of pigs” in the surrounding lands. Still, pigs made for good animals to be kept within the city walls, as they were able to clean up garbage from the streets.
                </Typography><br/>
                <Typography className="text-black text-lg">
                Our story is set during the 1530s, which was an especially turbulent time for Münster, as it was the time that an Anabaptist sect took over the city within the “Münster rebellion”. The sect in question was an apocalyptic sect, believing that the end of the world was neigh. They tried to found a democratic, proto-socialist state within the Münsterland. However, their rebellion failed, as just one year after they took over, the city was retaken by Catholic forces – with the Anabaptists subsequently meeting with a rather grim end. 
                </Typography><br/>
                <Typography className="text-black text-lg">
                However, this rebellion left its scars on the city for at least ten years to come. 
                </Typography><br/><br/>
                <Typography className="text-black text-lg">
                <b>Did you know?</b> The exact timeframe of the medieval period is hard to define. While people tend to agree that the Middle Ages started around 500, the event to end the medieval period is less agreed on. Some people say the invention of the printing press in 1440 marked the end of the Middle Ages, while others argue they ended with the Protestant Reformation in 1517.  
                </Typography>
            </AccordionBody>
        </Accordion>
        <Accordion open={open === 5}>
            <AccordionHeader onClick={()=>handleOpen(5)}>Münster Harbor</AccordionHeader>
            <AccordionBody className="text-black text-lg">
                <Typography className="text-black text-lg">
                Münster as a city is land locked – or had been, until the Rhein-Ems-Channel was dug during the 1890s, allowing the city finally access to the waterways. The channel was officially opened in 1899. Knowing they would finally have access to a channel, Münster prepared, digging a harbor basin of their own, connecting it to the city. As such the harbor of Münster was officially opened in 1899 as well.
                </Typography><br/>
                <Typography className="text-black text-lg">
                While today the harbor is mostly a tourist hotspot with a variety of museums, theatres, and restaurants nearby, it was an active industrial harbor for a good hundred years. 
                </Typography><br/>
                <Typography className="text-black text-lg">
                Our story is set in the 1950s, in post-war Münster. During this time a lot of the buildings and mechanics created for the original opening of the harbor were still in use, while some of the theatres we have to this day were slowly created around it.
                </Typography><br/>
            </AccordionBody>
        </Accordion>

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