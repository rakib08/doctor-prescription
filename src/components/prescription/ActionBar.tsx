import Button from "../ui/Button";

interface Props {
  onSave: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

const ActionBar = ({ onSave, onPrint, onDownload }: Props) => {
  return (
    <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-4 shadow-md">
      <Button variant="secondary" onClick={onSave}>
        Save Draft
      </Button>

      <Button onClick={onPrint}>
        Print
      </Button>

      <Button onClick={onDownload}>
        Download PDF
      </Button>
    </div>
  );
};

export default ActionBar;