import { trips } from '@/data/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  console.log("👉 API HIT!"); 
  console.log("👉 Searching for ID:", params.id);
  
  const trip = trips.find((t) => t.id === params.id);
  
  if (!trip) {
    console.log("❌ Trip NOT FOUND in DB. Available IDs:", trips.map(t => t.id));
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  console.log("✅ Trip Found:", trip.title);
  return NextResponse.json(trip, { status: 200 });
}