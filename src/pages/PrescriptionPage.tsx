import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useReactToPrint } from "react-to-print";

import Sidebar from "../components/layout/Sidebar";
import DoctorHeader from "../components/prescription/DoctorHeader";
import MedicineBuilder from "../components/prescription/MedicineBuilder";
import PrescriptionPrint from "../components/prescription/PrescriptionPrint";
import ActionBar from "../components/prescription/ActionBar";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";

import { useDoctor } from "../context/DoctorContext";
import type { Prescription } from "../types/prescription";
import { downloadPDF } from "../utils/pdfGenerator";

const PrescriptionPage = () => {
  const { doctorInfo } = useDoctor();
  const printRef = useRef<HTMLDivElement>(null);

  const [prescription, setPrescription] = useState<Prescription>({
    id: uuidv4(),
    doctorInfo,
    patientInfo: {
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
    },
    symptoms: "",
    diagnosis: "",
    medicines: [],
    advice: "",
    followUp: "",
    createdAt: new Date().toISOString(),
  });

  // Sync doctor info if updated
  useEffect(() => {
    setPrescription((prev) => ({
      ...prev,
      doctorInfo,
    }));
  }, [doctorInfo]);

  // Update patient fields
  const updatePatientField = (key: string, value: string) => {
    setPrescription((prev) => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        [key]: value,
      },
    }));
  };

  // Save draft
  const handleSaveDraft = () => {
    const drafts = JSON.parse(
      localStorage.getItem("prescriptionDrafts") || "[]"
    );

    drafts.push(prescription);

    localStorage.setItem(
      "prescriptionDrafts",
      JSON.stringify(drafts)
    );

    alert("Draft saved successfully");
  };

  // Print preview
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 space-y-6 bg-gray-50">

        {/* Doctor Header */}
        <DoctorHeader />

        {/* Patient Information */}
        <Card title="Patient Information">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Patient Name"
              value={prescription.patientInfo.name}
              onChange={(e) =>
                updatePatientField("name", e.target.value)
              }
            />

            <Input
              label="Age"
              value={prescription.patientInfo.age}
              onChange={(e) =>
                updatePatientField("age", e.target.value)
              }
            />

            <Input
              label="Gender"
              value={prescription.patientInfo.gender}
              onChange={(e) =>
                updatePatientField("gender", e.target.value)
              }
            />

            <Input
              label="Phone"
              value={prescription.patientInfo.phone}
              onChange={(e) =>
                updatePatientField("phone", e.target.value)
              }
            />
          </div>

          <div className="mt-4">
            <Input
              label="Address"
              value={prescription.patientInfo.address}
              onChange={(e) =>
                updatePatientField("address", e.target.value)
              }
            />
          </div>
        </Card>

        {/* Symptoms */}
        <Card title="Symptoms">
          <Textarea
            label="Describe Symptoms"
            value={prescription.symptoms}
            onChange={(e) =>
              setPrescription((prev) => ({
                ...prev,
                symptoms: e.target.value,
              }))
            }
          />
        </Card>

        {/* Diagnosis */}
        <Card title="Diagnosis">
          <Textarea
            label="Diagnosis Details"
            value={prescription.diagnosis}
            onChange={(e) =>
              setPrescription((prev) => ({
                ...prev,
                diagnosis: e.target.value,
              }))
            }
          />
        </Card>

        {/* Medicines */}
        <Card title="Medicines">
          <MedicineBuilder
            medicines={prescription.medicines}
            setMedicines={(meds) =>
              setPrescription((prev) => ({
                ...prev,
                medicines: meds,
              }))
            }
          />
        </Card>

        {/* Advice */}
        <Card title="Advice">
          <Textarea
            label="Additional Advice"
            value={prescription.advice}
            onChange={(e) =>
              setPrescription((prev) => ({
                ...prev,
                advice: e.target.value,
              }))
            }
          />
        </Card>

        {/* Hidden Print Layout */}
        <div className="fixed -left-[9999px] top-0">
           <PrescriptionPrint
              ref={printRef}
              prescription={prescription}
            />
        </div>

        {/* Action Bar */}
        <ActionBar
          onSave={handleSaveDraft}
          onPrint={handlePrint}
          onDownload={() => {
             if (printRef.current) {
              downloadPDF(printRef.current);
             }
            }}
          />
      </div>
    </div>
  );
};

export default PrescriptionPage;