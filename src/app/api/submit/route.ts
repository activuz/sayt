import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      region,
      phone,
      lang,
      source,
      user_agent,
      timestamp,
    } = body;

    const formattedDate = timestamp
      ? new Date(timestamp).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })
      : new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });

    // 1. Telegram Notification for initial Lead
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    let telegramSent = false;

    if (botToken && chatId && !botToken.includes("ExampleToken")) {
      const messageText = `
<b>🐂 YANGI ZOTDOR.UZ ARIZASI</b>

<b>👤 Ismi:</b> ${escapeHtml(name || "Noma'lum")}
<b>📍 Viloyat:</b> ${escapeHtml(region || "Kiritilmadi")}
<b>📞 Telefon:</b> <code>${escapeHtml(phone || "Kiritilmadi")}</code>
<b>🌐 Alifbo:</b> ${escapeHtml(lang || "cyrl")}
<b>🔗 Manba:</b> ${escapeHtml(source || "Direct")}
<b>📅 Vaqt:</b> ${formattedDate}
      `.trim();

      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: "HTML",
            }),
          }
        );
        if (tgRes.ok) telegramSent = true;
      } catch (err) {
        console.error("Telegram API POST error:", err);
      }
    }

    // 2. Supabase Insert
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let supabaseSent = false;
    let supabaseLeadId: string | null = null;

    if (supabaseUrl && supabaseKey) {
      try {
        // NOTE: id is intentionally NOT sent — Supabase generates UUID via gen_random_uuid()
        const payload: Record<string, any> = {
          name,
          region,
          phone,
          lang: lang || "cyrl",
          source: source || "direct",
          user_agent: user_agent || "",
          survey_status: "none",
        };

        const spRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            // return=representation so we get the generated UUID back
            Prefer: "return=representation",
          },
          body: JSON.stringify(payload),
        });

        const spText = await spRes.text();

        if (spRes.ok) {
          supabaseSent = true;
          // Parse returned row to get the Supabase-generated UUID
          try {
            const rows = JSON.parse(spText);
            if (Array.isArray(rows) && rows.length > 0) {
              supabaseLeadId = rows[0].id;
            }
          } catch (_) {}
          console.log("[Supabase] INSERT ok, supabase_id:", supabaseLeadId);
        } else {
          console.error("[Supabase] POST failed:", spRes.status, spText);
        }
      } catch (err) {
        console.error("[Supabase] REST insert error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      // Return the real Supabase UUID so frontend uses it for PATCH survey updates
      supabase_id: supabaseLeadId,
      local_id: id,
      details: { telegramSent, supabaseSent },
    });

  } catch (error) {
    console.error("API submit POST error:", error);
    return NextResponse.json(
      {
        success: true,
        savedLocally: true,
        message: "Ariza saqlandi va tez orada ko'rib chiqiladi",
      },
      { status: 200 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      lead_id,
      name,
      phone,
      role,
      animal_types,
      price_range,
      pain_points,
      comment,
      survey_status,
    } = body;

    if (!lead_id) {
      return NextResponse.json({ success: true, message: "No lead_id provided" });
    }

    // 1. Update Supabase record
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let supabaseSent = false;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("zotdor-validation")) {
      try {
        const updatePayload: Record<string, any> = {
          survey_status: survey_status || "partial",
        };
        if (role !== undefined) updatePayload.role = role;
        if (animal_types !== undefined) updatePayload.animal_types = animal_types;
        if (price_range !== undefined) updatePayload.price_range = price_range;
        if (pain_points !== undefined) updatePayload.pain_points = pain_points;
        if (comment !== undefined) updatePayload.comment = comment;

        const spRes = await fetch(
          `${supabaseUrl}/rest/v1/leads?id=eq.${encodeURIComponent(lead_id)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify(updatePayload),
          }
        );
        if (spRes.ok) supabaseSent = true;
      } catch (err) {
        console.error("Supabase REST update error:", err);
      }
    }

    // 2. Telegram Update Notification
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId && !botToken.includes("ExampleToken")) {
      const updateMsg = `
<b>📝 ZOTDOR.UZ SAVOLLAR JAVOBI [${survey_status === "complete" ? "TO'LIQ" : "QISMAN"}]</b>

<b>👤 Lead:</b> ${escapeHtml(name || "ID: " + lead_id)} (<code>${escapeHtml(phone || "")}</code>)
<b>🎭 Rol:</b> ${escapeHtml(role || "Tanlanmadi")}
<b>🐄 Chorva turlari:</b> ${escapeHtml(Array.isArray(animal_types) ? animal_types.join(", ") : animal_types || "Tanlanmadi")}
<b>💰 Narx oralig'i:</b> ${escapeHtml(price_range || "Tanlanmadi")}
<b>⚠️ Muammolar:</b> ${escapeHtml(Array.isArray(pain_points) ? pain_points.join(", ") : pain_points || "Tanlanmadi")}
${comment ? `<b>💬 Izoh:</b> ${escapeHtml(comment)}` : ""}
      `.trim();

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: updateMsg,
            parse_mode: "HTML",
          }),
        });
      } catch (err) {
        console.error("Telegram API PATCH update error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      details: { supabaseSent },
    });
  } catch (error) {
    console.error("API submit PATCH error:", error);
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
