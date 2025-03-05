import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request)
  
  return NextResponse.json({
    message: "Test route is working",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: "Data received successfully",
      receivedData: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }
}