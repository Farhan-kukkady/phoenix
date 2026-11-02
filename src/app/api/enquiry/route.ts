import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import nodemailer from "nodemailer";

const enquirySchema = z.object({
  productName: z.string().optional(),
  modelNumber: z.string().optional(),
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Valid phone number required"),
  company: z.string().min(2, "Company name required"),
  country: z.string().min(2, "Country required"),
  message: z.string().min(5, "Message required"),
  website_field: z.string().max(0, "Spam detected").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // Honeypot spam check
    if (json.website_field && json.website_field.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    const data = enquirySchema.parse(json);

    console.log("=========================================");
    console.log("[PHOENIX DEMO ENQUIRY RECEIVED]");
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Product:   ${data.productName || "General Enquiry"} ${data.modelNumber ? `(${data.modelNumber})` : ""}`);
    console.log(`Name:      ${data.name}`);
    console.log(`Email:     ${data.email}`);
    console.log(`Phone:     ${data.phone}`);
    console.log(`Company:   ${data.company}`);
    console.log(`Country:   ${data.country}`);
    console.log(`Message:   ${data.message}`);
    console.log("=========================================");

    // If SMTP is configured in environment, attempt sending email
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass && smtpHost !== "smtp.example.com") {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Phoenix Enquiries" <${smtpUser}>`,
          to: process.env.SMTP_TO || smtpUser,
          subject: `New Lead: ${data.productName || "Website Enquiry"} - ${data.company}`,
          text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Country: ${data.country}
Product: ${data.productName || "General"}
Message:
${data.message}
          `,
        });
      } catch (mailError) {
        console.warn("[SMTP Notice] Failed to send email via SMTP, logged to console instead:", mailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been received. Our regional technical sales team will contact you shortly.",
      isDemo: true,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message || "Validation failed" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
