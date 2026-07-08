import Image from "next/image";
import TacticNote from "./TacticNote";
import { getPayment } from "@/lib/store";

export default async function PaymentPanel() {
  const payment = await getPayment();
  const DETAILS = [
    { label: "Service:", value: payment.service },
    { label: "Charges:", value: payment.charges },
    { label: "Descriptor:", value: payment.descriptor },
  ];

  return (
    <section className=" bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div className="flex flex-col items-center text-center mt-8">
          <div className="inline-block bg-[#0a3161] px-6 pb-5 pt-1">
            <div className="text-lg font-semibold leading-tight tracking-wide text-white">
              UNITED STATES
              <br />
              PATENT AND TRADEMARK OFFICE
            </div>
            <div className="mt-2 text-5xl font-extrabold italic tracking-tight text-white">
              uspto <span className="text-sm font-bold not-italic align-super text-red-400">(recreation)</span>
            </div>
          </div>

          <dl className="mt-10 w-full max-w-lg rounded-2xl border border-black px-4 py-4 text-left">
            
            {DETAILS.map((row) => (
              <div key={row.label} className="flex gap-4 py-0.5 text-md text-[#1a1a1a]">
                <dt className="w-32 shrink-0 font-bold">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl text-[#1a1a1a]">Payment Methods</h2>
          <hr className="mt-3 w-52 border-zinc-300" />

          <Image
            src="/Other/online-secure-payment-icon.png"
            alt="Secure payment"
            width={150}
            height={150}
            className="mt-10"
          />

          {payment.payLink ? (
            <a
              href={payment.payLink}
              className="mt-6 rounded px-16 py-2 text-md font-bold text-white bg-[#1a4480] hover:bg-[#0a5670]"
            >
              Pay Now
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-6 rounded cursor-pointer px-16 py-2 text-md font-bold text-white bg-[#1a4480]"
            >
              Pay Now
            </button>
          )}

          <p className="mt-6 max-w-lg text-base italic text-[#3d3d3d]">
            Charges for trademark application services will appear on your bank or card
            statement as &ldquo;{payment.descriptor}- USPTO&rdquo;
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <TacticNote>
          Real USPTO fees are paid only through the official Patent Center / TEAS
          forms or pay.gov, and the charge is billed as USPTO — never through a
          separate company &ldquo;descriptor&rdquo; like &ldquo;{payment.descriptor}&rdquo;. A
          mismatched billing name disclosed up front is a hallmark of trademark
          renewal/maintenance scams that clone the USPTO look to collect card
          payments. {payment.payLink
            ? "This button links to a training reveal page, not a real payment processor."
            : "This button is disabled and submits nowhere."}
        </TacticNote>
      </div>
    </section>
  );
}
