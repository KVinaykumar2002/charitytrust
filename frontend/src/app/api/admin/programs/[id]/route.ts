import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { programs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET single program
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const program = await db
      .select()
      .from(programs)
      .where(eq(programs.id, params.id))
      .limit(1);
    
    if (program.length === 0) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(program[0]);
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json(
      { error: "Failed to fetch program" },
      { status: 500 }
    );
  }
}

// PUT update program
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedProgram = await db
      .update(programs)
      .set({
        title: body.title,
        description: body.description,
        category: body.category,
        image: body.image,
        link: body.link,
        featured: body.featured,
        updatedAt: new Date(),
      })
      .where(eq(programs.id, params.id))
      .returning();
    
    if (updatedProgram.length === 0) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedProgram[0]);
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json(
      { error: "Failed to update program" },
      { status: 500 }
    );
  }
}

// DELETE program
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedProgram = await db
      .delete(programs)
      .where(eq(programs.id, params.id))
      .returning();
    
    if (deletedProgram.length === 0) {
      return NextResponse.json(
        { error: "Program not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json(
      { error: "Failed to delete program" },
      { status: 500 }
    );
  }
}

