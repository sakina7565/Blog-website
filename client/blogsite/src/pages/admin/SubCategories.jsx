// import React, { useEffect } from "react";
// import { useCategory, useSubCategory } from "../../context/CategoryDataContext";
// import { useParams } from "react-router-dom";

// export default function SubCategories() {
//   const { categories } = useCategory();
//   const { id } = useParams();
//   const {
//     subCategories,
//     getAllSubcategoryData,
//     insertSubCategory,
//     updateSubCategory,
//     deleteSubCategory,
//   } = useSubCategory();

//   // Find parent category
//   const cat = categories.find((c) => c._id === id);

//   // Always run hooks first
//   useEffect(() => {
//     if (id) {
//       getAllSubcategoryData(id);
//     }
//   }, [id]);

//   // If no category found
//   if (!cat) {
//     return <div className="p-4">❌ No category found with ID: {id}</div>;
//   }

//   // Add a subcategory
//   const addSubCategory = () => {
//     const name = prompt("Enter subcategory name:");
//     const description = prompt("Enter subcategory description:");
//     if (name && description) {
//       const newSub = { name, description, category: cat._id };
//       insertSubCategory(newSub);
//     }
//   };

//   // Edit a subcategory
//   const editSubCategory = (subId) => {
//     const sub = subCategories.find((s) => s._id === subId);
//     if (!sub) return;
//     const newName = prompt("Edit subcategory name:", sub.name);
//     const newdescription = prompt("Edit subcategory name:", sub.description);
//     if (newName && newdescription) {
//       let updated = {
//         name: newName,
//         description: newdescription,
//       };

//       updateSubCategory(updated, subId);
//     }
//   };

//   // Delete a subcategory
//   const deleteSubCategories = (subId) => {
//     if (window.confirm("Delete this subcategory?")) {
//       const sub = subCategories.find((s) => s._id === subId);
//       if (!sub) return;
//       deleteSubCategory(subId);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6">
//       {/* Parent category info */}
//       <h1 className="text-2xl font-bold mb-2">{cat.name}</h1>
//       <p className="text-gray-600 mb-6">{cat.description}</p>

//       {/* Subcategory section */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Subcategories</h2>
//         <button
//           onClick={addSubCategory}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           ➕ Add Subcategory
//         </button>
//       </div>

//       {/* Subcategory list */}
//       {subCategories.length === 0 ? (
//         <p className="text-gray-500">No subcategories yet.</p>
//       ) : (
//         <ul className="space-y-3">
//           {subCategories.map((sub) => (
//             <li
//               key={sub._id}
//               className="flex justify-between items-center border p-3 rounded bg-white shadow"
//             >
//               <span>{sub.name}</span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => editSubCategory(sub._id)}
//                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => deleteSubCategories(sub._id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   🗑 Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useCategory, useSubCategory } from "../../context/CategoryDataContext";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function SubCategories() {
  const { categories } = useCategory();
  const { id } = useParams();
  const {
    subCategories,
    getAllSubcategoryData,
    insertSubCategory,
    updateSubCategory,
    deleteSubCategory,
  } = useSubCategory();

  const cat = categories.find((c) => c._id === id);

  useEffect(() => {
    if (id) getAllSubcategoryData(id);
  }, [id]);

  if (!cat) {
    return <div className="p-4">❌ No category found with ID: {id}</div>;
  }

  // ✅ Add Subcategory
  const addSubCategory = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add Subcategory",
      html: `
        <input id="name" class="swal2-input" placeholder="Subcategory name" />
        <input id="desc" class="swal2-input" placeholder="Subcategory description" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add",
      background: "#1e293b",
      color: "#fff",
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const description = document.getElementById("desc").value;
        if (!name || !description) {
          Swal.showValidationMessage("Both fields are required!");
        }
        return { name, description };
      },
    });

    if (formValues) {
      const newSub = { ...formValues, category: cat._id };
      insertSubCategory(newSub);
      Swal.fire("✅ Added!", "Subcategory has been added.", "success");
    }
  };

  // ✅ Edit Subcategory
  const editSubCategory = async (subId) => {
    const sub = subCategories.find((s) => s._id === subId);
    if (!sub) return;

    const { value: formValues } = await Swal.fire({
      title: "Edit Subcategory",
      html: `
        <input id="name" class="swal2-input" value="${sub.name}" />
        <input id="desc" class="swal2-input" value="${sub.description}" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      background: "#1e293b",
      color: "#fff",
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const description = document.getElementById("desc").value;
        if (!name || !description) {
          Swal.showValidationMessage("Both fields are required!");
        }
        return { name, description };
      },
    });

    if (formValues) {
      updateSubCategory(formValues, subId);
      Swal.fire("✅ Updated!", "Subcategory has been updated.", "success");
    }
  };

  // ✅ Delete Subcategory
  const deleteSubCategories = async (subId) => {
    const sub = subCategories.find((s) => s._id === subId);
    if (!sub) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete subcategory "${sub.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      deleteSubCategory(subId);
      Swal.fire("🗑 Deleted!", "Subcategory has been deleted.", "success");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Parent category info */}
      <h1 className="text-2xl font-bold mb-2 text-white">{cat.name}</h1>
      <p className="text-gray-300 mb-6">{cat.description}</p>

      {/* Subcategory section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Subcategories</h2>
        <button
          onClick={addSubCategory}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Add Subcategory
        </button>
      </div>

      {/* Subcategory list */}
      {subCategories.length === 0 ? (
        <p className="text-gray-400">No subcategories yet.</p>
      ) : (
        <ul className="space-y-3">
          {subCategories.map((sub) => (
            <li
              key={sub._id}
              className="flex justify-between items-center border p-3 rounded bg-white shadow"
            >
              <span>{sub.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => editSubCategory(sub._id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteSubCategories(sub._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
