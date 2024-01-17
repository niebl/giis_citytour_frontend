import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FaBars } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState  } from "recoil";

import { mapViewState, selectedStoryState } from "../../atoms";
 
function NavList() {
  const mapView = useRecoilValue(mapViewState);
  const setMapView = useSetRecoilState(mapViewState);
  const story_id = useRecoilValue(selectedStoryState);
  const setStoryId = useSetRecoilState(selectedStoryState);

  function toggleMapView(){
    if (mapView != 'story'){
      setMapView('story')
    }
    else {
      setMapView('cruising')
    }
  }

  function toggleSelectedStory(){
    if (story_id == 1){
      setStoryId(2)
    }
    else {
      setStoryId(1)
    }
  }

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="paragraph"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center transition-colors">
          About
        </a>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        className="p-1 font-medium"
      >
        <button 
          className="bg-[#964b00] hover:bg-[#7b3f00] text-white font-bold py-2 px-4 rounded m-1"
          onClick={()=>{toggleMapView()}}
          >
          { mapView == 'story' &&
            "to Exploration-mode"
          }
          { mapView == 'cruising' &&
            "to Story-mode"
          }
        </button>
      </Typography>
      <Typography         
        as="li"
        variant="paragraph"
        className="p-1 font-medium"
      >
        <button 
          className="bg-[#964b00] hover:bg-[#7b3f00] text-white font-bold py-2 px-4 rounded m-1"
          onClick={()=>{toggleSelectedStory()}}
          >
          { story_id == 1 &&
            "to Port-Story"
          }
          { story_id == 2 &&
            "to Inner-City-Story"
          }
        </button>
      </Typography>
    </ul>
  );
}
 
export function TopNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar 
        // color="blue-gray"
        className="sticky top-0 z-10 h-max max-w-full rounded-none lg:px-8 lg:py-1 mx-auto bg-gradient-to-r from-brown-500 to-brown-800 px-4 py-3"
    >
      <div className="flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Münster CityTour
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <IoCloseSharp className="h-6 w-6" strokeWidth={2} />
          ) : (
            <FaBars className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}