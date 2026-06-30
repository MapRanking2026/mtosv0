import type { TenantContext, Role } from "@/src/lib/contracts/mtos";

const defaultContext: TenantContext = {
  tenantId: "tenant-map-ranking-demo",
  userId: "user-am-demo",
  role: "account_manager",
};

const allowedRoles = new Set<Role>([
  "account_manager",
  "manager",
  "qa_reviewer",
  "tenant_admin",
]);

export function resolveTenantContext(request?: Request): TenantContext {
  if (!request) {
    return defaultContext;
  }

  const requestedRole = request.headers.get("x-mtos-role") as Role | null;
  const requestedTenantId = request.headers.get("x-mtos-tenant-id");
  const requestedUserId = request.headers.get("x-mtos-user-id");

  return {
    tenantId: requestedTenantId || defaultContext.tenantId,
    userId: requestedUserId || defaultContext.userId,
    role: requestedRole && allowedRoles.has(requestedRole) ? requestedRole : defaultContext.role,
  };
}
