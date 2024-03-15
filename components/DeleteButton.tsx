import { useFormStatus } from "react-dom";

export default function DeleteButton({isDraft,formAction} : {
  isDraft: boolean,
  formAction: (formData: FormData) => void
}) {
  const { pending } = useFormStatus();
  return (
    !isDraft && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
      >
        <img src="/cross.svg" alt="trash" width={10} height={10} />
        Delete
      </button>
    )
  )
}
