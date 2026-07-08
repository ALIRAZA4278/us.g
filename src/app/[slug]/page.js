import { notFound } from "next/navigation";
import PaymentPanel from "../components/PaymentPanel";
import { getPayment } from "@/lib/store";
import { paymentSlug } from "@/lib/slug";

export async function generateMetadata() {
  const payment = await getPayment();
  return { title: `${payment.service} - ${payment.charges}` };
}

export default async function PaymentPage({ params }) {
  const { slug } = await params;
  const payment = await getPayment();

  if (slug !== paymentSlug(payment)) {
    notFound();
  }

  return <PaymentPanel />;
}
