import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { programs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET all programs
export async function GET() {
  try {
    const allPrograms = await db.select().from(programs);
    return NextResponse.json(allPrograms);
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    );
  }
}

// POST create new program
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProgram = await db.insert(programs).values({
      title: body.title,
      description: body.description,
      category: body.category,
      image: body.image,
      link: body.link,
      featured: body.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    
    return NextResponse.json(newProgram[0], { status: 201 });
  } catch (error) {
    console.error("Error creating program:", error);
    return NextResponse.json(
      { error: "Failed to create program" },
      { status: 500 }
    );
  }
}

