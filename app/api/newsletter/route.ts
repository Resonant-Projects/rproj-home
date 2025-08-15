import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const KIT_API_ENDPOINT = "https://api.kit.com/v4/subscribers";
    const KIT_API_SECRET = process.env.KIT_API_KEY;

    if (!KIT_API_SECRET) {
      console.error("KIT_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create subscriber using Kit API
    const kitResponse = await fetch(KIT_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": KIT_API_SECRET,
      },
      body: JSON.stringify({
        email_address: email,
        state: "active",
        // You can add additional fields here if you have custom fields set up in Kit
        // fields: {
        //   'Source': 'website',
        //   'Signup Date': new Date().toISOString().split('T')[0],
        // }
      }),
    });

    const kitData = await kitResponse.json();

    if (kitResponse.ok) {
      return NextResponse.json({
        message: "Subscribed successfully!",
        data: kitData,
      });
    } else {
      console.error("Kit API Error:", kitData);
      return NextResponse.json(
        {
          error: kitData.message || "Failed to subscribe to newsletter",
          details: kitData,
        },
        { status: kitResponse.status }
      );
    }
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
