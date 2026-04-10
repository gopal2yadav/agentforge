import { NextResponse } from 'next/server';

if (!global.__users) global.__users = [];

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
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    const existing = global.__users.find(u => u.email === email.toLowerCase());
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }
    const user = {
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      plan: 'Starter',
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      createdAt: new Date().toISOString(),
    };
    global.__users.push(user);
    const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email, exp: Date.now() + 7*24*60*60*1000 })).toString('base64');
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, plan: user.plan, avatar: user.avatar } });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
