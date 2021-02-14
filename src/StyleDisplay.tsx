import React, { useEffect } from 'react';
import { db } from './App';
import { ArtworkCollection } from './collections';

export const StyleDisplay: React.FC=(artStyle)=>{
    const [pictures, setPicturesUrls]= React.useState([""]);
    const fetchImages =  ()=>{
        db.collection(ArtworkCollection).get().then(data =>{
            setPicturesUrls(data.docs.map(doc=>{ 
                return doc.data().artUrl
            }));
        });
        
        console.log(pictures);
    }
    useEffect(fetchImages,[])
    return(<div>
        <ul>{pictures.map(imageurl =>{
            return(
            <li key={imageurl}><img src={imageurl}/></li>)
        })}</ul>
    </div>);
}