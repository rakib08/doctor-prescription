import { useEffect, useRef } from "react";
import type { Medicine } from "../../types/prescription";
import MedicineCard from "./MedicineCard";
import Button from "../ui/Button";
import { v4 as uuidv4 } from "uuid";

interface Props {
  medicines: Medicine[];
  setMedicines: (medicines: Medicine[]) => void;
}

const MedicineBuilder = ({ medicines, setMedicines }: Props) => {
  const firstLoadRef = useRef(true);

  // Auto-add first medicine
  useEffect(() => {
    if (firstLoadRef.current && medicines.length === 0) {
      addMedicine();
      firstLoadRef.current = false;
    }
  }, []);

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        id: uuidv4(),
        name: "",
        dose: "",
        frequency: "",
        duration: "",
        notes: "",
      },
    ]);
  };

  const updateMedicine = (id: string, field: string, value: string) => {
    setMedicines(
      medicines.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  return (
    <div className="space-y-4">
      {medicines.map((medicine, index) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          medicines={medicines}
          updateMedicine={updateMedicine}
          removeMedicine={removeMedicine}
          addMedicine={addMedicine}
          isLast={index === medicines.length - 1}
        />
      ))}

      <Button onClick={addMedicine}>
        + Add Medicine
      </Button>
    </div>
  );
};

export default MedicineBuilder;