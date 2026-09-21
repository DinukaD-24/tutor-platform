import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const authResult = await requireAdmin();

    if (!authResult.authorized) {
        redirect("/dashboard");
    }

    return <AdminDashboardClient />;
}

