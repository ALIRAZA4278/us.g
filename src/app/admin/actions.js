"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { hashPassword, verifyPassword, createSession, destroySession } from "@/lib/auth";
import { findAdminByUsername, createAdmin, setPayment } from "@/lib/store";

export async function signupAction(prevState, formData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (username.length < 3) {
    return { error: "Username must be at least 3 characters." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await findAdminByUsername(username);
  if (existing) {
    return { error: "That username is already taken." };
  }

  const { salt, hash } = hashPassword(password);
  await createAdmin(username, hash, salt);
  await createSession(username);
  redirect("/admin");
}

export async function loginAction(prevState, formData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

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
