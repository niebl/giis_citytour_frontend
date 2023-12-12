import React from "react";
import { useState  } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const InfoModal = () => {
    const [ open, setOpen ] = useState(true);

    const handleOpen = () => setOpen(!open);

  return (
    <>
        <Dialog
            open={open}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader>Welcome to Münster CityTour</DialogHeader>
            <DialogBody>
                Toggle between Story mode and Cruising mode to learn about the historical sites. 
                Please allow location access to use story mode.
            </DialogBody>
            <DialogFooter>
                <Button variant="gradient" color="blue" onClick={handleOpen}>
                    <span>Okay</span>
                </Button>
            </DialogFooter>
        </Dialog>
    </>
  )
}

export default InfoModal