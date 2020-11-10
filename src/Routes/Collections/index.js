import React, { useState, useEffect } from "react";
import {collectionsApi} from "../../api";
export default function(props){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const getCollections = async () =>{
        try {
            const parseId = props.match.params.id;
            const { data:collection } = await collectionsApi.collections(parseId);
            setResult(collection);
        } catch {
                setError("Can't find anything.");
        } finally {
                setLoading(false);
        }
    }
    useEffect(()=>{getCollections()},[]);

    return(
        "sdg"
    )
    
}