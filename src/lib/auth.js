import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

/**
 * Retrieves the currently logged-in Supabase user and resolves their explicit Role from Prisma UserRole.
 * If no UserRole record exists yet, it fallback-detects their role and auto-provisions the UserRole record.
 */
export async function getCurrentUserWithRole() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return { user: null, role: null };
    }

    const email = user.email.toLowerCase().trim();

    // 1. Query UserRole table
    let userRole = await prisma.userRole.findUnique({
      where: { email },
    });

    // 2. If UserRole missing, infer role & auto-provision
    if (!userRole) {
      let inferredRole = "STUDENT";

      if (email === "tutorhubadmin@gmail.com") {
        inferredRole = "ADMIN";
      } else {
        const tutor = await prisma.tutor.findUnique({
          where: { email },
          select: { id: true }
        });
        if (tutor) {
          inferredRole = "TUTOR";
        }
      }

      userRole = await prisma.userRole.upsert({
        where: { email },
        update: { role: inferredRole, userId: user.id },
        create: { email, role: inferredRole, userId: user.id },
      });
    }

    return { user, role: userRole.role };
  } catch (err) {
    console.error("getCurrentUserWithRole error:", err);
    return { user: null, role: null };
  }
}

/**
 * Requires ADMIN role authorization.
 */
export async function requireAdmin() {
  const { user, role } = await getCurrentUserWithRole();
  if (!user || role !== "ADMIN") {
    return {
      authorized: false,
      status: !user ? 401 : 403,
      error: !user ? "Authentication required" : "Forbidden: Admin privileges required",
      user: null,
      role: null,
    };
  }
  return { authorized: true, user, role };
}

/**
 * Requires TUTOR or ADMIN role authorization.
 */
export async function requireTutor() {
  const { user, role } = await getCurrentUserWithRole();
  if (!user || (role !== "TUTOR" && role !== "ADMIN")) {
    return {
      authorized: false,
      status: !user ? 401 : 403,
      error: !user ? "Authentication required" : "Forbidden: Tutor privileges required",
      user: null,
      role: null,
    };
  }
  return { authorized: true, user, role };
}

/**
 * Requires STUDENT or higher role authorization.
 */
export async function requireStudent() {
  const { user, role } = await getCurrentUserWithRole();
  if (!user) {
    return {
      authorized: false,
      status: 401,
      error: "Authentication required",
      user: null,
      role: null,
    };
  }
  return { authorized: true, user, role };
}
