import React, { useState } from "react";
import { useCategory } from "../../context/CategoryDataContext";
import { FcGallery } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useNotifications } from "../../context/NotificationContext";

export default function Categories() {
  const { addNotification } = useNotifications();
  const {
    categories,
    insertCategory,
    fetchAllCategoriesById,
    updateCategories,
    deleteCategories,
  } = useCategory();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // const addCategory = () => {
  //   const name = prompt("Enter category name:");
  //   const description = prompt("Enter category description:");
  //   if (name && description ) {
  //     const newCategory = { name, description };
  //     insertCategory(newCategory);
  //   }
  // };

  const addCategory = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Category",
      html: `
      <input id="swal-input1" class="swal2-input" placeholder="Category Name">
      <input id="swal-input2" class="swal2-input" placeholder="Category Description">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add",
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value.trim();
        const description = document.getElementById("swal-input2").value.trim();
        if (!name || !description) {
          Swal.showValidationMessage("Please fill out both fields");
          return false;
        }
        return { name, description };
      },
    });

    if (formValues) {
      insertCategory(formValues);
      Swal.fire("Added!", "Category created successfully.", "success");
      //addNotification("👤 A new category has added!", "info");
    }
  };

  // const deleteCategory = (index) => {
  //   if (window.confirm("Delete this category?")) {
  //     deleteCategories(index);
  //   }
  // };

  const deleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategories(id);
        Swal.fire("Deleted!", "The category has been removed.", "success");
      }
    });
  };

  // const editCategory = async (id) => {
  //   const filteredCategory = await fetchAllCategoriesById(id);
  //   if (!filteredCategory) return;
  //   const newName = prompt("Edit category name:", filteredCategory.name);
  //   const newDescription = prompt(
  //     "Edit category description:",
  //     filteredCategory.description
  //   );
  //   if (newName && newDescription && newCurrentValue) {
  //     const update = {
  //       name: newName,
  //       description: newDescription,
  //     };
  //     updateCategories(id, update);
  //   }
  // };

  const editCategory = async (id) => {
    const filteredCategory = await fetchAllCategoriesById(id);
    if (!filteredCategory) return;

    const { value: formValues } = await Swal.fire({
      title: "Edit Category",
      html: `
      <input id="swal-input1" class="swal2-input" value="${filteredCategory.name}" placeholder="Category Name">
      <input id="swal-input2" class="swal2-input" value="${filteredCategory.description}" placeholder="Category Description">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value.trim();
        const description = document.getElementById("swal-input2").value.trim();
        if (!name || !description) {
          Swal.showValidationMessage("Please fill out both fields");
          return false;
        }
        return { name, description };
      },
    });

    if (formValues) {
      updateCategories(id, formValues);
      Swal.fire("Updated!", "Category updated successfully.", "success");
    }
  };

  const addsubCategory = (id) => {
    navigate(`/admin/subcategories/${id}`);
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <button
          onClick={addCategory}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Add Category
        </button>
      </div>

      {/* Search & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />
        <p className="text-gray-600">Total Categories: {categories.length}</p>
      </div>

      {/* Category List */}
      {filteredCategories.length === 0 ? (
        <p className="text-gray-500">No categories found</p>
      ) : (
        <ul className="space-y-3">
          {filteredCategories.map((cat, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border p-3 rounded bg-white shadow"
            >
              <span className="font-medium">{cat.name}</span>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => addsubCategory(cat._id)}
                  className="px-3 py-1 bg-yellow-800 text-white rounded hover:bg-yellow-700"
                >
                  <FcGallery className=" inline-block h-6 w-6" /> Create Sub
                  Category
                </button>
                <button
                  onClick={() => editCategory(cat._id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteCategory(cat._id)}
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
