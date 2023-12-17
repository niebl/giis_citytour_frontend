import React, { useState } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";

const MoreInfoDrawer = () => {
    const [ open, setOpen ] = useState(false)
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
  return (
    <div>
        <Drawer open={open} onClose={closeDrawer} className="p-4">
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </IconButton>
            <Typography>More Information</Typography>
      </Drawer>
    </div>
  )
}

export default MoreInfoDrawer