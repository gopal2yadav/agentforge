import { NextResponse } from 'next/server';

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + password.length;
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    if (!global.__users) global.__users = [];
    const user = global.__users.find(u => u.email === email.toLowerCase());
    if (!user) {
      return NextResponse.json({ error: 'No account found with this email' }, { status: 401 });
    }
    if (user.passwordHash !== hashPassword(password)) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
    const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email, exp: Date.now() + 7*24*60*60*1000 })).toString('base64');
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, plan: user.plan, avatar: user.avatar } });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
    }
