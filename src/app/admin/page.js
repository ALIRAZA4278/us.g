import { redirect } from "next/navigation";
import { getSessionUsername } from "@/lib/auth";
import { getPayment } from "@/lib/store";
import { paymentSlug } from "@/lib/slug";
import { logoutAction } from "./actions";
import PaymentEditor from "./PaymentEditor";

export default async function AdminDashboardPage() {
  const username = await getSessionUsername();
  if (!username) {
    redirect("/admin/login");
  }

  const payment = await getPayment();
  const slug = paymentSlug(payment);

  return (
    <div className="min-h-[80vh] w-full bg-zinc-50 px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
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
          payment mockup page, currently live at{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5">/{slug}</code>. The
          URL updates automatically to match Service + Charges.
        </p>
        <PaymentEditor initial={payment} />
      </div>
    </div>
  );
}
