import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("zotdor-validation")) {
      return NextResponse.json({ count: 0 });
    }

    const spRes = await fetch(`${supabaseUrl}/rest/v1/leads?select=id`, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "count=exact",
        Range: "0-0",
      },
    });

    if (spRes.ok) {
      const contentRange = spRes.headers.get("content-range");
      if (contentRange) {
        const parts = contentRange.split("/");
        if (parts.length === 2) {
          const total = parseInt(parts[1], 10);
          if (!isNaN(total)) {
            return NextResponse.json({ count: total });
          }
        }
      }
    }

    return NextResponse.json({ count: 0 });
  } catch (error) {
    return NextResponse.json({ count: 0 });
  }
}
