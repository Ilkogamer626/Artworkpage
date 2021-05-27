import React from "react";
import { db } from "./App";
import { Link } from "react-router-dom";
import { ArtworkCollection } from "./collections";
import { Artwork } from "./Models";
import { Navbar } from "./Navbar";
import { SingleImageDisplay } from "./SingleImageDisplay";
import styles from "./csss/Homepage.module.css";

export const Homepage: React.FC = () => {
  const [pictures, setPicturesUrls] = React.useState<Artwork[]>([]);
  const [showNavbar, setShowNavbar] = React.useState(false);
  const [showBigImage, setShowBigImage] = React.useState(false);
  const fetchImages = () => {
    db.collection(ArtworkCollection)
      .get()
      .then((data) => {
        setPicturesUrls(
          data.docs.map((doc) => {
            return doc.data() as Artwork;
          })
        );
      });
  };
  React.useEffect(fetchImages, []);
  return (
    <div>
      <div className={styles.logo}>
        <img src="/podpisken.png" alt="logo" />
      </div>
      <Navbar>
        <Link className={styles.link} to="/art1">
          <p className={styles.linkp}>art1</p>
        </Link>
        <Link className={styles.link} to="/art2">
          <p className={styles.linkp}>art2</p>
        </Link>
        <Link className={styles.link} to="/art3">
          <p className={styles.linkp}>art3</p>
        </Link>
      </Navbar>
      <div>
        <ul>
          {pictures.map((image) => {
            return (
              <li key={image.artUrl} className={styles.listElement}>
                <SingleImageDisplay
                  artDate={image.artDate}
                  artUrl={image.artUrl}
                  artName={image.artName}
                  artStyle={image.artStyle}
                  artDescription={image.artDescription}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.footer}>
        <Link to="/upload">©</Link> Toko 2021
      </div>
    </div>
  );
};
