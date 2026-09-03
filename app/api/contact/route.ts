import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Try Web3Forms for direct email delivery to sourabhmisal182@gmail.com
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY";

    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name,
          email,
          subject: subject || `Portfolio Contact from ${name}`,
          message,
          to: "sourabhmisal182@gmail.com",
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to deliver email via Web3Forms");
      }
    } else {
      // Log submission details for server-side auditing when testing locally
      console.log("-----------------------------------------");
      console.log("📬 NEW PORTFOLIO MESSAGE RECEIVED:");
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject || "No Subject"}`);
      console.log(`Message:\n${message}`);
      console.log("-----------------------------------------");
    }

    return NextResponse.json(
      { success: true, message: "Your message has been received!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
