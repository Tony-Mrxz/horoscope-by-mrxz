import { NextResponse } from 'next/server';

const UPSTREAM_API = 'https://global-cpp.api.mamlwgt.com/horoscope/get/days';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const upstreamResponse = await fetch(UPSTREAM_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { flag: false, msg: `Upstream API error: ${upstreamResponse.status}` },
        { status: upstreamResponse.status }
      );
    }

    const data = await upstreamResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Horoscope API proxy error:', error);
    return NextResponse.json(
      { flag: false, msg: 'Failed to fetch horoscope data' },
      { status: 500 }
    );
  }
}
