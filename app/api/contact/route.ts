import { NextResponse } from "next/server";
import { Resend } from "resend";
import CollabLead from "@/emails/CollabLead";
import { render as renderEmail } from "@react-email/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resendApiKey = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO; // e.g. "shanto902@gmail.com"
const CONTACT_FROM =
  process.env.CONTACT_FROM || "no-reply@digitalforimpact.net";

const resend = new Resend(resendApiKey);

export async function POST(req: Request) {
  try {
    // ---------- quick health/debug ----------
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode");

    if (mode === "ping") {
      return NextResponse.json({
        ok: true,
        runtime,
        env: {
          RESEND_API_KEY: !!resendApiKey,
          CONTACT_TO: !!CONTACT_TO,
          CONTACT_FROM: !!CONTACT_FROM,
        },
      });
    }

    // ---------- env validation ----------
    if (!resendApiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }
    if (!CONTACT_TO) {
      return NextResponse.json(
        { ok: false, error: "Missing CONTACT_TO" },
        { status: 500 }
      );
    }
    if (!CONTACT_FROM) {
      return NextResponse.json(
        { ok: false, error: "Missing CONTACT_FROM" },
        { status: 500 }
      );
    }

    // ---------- read form ----------
    let form: FormData;
    try {
      form = await req.formData();
    } catch (e: any) {
      return NextResponse.json(
        { ok: false, error: "Invalid form payload: " + (e?.message || "") },
        { status: 400 }
      );
    }
    const get = (k: string) => String(form.get(k) ?? "").trim();

    const name = get("name");
    const email = get("email");
    const message = get("message");
    const company = get("company");
    const role = get("role");
    const projectType = get("projectType");
    const budget = get("budget");
    const agree = form.get("agree") === "on";
    const bot = get("website");

    if (bot) return NextResponse.json({ ok: true }); // honeypot: silently pass

    if (!name || !email || !message || !agree) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ---------- MODE: plain (no React template) ----------
    if (mode === "plain") {
      const resPlain = await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject: `New Collaboration Lead — ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif">
            <h2>New Collaboration Lead</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Company:</b> ${company || "-"}</p>
            <p><b>Role:</b> ${role || "-"}</p>
            <p><b>Project Type:</b> ${projectType || "-"}</p>
            <p><b>Budget:</b> ${budget || "-"}</p>
            <hr/>
            <p style="white-space:pre-wrap">${message}</p>
          </div>
        `,
        tags: [{ name: "source", value: "DFI-Collaborate-Form" }],
      });
      if (resPlain.error) {
        return NextResponse.json(
          {
            ok: false,
            error: resPlain.error.message || "Resend plain send failed",
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ ok: true, mode: "plain" });
    }

    // ---------- Default: React template, then HTML fallback ----------
    try {
      const sendReact = await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject: `New Collaboration Lead — ${name}`,
        react: CollabLead({
          name,
          email,
          message,
          company,
          role,
          projectType,
          budget,
        }),
        tags: [{ name: "source", value: "DFI-Collaborate-Form" }],
      });
      if (sendReact.error) {
        throw new Error(sendReact.error.message || "Resend react send failed");
      }
    } catch (reactErr: any) {
      // fallback to pre-rendered HTML
      const html = await renderEmail(
        CollabLead({ name, email, message, company, role, projectType, budget })
      );

      const sendHtml = await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject: `New Collaboration Lead — ${name}`,
        html,
        tags: [{ name: "source", value: "DFI-Collaborate-Form" }],
      });
      if (sendHtml.error) {
        return NextResponse.json(
          {
            ok: false,
            error: sendHtml.error.message || "Resend html send failed",
            reactError: reactErr?.message,
          },
          { status: 500 }
        );
      }
    }

    // ---------- auto-reply (non-blocking) ----------
    try {
      await resend.emails.send({
        from: CONTACT_FROM,
        to: email,
        subject: "We received your message — Digital For Impact",
        html: `
          <div style="font-family:Inter,Arial,sans-serif">
            <h2>Thanks, ${name}!</h2>
            <p>We received your message and will reply within 1–2 business days.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
            <p style="opacity:.7;font-size:12px">If this wasn't you, you can ignore this email.</p>
          </div>
        `,
      });
    } catch {
      /* ignore auto-reply errors */
    }

    return NextResponse.json({ ok: true, mode: "react-or-fallback" });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unexpected server error." },
      { status: 500 }
    );
  }
}
