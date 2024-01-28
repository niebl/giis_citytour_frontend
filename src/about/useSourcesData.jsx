import { useEffect, useState } from "react"
import { backendURL } from "../atoms";
import { useRecoilValue } from "recoil";

const getSourceData = async (urlString) => {
    try {
        if (urlString == undefined){urlString =  ''}
        const res = await fetch(
            urlString,
        );
        const data = await res;
        return data.json();
    } catch (error) {
        //TODO: error handling down the line
        return
    }
}

export default function useSourcesData(site_id=undefined){
    const [data, setData] = useState(null);
    let url = useRecoilValue(backendURL)

    let urlString = url+"/sources"
    if (site_id != undefined){
        urlString = url+"/sources/"+site_id
    }

    useEffect(() => {
        getSourceData(urlString).then(e => setData(e))
    },[url])

    useEffect(() => {
        if (!data) {
            return
        }
    })

    return data
}
