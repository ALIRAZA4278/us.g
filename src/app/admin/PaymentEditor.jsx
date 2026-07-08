"use client";

import { useActionState } from "react";
import { updatePaymentAction } from "./actions";

const initialState = {};

export default function PaymentEditor({ initial }) {
  const [state, formAction, pending] = useActionState(updatePaymentAction, initialState);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="serialNumber" className="text-sm font-medium text-[#1a1a1a]">
          Serial Number
        </label>
        <input
          id="serialNumber"
          name="serialNumber"
          defaultValue={initial.serialNumber}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="mark" className="text-sm font-medium text-[#1a1a1a]">
          Mark
        </label>
        <input
          id="mark"
          name="mark"
          defaultValue={initial.mark}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ownerName" className="text-sm font-medium text-[#1a1a1a]">
          Owner Name
        </label>
        <input
          id="ownerName"
          name="ownerName"
          defaultValue={initial.ownerName}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="attorneyName" className="text-sm font-medium text-[#1a1a1a]">
          Attorney Name
        </label>
        <input
          id="attorneyName"
          name="attorneyName"
          defaultValue={initial.attorneyName}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-[#1a1a1a]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={initial.email}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <hr className="border-zinc-200" />

      <div className="flex flex-col gap-1">
        <label htmlFor="service" className="text-sm font-medium text-[#1a1a1a]">
          Service
        </label>
        <input
          id="service"
          name="service"
          defaultValue={initial.service}
          required
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="charges" className="text-sm font-medium text-[#1a1a1a]">
          Charges
        </label>
        <input
          id="charges"
          name="charges"
          defaultValue={initial.charges}
          required
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="descriptor" className="text-sm font-medium text-[#1a1a1a]">
          Descriptor
        </label>
        <input
          id="descriptor"
          name="descriptor"
          defaultValue={initial.descriptor}
          required
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="payLink" className="text-sm font-medium text-[#1a1a1a]">
          Pay Now link (optional)
        </label>
        <input
          id="payLink"
          name="payLink"
          type="url"
          placeholder="https://example.com/training-reveal"
          defaultValue={initial.payLink}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
        />
        <span className="text-xs text-[#3d3d3d]">
          Leave empty to keep the button disabled. If set, clicking &ldquo;Pay Now&rdquo;
          on the homepage sends visitors to this URL.
        </span>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-700">{state.success}</p>}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded bg-[#1a4480] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
