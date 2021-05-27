import firebase from 'firebase/app';

export interface Artwork{
    artName:string;
    artUrl?:string;
    artStyle:ArtStyle;
    artDate:firebase.firestore.Timestamp;
    artDescription?:string;
}
export type ArtStyle = "art1"|"art2"|"art3";
export interface DatabaseUSER {
    isAdmin:boolean;
    uid:string;
}
