"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User, Link as LinkIcon, CreditCard, Palette, Save, Plus, Trash2,
  Phone, Mail, Globe, Share2, Download, Copy, Check, Camera, Image as ImageIcon,
  Pencil, Lock, LogOut, ArrowLeft, Smartphone, Building2, QrCode, Sparkles,
  ExternalLink, UserPlus, CheckCircle2, X, ShieldCheck, Music, Gamepad2, MapPin,
  Search, BarChart3, Send, Eye, EyeOff, MessageSquare, Sun, Moon, Play, Pause, Volume2, VolumeX
} from "lucide-react";

const TIKTOK_SHOP_URL = "https://www.tiktok.com/@smarttap.ph?is_from_webapp=1&sender_device=pc";

const THEMES = {
  default: {
    id: "default",
    name: "Default Midnight",
    bg: "bg-[#090d16]",
    card: "bg-[#111827] border-slate-800/80",
    input: "bg-[#090d16] border-slate-700 text-white placeholder-slate-500",
    text: "text-slate-100",
    subtext: "text-slate-400",
    accent: "bg-indigo-600 hover:bg-indigo-500 text-white",
    accentSoft: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    pill: "bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700/60",
    swatch: "bg-[#090d16] border-indigo-500"
  },
  black: {
    id: "black",
    name: "Obsidian Black",
    bg: "bg-black",
    card: "bg-[#0a0a0a] border-neutral-800",
    input: "bg-black border-neutral-800 text-white placeholder-neutral-600",
    text: "text-white",
    subtext: "text-neutral-400",
    accent: "bg-white hover:bg-neutral-200 text-black font-semibold",
    accentSoft: "bg-white/10 text-white border-white/20",
    pill: "bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800",
    swatch: "bg-black border-white"
  },
  white: {
    id: "white",
    name: "Clean White",
    bg: "bg-slate-100",
    card: "bg-white border-slate-200 shadow-sm",
    input: "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400",
    text: "text-slate-900",
    subtext: "text-slate-500",
    accent: "bg-slate-900 hover:bg-slate-800 text-white",
    accentSoft: "bg-slate-900/5 text-slate-800 border-slate-300",
    pill: "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200",
    swatch: "bg-white border-slate-400"
  },
  pink: {
    id: "pink",
    name: "Blush Pink",
    bg: "bg-[#fdf2f8]",
    card: "bg-white/90 border-pink-200 shadow-sm",
    input: "bg-pink-50/50 border-pink-200 text-pink-950 placeholder-pink-300",
    text: "text-pink-950",
    subtext: "text-pink-600/80",
    accent: "bg-pink-600 hover:bg-pink-500 text-white",
    accentSoft: "bg-pink-500/10 text-pink-700 border-pink-300",
    pill: "bg-pink-50 hover:bg-pink-100 text-pink-900 border-pink-200",
    swatch: "bg-pink-400 border-pink-600"
  }
};

const SOCIAL_PLATFORMS = [
  { id: "facebook", name: "Facebook", placeholder: "https://facebook.com/username", badge: "FB" },
  { id: "instagram", name: "Instagram", placeholder: "https://instagram.com/username", badge: "IG" },
  { id: "tiktok", name: "TikTok", placeholder: "https://tiktok.com/@username", badge: "TT" },
  { id: "youtube", name: "YouTube", placeholder: "https://youtube.com/@channel", badge: "YT" },
  { id: "x", name: "X (Twitter)", placeholder: "https://x.com/username", badge: "X" },
  { id: "snapchat", name: "Snapchat", placeholder: "https://snapchat.com/add/username", badge: "SC" },
  { id: "whatsapp", name: "WhatsApp", placeholder: "https://wa.me/639123456789", badge: "WA" },
  { id: "telegram", name: "Telegram", placeholder: "https://t.me/username", badge: "TG" },
  { id: "discord", name: "Discord", placeholder: "https://discord.gg/invite", badge: "DC" },
  { id: "viber", name: "Viber", placeholder: "viber://chat?number=...", badge: "VB" },
  { id: "custom", name: "Custom URL", placeholder: "https://...", badge: "URL" }
];

const MUSIC_PLATFORMS = [
  { id: "spotify", name: "Spotify", placeholder: "https://spotify.com/track/...", badge: "SP" },
  { id: "applemusic", name: "Apple Music", placeholder: "https://music.apple.com/...", badge: "AM" },
  { id: "youtubemusic", name: "YouTube Music", placeholder: "https://music.youtube.com/...", badge: "YM" },
  { id: "soundcloud", name: "SoundCloud", placeholder: "https://soundcloud.com/...", badge: "SC" },
  { id: "bandcamp", name: "Bandcamp", placeholder: "https://bandcamp.com/...", badge: "BC" },
  { id: "music_other", name: "Other Music Link", placeholder: "https://...", badge: "♪" }
];

const GAMING_PLATFORMS = [
  { id: "mlbb", name: "Mobile Legends (MLBB)", badge: "ML", fields: ["Game ID", "Server ID"] },
  { id: "valorant", name: "Valorant", badge: "VAL", fields: ["Riot ID + Tagline (e.g. Player#PH1)"] },
  { id: "roblox", name: "Roblox", badge: "RBX", fields: ["Username or Display Name"] },
  { id: "codm", name: "CODM", badge: "COD", fields: ["Exact In-Game Username"] },
  { id: "dota2", name: "Dota 2", badge: "D2", fields: ["Steam Friend Code / ID"] },
  { id: "lol", name: "League of Legends", badge: "LOL", fields: ["Riot ID + Tagline"] },
  { id: "game_other", name: "Other Game", badge: "GAME", fields: ["Game Name", "IGN / Username", "Player ID / Server"] }
];

