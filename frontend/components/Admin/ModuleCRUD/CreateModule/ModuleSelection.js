import React from "react";
import { IoMdClose } from "react-icons/io";


// const ModuleSelection = ({ selectedItem, handleRemoveItem }) => {
//     return (
//         <div className="mt-10 w-full max-w-3xl p-2 bg-white border border-indigo-100 rounded-lg">
//             {selectedItem ? (
//                 <div className="m-2 p-4 rounded-lg bg-gray-50 flex items-center justify-between group transition-colors duration-200">
//                     {/*<span className="text-lg font-semibold text-gray-800 capitalize">{selectedItem.title}</span>*/}
//                     <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 capitalize">{selectedItem.name}</span>
//                     <button
//                         onClick={handleRemoveItem}
//                         className="text-gray-400 hover:text-red-500 transition-colors duration-200"
//                         aria-label="Remove module"
//                     >
//                         <IoMdClose size={20} />
//                     </button>
//                 </div>
//             ) : null}
//         </div>
//     );
// };
//
// export default ModuleSelection;


const ModuleSelection = ({ selectedItem, handleRemoveItem, isValidationTriggered, shakeModuleSelection }) => {
    const isModuleInvalid = isValidationTriggered && !selectedItem;

    return (
        <div
            className={`mt-10 w-full max-w-3xl p-2 ${
                isModuleInvalid ? "bg-red-50 border border-red-50" : "bg-white"
            } border border-indigo-100 ${
                shakeModuleSelection ? "animate-shake" : ""
            }`}
        >
            {selectedItem ? (
                <div className="m-2 p-4 rounded-lg bg-gray-50 flex items-center justify-between group transition-colors duration-200">
                    <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 capitalize">
                        {selectedItem.name}
                    </span>
                    <button
                        onClick={handleRemoveItem}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label="Remove module"
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>
            ) : null}
        </div>
    );
};



export default ModuleSelection;