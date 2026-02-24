import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import DoctorHeader from "../components/prescription/DoctorHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import type { Prescription } from "../types/prescription";
import { v4 as uuidv4 } from "uuid";
import { useDoctor } from "../context/DoctorContext";

const PrescriptionPage = () => {
  const { doctorInfo } = useDoctor();

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

  const updatePatientField = (key: string, value: string) => {
    setPrescription((prev) => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        [key]: value,
      },
    }));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 space-y-6">
        <DoctorHeader />

        {/* Patient Info */}
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
      </div>
    </div>
  );
};

export default PrescriptionPage;