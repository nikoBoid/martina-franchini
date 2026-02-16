import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const CORRECT_PASSWORD = process.env.SITE_PASSWORD || "password123";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password richiesta" },
        { status: 400 }
      );
    }

    if (password === CORRECT_PASSWORD) {
      // Imposta il cookie di accesso (valido per 1 giorno)
      const cookieStore = await cookies();
      cookieStore.set("site_access", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 giorno
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Password errata" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Errore durante il login" },
      { status: 500 }
    );
  }
}