const BUSINESS_PLATFORMS = [
  { id: "shopee", name: "Shopee Store", placeholder: "https://shopee.ph/...", badge: "SHP" },
  { id: "lazada", name: "Lazada Store", placeholder: "https://lazada.com.ph/...", badge: "LZD" },
  { id: "tiktokshop", name: "TikTok Shop", placeholder: "https://tiktok.com/@...", badge: "TT" },
  { id: "carousell", name: "Carousell", placeholder: "https://carousell.ph/...", badge: "CRS" },
  { id: "website", name: "Official Website", placeholder: "https://yourwebsite.com", badge: "WEB" },
  { id: "business_other", name: "Other Business", placeholder: "https://...", badge: "BIZ" }
];

const PAYMENT_PROVIDERS = [
  { id: "gcash", name: "GCash", digits: 11, label: "11-digit Mobile Number (09XX...)", placeholder: "09171234567", badge: "G" },
  { id: "maya", name: "Maya (Personal)", digits: 11, label: "11-digit Mobile Number (09XX...)", placeholder: "09181234567", badge: "M" },
  { id: "mayabusiness", name: "Maya Business", digits: 12, label: "12-digit Account Number", placeholder: "900123456789", badge: "MB" },
  { id: "maribank", name: "MariBank (SeaBank)", digits: 11, label: "11-digit Account Number", placeholder: "10234567890", badge: "SB" },
  { id: "gotyme", name: "GoTyme Bank", digits: 12, label: "12-digit Account Number", placeholder: "012345678901", badge: "GT" },
  { id: "bdo", name: "BDO", digits: 12, label: "12-digit Account Number", placeholder: "001234567890", badge: "BDO" },
  { id: "bpi", name: "BPI", digits: 10, label: "10-digit Account Number", placeholder: "1234567890", badge: "BPI" },
  { id: "landbank", name: "Landbank", digits: 10, label: "10-digit Account Number", placeholder: "1234567890", badge: "LBP" },
  { id: "metrobank", name: "Metrobank", digits: 13, label: "13-digit Account Number", placeholder: "1234567890123", badge: "MBTC" },
  { id: "chinabank", name: "China Bank", digits: 12, label: "12-digit Account Number", placeholder: "123456789012", badge: "CBC" },
  { id: "others", name: "Others (Bank / E-Wallet)", digits: null, label: "Account / Mobile Number", placeholder: "Enter account number", badge: "OTH" }
];

const compressImage = (file, maxWidth = 600, quality = 0.75) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
    };
  });
};

function BrandLogo({ size = "md" }) {
  const [imgError, setImgError] = useState(false);
  const dims = size === "lg" ? "w-14 h-14" : size === "sm" ? "w-6 h-6" : "w-9 h-9";

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      {!imgError ? (
        <img
          src="/logo.png"
          alt="SmartTap Logo"
          onError={() => setImgError(true)}
          className={`${dims} rounded-xl object-contain`}
        />
      ) : (
        <div className={`${dims} rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-extrabold shadow-md`}>
          ST
        </div>
      )}
      <span className={`font-bold tracking-tight ${size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg"}`}>
        SmartTap
      </span>
    </div>
  );
}

