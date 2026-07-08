"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifyPassword, checkEnvCredentials, createSession, destroySession } from "@/lib/auth";
import { findAdminByUsername, setPayment } from "@/lib/store";

export async function loginAction(prevState, formData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (checkEnvCredentials(username, password)) {
    await createSession(username);
    redirect("/admin");
  }

  const admin = await findAdminByUsername(username);
  if (!admin || !verifyPassword(password, admin.salt, admin.passwordHash)) {
    return { error: "Invalid username or password." };
  }

  await createSession(username);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function updatePaymentAction(prevState, formData) {
  const service = String(formData.get("service") || "").trim();
  const charges = String(formData.get("charges") || "").trim();
  const descriptor = String(formData.get("descriptor") || "").trim();
  const payLink = String(formData.get("payLink") || "").trim();

  if (!service || !charges || !descriptor) {
    return { error: "All fields are required." };
  }

  if (payLink) {
    try {
      const parsed = new URL(payLink);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error("bad protocol");
      }
    } catch {
      return { error: "Pay Now link must be a valid http(s) URL." };
    }
  }

  try {
    await setPayment({ service, charges, descriptor, payLink });
  } catch (err) {
    return { error: `Could not save: ${err.message}` };
  }

  revalidatePath("/");
  return { success: "Payment details updated." };
}
