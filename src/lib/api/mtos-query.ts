import type { ApiResponse, TenantContext } from "@/src/lib/contracts/mtos";
import {
  getClientById,
  getClients,
  getCommandCenterSnapshot,
  getCommitments,
  getMonthlyTouchById,
  getMonthlyTouches,
  getOpportunities,
} from "@/src/lib/mtos-data";

export function commandCenterResponse(context: TenantContext): ApiResponse<ReturnType<typeof getCommandCenterSnapshot>> {
  return {
    context,
    data: getCommandCenterSnapshot(),
  };
}

export function clientsResponse(context: TenantContext) {
  return {
    context,
    data: getClients(),
  };
}

export function clientWorkspaceResponse(context: TenantContext, clientId: string) {
  const client = getClientById(clientId);

  if (!client) {
    return null;
  }

  return {
    context,
    data: {
      client,
      touch: getMonthlyTouchById(client.touchId) ?? null,
      commitments: getCommitments(client.id),
      opportunities: getOpportunities(client.id),
    },
  };
}

export function monthlyTouchesResponse(context: TenantContext) {
  return {
    context,
    data: getMonthlyTouches().map((touch) => ({
      ...touch,
      client: getClientById(touch.clientId) ?? null,
    })),
  };
}

export function monthlyTouchWorkspaceResponse(context: TenantContext, touchId: string) {
  const touch = getMonthlyTouchById(touchId);

  if (!touch) {
    return null;
  }

  return {
    context,
    data: {
      touch,
      client: getClientById(touch.clientId) ?? null,
      commitments: getCommitments(touch.clientId),
      opportunities: getOpportunities(touch.clientId),
    },
  };
}

export function commitmentsResponse(context: TenantContext) {
  return {
    context,
    data: getCommitments(),
  };
}

export function opportunitiesResponse(context: TenantContext) {
  return {
    context,
    data: getOpportunities(),
  };
}
