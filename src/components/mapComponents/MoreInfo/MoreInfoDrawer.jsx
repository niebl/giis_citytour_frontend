import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";

import { useRecoilValue } from "recoil";
import { mapViewState } from "../../../atoms";

const MoreInfoDrawer = ({ selectedFeature, setSelectedFeature }) => {
    const mapView = useRecoilValue(mapViewState)

    const [ readMore, setReadMore] = useState(false)
    const clickReadMore = () => setReadMore(true)

    const [ open, setOpen ] = useState(false)
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => {
        setSelectedFeature(null)
        setOpen(false)
    };

    useEffect(() => {
        if (selectedFeature) {
            if(!open){
                openDrawer()
            }
        }
    }, [selectedFeature])

  return (
    <div>
        <Drawer 
            open={open} 
            onClose={closeDrawer} 
            className="p-4 overflow-auto"
            placement="right"
            overlay={false}
        >
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
            <Card className="mt-6 mb-20 w-auto overflow-auto">
                <CardHeader color="blue-gray" floated={false} className="relative h-fit">
                    <img
                    src={selectedFeature.image_url}
                    alt="museum-image"
                    className="object-fill"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {selectedFeature.name}
                    </Typography>

                    { mapView == "cruising" &&
                    <>
                    <Typography>
                        {selectedFeature.short_desc}
                    </Typography>

                    { readMore &&
                        <>
                        <hr className="mt-2 mb-2"/>
                        <Typography>
                            {selectedFeature.long_desc}
                        </Typography>
                        </>
                    }
                    </>
                    }

                    { mapView == "story" &&
                    <>
                    <Typography>
                        {selectedFeature.long_story}
                    </Typography>

                    <hr className="mt-2 mb-2"/>
                    <Typography>
                        {selectedFeature.task}
                    </Typography>
                    </>
                    }
                    
                </CardBody>

                { (mapView == "cruising" && !readMore) &&
                <CardFooter className="pt-0">
                    <Button onClick={clickReadMore}>Read More</Button>
                </CardFooter>
                }
        </Card>
      </Drawer>
    </div>
  )
}

MoreInfoDrawer.propTypes = {
    selectedFeature: PropTypes.shape({
        name: PropTypes.string,
        long_desc: PropTypes.string,
    }),
};


export default MoreInfoDrawer