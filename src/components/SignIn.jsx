// import React, { useState, useEffect } from "react";
// import ContentWrapper from "./ContentWrapper";
// import { Link, useNavigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import Img from "./LazyLoadImage";
// import useFetch from "../hooks/useFetch";

// const SignIn = () => {
//   const { user, SignIn } = UserAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [bg, setBg] = useState("");

//   const navigate = useNavigate();

//   const { url } = useSelector((store) => store.home);
//   const { data, loading } = useFetch("/movie/upcoming");

//   useEffect(() => {
//     const bgURL =
//       url?.backdrop +
//       data?.results?.[Math.floor(Math.random() * data?.results?.length)]
//         ?.backdrop_path;
//     setBg(bgURL);
//   }, [data]);

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await SignIn(email, password);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       setError(err.message);
//     }
//   };
//   return (
//     <div className="w-full h-[450px] md:h-[700px] bg-black_1 flex items-center relative">
//       {!loading && bg && (
//         <div className="w-full h-full absolute top-0 left-0 opacity-30 overflow-hidden">
//           <Img
//             className={"w-full h-full object-cover object-center"}
//             src={bg}
//           />
//         </div>
//       )}
//       <ContentWrapper>
//         <div className="fixed w-full top-0 left-0 py-24">
//           <div className="max-w-[450px] h-fit mx-auto bg-black/75 text-white">
//             <div className="max-w-[320px] mx-auto py-16">
//               <h1 className="text-3xl font-bold">Sign In</h1>
//               {error ? <p className="p-3 bg-red-400 my-2">{error}</p> : null}
//               <form
//                 onSubmit={handleSignIn}
//                 className="w-full flex flex-col py-2"
//               >
//                 <input
//                   className="p-3 my-2 bg-gray-700 rounded"
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                   className="p-3 my-2 bg-gray-700 rounded"
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button className="bg-app-theme py-3 my-6 rounded font-bold">
//                   Sign Up
//                 </button>
//                 <div className="flex justify-between items-center text-sm text-gray-600">
//                   <p>
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                     />
//                     Remember me
//                   </p>
//                   <p>Need Help?</p>
//                 </div>
//                 <p className="py-8">
//                   <span className="text-gray-600">New to Cinetube?</span>{" "}
//                   <Link to="/signup">Sign Up</Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// };

// export default SignIn;