export default function SmartTapApp() {
  const [screen, setScreen] = useState("claim");
  const [isLoaded, setIsLoaded] = useState(false);

  const [account, setAccount] = useState(null);
  const [authMode, setAuthMode] = useState("signup");
  const [authIdentifier, setAuthIdentifier] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showAuthPass, setShowAuthPass] = useState(false);
  const [authError, setAuthError] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    avatar: "",
    photos: [],
    featuredVideo: "",
    phone: "",
    email: "",
    theme: "default",
    verifiedBadge: { enabled: true, color: "text-blue-500" },
    links: [],
    payments: [],
    locations: []
  });

  const [activeModal, setActiveModal] = useState(null);
  const [selectedSubPlatform, setSelectedSubPlatform] = useState(null);
  const [inputField1, setInputField1] = useState("");
  const [inputField2, setInputField2] = useState("");
  const [inputField3, setInputField3] = useState("");
  const [modalError, setModalError] = useState("");
  const [payQrImage, setPayQrImage] = useState("");

  const [showLocModal, setShowLocModal] = useState(false);
  const [locAddress, setLocAddress] = useState("");
  const [locMapUrl, setLocMapUrl] = useState("");

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showShareQrModal, setShowShareQrModal] = useState(false);

  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [analyticsPin, setAnalyticsPin] = useState("");
  const [analyticsUnlocked, setAnalyticsUnlocked] = useState(false);
  const [analyticsPinError, setAnalyticsPinError] = useState("");
  const [analytics, setAnalytics] = useState({ taps1d: 0, taps1w: 0, taps1m: 0, tapsTotal: 0 });

  const [isEditingCreds, setIsEditingCreds] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [editPass, setEditPass] = useState("");
  const [showEditPass, setShowEditPass] = useState(false);

  const [messages, setMessages] = useState([]);
  const [contactForm, setContactForm] = useState({ name: "", contact: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const [copiedId, setCopiedId] = useState(null);
  const [activeQrModal, setActiveQrModal] = useState(null);
  const [saveToast, setSaveToast] = useState(false);

  // Music Player States
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.8);

  const avatarInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const qrInputRef = useRef(null);

  useEffect(() => {
    try {
      const savedAccount = localStorage.getItem("smarttap_v32_account");
      const savedProfile = localStorage.getItem("smarttap_v32_profile");
      const savedSetupDone = localStorage.getItem("smarttap_v32_setup_done");
      const savedAnalytics = localStorage.getItem("smarttap_v32_analytics");
      const savedMessages = localStorage.getItem("smarttap_v32_messages");

      if (savedAccount) {
        const acc = JSON.parse(savedAccount);
        setAccount(acc);
        setEditUser(acc.identifier || "");
        setEditPass(acc.password || "");
      }
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedMessages) setMessages(JSON.parse(savedMessages));

      const currentAnalytics = savedAnalytics ? JSON.parse(savedAnalytics) : { taps1d: 0, taps1w: 0, taps1m: 0, tapsTotal: 0 };

      if (savedSetupDone === "true" && savedProfile) {
        setScreen("view");
        const updated = {
          taps1d: currentAnalytics.taps1d + 1,
          taps1w: currentAnalytics.taps1w + 1,
          taps1m: currentAnalytics.taps1m + 1,
          tapsTotal: currentAnalytics.tapsTotal + 1
        };
        setAnalytics(updated);
        localStorage.setItem("smarttap_v32_analytics", JSON.stringify(updated));
      } else {
        setAnalytics(currentAnalytics);
      }
    } catch (e) {
      console.error("Failed to load local data:", e);
    }
    setIsLoaded(true);
  }, []);

  const theme = THEMES[profile.theme] || THEMES.default;

  const handleManualAuth = (e) => {
    e.preventDefault();
    setAuthError("");

    if (!authIdentifier.trim() || !authPassword.trim()) {
      setAuthError("Please enter username and password.");
      return;
    }

    if (authMode === "signup") {
      const newAcc = { identifier: authIdentifier.trim(), password: authPassword.trim() };
      setAccount(newAcc);
      setEditUser(newAcc.identifier);
      setEditPass(newAcc.password);
      localStorage.setItem("smarttap_v32_account", JSON.stringify(newAcc));
      setScreen("edit");
    } else {
      if (
        account &&
        account.identifier.toLowerCase() === authIdentifier.trim().toLowerCase() &&
        account.password === authPassword.trim()
      ) {
        setAuthIdentifier("");
        setAuthPassword("");
        setScreen("edit");
      } else {
        setAuthError("Incorrect username or password.");
      }
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file, 400, 0.8);
    setProfile((prev) => ({ ...prev, avatar: compressed }));
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remainingSlots = 4 - profile.photos.length;
    const filesToProcess = files.slice(0, remainingSlots);

    const compressedList = await Promise.all(
      filesToProcess.map((f) => compressImage(f, 700, 0.75))
    );
    setProfile((prev) => ({
      ...prev,
      photos: [...prev.photos, ...compressedList].slice(0, 4)
    }));
  };

  const removeGalleryPhoto = (idx) => {
    setProfile((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx)
    }));
  };

  const saveLinkItem = (e) => {
    e.preventDefault();
    if (!inputField1.trim()) return;

    let finalUrl = inputField1.trim();
    if (activeModal !== "music" && activeModal !== "business" && activeModal !== "social" && !/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    const newItem = {
      id: Date.now(),
      type: activeModal,
      platformId: selectedSubPlatform.id,
      label: selectedSubPlatform.name,
      badge: selectedSubPlatform.badge,
      url: finalUrl
    };

    setProfile((prev) => ({ ...prev, links: [...prev.links, newItem] }));
    setActiveModal(null);
    setSelectedSubPlatform(null);
    setInputField1("");
  };

  const saveGamingItem = (e) => {
    e.preventDefault();
    if (!inputField1.trim()) return;

    const newItem = {
      id: Date.now(),
      type: "gaming",
      platformId: selectedSubPlatform.id,
      label: selectedSubPlatform.name,
      badge: selectedSubPlatform.badge,
      gameDetails: {
        field1: inputField1.trim(),
        field2: inputField2.trim(),
        field3: inputField3.trim()
      }
    };

    setProfile((prev) => ({ ...prev, links: [...prev.links, newItem] }));
    setActiveModal(null);
    setSelectedSubPlatform(null);
    setInputField1("");
    setInputField2("");
    setInputField3("");
  };

  const savePaymentItem = (e) => {
    e.preventDefault();
    setModalError("");

    const cleanNum = inputField2.replace(/\s+/g, "");
    if (!inputField1.trim() || !cleanNum) {
      setModalError("Please enter Account Name and Number.");
      return;
    }

    const newPayment = {
      id: Date.now(),
      providerId: selectedSubPlatform.id,
      bankName: selectedSubPlatform.id === "others" ? inputField3.trim() : selectedSubPlatform.name,
      accountName: inputField1.trim(),
      accountNumber: cleanNum,
      qrImage: payQrImage
    };

    setProfile((prev) => ({ ...prev, payments: [...prev.payments, newPayment] }));
    setActiveModal(null);
    setSelectedSubPlatform(null);
    setInputField1("");
    setInputField2("");
    setInputField3("");
    setPayQrImage("");
  };

  const saveLocationItem = (e) => {
    e.preventDefault();
    if (!locAddress.trim()) return;
    const newLoc = { id: Date.now(), address: locAddress.trim(), mapUrl: locMapUrl.trim() };
    setProfile((prev) => ({ ...prev, locations: [...prev.locations, newLoc] }));
    setLocAddress("");
    setLocMapUrl("");
    setShowLocModal(false);
  };

  const removeItem = (id, category) => {
    if (category === "payment") {
      setProfile((prev) => ({ ...prev, payments: prev.payments.filter((p) => p.id !== id) }));
    } else if (category === "location") {
      setProfile((prev) => ({ ...prev, locations: prev.locations.filter((l) => l.id !== id) }));
    } else {
      setProfile((prev) => ({ ...prev, links: prev.links.filter((l) => l.id !== id) }));
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem("smarttap_v32_profile", JSON.stringify(profile));
    localStorage.setItem("smarttap_v32_setup_done", "true");
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      setScreen("view");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  const handleSaveContactVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${profile.name || "SmartTap User"}`,
      profile.phone ? `TEL;TYPE=CELL:${profile.phone}` : "",
      profile.email ? `EMAIL:${profile.email}` : "",
      profile.bio ? `NOTE:${profile.bio}` : "",
      "END:VCARD"
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(profile.name || "contact").replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getGmailComposeUrl = (emailAddress) => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadQrPhoto = (dataUrl, bankName) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${bankName.replace(/\s+/g, "_")}_QR.jpg`;
    a.click();
  };

  const handleSendContactMessage = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;
    const newMsg = {
      id: Date.now(),
      name: contactForm.name.trim(),
      contact: contactForm.contact.trim(),
      message: contactForm.message.trim(),
      date: new Date().toLocaleString()
    };
    const updatedMsgs = [newMsg, ...messages];
    setMessages(updatedMsgs);
    localStorage.setItem("smarttap_v32_messages", JSON.stringify(updatedMsgs));
    setContactSent(true);
    setContactForm({ name: "", contact: "", message: "" });
    setTimeout(() => setContactSent(false), 4000);
  };

  if (!isLoaded) return null;

  // --- SCREEN 1: CLAIM ---
  if (screen === "claim") {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col justify-between p-6">
        <header className="max-w-md w-full mx-auto pt-2 flex justify-between items-center">
          <BrandLogo size="md" />
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-medium">
            NFC Digital Card
          </span>
        </header>

        <main className="max-w-md w-full mx-auto my-auto py-10 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mx-auto shadow-lg shadow-indigo-950/50">
            <Sparkles className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Claim & Setup Your SmartTap Card
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Activate your personal digital profile. Share social links, music player, gaming IDs, video/GIF, locations, and payments.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                setAuthMode("signup");
                setScreen("auth");
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              Get Started — Claim Card
            </button>

            {account && (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setScreen("login_to_edit");
                }}
                className="w-full py-3 px-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-sm font-medium transition"
              >
                Already claimed? Sign in to Edit
              </button>
            )}
          </div>
        </main>

        <footer className="max-w-md w-full mx-auto text-center pb-4 text-xs text-slate-500">
          Powered by SmartTap PH
        </footer>
      </div>
    );
  }

  // --- SCREEN 2: AUTH ---
  if (screen === "auth" || screen === "login_to_edit") {
    const isOwnerLock = screen === "login_to_edit";

    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col justify-between p-6">
        <header className="max-w-md w-full mx-auto pt-2 flex items-center justify-between">
          <button
            onClick={() => setScreen(isOwnerLock ? "view" : "claim")}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <BrandLogo size="sm" />
        </header>

        <main className="max-w-md w-full mx-auto my-auto py-8">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">
                {isOwnerLock ? "Owner Verification" : "Create SmartTap Account"}
              </h2>
            </div>

            <form onSubmit={handleManualAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Username or Email</label>
                <input
                  type="text"
                  required
                  value={authIdentifier}
                  onChange={(e) => setAuthIdentifier(e.target.value)}
                  placeholder="e.g. juandelacruz"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showAuthPass ? "text" : "password"}
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAuthPass(!showAuthPass)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showAuthPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2.5">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition"
              >
                {isOwnerLock ? "Verify & Open Editor" : "Create Account & Start Setup"}
              </button>
            </form>
          </div>
        </main>
        <div />
      </div>
    );
  }

  // --- SCREEN 3: EDIT PROFILE ---
  if (screen === "edit") {
    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-200 pb-24`}>
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${theme.card}`}>
          <div className="max-w-xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <BrandLogo size="sm" />
            <button
              type="button"
              onClick={() => setScreen("view")}
              className="px-3 py-1.5 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview View</span>
            </button>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Edit SmartTap Profile</h1>
            <p className={`text-xs mt-1 ${theme.subtext}`}>
              Customize your info, verified badge, photos, video/GIF, links, music, gaming, locations, and payments.
            </p>
          </div>

          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center gap-2 font-semibold text-base">
              <User className="w-5 h-5 text-indigo-400" />
              <h2>Profile Information & Badge</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500/40 bg-slate-800 flex items-center justify-center shrink-0">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-slate-500" />
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                <input ref={cameraInputRef} type="file" accept="image/*" capture="user" onChange={handleAvatarUpload} className="hidden" />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition ${theme.pill}`}
                >
                  <ImageIcon className="w-4 h-4 text-indigo-400" />
                  Select Photo
                </button>
                {profile.avatar && (
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, avatar: "" })}
                    className="px-3 py-2 rounded-xl border border-rose-500/30 text-rose-400 text-xs font-medium hover:bg-rose-500/10 transition"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Juan Dela Cruz"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${theme.input}`}
                />
              </div>

              <div className="p-3.5 rounded-xl border bg-slate-900/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-400" /> Verified Checkmark Badge
                  </span>
                  <input
                    type="checkbox"
                    checked={profile.verifiedBadge?.enabled ?? true}
                    onChange={(e) => setProfile({
                      ...profile,
                      verifiedBadge: { ...profile.verifiedBadge, enabled: e.target.checked }
                    })}
                    className="w-4 h-4 accent-indigo-600 rounded"
                  />
                </div>
                {profile.verifiedBadge?.enabled && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className={`text-[11px] ${theme.subtext}`}>Badge Color:</span>
                    {[
                      { id: "text-blue-500", name: "Blue", bg: "bg-blue-500" },
                      { id: "text-amber-400", name: "Gold", bg: "bg-amber-400" },
                      { id: "text-emerald-500", name: "Green", bg: "bg-emerald-500" },
                      { id: "text-pink-500", name: "Pink", bg: "bg-pink-500" }
                    ].map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setProfile({
                          ...profile,
                          verifiedBadge: { ...profile.verifiedBadge, color: c.id }
                        })}
                        className={`w-6 h-6 rounded-full ${c.bg} border-2 ${profile.verifiedBadge?.color === c.id ? "border-white scale-110" : "border-transparent"} transition`}
                        title={c.name}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Bio / Title</label>
                <textarea
                  rows={2}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Entrepreneur | Gamer | Manila, PH"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${theme.input}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="09171234567"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${theme.input}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="you@gmail.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${theme.input}`}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <ImageIcon className="w-5 h-5 text-indigo-400" />
                <h2>Featured Photos & Video / GIF</h2>
              </div>
              <span className={`text-xs ${theme.subtext}`}>{profile.photos.length}/4 Photos</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {profile.photos.map((photo, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 group">
                  <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryPhoto(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/75 text-white flex items-center justify-center hover:bg-rose-600 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {profile.photos.length < 4 && (
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 text-xs font-medium transition ${theme.accentSoft}`}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Photo</span>
                </button>
              )}
            </div>
            <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />

            <div className="pt-2">
              <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Featured Video / GIF Direct URL</label>
              <input
                type="text"
                value={profile.featuredVideo || ""}
                onChange={(e) => setProfile({ ...profile, featuredVideo: e.target.value })}
                placeholder="https://... (mp4 video or gif link)"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${theme.input}`}
              />
            </div>
          </section>

          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <LinkIcon className="w-5 h-5 text-indigo-400" />
                <h2>Links & Categories</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setActiveModal("social")}
                className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${theme.pill}`}
              >
                <Share2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold">Add Social</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("music")}
                className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${theme.pill}`}
              >
                <Music className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold">Add Music</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("gaming")}
                className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${theme.pill}`}
              >
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold">Add Gaming</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("business")}
                className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${theme.pill}`}
              >
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold">Add Business</span>
              </button>
            </div>

            {profile.links.length > 0 && (
              <div className="space-y-2.5 pt-2">
                {profile.links.map((item) => (
                  <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme.pill}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 uppercase shadow">
                        {item.badge || item.type.slice(0, 2)}
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-semibold truncate">{item.label}</p>
                        <p className={`text-xs truncate ${theme.subtext}`}>
                          {item.url || `${item.gameDetails?.field1} ${item.gameDetails?.field2 ? `• ${item.gameDetails.field2}` : ""}`}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.type)}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <h2>Locations / Pickup Stores ({profile.locations.length})</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLocAddress("");
                  setLocMapUrl("");
                  setShowLocModal(true);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition ${theme.accent}`}
              >
                <Plus className="w-4 h-4" />
                Add Location
              </button>
            </div>

            {profile.locations.length === 0 ? (
              <p className={`text-xs py-3 text-center rounded-xl border border-dashed border-slate-700/60 ${theme.subtext}`}>
                No locations added yet.
              </p>
            ) : (
              <div className="space-y-2.5">
                {profile.locations.map((loc) => (
                  <div key={loc.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme.pill}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-semibold truncate">{loc.address}</p>
                        {loc.mapUrl && <p className={`text-xs truncate ${theme.subtext}`}>{loc.mapUrl}</p>}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(loc.id, "location")}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center gap-2 font-semibold text-base">
              <Palette className="w-5 h-5 text-indigo-400" />
              <h2>Profile Theme Default</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.values(THEMES).map((t) => {
                const isSelected = profile.theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setProfile({ ...profile, theme: t.id })}
                    className={`p-3 rounded-xl border text-left transition flex flex-col gap-2 ${
                      isSelected ? "border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-500/10" : theme.pill
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full border-2 ${t.swatch}`} />
                    <span className="text-xs font-semibold leading-tight">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <CreditCard className="w-5 h-5 text-indigo-400" />
                <h2>Payment & Bank Accounts</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedSubPlatform(null);
                  setActiveModal("payment");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition ${theme.accent}`}
              >
                <Plus className="w-4 h-4" />
                Add Payment
              </button>
            </div>

            {profile.payments.length === 0 ? (
              <p className={`text-xs py-3 text-center rounded-xl border border-dashed border-slate-700/60 ${theme.subtext}`}>
                Add GCash, Maya, MariBank, GoTyme, BDO, or other banks.
              </p>
            ) : (
              <div className="space-y-2.5">
                {profile.payments.map((pay) => (
                  <div key={pay.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme.pill}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        ₱
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-semibold">{pay.bankName}</p>
                        <p className={`text-xs truncate ${theme.subtext}`}>{pay.accountName} • {pay.accountNumber}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(pay.id, "payment")}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        <div className={`fixed bottom-0 inset-x-0 p-4 border-t backdrop-blur-md ${theme.card}`}>
          <div className="max-w-xl mx-auto">
            <button
              type="button"
              onClick={handleSaveProfile}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              {saveToast ? "Saved & Published!" : "Save & Publish SmartTap Profile"}
            </button>
          </div>
        </div>

        {/* MODALS */}
        {showLocModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">Add Location / Store</h3>
                <button onClick={() => setShowLocModal(false)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={saveLocationItem} className="space-y-3.5">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Store Address / Name</label>
                  <input
                    type="text"
                    required
                    value={locAddress}
                    onChange={(e) => setLocAddress(e.target.value)}
                    placeholder="e.g. Balai Seafood Restaurant, Boracay"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Google Maps / Waze Link (Optional)</label>
                  <input
                    type="text"
                    value={locMapUrl}
                    onChange={(e) => setLocMapUrl(e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowLocModal(false)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold">Save Location</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base capitalize">
                  {selectedSubPlatform ? `Add ${selectedSubPlatform.name}` : `Select ${activeModal} Platform`}
                </h3>
                <button onClick={() => { setActiveModal(null); setSelectedSubPlatform(null); }} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!selectedSubPlatform ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {(activeModal === "social" ? SOCIAL_PLATFORMS :
                    activeModal === "music" ? MUSIC_PLATFORMS :
                    activeModal === "gaming" ? GAMING_PLATFORMS :
                    activeModal === "business" ? BUSINESS_PLATFORMS : PAYMENT_PROVIDERS).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedSubPlatform(item)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-left transition"
                    >
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {item.badge || "•"}
                      </span>
                      <span className="text-xs font-semibold truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              ) : activeModal === "gaming" ? (
                <form onSubmit={saveGamingItem} className="space-y-3.5">
                  {selectedSubPlatform.fields.map((fieldName, idx) => (
                    <div key={idx}>
                      <label className="block text-xs text-slate-400 mb-1">{fieldName}</label>
                      <input
                        type="text"
                        required={idx === 0}
                        value={idx === 0 ? inputField1 : idx === 1 ? inputField2 : inputField3}
                        onChange={(e) => {
                          if (idx === 0) setInputField1(e.target.value);
                          else if (idx === 1) setInputField2(e.target.value);
                          else setInputField3(e.target.value);
                        }}
                        placeholder={`Enter ${fieldName}`}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setSelectedSubPlatform(null)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold">Back</button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold">Save Gaming ID</button>
                  </div>
                </form>
              ) : activeModal === "payment" ? (
                <form onSubmit={savePaymentItem} className="space-y-3.5">
                  {selectedSubPlatform.id === "others" && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Bank or E-Wallet Name</label>
                      <input
                        type="text"
                        required
                        value={inputField3}
                        onChange={(e) => setInputField3(e.target.value)}
                        placeholder="e.g. UnionBank"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Account Name</label>
                    <input
                      type="text"
                      required
                      value={inputField1}
                      onChange={(e) => setInputField1(e.target.value)}
                      placeholder="Juan Dela Cruz"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">{selectedSubPlatform.label}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={inputField2}
                      onChange={(e) => setInputField2(e.target.value.replace(/\D/g, ""))}
                      placeholder={selectedSubPlatform.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Payment QR Code (Optional)</label>
                    <input ref={qrInputRef} type="file" accept="image/*" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) setPayQrImage(await compressImage(f, 500, 0.8));
                    }} className="hidden" />
                    {payQrImage ? (
                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#090d16] border border-slate-700">
                        <img src={payQrImage} alt="QR" className="w-12 h-12 rounded object-cover bg-white" />
                        <span className="text-xs text-slate-300 flex-1">QR attached</span>
                        <button type="button" onClick={() => setPayQrImage("")} className="text-xs text-rose-400">Remove</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => qrInputRef.current?.click()} className="w-full py-2.5 border border-dashed border-slate-600 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2">
                        <QrCode className="w-4 h-4 text-indigo-400" /> Upload QR Image
                      </button>
                    )}
                  </div>

                  {modalError && <p className="text-xs text-rose-400">{modalError}</p>}

                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setSelectedSubPlatform(null)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold">Back</button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold">Save Payment</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={saveLinkItem} className="space-y-3.5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Destination URL / Link</label>
                    <input
                      type="text"
                      required
                      value={inputField1}
                      onChange={(e) => setInputField1(e.target.value)}
                      placeholder={selectedSubPlatform.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setSelectedSubPlatform(null)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold">Back</button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold">Save Link</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- SCREEN 4: VIEWERS PAGE ---
  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-200 flex flex-col justify-between py-6 px-4`}>
      <div className="max-w-md w-full mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <BrandLogo size="sm" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const keys = Object.keys(THEMES);
                const nextIdx = (keys.indexOf(profile.theme) + 1) % keys.length;
                setProfile({ ...profile, theme: keys[nextIdx] });
              }}
              className={`p-2 rounded-full border transition ${theme.pill}`}
              title="Quick Theme Toggle"
            >
              <Palette className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              type="button"
              onClick={() => setShowShareQrModal(true)}
              className={`p-2 rounded-full border transition ${theme.pill}`}
              title="Share Profile QR"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={() => setShowSearchModal(true)}
              className={`p-2 rounded-full border transition ${theme.pill}`}
              title="Search Profile"
            >
              <Search className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setAnalyticsPin("");
                setAnalyticsPinError("");
                setAnalyticsUnlocked(false);
                setIsEditingCreds(false);
                setShowAnalyticsModal(true);
              }}
              className={`p-2 rounded-full border transition ${theme.pill}`}
              title="Owner Analytics & Account"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthIdentifier("");
                setAuthPassword("");
                setAuthError("");
                setScreen("login_to_edit");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition ${theme.pill}`}
              title="Owner Edit Profile"
            >
              <Pencil className="w-3.5 h-3.5 text-indigo-400" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        <div className={`rounded-3xl border p-6 space-y-6 shadow-xl ${theme.card}`}>
          {/* Avatar & Name (Conditional avatar: if empty, no fallback circle) */}
          <div className="text-center space-y-3">
            {profile.avatar && (
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-2 border-indigo-500/50 shadow-md bg-slate-800 flex items-center justify-center">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <div className="inline-flex items-center justify-center gap-1.5">
                <h1 className="text-xl font-extrabold tracking-tight">
                  {profile.name || "SmartTap User"}
                </h1>
                {profile.verifiedBadge?.enabled && (
                  <ShieldCheck className={`w-5 h-5 shrink-0 ${profile.verifiedBadge.color || "text-blue-500"}`} title="Verified Profile" />
                )}
              </div>
              {profile.bio && (
                <p className={`text-xs mt-1 leading-relaxed ${theme.subtext}`}>
                  {profile.bio}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(typeof window !== "undefined" ? window.location.href : "", "profile_url")}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold inline-flex items-center gap-1.5 mx-auto transition ${theme.pill}`}
            >
              {copiedId === "profile_url" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{copiedId === "profile_url" ? "Profile Link Copied!" : "Copy Profile Link"}</span>
            </button>
          </div>

          {/* Gallery Pictures */}
          {profile.photos.length > 0 && (
            <div className={`grid gap-2 ${profile.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {profile.photos.map((photo, index) => (
                <div key={index} className={`rounded-2xl overflow-hidden border border-slate-700/40 ${profile.photos.length === 1 ? "aspect-video" : "aspect-square"}`}>
                  <img src={photo} alt={`Featured ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Featured Video / GIF Loop (with full mobile support) */}
          {profile.featuredVideo && (
            <div className="rounded-2xl overflow-hidden border border-slate-700/60 bg-black relative shadow-inner">
              <video
                src={profile.featuredVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-video object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-slate-300 font-mono uppercase">
                Featured Loop
              </div>
            </div>
          )}

          {/* Contact buttons */}
          {(profile.phone || profile.email) && (
            <div className="space-y-2.5">
              {profile.phone && (
                <div className="grid grid-cols-2 gap-2.5">
                  <a href={`tel:${profile.phone}`} className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${theme.pill}`}>
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call</span>
                  </a>
                  <button type="button" onClick={handleSaveContactVCard} className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${theme.accent}`}>
                    <UserPlus className="w-4 h-4" />
                    <span>Save Contact</span>
                  </button>
                </div>
              )}
              {profile.email && (
                <div className="grid grid-cols-2 gap-2.5">
                  <a href={getGmailComposeUrl(profile.email)} target="_blank" rel="noopener noreferrer" className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${theme.pill}`}>
                    <Mail className="w-4 h-4 text-rose-400" />
                    <span>Email (Compose)</span>
                  </a>
                  <button type="button" onClick={() => copyToClipboard(profile.email, "email_copy")} className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${theme.pill}`}>
                    {copiedId === "email_copy" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
                    <span>{copiedId === "email_copy" ? "Copied" : "Save Email"}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Locations */}
          {profile.locations && profile.locations.length > 0 && (
            <div className="space-y-2.5">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${theme.subtext}`}>
                Locations / Stores
              </p>
              <div className="space-y-2">
                {profile.locations.map((loc) => (
                  <div key={loc.id} className={`p-3.5 rounded-2xl border space-y-2 ${theme.pill}`}>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold">{loc.address}</p>
                      </div>
                    </div>
                    {loc.mapUrl && (
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in Google Maps / Waze</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links & Categories */}
          {profile.links.length > 0 && (
            <div className="space-y-4">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${theme.subtext}`}>
                Links & Categories
              </p>

              {/* Dynamic Music Player Card with real title */}
              {profile.links.filter(l => l.type === "music").map(musicItem => (
                <div key={musicItem.id} className={`p-3.5 rounded-2xl border flex items-center justify-between ${theme.pill}`}>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 ${isPlayingMusic ? "animate-spin" : ""}`}>
                      <Music className="w-5 h-5" />
                    </div>
                    <div className="truncate flex-1">
                      <p className="text-xs font-bold truncate">{musicItem.label}</p>
                      <p className={`text-[10px] truncate ${theme.subtext}`}>Audio Track Player</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <button
                      type="button"
                      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow"
                    >
                      {isPlayingMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <a
                      href={musicItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 transition"
                      title="Open Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}

              {["social", "music", "gaming", "business"].map((catKey) => {
                const catLinks = profile.links.filter(l => l.type === catKey && l.type !== "music");
                if (catKey === "music" || catLinks.length === 0) return null;

                return (
                  <div key={catKey} className="space-y-2 pt-1 border-t border-slate-700/50 first:border-t-0 first:pt-0">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{catKey}</p>
                    <div className="space-y-2">
                      {catLinks.map((item) => (
                        <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme.pill}`}>
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 uppercase shadow">
                              {item.badge || item.type.slice(0, 2)}
                            </span>
                            <div className="truncate flex-1">
                              <span className="text-sm font-semibold truncate block">{item.label}</span>
                              {item.type === "gaming" ? (
                                <span className={`text-xs truncate block font-mono ${theme.subtext}`}>
                                  {item.gameDetails?.field1} {item.gameDetails?.field2 ? `• ${item.gameDetails.field2}` : ""}
                                </span>
                              ) : (
                                <span className={`text-xs truncate block ${theme.subtext}`}>{item.url}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 ml-2">
                            {item.type === "gaming" ? (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(`${item.gameDetails?.field1} ${item.gameDetails?.field2 ? `(${item.gameDetails.field2})` : ""}`, item.id)}
                                  className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold inline-flex items-center gap-1 transition shrink-0"
                                  title="Copy ID"
                                >
                                  {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedId === item.id ? "Copied" : "Copy"}</span>
                                </button>
                                <a
                                  href={item.url || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 text-[11px] font-semibold inline-flex items-center gap-1 transition shrink-0"
                                  title="Open App"
                                >
                                  <span>Open</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            ) : (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 transition shrink-0"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Payments */}
          {profile.payments.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-700/50">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${theme.subtext}`}>
                Payment & Transfers
              </p>
              <div className="space-y-2.5">
                {profile.payments.map((pay) => (
                  <div key={pay.id} className={`p-3.5 rounded-2xl border space-y-2.5 ${theme.pill}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                          ₱
                        </span>
                        <div>
                          <p className="text-xs font-bold">{pay.bankName}</p>
                          <p className={`text-[11px] ${theme.subtext}`}>{pay.accountName}</p>
                        </div>
                      </div>
                      {pay.qrImage && (
                        <button
                          type="button"
                          onClick={() => setActiveQrModal(pay)}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 text-xs font-semibold inline-flex items-center gap-1 transition"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>View QR</span>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between bg-black/20 rounded-xl px-3 py-2">
                      <span className="font-mono text-sm font-semibold tracking-wide">{pay.accountNumber}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(pay.accountNumber, pay.id)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-1 transition"
                      >
                        {copiedId === pay.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === pay.id ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leave a Message Form */}
          <div className={`p-4 rounded-2xl border space-y-3 ${theme.pill}`}>
            <p className="text-xs font-bold">Leave a Message</p>
            {contactSent ? (
              <p className="text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl text-center">
                Message successfully sent to card owner inbox!
              </p>
            ) : (
              <form onSubmit={handleSendContactMessage} className="space-y-2.5">
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your Name"
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${theme.input}`}
                />
                <input
                  type="text"
                  value={contactForm.contact}
                  onChange={(e) => setContactForm({ ...contactForm, contact: e.target.value })}
                  placeholder="Your Email or Phone (Optional)"
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${theme.input}`}
                />
                <textarea
                  rows={2}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Type your message here..."
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${theme.input}`}
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <footer className="max-w-md w-full mx-auto text-center pt-8 pb-2 space-y-1.5">
        <div className="flex justify-center opacity-80"><BrandLogo size="sm" /></div>
        <p className={`text-xs ${theme.subtext}`}>Tap smarter. Share your world in one touch.</p>
        <p className={`text-[11px] ${theme.subtext}`}>
          Want to get your own SmartTap card?{" "}
          <a href={TIKTOK_SHOP_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-semibold">
            Order here on our TikTok Shop →
          </a>
        </p>
      </footer>

      {/* SHARE PROFILE QR MODAL (Fixed display) */}
      {showShareQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Share Profile</span>
              <button onClick={() => setShowShareQrModal(false)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto">
              <div className="w-48 h-48 bg-slate-900 rounded-xl flex items-center p-3 justify-center text-center text-xs text-white font-mono break-all overflow-hidden">
                {typeof window !== "undefined" ? window.location.href : "SmartTap Profile"}
              </div>
            </div>
            <p className="text-xs text-slate-400">Scan or copy link to share this profile instantly.</p>
            <button
              type="button"
              onClick={() => copyToClipboard(typeof window !== "undefined" ? window.location.href : "", "qr_url")}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs inline-flex items-center justify-center gap-2 transition"
            >
              <Copy className="w-4 h-4" /> {copiedId === "qr_url" ? "Link Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 pt-20">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 bg-slate-900 px-3 py-2 rounded-xl border border-slate-700">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search links, payments, games..."
                  className="bg-transparent text-xs text-white focus:outline-none w-full"
                />
              </div>
              <button onClick={() => setShowSearchModal(false)} className="ml-2 p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pt-1">
              {profile.links.filter(l => l.label.toLowerCase().includes(searchQuery.toLowerCase())).map(l => (
                <div key={l.id} className="p-2.5 rounded-xl bg-slate-800/80 text-xs flex justify-between items-center">
                  <span>{l.label}</span>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-semibold">Open</a>
                </div>
              ))}
              {profile.payments.filter(p => p.bankName.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                <div key={p.id} className="p-2.5 rounded-xl bg-slate-800/80 text-xs flex justify-between items-center">
                  <span>{p.bankName} ({p.accountNumber})</span>
                  <button onClick={() => copyToClipboard(p.accountNumber, p.id)} className="text-indigo-400 font-semibold">Copy</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OWNER ANALYTICS & MESSAGES MODAL */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">Owner Analytics & Inbox</h3>
              </div>
              <button onClick={() => setShowAnalyticsModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!analyticsUnlocked ? (
              <div className="space-y-4 py-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Owner Access Required</h4>
                  <p className="text-xs text-slate-400 mt-1">Enter your password to view analytics and inbox messages.</p>
                </div>
                <div className="space-y-2">
                  <input
                    type="password"
                    autoFocus
                    value={analyticsPin}
                    onChange={(e) => setAnalyticsPin(e.target.value)}
                    placeholder="Enter owner password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white text-center"
                  />
                  {analyticsPinError && <p className="text-xs text-rose-400">{analyticsPinError}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (account && analyticsPin === account.password) {
                      setAnalyticsUnlocked(true);
                      setAnalyticsPinError("");
                    } else {
                      setAnalyticsPinError("Incorrect password. Access denied.");
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
                >
                  Unlock Owner Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tap Statistics</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400">Last 1 Day</p>
                      <p className="text-xl font-extrabold text-indigo-400 mt-1">{analytics.taps1d}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400">Last 1 Week</p>
                      <p className="text-xl font-extrabold text-indigo-400 mt-1">{analytics.taps1w}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400">Last 1 Month</p>
                      <p className="text-xl font-extrabold text-indigo-400 mt-1">{analytics.taps1m}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400">Total Taps</p>
                      <p className="text-xl font-extrabold text-emerald-400 mt-1">{analytics.tapsTotal}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold">Owner Credentials</p>
                    {!isEditingCreds ? (
                      <button
                        type="button"
                        onClick={() => setIsEditingCreds(true)}
                        className="text-xs text-indigo-400 hover:underline font-semibold"
                      >
                        Change Username / Password
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditingCreds(false)}
                        className="text-xs text-slate-400 hover:underline"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {!isEditingCreds ? (
                    <div className="text-xs space-y-1 text-slate-300">
                      <p><span className="text-slate-500">Username:</span> {account?.identifier}</p>
                      <p><span className="text-slate-500">Password:</span> ••••••••</p>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">New Username</label>
                        <input
                          type="text"
                          value={editUser}
                          onChange={(e) => setEditUser(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">New Password</label>
                        <input
                          type="password"
                          value={editPass}
                          onChange={(e) => setEditPass(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedAcc = { identifier: editUser.trim(), password: editPass.trim() };
                          setAccount(updatedAcc);
                          localStorage.setItem("smarttap_v32_account", JSON.stringify(updatedAcc));
                          setIsEditingCreds(false);
                          alert("Credentials updated successfully!");
                        }}
                        className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                      >
                        Save New Credentials
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    Viewer Messages Inbox ({messages.length})
                  </p>
                  {messages.length === 0 ? (
                    <p className="text-xs py-4 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-500">
                      No messages received yet.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {messages.map((m) => (
                        <div key={m.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{m.name}</span>
                            <span className="text-[10px] text-slate-500">{m.date}</span>
                          </div>
                          {m.contact && <p className="text-[11px] text-indigo-400 font-mono">Contact: {m.contact}</p>}
                          <p className="text-xs text-slate-300">{m.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowAnalyticsModal(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
                >
                  Close Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR MODAL */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{activeQrModal.bankName} QR</span>
              <button onClick={() => setActiveQrModal(null)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-white p-3 rounded-2xl inline-block mx-auto">
              <img src={activeQrModal.qrImage} alt="QR" className="w-56 h-56 object-contain" />
            </div>
            <div>
              <p className="font-bold text-sm">{activeQrModal.accountName}</p>
              <p className="font-mono text-xs text-slate-400">{activeQrModal.accountNumber}</p>
            </div>
            <button
              type="button"
              onClick={() => downloadQrPhoto(activeQrModal.qrImage, activeQrModal.bankName)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4" /> Save QR to Photos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
