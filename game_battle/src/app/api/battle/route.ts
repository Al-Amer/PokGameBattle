import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, userPokemon, computerPokemon, result } = body;

    console.log("Battle result received:", body);

    // Here you could save to a database instead of console.log
    // Example: await prisma.battle.create({ data: body });

    return NextResponse.json({
      message: "Battle result saved successfully",
      data: { username, userPokemon, computerPokemon, result },
    });
  } catch (error) {
    console.error("Error saving battle result:", error);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}

