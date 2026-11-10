import React, { useState } from "react";
import { 
  User, Link as LinkIcon, CreditCard, Palette, Save, 
  Instagram, Facebook, Phone, Mail, Globe, Share2, Download, Copy, Check 
} from "lucide-react";

export default function SmartTapApp() {
  const [activeTab, setActiveTab] = useState("editor");
  const [copied, setCopied] = useState(false);

  // Profile Data State
  const [profile, setProfile] = useState({
    name: "Juan Dela Cruz",
    bio: "NFC Tech & Digital Creator | SmartTap User",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    theme: "dark",
    phone: "+639123456789",
    email: "juan@example.com",
    links: [
      { id: 1, platform: "Instagram", label: "Instagram", url: "https://instagram.com" },
      { id: 2, platform: "Facebook", label: "Facebook", url: "https://facebook.com" }
    ],
    gcash: {
      name: "JUAN D.",
      number: "09123456789",
      qrUrl: ""
    }
  });

  const handleCopyGcash = () => {
    navigator.clipboard.writeText(profile.gcash.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            ST
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            SmartTap
          </span>
        </div>

        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "editor"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "preview"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Live View
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto p-4 md:p-6">
        {activeTab === "editor" ? (
          /* Editor Interface */
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold border-b border-slate-800 pb-3">
                <User size={18} />
                <h3>Profile Information</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Short Bio</label>
                  <textarea
                    rows={2}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Profile Photo URL</label>
                  <input
                    type="text"
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Links Editor */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold border-b border-slate-800 pb-3">
                <LinkIcon size={18} />
                <h3>Social Links</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* GCash Payment Editor */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold border-b border-slate-800 pb-3">
                <CreditCard size={18} />
                <h3>GCash Details</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-slate-400 mb-1">Account Name</label>
                  <input
                    type="text"
                    value={profile.gcash.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gcash: { ...profile.gcash, name: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">GCash Number</label>
                  <input
                    type="text"
                    value={profile.gcash.number}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gcash: { ...profile.gcash, number: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("preview")}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save & View Card
            </button>
          </div>
        ) : (
          /* Mobile Live View / Public Page */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-center">
            {/* Profile Header */}
            <div className="flex flex-col items-center space-y-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/30 shadow-xl"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">{profile.bio}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-4 rounded-xl text-sm font-medium border border-slate-700/50 transition-all"
              >
                <Phone size={16} className="text-indigo-400" />
                Call
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-4 rounded-xl text-sm font-medium border border-slate-700/50 transition-all"
              >
                <Mail size={16} className="text-indigo-400" />
                Email
              </a>
            </div>

            {/* Social Links Buttons */}
            <div className="space-y-2.5 pt-2">
              {profile.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-slate-800/80 hover:bg-slate-700/80 text-white p-3.5 rounded-2xl border border-slate-700/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-indigo-400" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </div>
                  <Share2 size={16} className="text-slate-500 group-hover:text-white transition-all" />
                </a>
              ))}
            </div>

            {/* GCash Payment Box */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-950/40 border border-blue-500/20 rounded-2xl p-4 text-left space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  GCash Payment
                </span>
                <span className="text-xs text-slate-400">{profile.gcash.name}</span>
              </div>
              <div className="flex items-center justify-between bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="font-mono text-sm tracking-wider text-slate-200">
                  {profile.gcash.number}
                </span>
                <button
                  onClick={handleCopyGcash}
                  className="flex items-center gap-1 bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-lg transition-all"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Footer Watermark */}
            <div className="pt-4 border-t border-slate-800/80 text-center">
              <p className="text-[10px] text-slate-500 tracking-widest uppercase">
                Powered by SmartTap NFC
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
