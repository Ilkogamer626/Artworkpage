import firebase from "firebase/app";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "./App";
import { ArtworkCollection, UsersCollection } from "./collections";
import { Login } from "./Login";
import { ArtStyle, Artwork, DatabaseUSER } from "./Models";
import styles from "./csss/Upload.module.css";

export const Upload: React.FC = () => {
  const [artStyle, setArtStyle] = React.useState<ArtStyle>("art1");
  const [artName, setArtName] = React.useState("");
  const [artDescription, setArtDescription] = React.useState("");
  const [afterUpload, setAfterUpload] = React.useState("");
  const [IsUserLogged, setIsUserLogged] = React.useState(false);
  const [databaseUser, setDatabaseUser] = React.useState<
    DatabaseUSER | undefined
  >();
  const [user, setUser] = React.useState<firebase.User | null>(null);

  const input = useRef<HTMLInputElement>(null);
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsUserLogged(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const files = input.current?.files;
    if (!files) return;
    if (files.length <= 0) return;
    const sotrageRef = storage.ref();
    const fileRef = sotrageRef.child(files[0].name);
    await fileRef.put(files[0]);
    const fileUrl = await fileRef.getDownloadURL();
    const UploadData: Artwork = {
      artUrl: fileUrl,
      artStyle: artStyle,
      artName,
      artDescription,
      artDate: firebase.firestore.Timestamp.now(),
    };

    db.collection(ArtworkCollection)
      .doc()
      .set(UploadData)
      .then(() => {
        setAfterUpload("upload succesful");
        setArtDescription("");
        setArtName("");
        setArtStyle("art1");
      });
  };

  firebase.auth().onAuthStateChanged((u) => {
    if (u) {
      setUser(u);
      setIsUserLogged(true);
    }
  });
  let DatabaseUser: DatabaseUSER | undefined;
  const DoDatabaseStuff = async (): Promise<void> => {
    if (!user) return;
    const querySnapshot = await db
      .collection(UsersCollection)
      .where("uid", "==", user.uid)
      .get();
    querySnapshot.forEach((doc) => setDatabaseUser(doc.data() as DatabaseUSER));
  };
  useEffect(() => {
    DoDatabaseStuff();
  }, [user]);
  if (!IsUserLogged) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  if (!databaseUser?.isAdmin) {
    return <div> Sorry you are not an admin</div>;
  }

  return (
    <div className={styles.containerDiv}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input ref={input} type="file" />
        <input
          type="text"
          onChange={(e) => {
            setArtName(e.target.value);
            setAfterUpload("");
          }}
          placeholder="Name"
        />
        <input
          type="text"
          onChange={(e) => {
            setArtDescription(e.target.value);
            setAfterUpload("");
          }}
          placeholder="Description"
        />
        <select
          value={artStyle}
          onChange={(e) => {
            setArtStyle(e.target.value as ArtStyle);
            setAfterUpload("");
          }}
        >
          <option>art1</option>
          <option>art2</option>
          <option>art3</option>
        </select>
        <button className={styles.submitButton}>Submit</button>
        <p className={styles.afterUploadparagraph}>{afterUpload}</p>
        <div className={styles.linkToHome}>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </form>
    </div>
  );
};
