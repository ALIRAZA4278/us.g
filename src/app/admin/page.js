import { redirect } from "next/navigation";
import { getSessionUsername } from "@/lib/auth";
import { getPayment } from "@/lib/store";
import { logoutAction } from "./actions";
import PaymentEditor from "./PaymentEditor";

export default async function AdminDashboardPage() {
  const username = await getSessionUsername();
  if (!username) {
    redirect("/admin/login");
  }

  const payment = await getPayment();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Admin dashboard</h1>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-[#0076a3] underline">
            Log out
          </button>
        </form>
      </div>
      <p className="mt-1 text-sm text-[#3d3d3d]">Signed in as {username}</p>

      <h2 className="mt-8 text-lg font-semibold text-[#1a1a1a]">
        Payment page details
      </h2>
      <p className="mt-1 text-sm text-[#3d3d3d]">
        Edits here update the Service / Charges / Descriptor shown on the
        homepage payment mockup.
      </p>
      <PaymentEditor initial={payment} />
    </div>
  );
}
