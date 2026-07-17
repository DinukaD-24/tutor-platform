import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user || user.email !== "tutorhubadmin@gmail.com") {
        redirect("/dashboard");
    }

    return <AdminDashboardClient />;
}
