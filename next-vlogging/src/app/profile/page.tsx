"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Clock3, Heart, History, Library, LogOut, Sparkles, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Raj Vlogger');
  const [username, setUsername] = useState('@raj_vlogger');
  const [email, setEmail] = useState('test@example.com');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Try to fetch profile for demo user; fallback to defaults
    const base = process.env.NEXT_PUBLIC_DJANGO_API_BASE || 'http://127.0.0.1:8000';
    if (!email) return;
    fetch(`${base}/api/auth/profile/?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.status === 'ok' && data.user) {
          setName(data.user.name || '');
          setUsername(data.user.username ? `@${data.user.username}` : '');
          setEmail(data.user.email || email);
          if (data.user.avatar) setAvatarPreview(data.user.avatar);
        }
      })
      .catch(() => {});
  }, [email]);
  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.32),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.24),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_36%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-6xl px-3 py-8 sm:px-4 md:px-6 lg:px-8">
        <section className="mb-10 rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              Your Creator Dashboard
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">{name}</h1>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg text-slate-300">{username}</p>
            </div>
            <Button asChild className="rounded-lg sm:rounded-xl lg:rounded-[1.75rem] bg-gradient-to-r from-cyan-500 via-sky-600 to-fuchsia-500 px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-sm sm:text-base text-white shadow-[0_22px_65px_rgba(59,130,246,0.40)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_26px_75px_rgba(168,85,247,0.45)]">
              <Link href="/contact" className="inline-flex items-center gap-2">
                <Sparkles size={16} /> Upgrade Profile
              </Link>
            </Button>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          <aside className="space-y-6">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_30px_90px_rgba(15,23,42,0.35)]">
              <div className="absolute -right-20 top-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
              <div className="absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-slate-700/70 overflow-hidden bg-slate-950 shadow-xl ring-4 ring-cyan-500/20 flex items-center justify-center">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-5xl sm:text-6xl">👤</span>
                    )}
                  </div>
                  <Button 
                    onClick={() => setEditing((s) => !s)} 
                    size="icon" 
                    className="absolute bottom-2 right-2 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white hover:shadow-lg transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </Button>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{name}</h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-300/90">{email}</p>

                {!editing ? (
                  <Button onClick={() => setEditing(true)} className="mt-6 w-full rounded-[1.5rem] border border-slate-700/70 bg-slate-900/50 text-white hover:bg-slate-900 transition-colors">
                    Edit Profile
                  </Button>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setMessage('');
                      const base = process.env.NEXT_PUBLIC_DJANGO_API_BASE || 'http://127.0.0.1:8000';
                      const fd = new FormData();
                      fd.append('email', email);
                      fd.append('first_name', name);
                      fd.append('username', username.replace(/^@/, ''));
                      if (avatarFile) fd.append('avatar', avatarFile);

                      try {
                        const res = await fetch(`${base}/api/auth/profile/`, {
                          method: 'POST',
                          body: fd,
                        });
                        const data = await res.json();
                        if (data?.status === 'ok') {
                          setMessage('Profile updated');
                          if (data.user?.avatar) setAvatarPreview(data.user.avatar);
                          setEditing(false);
                        } else {
                          setMessage(data?.error || 'Update failed');
                        }
                      } catch (err) {
                        setMessage('Update failed');
                      }
                    }}
                    className="mt-6 w-full space-y-4"
                  >
                    <div className="space-y-3">
                      <input 
                        className="w-full rounded-lg sm:rounded-[1.25rem] border border-white/10 bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Display name" 
                      />
                      <input 
                        className="w-full rounded-lg sm:rounded-[1.25rem] border border-white/10 bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="@username" 
                      />
                      <input 
                        className="w-full rounded-lg sm:rounded-[1.25rem] border border-white/10 bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="email" 
                      />
                      <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base font-medium text-slate-200/90">
                          Profile Picture
                        </label>
                        <div className="flex gap-3 items-end flex-col sm:flex-row">
                          <div className="h-24 w-24 rounded-lg sm:rounded-[1.25rem] border-2 border-slate-700/70 bg-slate-950 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-lg">
                            {avatarPreview ? (
                              <img src={avatarPreview} alt="preview" className="h-full w-full object-cover" />
                            ) : (
                              <span className="text-3xl">👤</span>
                            )}
                          </div>
                          <label className="flex-1 w-full cursor-pointer">
                            <div className="rounded-lg sm:rounded-[1.25rem] border-2 border-dashed border-cyan-400/40 bg-cyan-500/10 px-4 sm:px-5 py-4 sm:py-6 text-center hover:border-cyan-400/60 hover:bg-cyan-500/15 transition-all">
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => { const f = e.target.files?.[0]; setAvatarFile(f || null); if (f) setAvatarPreview(URL.createObjectURL(f)); }} 
                                className="hidden"
                              />
                              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                <p className="text-xs sm:text-sm font-semibold text-cyan-200">Choose image</p>
                                <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1 rounded-lg sm:rounded-[1.25rem] bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base hover:shadow-lg transition-all">
                        Save Changes
                      </Button>
                      <Button type="button" onClick={() => setEditing(false)} className="flex-1 rounded-lg sm:rounded-[1.25rem] border border-slate-700/70 bg-slate-900/50 text-white hover:bg-slate-900 transition-colors font-semibold py-2.5 sm:py-3 text-sm sm:text-base">
                        Cancel
                      </Button>
                    </div>
                    {message && <p className="text-xs sm:text-sm text-cyan-300/90 text-center mt-2">{message}</p>}
                  </form>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { value: '24', label: 'Uploads' },
                { value: '4.8K', label: 'Followers' },
                { value: '121K', label: 'Views' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg sm:rounded-xl lg:rounded-[1.5rem] border border-slate-700/70 bg-slate-950/70 p-3 sm:p-4 text-center backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 sm:mt-2 text-xs uppercase tracking-[0.22em] text-slate-300/80">{stat.label}</p>
                </div>
              ))}
            </div>

            <nav className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-3 sm:p-4 backdrop-blur-xl space-y-1.5 sm:space-y-2">
              {[
                { href: '/library', icon: Library, label: 'Your Library' },
                { href: '/library/history', icon: History, label: 'Watch History' },
                { href: '/library/watch-later', icon: Clock3, label: 'Watch Later' },
                { href: '/library/liked', icon: Heart, label: 'Liked Videos' },
                { href: '/tracking', icon: Activity, label: 'Tracking Dashboard' },
                { href: '/login', icon: LogOut, label: 'Sign Out', destructive: true }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Button 
                    key={item.href}
                    asChild 
                    variant="ghost" 
                    className={`justify-start w-full rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-colors ${item.destructive ? 'text-red-400 hover:bg-red-500/10' : 'text-slate-200 hover:bg-slate-800/50'}`}
                  >
                    <Link href={item.href} className="inline-flex items-center gap-2 sm:gap-3">
                      <Icon size={18} /> {item.label}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </aside>

          <main className="space-y-6">
            <section className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_30px_90px_rgba(15,23,42,0.35)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500" />

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6 sm:mb-8">Theme Preferences</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-lg sm:rounded-xl lg:rounded-[1.5rem] border border-slate-700/70 bg-slate-950/70 p-4 sm:p-6 cursor-pointer hover:border-slate-600 transition-all group">
                  <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg sm:rounded-[1rem] mb-3 sm:mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  </div>
                  <span className="font-semibold text-sm sm:text-base text-slate-200">Light Mode</span>
                </div>
                <div className="rounded-lg sm:rounded-xl lg:rounded-[1.5rem] border-2 border-sky-500/60 bg-slate-950/70 p-4 sm:p-6 cursor-pointer ring-2 ring-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <div className="w-full h-24 sm:h-32 bg-slate-950 rounded-lg sm:rounded-[1rem] mb-3 sm:mb-4 flex items-center justify-center border border-slate-700/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  </div>
                  <span className="font-semibold text-sm sm:text-base text-slate-100">Dark Mode (Active)</span>
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_30px_90px_rgba(15,23,42,0.35)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500" />

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <Bell size={20} className="text-cyan-300" /> Notification Preferences
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { title: 'New Subscriptions', desc: 'Get notified when someone subscribes to your channel.', enabled: true },
                  { title: 'Comments & Replies', desc: 'Receive alerts for new comments and replies.', enabled: true },
                  { title: 'Marketing Emails', desc: 'Receive news, updates, and creator tips.', enabled: false }
                ].map((pref) => (
                  <div key={pref.title} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 rounded-lg sm:rounded-xl lg:rounded-[1.25rem] border border-slate-700/70 bg-slate-950/50 p-4 sm:p-5 hover:bg-slate-950/70 transition-colors">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-sm sm:text-base">{pref.title}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-300/80">{pref.desc}</p>
                    </div>
                    <div className={`flex-shrink-0 w-12 h-7 rounded-full relative cursor-pointer transition-all ${pref.enabled ? 'bg-gradient-to-r from-cyan-500 to-sky-600 shadow-[0_0_12px_rgba(56,189,248,0.3)]' : 'bg-slate-700'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${pref.enabled ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
