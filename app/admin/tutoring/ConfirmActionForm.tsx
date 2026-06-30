"use client";

type ConfirmActionFormProps = {
  rowId: string;
  action: (formData: FormData) => void | Promise<void>;
  label: string;
  confirm: string;
  className: string;
};

export function ConfirmActionForm({
  rowId,
  action,
  label,
  confirm,
  className,
}: ConfirmActionFormProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirm)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="rowId" value={rowId} />
      <button type="submit" className={className}>
        {label}
      </button>
    </form>
  );
}
