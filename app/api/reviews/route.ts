import { NextResponse } from "next/server";

type ReviewPayload = {
  rowId?: number | null;
  client: string;
  project: string;
  slug: string;
  title: string;
  piece_type: string;
  status: string;
  approval: "approved" | "rejected" | null;
  reviewer_comment: string;
  reviewer: string;
  reviewed_at: string;
  updated_at: string;
  version: string;
};

const BASEROW_API_URL = process.env.BASEROW_API_URL ?? "https://api.baserow.io";
const BASEROW_API_TOKEN = process.env.BASEROW_API_TOKEN;
const BASEROW_TABLE_ID = process.env.BASEROW_TABLE_ID;

function missingConfig() {
  return !BASEROW_API_TOKEN || !BASEROW_TABLE_ID;
}

function validate(payload: Partial<ReviewPayload>) {
  const required = [
    "client",
    "project",
    "slug",
    "title",
    "piece_type",
    "status",
    "reviewer",
    "reviewed_at",
    "updated_at",
    "version",
  ] as const;

  for (const field of required) {
    if (!payload[field]) {
      return `Missing field: ${field}`;
    }
  }

  if (payload.approval !== null && payload.approval !== "approved" && payload.approval !== "rejected") {
    return "Invalid approval value.";
  }

  return null;
}

export async function POST(request: Request) {
  if (missingConfig()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Baserow is not configured. Set BASEROW_API_TOKEN and BASEROW_TABLE_ID in the server env.",
      },
      { status: 500 },
    );
  }

  let payload: ReviewPayload;

  try {
    payload = (await request.json()) as ReviewPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const url = payload.rowId
    ? `${BASEROW_API_URL}/api/database/rows/table/${BASEROW_TABLE_ID}/${payload.rowId}/?user_field_names=true`
    : `${BASEROW_API_URL}/api/database/rows/table/${BASEROW_TABLE_ID}/?user_field_names=true`;

  try {
    const response = await fetch(url, {
      method: payload.rowId ? "PATCH" : "POST",
      headers: {
        Authorization: `Token ${BASEROW_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Baserow request failed.",
          details: data,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true, rowId: data.id, record: data });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not reach Baserow.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 },
    );
  }
}
