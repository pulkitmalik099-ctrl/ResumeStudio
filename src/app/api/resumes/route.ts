import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ResumeDataSchema } from '@/lib/resumeSchema';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('GET /api/resumes error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, templateId, data } = await request.json();

    // Validate resume data
    const validationResult = ResumeDataSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid resume data', errors: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title,
        templateId,
        data: validationResult.data,
      },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('POST /api/resumes error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
