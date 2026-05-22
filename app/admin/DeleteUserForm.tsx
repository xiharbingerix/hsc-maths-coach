"use client";

type DeleteUserFormProps = {
  userId: string;
  deleteUserAction: (formData: FormData) => void | Promise<void>;
};

export function DeleteUserForm({
  userId,
  deleteUserAction,
}: DeleteUserFormProps) {
  return (
    <form
      action={deleteUserAction}
      onSubmit={(event) => {
        if (
          !window.confirm(
            "Delete this user permanently? This should only be used for test accounts."
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="userId" value={userId} />
      <button
        type="submit"
        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
      >
        Delete user
      </button>
    </form>
  );
}
