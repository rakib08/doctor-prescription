import { useDoctor } from "../../context/DoctorContext";

const DoctorHeader = () => {
  const { doctorInfo } = useDoctor();

  const today = new Date().toLocaleDateString();

  return (
    <div className="mb-6 border-b pb-4">
      <h1 className="text-xl font-semibold">
        {doctorInfo.name || "Doctor Name"}
      </h1>
      <p className="text-sm text-gray-600">
        {doctorInfo.degree}
      </p>
      <p className="text-sm text-gray-600">
        {doctorInfo.clinicName}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Date: {today}
      </p>
    </div>
  );
};

export default DoctorHeader;