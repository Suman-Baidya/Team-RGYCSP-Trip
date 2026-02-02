// src/app/api/members/route.js
import { members } from '@/data/db';
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulating a database call
  return NextResponse.json(members);
}