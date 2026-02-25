import { forwardRef } from "react";
import type { Prescription } from "../../types/prescription";

interface Props {
  prescription: Prescription;
}

const PrescriptionPrint = forwardRef<HTMLDivElement, Props>(
  ({ prescription }, ref) => {
    const today = new Date(prescription.createdAt).toLocaleDateString();

    return (
      <div
        ref={ref}
        className="w-[794px] min-h-[1123px] bg-white text-black p-10 text-sm"
      >
        {/* HEADER */}
        <div className="border-b-2 border-gray-400 pb-4 mb-6">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl font-bold">
                {prescription.doctorInfo.name}
              </h1>
              <p>{prescription.doctorInfo.degree}</p>
              <p>{prescription.doctorInfo.clinicName}</p>
            </div>

            <div className="text-right">
              <p><strong>Date:</strong> {today}</p>
            </div>
          </div>
        </div>

        {/* PATIENT ROW */}
        <div className="border-b border-gray-400 pb-3 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <p><strong>Name:</strong> {prescription.patientInfo.name}</p>
            <p><strong>Age:</strong> {prescription.patientInfo.age}</p>
            <p><strong>Gender:</strong> {prescription.patientInfo.gender}</p>
          </div>
          <div className="mt-2">
            <p><strong>Address:</strong> {prescription.patientInfo.address}</p>
          </div>
        </div>

        {/* BODY 2 COLUMN */}
        <div className="grid grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div>
            <h2 className="font-semibold mb-2 border-b pb-1">
              Symptoms
            </h2>
            <p className="whitespace-pre-wrap mb-6">
              {prescription.symptoms}
            </p>

            <h2 className="font-semibold mb-2 border-b pb-1">
              Diagnosis
            </h2>
            <p className="whitespace-pre-wrap">
              {prescription.diagnosis}
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <h2 className="font-semibold mb-2 border-b pb-1">
              Medicines
            </h2>

            <ul className="space-y-3">
              {prescription.medicines.map((med, index) => (
                <li key={med.id}>
                  <strong>{index + 1}. {med.name}</strong>
                  <div>
                    {med.dose} mg — {med.frequency} — {med.duration} days
                  </div>
                  {med.notes && (
                    <div className="italic text-gray-600">
                      {med.notes}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ADVICE */}
        {prescription.advice && (
          <div className="mt-8">
            <h2 className="font-semibold border-b pb-1 mb-2">
              Advice
            </h2>
            <p className="whitespace-pre-wrap">
              {prescription.advice}
            </p>
          </div>
        )}
      </div>
    );
  }
);

export default PrescriptionPrint;