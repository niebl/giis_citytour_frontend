import { useEffect, useState } from "react"
import { backendURL } from "../../atoms";
import { useRecoilValue } from "recoil";

const getExternalData = async (urlString) => {
    try {
        if (urlString == undefined){urlString =  ''}

        const res = await fetch(
            urlString,
        );
        const data = await res.json();
        return data;
    } catch (error) {

        //TODO: error handling down the line
        return error
    }
}

export default function useExternalData(story_id=1){
    const [data, setData] = useState(null);
    let url = useRecoilValue(backendURL)

    const urlString = url+"/story/"+story_id

    useEffect(() => {
        getExternalData(urlString).then(e => setData(e))
    },[])

    useEffect(() => {
        if (!data) {
            return
        }

    })

    console.log(data)
    return data
}
