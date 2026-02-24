import { useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useDoctor } from "../../context/DoctorContext";

interface Props {
  onClose: () => void;
}

const DoctorSettingsModal = ({ onClose }: Props) => {
  const { doctorInfo, updateDoctorInfo } = useDoctor();

  const [form, setForm] = useState(doctorInfo);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    updateDoctorInfo(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="w-[400px]">
        <Card title="Doctor Settings">
          <div className="space-y-4">
            <Input
              label="Doctor Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Input
              label="Degree"
              value={form.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
            />
            <Input
              label="Clinic Name"
              value={form.clinicName}
              onChange={(e) => handleChange("clinicName", e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorSettingsModal;