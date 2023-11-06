// import { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState({});

//   const SignUp = (email, password) => {
//     createUserWithEmailAndPassword(auth, email, password);
//   };

//   const SignIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const SignOut = () => {
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const authChange = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => {
//       authChange();
//     };
//   });

//   return (
//     <AuthContext.Provider value={{ SignUp, SignIn, SignOut, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
