import React, { useState } from "react";

export default function Setting() {
  const [heading, setHeading] = useState("My Blog Website");
  const [description, setDescription] = useState("A place to share ideas");
  const [logo, setLogo] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const updateHeading = () => {
    const newHeading = prompt("Enter new site heading:", heading);
    if (newHeading) setHeading(newHeading);
  };

  const updateDescription = () => {
    const newDesc = prompt("Enter new site description:", description);
    if (newDesc) setDescription(newDesc);
  };

  const updateLogo = () => {
    const newLogo = prompt("Enter logo image URL:", logo);
    if (newLogo) setLogo(newLogo);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const resetSettings = () => {
    if (window.confirm("Reset all settings to default?")) {
      setHeading("My Blog Website");
      setDescription("A place to share ideas");
      setLogo("");
      setDarkMode(false);
    }
  };

  return (
    <div className={`p-4 sm:p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <h1 className="text-xl font-bold mb-6">Settings</h1>

      {/* Site Heading */}
      <div className="mb-4">
        <p className="mb-2 font-medium">Current Heading: {heading}</p>
        <button
          onClick={updateHeading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Change Heading
        </button>
      </div>

      {/* Site Description */}
      <div className="mb-4">
        <p className="mb-2 font-medium">Description: {description}</p>
        <button
          onClick={updateDescription}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Change Description
        </button>
      </div>

      {/* Logo */}
      <div className="mb-4">
        <p className="mb-2 font-medium">Logo:</p>
        {logo ? (
          <img src={logo} alt="Site Logo" className="h-16 mb-2 rounded border" />
        ) : (
          <p className="text-gray-500 mb-2">No logo set</p>
        )}
        <button
          onClick={updateLogo}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          {logo ? "Change Logo" : "Set Logo"}
        </button>
      </div>

      {/* Dark Mode */}
      <div className="mb-4">
        <p className="mb-2 font-medium">Theme: {darkMode ? "Dark" : "Light"}</p>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Toggle {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Reset Button */}
      <div>
        <button
          onClick={resetSettings}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
