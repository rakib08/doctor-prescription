import { FiFileText, FiSettings } from "react-icons/fi";
import { useState } from "react";
import DoctorSettingsModal from "./DoctorSettingsModal";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-56 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-6">
          Prescription Tool
        </h2>

        <nav className="space-y-2">
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-blue-600 text-white">
            <FiFileText />
            New Prescription
          </button>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <FiSettings />
            Settings
          </button>
        </nav>
      </div>

      {open && <DoctorSettingsModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default Sidebar;