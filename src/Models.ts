import firebase from 'firebase/app';

export interface Artwork{
    artName:string;
    artUrl?:string;
    artStyle:string;
    artDate:firebase.firestore.Timestamp;
    artDescription?:string;
}
export interface DatabaseUSER {
    isAdmin:boolean;
    email:string;
}
