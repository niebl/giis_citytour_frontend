import { useEffect, useState } from "react"
import { backendURL } from "../../atoms";
import { useRecoilValue } from "recoil";

const getExternalData = async (urlString) => {
    try {
        if (urlString == undefined){urlString =  ''}
        const res = await fetch(
            urlString,
        );
        const data = await res;
        return data.json();
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
    },[story_id])

    useEffect(() => {
        if (!data) {
            return
        }
    })

    return data
}
