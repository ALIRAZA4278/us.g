import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { supabaseAdmin } from "./supabaseAdmin";

const DATA_PATH = path.join(process.cwd(), "data", "store.json");

const DEFAULT_STORE = { adminUsers: [] };

const DEFAULT_PAYMENT = {
  service: "Documentation Changes",
  charges: "$549",
  descriptor: "Tech Prime Corp",
  payLink: "",
};

async function readStore() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STORE;
  }
}

async function writeStore(store) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2));
}

export async function getPayment() {
  try {
    const { data, error } = await supabaseAdmin
      .from("payment_content")
      .select("service, charges, descriptor, pay_link")
      .eq("id", 1)
      .single();

    if (error || !data) {
      return DEFAULT_PAYMENT;
    }
    return {
      service: data.service,
      charges: data.charges,
      descriptor: data.descriptor,
      payLink: data.pay_link ?? "",
    };
  } catch {
    return DEFAULT_PAYMENT;
  }
}

export async function setPayment(payment) {
  const { error } = await supabaseAdmin
    .from("payment_content")
    .upsert({
      id: 1,
      service: payment.service,
      charges: payment.charges,
      descriptor: payment.descriptor,
      pay_link: payment.payLink || null,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
}

export async function findAdminByUsername(username) {
  const store = await readStore();
  return store.adminUsers?.find((u) => u.username === username) ?? null;
}

export async function createAdmin(username, passwordHash, salt) {
  const store = await readStore();
  store.adminUsers = store.adminUsers ?? [];
  store.adminUsers.push({ username, passwordHash, salt });
  await writeStore(store);
}
