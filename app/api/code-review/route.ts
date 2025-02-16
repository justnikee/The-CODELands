import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        console.log("Received Data:", body);
    
        return NextResponse.json({ success: true, data: body }, { status: 200 });
      } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }