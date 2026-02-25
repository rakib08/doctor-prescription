import { useState, useRef, useEffect } from "react";
import type { Medicine } from "../../types/prescription";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import medicinesList from "../../data/medicines.json";

interface Props {
  medicine: Medicine;
  medicines: Medicine[];
  updateMedicine: (id: string, field: string, value: string) => void;
  removeMedicine: (id: string) => void;
  addMedicine: () => void;
  isLast: boolean;
}

const frequencyOptions = [
  "1+0+0",
  "1+0+1",
  "1+1+1",
  "1+1+1+1"
];

const noteOptions = [
  "Before Meal",
  "After Meal",
  "As Needed"
];

const MedicineCard = ({
  medicine,
  medicines,
  updateMedicine,
  removeMedicine,
  addMedicine,
  isLast,
}: Props) => {
  const [doseFocused, setDoseFocused] = useState(false);
  const [durationFocused, setDurationFocused] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const genericRef = useRef<HTMLInputElement>(null);

  // Auto-focus generic when new card appears
  useEffect(() => {
    if (!medicine.name && isLast) {
      genericRef.current?.focus();
    }
  }, []);

  // Duplicate detection
  useEffect(() => {
    const count = medicines.filter(
      (m) =>
        m.name.trim().toLowerCase() ===
        medicine.name.trim().toLowerCase()
    ).length;

    setDuplicate(count > 1 && medicine.name !== "");
  }, [medicine.name, medicines]);

  const handleDoseChange = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    updateMedicine(medicine.id, "dose", numeric);
  };

  const handleDurationChange = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    updateMedicine(medicine.id, "duration", numeric);
  };

  const handleDurationKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && isLast) {
      e.preventDefault();
      addMedicine();
    }
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <div className="absolute bottom-4 right-4">
        <Button
          variant="danger"
          onClick={() => removeMedicine(medicine.id)}
        >
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* Generic Name */}
        <div>
          <Input
            ref={genericRef}
            label="Generic Name"
            list={`medicine-list-${medicine.id}`}
            value={medicine.name}
            onChange={(e) =>
              updateMedicine(medicine.id, "name", e.target.value)
            }
          />
          <datalist id={`medicine-list-${medicine.id}`}>
            {medicinesList.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>

          {duplicate && (
            <p className="text-xs text-red-500 mt-1">
              Duplicate medicine detected
            </p>
          )}
        </div>

        {/* Dose */}
        <div>
          <Input
            label="Dose"
            value={medicine.dose ? `${medicine.dose} mg` : ""}
            onChange={(e) => handleDoseChange(e.target.value)}
            onFocus={() => setDoseFocused(true)}
            onBlur={() => setDoseFocused(false)}
          />
          {doseFocused && (
            <p className="text-xs text-gray-500 mt-1">
              Enter value in mg
            </p>
          )}
        </div>

        {/* Frequency */}
        <Select
          label="Frequency"
          value={medicine.frequency}
          onChange={(e) =>
            updateMedicine(medicine.id, "frequency", e.target.value)
          }
        >
          <option value="">Select Frequency</option>
          {frequencyOptions.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </Select>

        {/* Duration */}
        <div>
          <Input
            label="Duration"
            value={medicine.duration ? `${medicine.duration} days` : ""}
            onChange={(e) => handleDurationChange(e.target.value)}
            onKeyDown={handleDurationKeyDown}
            onFocus={() => setDurationFocused(true)}
            onBlur={() => setDurationFocused(false)}
          />
          {durationFocused && (
            <p className="text-xs text-gray-500 mt-1">
              Enter value in days
            </p>
          )}
        </div>

        {/* Notes */}
        <Select
          label="Notes"
          value={medicine.notes}
          onChange={(e) =>
            updateMedicine(medicine.id, "notes", e.target.value)
          }
        >
          <option value="">Select Note</option>
          {noteOptions.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </Select>

      </div>
    </div>
  );
};

export default MedicineCard;