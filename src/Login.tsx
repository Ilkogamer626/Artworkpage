import React from "react";
import { auth, db, provider } from "./App";
import { UsersCollection } from "./collections";

export const Login: React.FC = (): JSX.Element => {
  return (
    <div>
      <button
        onClick={() =>
          auth
            .signInWithPopup(provider)
            .then(async (result: any) => {
              /** @type {firebase.auth.OAuthCredential} */
              let credential = result.credential;

              // This gives you a Google Access Token. You can use it to access the Google API.
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              console.log(user);
              let UserFromFirestoreDatabase = await db
                .collection(UsersCollection)
                .doc(user.uid)
                .get();
              console.log(UserFromFirestoreDatabase);
              if (!UserFromFirestoreDatabase.exists) {
                db.collection(UsersCollection).doc(user.uid).set({
                  email: user.email,
                  isAdmin: false,
                });
              }

              // ...
            })
            .catch((error: any) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              const credential = error.credential;
              // ...
            })
        }
      >
        Login with Google
      </button>
    </div>
  );
};
