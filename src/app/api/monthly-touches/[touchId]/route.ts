import { NextResponse } from "next/server";

import { resolveTenantContext } from "@/src/lib/auth/resolve-tenant-context";
import { monthlyTouchWorkspaceResponse } from "@/src/lib/api/mtos-query";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ touchId: string }> },
) {
  const context = resolveTenantContext(request);
  const { touchId } = await params;
  const payload = monthlyTouchWorkspaceResponse(context, touchId);

  if (!payload) {
    return NextResponse.json({ error: "Monthly touch not found" }, { status: 404 });
  }

  return NextResponse.json(payload);
}
