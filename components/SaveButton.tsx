import Image from "next/image";
import { useFormStatus } from "react-dom";

interface SaveButtonProps {
  formAction: (formData: FormData) => void;
}

export default function SaveButton({formAction}: SaveButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
            className="note-editor-done"
            type="submit"
            disabled={pending}
            formAction={formAction}
          >
            <Image src="/checkmark.svg" alt="checkmark" width={14} height={10} />
            { pending ? 'Saving' : 'Done' }
          </button>
  );
}
