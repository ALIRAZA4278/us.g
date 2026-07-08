import { redirect } from "next/navigation";
import { getPayment } from "@/lib/store";
import { paymentSlug } from "@/lib/slug";

export default async function Home() {
  const payment = await getPayment();
  redirect(`/${paymentSlug(payment)}`);
}
