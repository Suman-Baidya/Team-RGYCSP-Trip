// src/app/api/trips/route.js
import { trips } from '@/data/db';
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulating a database call
  return NextResponse.json(trips);
}