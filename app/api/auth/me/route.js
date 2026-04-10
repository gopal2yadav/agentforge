import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const auth = req.headers.get('authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const token = auth.slice(7);
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    if (decoded.exp < Date.now()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 });
    }
    if (!global.__users) global.__users = [];
    const user = global.__users.find(u => u.id === decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, plan: user.plan, avatar: user.avatar } });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
        }
