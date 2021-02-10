import React from 'react';
import { storage } from './App';

export const Upload:React.FC = ()=>{

    const onChange = (e:any)=>{
        const file = e.target.files[0];
        const sotrageRef = storage.ref();
        const fileRef = sotrageRef.child(file.name);
        fileRef.put(file).then(()=>{console.log("file uploaded")})

    }
    
    return(
    <div>
        <form>
            <input type="file" onChange={onChange}/>
    
        </form>
    </div>
    )
}