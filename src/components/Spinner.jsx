// import React from "react";
// import { twMerge } from "tailwind-merge";

import { twMerge } from "tailwind-merge";

// const Spinner = ({ initial }) => {
//   return (
//     <div
//       className={twMerge(
//         `w-full h-[150px] relative flex items-center justify-center ${
//           initial ? "h-[700px]" : ""
//         }`
//       )}
//     >
//       <svg
//         className="animate-[rotate_2s_linear_infinite] z-[2] w-[50px] h-[50px]"
//         viewBox="0 0 50 50"
//       >
//         <circle
//           className="stroke-[hsl(210,70,75)] stroke-linecap-round animate-[dash_1.5s_ease-in-out_infinite]"
//           cx="25"
//           cy="25"
//           r="20"
//           fill="none"
//           strokeWidth="5"
//         ></circle>
//       </svg>
//     </div>
//   );
// };

// export default Spinner;

// const Spinner = ({ initial }) => {
//   return (
//     <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
//       <svg
//         className="spinner"
//         viewBox="0 0 50 50"
//       >
//         <circle
//           className="path"
//           cx="25"
//           cy="25"
//           r="20"
//           fill="none"
//           strokeWidth="5"
//         ></circle>
//       </svg>
//     </div>
//   );
// };

// export default Spinner;

const Spinner = ({ initial }) => {
  return (
    <div
      className={twMerge(
        `w-full h-[150px] relative flex items-center justify-center ${
          initial ? "h-[500px]" : ""
        }`
      )}
    >
      <svg
        className="w-12 h-12 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          className="opacity-25"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          className="stroke-sky-300"
          style={{ animation: "dash 1.5s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
};

export default Spinner;
