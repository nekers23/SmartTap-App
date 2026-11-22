"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import {
  Share2,
  Download,
  UserPlus,
  QrCode,
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  CreditCard,
  Send,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Video,
  Sparkles,
  Palette,
  Edit3,
  Eye,
  EyeOff,
  Trash2,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowRight,
  X,
  Upload,
  Shield,
  KeyRound,
  LogOut,
  BarChart3,
  MessageSquare,
  MessageCircle,
  Pin,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  FileSpreadsheet,
  Image as ImageIcon,
  Lock,
  Clock,
  Navigation,
  WifiOff,
  MousePointerClick,
} from "lucide-react";

const FOUNDER_PASSCODE = "SMARTTAP2026";
const APP_BASE_URL = "https://smarttapapp.vercel.app";

const THEMES = {
  obsidian: {
    id: "obsidian",
    name: "Obsidian Gold",
    bg: "bg-[#09090b]",
    card: "bg-[#121216]/90 border-white/10",
    subCard: "bg-white/[0.04] border-white/10",
    text: "text-zinc-100",
    muted: "text-zinc-400",
    accent: "from-amber-400 via-yellow-500 to-amber-600",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500/15 border-amber-400/30 text-amber-300",
    button: "bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-semibold",
    glow: "shadow-[0_0_40px_-12px_rgba(251,191,36,0.35)]",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Luxe",
    bg: "bg-[#04110d]",
    card: "bg-[#091d16]/90 border-emerald-400/15",
    subCard: "bg-emerald-950/40 border-emerald-400/15",
    text: "text-emerald-50",
    muted: "text-emerald-300/70",
    accent: "from-emerald-400 via-teal-400 to-emerald-600",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
    button: "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 font-semibold",
    glow: "shadow-[0_0_40px_-12px_rgba(52,211,153,0.35)]",
  },
  royal: {
    id: "royal",
    name: "Royal Cobalt",
    bg: "bg-[#060b19]",
    card: "bg-[#0d162c]/90 border-blue-400/15",
    subCard: "bg-blue-950/40 border-blue-400/15",
    text: "text-slate-100",
    muted: "text-slate-400",
    accent: "from-sky-400 via-blue-500 to-indigo-500",
    accentText: "text-sky-400",
    accentBg: "bg-sky-500/15 border-sky-400/30 text-sky-300",
    button: "bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-semibold",
    glow: "shadow-[0_0_40px_-12px_rgba(56,189,248,0.35)]",
  },
  crimson: {
    id: "crimson",
    name: "Crimson Noir",
    bg: "bg-[#120609]",
    card: "bg-[#1d0b10]/90 border-rose-400/15",
    subCard: "bg-rose-950/40 border-rose-400/15",
    text: "text-rose-50",
    muted: "text-rose-300/70",
    accent: "from-rose-400 via-red-500 to-pink-600",
    accentText: "text-rose-400",
    accentBg: "bg-rose-500/15 border-rose-400/30 text-rose-300",
    button: "bg-gradient-to-r from-rose-400 to-pink-500 text-rose-950 font-semibold",
    glow: "shadow-[0_0_40px_-12px_rgba(251,113,133,0.35)]",
  },
  violet: {
    id: "violet",
    name: "Cyber Violet",
    bg: "bg-[#0c0717]",
    card: "bg-[#160e29]/90 border-violet-400/15",
    subCard: "bg-violet-950/40 border-violet-400/15",
    text: "text-violet-50",
    muted: "text-violet-300/70",
    accent: "from-fuchsia-400 via-purple-500 to-indigo-500",
    accentText: "text-fuchsia-400",
    accentBg: "bg-fuchsia-500/15 border-fuchsia-400/30 text-fuchsia-300",
    button: "bg-gradient-to-r from-fuchsia-400 to-purple-500 text-purple-950 font-semibold",
    glow: "shadow-[0_0_40px_-12px_rgba(217,70,239,0.35)]",
  },
  sunset: {
    id: "sunset",
    name: "Sunset Copper",
    bg: "bg-[#140a06]",
    card: "bg-[#21110a]/90 border-orange-400/15",
    subCard: "bg-orange-950/40 border-orange-400/15",
    text: "text-orange-50",
    muted: "text-orange-300/70",
    accent: "from-orange-400 via-amber-500 to-red-500",
    accentText: "text-orange-400",
    accentBg: "bg-orange-500/15 border-orange-400/30 text-orange-300",
    button: "bg-gradient-to-r from-orange-400 to-amber-500 text-zinc-950 font-semibold",
    glow: "shadow-[0_0_40px_-12px_rgba(251,146,60,0.35)]",
  },
  midnight: {
    id: "midnight",
    name: "Midnight Rose",
    bg: "bg-[#110814]",
    card: "bg-[#1c0e21]/90 border-pink-400/15",
    subCard: "bg-pink-950/40 border-pink-400/15",
    text: "text-pink-50",
    muted: "text-pink-300/70",
    accent: "from-pink-400 via-rose-400 to-purple-500",
    accentText: "text-pink-400",
    accentBg: "bg-pink-500/15 border-pink-400/30 text-pink-300",
    button: "bg-gradient-to-r from-pink-400 to-rose-400 text-zinc-950 font-semibold",
    glow: "shadow-[0_0_40px_-12px_rgba(244,114,182,0.35)]",
  },
  arctic: {
    id: "arctic",
    name: "Arctic Frost",
    bg: "bg-slate-100",
    card: "bg-white/95 border-sky-200/90",
    subCard: "bg-sky-50/80 border-sky-200/70",
    text: "text-slate-900",
    muted: "text-slate-500",
    accent: "from-sky-500 via-blue-600 to-indigo-600",
    accentText: "text-sky-600",
    accentBg: "bg-sky-500/10 border-sky-500/25 text-sky-700",
    button: "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold",
    glow: "shadow-[0_12px_36px_-12px_rgba(14,165,233,0.2)]",
  },
  pearl: {
    id: "pearl",
    name: "Minimal Pearl",
    bg: "bg-zinc-100",
    card: "bg-white/95 border-zinc-200/90",
    subCard: "bg-zinc-50 border-zinc-200/80",
    text: "text-zinc-900",
    muted: "text-zinc-500",
    accent: "from-zinc-800 via-zinc-900 to-black",
    accentText: "text-zinc-900",
    accentBg: "bg-zinc-900/10 border-zinc-900/20 text-zinc-900",
    button: "bg-zinc-900 text-white font-semibold",
    glow: "shadow-[0_12px_36px_-12px_rgba(0,0,0,0.14)]",
  },
};

const TEXTURES = {
  matte: { id: "matte", name: "Clean Matte", style: {} },
  glass: {
    id: "glass",
    name: "Frosted Glass",
    style: {
      backgroundImage:
        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06) 0%, transparent 45%)",
    },
  },
  carbon: {
    id: "carbon",
    name: "Carbon Weave",
    style: {
      backgroundImage:
        "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
      backgroundSize: "16px 16px",
      backgroundPosition: "0 0, 8px 8px",
    },
  },
  grid: {
    id: "grid",
    name: "Tech Grid",
    style: {
      backgroundImage:
        "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    },
  },
  aurora: {
    id: "aurora",
    name: "Aurora Glow",
    style: {
      backgroundImage:
        "radial-gradient(ellipse at top, rgba(251,191,36,0.14), transparent 60%), radial-gradient(ellipse at bottom, rgba(56,189,248,0.12), transparent 60%)",
    },
  },
};

const PAYMENT_PROVIDERS = [
  { id: "GCash", label: "GCash", digits: 11, placeholder: "09XXXXXXXXX (11 digits)" },
  { id: "Maya", label: "Maya", digits: 11, placeholder: "09XXXXXXXXX (11 digits)" },
  { id: "GoTyme", label: "GoTyme Bank", digits: 12, placeholder: "12-digit GoTyme Account" },
  { id: "BDO", label: "BDO Unibank", digits: 12, placeholder: "12-digit BDO Account" },
  { id: "BPI", label: "BPI", digits: 10, placeholder: "10-digit BPI Account" },
  { id: "UnionBank", label: "UnionBank", digits: 12, placeholder: "12-digit UnionBank Account" },
  { id: "SeaBank", label: "SeaBank", digits: 11, placeholder: "11-digit SeaBank Account" },
  { id: "Custom", label: "Other Bank / E-Wallet", digits: 0, placeholder: "Account Number" },
];

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DEFAULT_PROFILE = {
  fullName: "Juan Dela Cruz",
  username: "demo",
  headline: "Founder & Digital Creator",
  company: "SmartTap Philippines",
  location: "Metro Manila, Philippines",
  mapQuery: "Metro Manila, Philippines",
  bio: "Tap once to connect, save my contact, explore my ventures, or send instant payments.",
  avatarUrl: "",
  coverUrl: "",
  verified: true,
  theme: "obsidian",
  texture: "aurora",
  allowViewerThemeSwitch: true,
  phone: "+63 917 123 4567",
  email: "hello@smarttap.ph",
  website: "https://smarttapapp.vercel.app",
  whatsapp: "",
  viber: "",
  telegram: "",
  messenger: "",
  ctaLabel: "Order SmartTap NFC Cards",
  ctaUrl: "https://www.tiktok.com/@smarttap.ph",
  orderFooterUrl: "https://www.tiktok.com/@smarttap.ph",
  videoUrl: "",
  videoCaption: "Featured Video Showcase",
  showBusinessHours: false,
  openTime: "09:00",
  closeTime: "21:00",
  openDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  showBookingSection: true,
  showPaymentSection: true,
  showContactForm: true,
  links: [
    {
      id: "lnk-1",
      category: "social",
      platform: "TikTok",
      title: "Official SmartTap TikTok",
      subtitle: "@smarttap.ph",
      url: "https://www.tiktok.com/@smarttap.ph",
      pinned: true,
      clicks: 0,
    },
    {
      id: "lnk-2",
      category: "business",
      platform: "Portfolio",
      title: "Product Catalog & Packages",
      subtitle: "Custom NFC Review Cards & Stands",
      url: "https://smarttapapp.vercel.app",
      pinned: false,
      clicks: 0,
    },
    {
      id: "lnk-3",
      category: "gaming",
      platform: "Mobile Legends",
      title: "MLBB Main Account",
      subtitle: "123456789 (3012)",
      gameId: "123456789 (3012)",
      url: "https://m.mobilelegends.com",
      pinned: false,
      clicks: 0,
    },
    {
      id: "lnk-4",
      category: "music",
      platform: "Spotify",
      title: "Late Night Focus Mix",
      subtitle: "Curated Chill & Lo-Fi",
      url: "https://open.spotify.com",
      audioUrl: "",
      pinned: false,
      clicks: 0,
    },
  ],
  payments: [
    {
      id: "pay-1",
      provider: "GCash",
      accountName: "Juan Dela Cruz",
      accountNumber: "09171234567",
      qrUrl: "",
    },
  ],
  bookingSlots: ["10:00 AM", "01:30 PM", "04:00 PM", "07:00 PM"],
};

function SmartTapLogoMark({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" fillOpacity="0.14" />
      <path
        d="M19.5 10.5C18.2 9.5 16.4 9 14.5 9C11.7 9 9.8 10.5 9.8 12.6C9.8 14.9 12 15.7 15 16.3C17.8 16.9 19.6 17.6 19.6 19.8C19.6 21.9 17.6 23.2 14.7 23.2C12.4 23.2 10.5 22.4 9.2 21.1"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M22.2 11.2C23.5 12.6 24.2 14.3 24.2 16.1C24.2 17.9 23.5 19.6 22.2 21"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Strict URL Validator: checks protocol, valid hostname with TLD, no spaces
function validateUrlFormat(raw) {
  if (!raw || typeof raw !== "string" || !raw.trim()) {
    return { valid: true, url: "", reason: "" }; // empty optional URL is allowed
  }
  const trimmed = raw.trim();
  if (trimmed === "#" || /\s/.test(trimmed)) {
    return { valid: false, url: "", reason: "URL contains spaces or invalid '#'" };
  }
  const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(normalized);
    const hostParts = parsed.hostname.split(".");
    if (
      hostParts.length < 2 ||
      hostParts[hostParts.length - 1].length < 2 ||
      parsed.hostname.includes("..")
    ) {
      return { valid: false, url: normalized, reason: "Invalid domain extension (e.g. .com, .ph)" };
    }
    return { valid: true, url: normalized, reason: "" };
  } catch {
    return { valid: false, url: normalized, reason: "Malformed URL syntax" };
  }
}

function sanitizeUrl(raw) {
  const res = validateUrlFormat(raw);
  return res.valid ? res.url : "";
}

function isDirectVideoFile(url) {
  if (!url) return false;
  if (url.startsWith("blob:") || url.startsWith("data:video")) return true;
  const clean = url.split("?")[0].toLowerCase();
  if (/\.(mp4|webm|mov|m4v|ogg)$/i.test(clean)) return true;
  if (url.includes("/storage/v1/object/public/smarttap-media/videos/")) return true;
  return false;
}

function computeBusinessStatus(profile) {
  if (!profile.showBusinessHours) return null;
  const now = new Date();
  const dayName = WEEK_DAYS[now.getDay()];
  const openDays = Array.isArray(profile.openDays) ? profile.openDays : WEEK_DAYS;
  if (!openDays.includes(dayName)) {
    return { isOpen: false, label: `Closed Today (${dayName})` };
  }
  const [oh, om] = (profile.openTime || "09:00").split(":").map(Number);
  const [ch, cm] = (profile.closeTime || "21:00").split(":").map(Number);
  const currentMins = now.getHours() * 60 + now.getMinutes();
  const openMins = oh * 60 + (om || 0);
  const closeMins = ch * 60 + (cm || 0);
  const isOpen =
    closeMins >= openMins
      ? currentMins >= openMins && currentMins <= closeMins
      : currentMins >= openMins || currentMins <= closeMins;

  return {
    isOpen,
    label: isOpen
      ? `Open Now • Until ${profile.closeTime || "21:00"}`
      : `Closed • Opens ${profile.openTime || "09:00"}`,
  };
}

function generateCardCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `STPH-${part()}-${part()}`;
}

async function uploadMediaToCloud(file, folder = "general") {
  if (!file) return "";
  if (!supabase) {
    return URL.createObjectURL(file);
  }
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${cleanName}`;
  const { error } = await supabase.storage
    .from("smarttap-media")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });
  if (error) {
    console.error("Upload error:", error);
    return URL.createObjectURL(file);
  }
  const { data } = supabase.storage.from("smarttap-media").getPublicUrl(filePath);
  return data?.publicUrl || "";
}

// Bulletproof Cross-Browser Inline Autoplay Video Component (Zero Black Screen)
function InlineVideoShowcase({ videoUrl, caption, activeTheme }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setVideoError(false);
    const v = videoRef.current;
    if (!v || !videoUrl) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    const attemptPlay = () => {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };
    attemptPlay();
  }, [videoUrl]);

  if (!videoUrl) return null;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  // Append #t=0.1 so iOS/Android/Chrome renders the first frame immediately instead of black
  const srcWithFrameHint =
    videoUrl.startsWith("blob:") || videoUrl.includes("#") ? videoUrl : `${videoUrl}#t=0.1`;

  return (
    <section className={`rounded-3xl border ${activeTheme.card} overflow-hidden`}>
      <div className="relative bg-zinc-950 aspect-video max-h-72 w-full flex items-center justify-center overflow-hidden">
        {!videoError && isDirectVideoFile(videoUrl) ? (
          <>
            <video
              ref={videoRef}
              src={srcWithFrameHint}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onLoadedData={() => {
                const v = videoRef.current;
                if (v && v.paused) {
                  v.muted = true;
                  v.play().then(() => setIsPlaying(true)).catch(() => {});
                }
              }}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white hover:bg-black/85 transition"
                title={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white hover:bg-black/85 transition"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </>
        ) : (
          <div className="p-5 text-center space-y-2">
            <Video className="w-7 h-7 mx-auto text-amber-400 opacity-80" />
            <p className="text-xs text-zinc-300">
              {videoError
                ? "Video stream could not load inline."
                : "External video link detected (upload an MP4/MOV file for inline autoplay)."}
            </p>
            {sanitizeUrl(videoUrl) && (
              <a
                href={sanitizeUrl(videoUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs ${activeTheme.button}`}
              >
                Watch Video <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
      {caption && (
        <div className="px-4 py-2.5 flex items-center justify-between text-xs border-t border-white/10">
          <span className="font-medium truncate">{caption}</span>
          <span className={`text-[10px] uppercase tracking-wider ${activeTheme.accentText}`}>
            Featured Reel
          </span>
        </div>
      )}
    </section>
  );
}
export default function SmartTapApp() {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [toast, setToast] = useState(null);

  const [screen, setScreen] = useState("claim");
  const [unclaimedCode, setUnclaimedCode] = useState("");
  const [activeCardCode, setActiveCardCode] = useState("");
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);

  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [viewerTheme, setViewerTheme] = useState("obsidian");
  const [viewerTexture, setViewerTexture] = useState("aurora");
  const [showThemePopover, setShowThemePopover] = useState(false);
  const [analytics, setAnalytics] = useState({
    taps1d: 0,
    taps1w: 0,
    taps1m: 0,
    tapsTotal: 0,
  });
  const [messages, setMessages] = useState([]);
  const [exchangedContacts, setExchangedContacts] = useState([]);
  const [paymentReceipts, setPaymentReceipts] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Live URL reachability map: { [linkId]: 'checking' | 'ok' | 'broken' }
  const [linkHealth, setLinkHealth] = useState({});

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  const [showQrModal, setShowQrModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showPostSavePrompt, setShowPostSavePrompt] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showFounderModal, setShowFounderModal] = useState(false);

  // Password show/hide toggles
  const [showActPw, setShowActPw] = useState(false);
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showFounderPw, setShowFounderPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [activateError, setActivateError] = useState("");
  const [founderError, setFounderError] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Anti-Courier Tampering: actCodeInput stays blank unless manually typed by buyer
  const [actCodeInput, setActCodeInput] = useState("");
  const [actFullName, setActFullName] = useState("");
  const [actUsername, setActUsername] = useState("");
  const [actPassword, setActPassword] = useState("");

  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [msgForm, setMsgForm] = useState({ sender: "", contact: "", message: "" });
  const [receiptForm, setReceiptForm] = useState({
    senderName: "",
    referenceNo: "",
    amount: "",
    proofUrl: "",
  });
  const [bookingForm, setBookingForm] = useState({
    name: "",
    contact: "",
    date: "",
    slot: "10:00 AM",
    notes: "",
  });

  const [editorTab, setEditorTab] = useState("profile");
  const [editingLink, setEditingLink] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [newLink, setNewLink] = useState({
    category: "social",
    platform: "Instagram",
    title: "",
    subtitle: "",
    url: "",
    gameId: "",
    audioUrl: "",
    pinned: false,
  });
  const [newPayment, setNewPayment] = useState({
    provider: "GCash",
    accountName: "",
    accountNumber: "",
    qrUrl: "",
  });
  const [newSlot, setNewSlot] = useState("");

  const [logoTapCount, setLogoTapCount] = useState(0);
  const [founderUnlocked, setFounderUnlocked] = useState(false);
  const [founderPassInput, setFounderPassInput] = useState("");
  const [batchQty, setBatchQty] = useState(50);
  const [batchLabel, setBatchLabel] = useState("Batch 1");
  const [generatingBatch, setGeneratingBatch] = useState(false);
  const [batchMessage, setBatchMessage] = useState(null);
  const [allCodes, setAllCodes] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminTab, setAdminTab] = useState("codes");

  const notify = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Offline / Online network listener + viewport lock
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    );

    const updateOnlineStatus = () => setIsOffline(!navigator.onLine);
    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Live URL Syntax + Reachability Validator across all profile links & CTAs
  useEffect(() => {
    let cancelled = false;
    const verifyAllLinks = async () => {
      const itemsToCheck = [
        ...(profile.links || []).map((l) => ({ id: l.id, url: l.url })),
        ...(profile.ctaUrl ? [{ id: "cta-main", url: profile.ctaUrl }] : []),
        ...(profile.website ? [{ id: "website-main", url: profile.website }] : []),
      ];

      const nextHealth = {};
      for (const item of itemsToCheck) {
        if (!item.url || !item.url.trim()) {
          nextHealth[item.id] = "ok";
          continue;
        }
        const check = validateUrlFormat(item.url);
        if (!check.valid) {
          nextHealth[item.id] = "broken";
          continue;
        }
        // If offline, rely on syntax check only
        if (!navigator.onLine) {
          nextHealth[item.id] = "ok";
          continue;
        }
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 4500);
          await fetch(check.url, {
            method: "HEAD",
            mode: "no-cors",
            signal: controller.signal,
          });
          clearTimeout(timer);
          nextHealth[item.id] = "ok";
        } catch {
          nextHealth[item.id] = "broken";
        }
      }
      if (!cancelled) {
        setLinkHealth(nextHealth);
      }
    };

    verifyAllLinks();
    return () => {
      cancelled = true;
    };
  }, [profile.links, profile.ctaUrl, profile.website, isOffline]);

  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(window.location.search);
        const cardParam = (params.get("c") || "").trim().toUpperCase();
        const userParam = (params.get("u") || "").trim().toLowerCase();
        const savedSessionUser = localStorage.getItem("smarttap_device_user") || "";

        if (!cardParam && !userParam && savedSessionUser === "demo") {
          setProfile(DEFAULT_PROFILE);
          setViewerTheme(DEFAULT_PROFILE.theme);
          setViewerTexture(DEFAULT_PROFILE.texture);
          setActiveCardCode("STPH-DEMO-CARD");
          setIsOwnerLoggedIn(true);
          setScreen("viewer");
          setLoading(false);
          return;
        }

        // Offline Fallback: load cached profile if device has no connection
        if (!navigator.onLine || !supabase) {
          const lookupKey = userParam || savedSessionUser || "demo";
          const cachedRaw = localStorage.getItem(`smarttap_cache_${lookupKey}`);
          if (cachedRaw) {
            const cached = JSON.parse(cachedRaw);
            setProfile(cached.profile);
            setViewerTheme(cached.profile.theme || "obsidian");
            setViewerTexture(cached.profile.texture || "aurora");
            setAnalytics(cached.analytics || { taps1d: 0, taps1w: 0, taps1m: 0, tapsTotal: 0 });
            setIsOwnerLoggedIn(savedSessionUser === cached.profile.username);
            setScreen("viewer");
            setLoading(false);
            return;
          }
          if (cardParam) {
            setUnclaimedCode(cardParam);
            // Anti-courier security: do NOT auto-fill actCodeInput
            setShowActivateModal(true);
          }
          setScreen("claim");
          setLoading(false);
          return;
        }

        if (cardParam) {
          const { data: codeRow } = await supabase
            .from("smarttap_codes")
            .select("*")
            .eq("code", cardParam)
            .maybeSingle();

          if (codeRow && !codeRow.is_used) {
            setUnclaimedCode(cardParam);
            // Anti-courier security: keep actCodeInput empty so buyer must type from sealed insert
            setScreen("claim");
            setShowActivateModal(true);
            setLoading(false);
            return;
          }

          if (codeRow && codeRow.is_used && codeRow.claimed_by) {
            const { data: profRow } = await supabase
              .from("smarttap_profiles")
              .select("*")
              .eq("username", codeRow.claimed_by)
              .maybeSingle();

            if (profRow) {
              await hydrateProfileRow(profRow, savedSessionUser, true);
              setScreen("viewer");
              setLoading(false);
              return;
            }
          }
        }

        if (userParam) {
          if (userParam === "demo") {
            setProfile(DEFAULT_PROFILE);
            setViewerTheme(DEFAULT_PROFILE.theme);
            setViewerTexture(DEFAULT_PROFILE.texture);
            setIsOwnerLoggedIn(savedSessionUser === "demo");
            setScreen("viewer");
            setLoading(false);
            return;
          }

          const { data: profRow } = await supabase
            .from("smarttap_profiles")
            .select("*")
            .eq("username", userParam)
            .maybeSingle();

          if (profRow) {
            await hydrateProfileRow(profRow, savedSessionUser, true);
            setScreen("viewer");
            setLoading(false);
            return;
          }
        }

        if (savedSessionUser) {
          const { data: profRow } = await supabase
            .from("smarttap_profiles")
            .select("*")
            .eq("username", savedSessionUser)
            .maybeSingle();

          if (profRow) {
            await hydrateProfileRow(profRow, savedSessionUser, false);
            setScreen("viewer");
            setLoading(false);
            return;
          }
        }

        setScreen("claim");
      } catch (err) {
        console.error("Init error:", err);
        setScreen("claim");
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  const hydrateProfileRow = async (row, savedDeviceUser, incrementTap = false) => {
    const merged = { ...DEFAULT_PROFILE, ...(row.profile_data || {}), username: row.username };
    setProfile(merged);
    setViewerTheme(merged.theme || "obsidian");
    setViewerTexture(merged.texture || "aurora");
    setActiveCardCode(row.activation_code || "");
    setMessages(Array.isArray(row.messages) ? row.messages : []);
    setExchangedContacts(Array.isArray(row.exchanged_contacts) ? row.exchanged_contacts : []);
    setPaymentReceipts(Array.isArray(row.payment_receipts) ? row.payment_receipts : []);
    setBookings(Array.isArray(row.bookings) ? row.bookings : []);
    setBookingForm((prev) => ({
      ...prev,
      slot: merged.bookingSlots?.[0] || "10:00 AM",
    }));

    const currentAnalytics = row.analytics || { taps1d: 0, taps1w: 0, taps1m: 0, tapsTotal: 0 };
    const isDeviceOwner =
      savedDeviceUser && savedDeviceUser.toLowerCase() === row.username.toLowerCase();
    setIsOwnerLoggedIn(Boolean(isDeviceOwner));

    // Cache profile locally for instant Offline Mode access
    try {
      localStorage.setItem(
        `smarttap_cache_${row.username}`,
        JSON.stringify({ profile: merged, analytics: currentAnalytics })
      );
    } catch {}

    // Real-Time Unlimited Tap Counter (No Cooldown)
    if (incrementTap && !isDeviceOwner && supabase) {
      const updatedAnalytics = {
        taps1d: (currentAnalytics.taps1d || 0) + 1,
        taps1w: (currentAnalytics.taps1w || 0) + 1,
        taps1m: (currentAnalytics.taps1m || 0) + 1,
        tapsTotal: (currentAnalytics.tapsTotal || 0) + 1,
      };
      setAnalytics(updatedAnalytics);
      await supabase
        .from("smarttap_profiles")
        .update({ analytics: updatedAnalytics })
        .eq("username", row.username);
    } else {
      setAnalytics(currentAnalytics);
    }
  };

  const syncProfileToCloud = async (updatedProfile, extraFields = {}) => {
    setProfile(updatedProfile);
    try {
      localStorage.setItem(
        `smarttap_cache_${updatedProfile.username}`,
        JSON.stringify({ profile: updatedProfile, analytics })
      );
    } catch {}

    if (!supabase || updatedProfile.username === "demo") return;
    setSyncing(true);
    try {
      await supabase
        .from("smarttap_profiles")
        .update({
          profile_data: updatedProfile,
          updated_at: new Date().toISOString(),
          ...extraFields,
        })
        .eq("username", updatedProfile.username);
    } catch (err) {
      console.error("Cloud sync error:", err);
    } finally {
      setSyncing(false);
    }
  };

  const handleLinkClick = async (linkItem) => {
    const cleanTarget = sanitizeUrl(linkItem.url);
    if (!cleanTarget || linkHealth[linkItem.id] === "broken") {
      notify("This link appears invalid or unreachable. Please check the URL.", "error");
      return;
    }
    // Increment per-link click counter in background
    if (!isOwnerLoggedIn && profile.username !== "demo" && supabase) {
      const updatedLinks = (profile.links || []).map((l) =>
        l.id === linkItem.id ? { ...l, clicks: (l.clicks || 0) + 1 } : l
      );
      const nextProf = { ...profile, links: updatedLinks };
      setProfile(nextProf);
      supabase
        .from("smarttap_profiles")
        .update({ profile_data: nextProf })
        .eq("username", profile.username)
        .then(() => {});
    }
    window.open(cleanTarget, "_blank", "noopener,noreferrer");
  };

  const handleActivateCard = async (e) => {
    e.preventDefault();
    setActivateError("");
    const code = actCodeInput.trim().toUpperCase();
    const username = actUsername.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
    const fullName = actFullName.trim();
    const password = actPassword.trim();

    if (!code || !username || !fullName || !password) {
      setActivateError("Please fill in all fields.");
      return;
    }
    if (username.length < 3) {
      setActivateError("Username must be at least 3 characters.");
      return;
    }
    if (username === "demo") {
      setActivateError("Username 'demo' is reserved.");
      return;
    }
    if (!supabase) {
      setActivateError("Cloud database is not connected yet.");
      return;
    }

    setSyncing(true);
    try {
      const { data: codeRow } = await supabase
        .from("smarttap_codes")
        .select("*")
        .eq("code", code)
        .maybeSingle();

      if (!codeRow) {
        setActivateError("Invalid Activation Code. Check your sealed SmartTap insert.");
        setSyncing(false);
        return;
      }
      if (codeRow.is_used) {
        setActivateError("This Activation Code has already been claimed.");
        setSyncing(false);
        return;
      }

      const { data: existingUser } = await supabase
        .from("smarttap_profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();

      if (existingUser) {
        setActivateError("Username is already taken. Choose another one.");
        setSyncing(false);
        return;
      }

      const freshProfile = {
        ...DEFAULT_PROFILE,
        fullName,
        username,
        headline: "SmartTap Member",
        company: "",
        bio: `Hi! I'm ${fullName}. Tap to connect and view my links.`,
        payments: [],
        links: [],
      };

      const { error: insertErr } = await supabase.from("smarttap_profiles").insert({
        username,
        password,
        activation_code: code,
        profile_data: freshProfile,
        analytics: { taps1d: 0, taps1w: 0, taps1m: 0, tapsTotal: 0 },
        messages: [],
        exchanged_contacts: [],
        payment_receipts: [],
        bookings: [],
      });

      if (insertErr) {
        setActivateError("Could not create profile: " + insertErr.message);
        setSyncing(false);
        return;
      }

      await supabase
        .from("smarttap_codes")
        .update({
          is_used: true,
          claimed_by: username,
          claimed_at: new Date().toISOString(),
        })
        .eq("code", code);

      localStorage.setItem("smarttap_device_user", username);
      window.history.replaceState({}, "", `?u=${username}`);
      setProfile(freshProfile);
      setViewerTheme(freshProfile.theme);
      setViewerTexture(freshProfile.texture);
      setActiveCardCode(code);
      setIsOwnerLoggedIn(true);
      setShowActivateModal(false);
      setScreen("editor");
      notify("Card activated! Customize your profile below.");
    } catch (err) {
      setActivateError("Activation failed. Try again.");
    } finally {
      setSyncing(false);
    }
  };

  const handleOwnerLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    const user = loginUsername.trim().toLowerCase();
    const pass = loginPassword.trim();

    if (user === "demo" && pass === "demo123") {
      localStorage.setItem("smarttap_device_user", "demo");
      window.history.replaceState({}, "", "?u=demo");
      setProfile(DEFAULT_PROFILE);
      setViewerTheme(DEFAULT_PROFILE.theme);
      setViewerTexture(DEFAULT_PROFILE.texture);
      setIsOwnerLoggedIn(true);
      setShowLoginModal(false);
      setScreen("editor");
      notify("Logged in to Demo Owner Dashboard");
      return;
    }

    if (!supabase) {
      setLoginError("Database unavailable.");
      return;
    }

    setSyncing(true);
    try {
      const { data: profRow } = await supabase
        .from("smarttap_profiles")
        .select("*")
        .eq("username", user)
        .maybeSingle();

      if (!profRow || profRow.password !== pass) {
        setLoginError("Invalid username or password.");
        setSyncing(false);
        return;
      }

      localStorage.setItem("smarttap_device_user", profRow.username);
      window.history.replaceState({}, "", `?u=${profRow.username}`);
      await hydrateProfileRow(profRow, profRow.username, false);
      setShowLoginModal(false);
      setScreen("editor");
      notify(`Welcome back, ${profRow.profile_data?.fullName || profRow.username}!`);
    } catch (err) {
      setLoginError("Login error. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  const handleOwnerLogout = () => {
    localStorage.removeItem("smarttap_device_user");
    setIsOwnerLoggedIn(false);
    setScreen("viewer");
    notify("Logged out of Owner Mode");
  };

  const handleUpdatePassword = async () => {
    if (!newPasswordInput || newPasswordInput.trim().length < 4) {
      notify("Password must be at least 4 characters", "error");
      return;
    }
    if (profile.username === "demo") {
      notify("Demo password cannot be changed", "error");
      return;
    }
    if (!supabase) return;
    setSyncing(true);
    await supabase
      .from("smarttap_profiles")
      .update({ password: newPasswordInput.trim() })
      .eq("username", profile.username);
    setNewPasswordInput("");
    setSyncing(false);
    notify("Owner password updated!");
  };

  const handleLogoSecretTap = () => {
    const next = logoTapCount + 1;
    if (next >= 5) {
      setLogoTapCount(0);
      setFounderError("");
      setShowFounderModal(true);
      if (founderUnlocked) {
        loadFounderInventory();
      }
    } else {
      setLogoTapCount(next);
    }
  };

  const loadFounderInventory = async () => {
    if (!supabase) return;
    setSyncing(true);
    try {
      const { data: codesData } = await supabase
        .from("smarttap_codes")
        .select("*")
        .order("created_at", { ascending: false });
      const { data: profsData } = await supabase
        .from("smarttap_profiles")
        .select("*")
        .order("created_at", { ascending: false });
      setAllCodes(codesData || []);
      setAllProfiles(profsData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  const handleFounderUnlock = (e) => {
    e.preventDefault();
    setFounderError("");
    if (founderPassInput.trim() === FOUNDER_PASSCODE) {
      setFounderUnlocked(true);
      loadFounderInventory();
    } else {
      setFounderError("Incorrect Founder Passcode.");
    }
  };

  const handleGenerateBulkCards = async () => {
    setBatchMessage(null);
    const qty = Math.min(Math.max(Number(batchQty) || 1, 1), 500);
    if (!supabase) {
      setBatchMessage({
        type: "error",
        text: "Supabase environment variables are missing in Vercel.",
      });
      return;
    }

    setGeneratingBatch(true);
    try {
      const rows = [];
      const seen = new Set(allCodes.map((c) => c.code));
      while (rows.length < qty) {
        const code = generateCardCode();
        if (!seen.has(code)) {
          seen.add(code);
          rows.push({
            code,
            batch_label: batchLabel.trim() || "Batch 1",
            is_used: false,
            claimed_by: null,
          });
        }
      }

      const { error } = await supabase.from("smarttap_codes").insert(rows);
      if (error) {
        setBatchMessage({
          type: "error",
          text: `Database insert failed: ${error.message}. Run the SQL table/policy setup in Supabase.`,
        });
        setGeneratingBatch(false);
        return;
      }

      const csvLines = [
        "activation_code,nfc_qr_url,batch_label",
        ...rows.map((r) => `${r.code},${APP_BASE_URL}/?c=${r.code},"${r.batch_label}"`),
      ];
      const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SmartTap-Canva-${(batchLabel || "Batch").replace(/\s+/g, "_")}-${qty}pcs.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await loadFounderInventory();
      setBatchMessage({
        type: "success",
        text: `Successfully generated & saved ${qty} cards (${batchLabel})! Canva CSV downloaded.`,
      });
    } catch (err) {
      setBatchMessage({ type: "error", text: "Unexpected error generating batch." });
    } finally {
      setGeneratingBatch(false);
    }
  };

  const handleExportMasterExcel = () => {
    const header = ["Activation Code", "Batch", "Status", "Claimed Username", "NFC/QR URL", "Created At"];
    const rows = allCodes.map((c) => [
      c.code,
      c.batch_label || "Batch 1",
      c.is_used ? "Claimed" : "Available",
      c.claimed_by || "-",
      `${APP_BASE_URL}/?c=${c.code}`,
      c.created_at ? new Date(c.created_at).toLocaleDateString() : "",
    ]);
    const tsv = [header, ...rows].map((r) => r.join("\t")).join("\n");
    const blob = new Blob([tsv], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SmartTap-Master-Inventory-${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify("Master Inventory Excel report exported!");
  };

  // Save Contact vCard + Trigger Post-Save Exchange Prompt
  const handleSaveContactVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${profile.fullName}`,
      profile.company ? `ORG:${profile.company}` : "",
      profile.headline ? `TITLE:${profile.headline}` : "",
      profile.phone ? `TEL;TYPE=CELL:${profile.phone}` : "",
      profile.email ? `EMAIL:${profile.email}` : "",
      profile.website ? `URL:${profile.website}` : "",
      profile.location ? `ADR:;;${profile.location};;;;` : "",
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(profile.fullName || "SmartTap").replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify("Contact saved to your phone!");

    // Show post-save prompt asking if visitor also wants to exchange contact
    if (!isOwnerLoggedIn) {
      setTimeout(() => {
        setShowPostSavePrompt(true);
      }, 650);
    }
  };

  // Native Mobile Share Sheet with Desktop Copy Fallback
  const handleNativeShare = async () => {
    const shareUrl = `${APP_BASE_URL}/?u=${profile.username}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.fullName} • SmartTap Digital Card`,
          text: `Connect with ${profile.fullName} on SmartTap`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to copy if cancelled/unsupported
      }
    }
    copyText(shareUrl, "share-link", "Profile link copied!");
  };

  const copyText = (text, id, label = "Copied to clipboard!") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    notify(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleAudioPreview = (item) => {
    const src = item.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    if (playingId === item.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingId(null);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(src);
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    setPlayingId(item.id);
    audio.play().catch(() => {
      setPlayingId(null);
      notify("Unable to play audio stream. Check audio link or upload MP3.", "error");
    });
    audio.onended = () => setPlayingId(null);
  };

  const handleExchangeSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      notify("Name and mobile number are required", "error");
      return;
    }
    const entry = {
      id: `lead-${Date.now()}`,
      ...contactForm,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [entry, ...exchangedContacts];
    setExchangedContacts(updated);
    setContactForm({ name: "", phone: "", email: "", note: "" });
    setShowExchangeModal(false);
    notify(`Contact shared with ${profile.fullName}!`);

    if (supabase && profile.username !== "demo") {
      await supabase
        .from("smarttap_profiles")
        .update({ exchanged_contacts: updated })
        .eq("username", profile.username);
    }
  };

  const handleQuickMessageSubmit = async (e) => {
    e.preventDefault();
    if (!msgForm.sender || !msgForm.message) {
      notify("Please enter your name and message", "error");
      return;
    }
    const entry = {
      id: `msg-${Date.now()}`,
      ...msgForm,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [entry, ...messages];
    setMessages(updated);
    setMsgForm({ sender: "", contact: "", message: "" });
    notify("Direct message sent!");

    if (supabase && profile.username !== "demo") {
      await supabase
        .from("smarttap_profiles")
        .update({ messages: updated })
        .eq("username", profile.username);
    }
  };

  const handleReceiptSubmit = async (e) => {
    e.preventDefault();
    if (!receiptForm.senderName || !receiptForm.referenceNo) {
      notify("Enter sender name and reference number", "error");
      return;
    }
    const entry = {
      id: `rcpt-${Date.now()}`,
      provider: showPaymentModal?.provider || "Payment",
      ...receiptForm,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [entry, ...paymentReceipts];
    setPaymentReceipts(updated);
    setReceiptForm({ senderName: "", referenceNo: "", amount: "", proofUrl: "" });
    setShowPaymentModal(null);
    notify("Payment receipt submitted to owner!");

    if (supabase && profile.username !== "demo") {
      await supabase
        .from("smarttap_profiles")
        .update({ payment_receipts: updated })
        .eq("username", profile.username);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.contact || !bookingForm.date) {
      notify("Please complete your name, contact, and preferred date", "error");
      return;
    }
    const entry = {
      id: `book-${Date.now()}`,
      ...bookingForm,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [entry, ...bookings];
    setBookings(updated);
    setBookingForm({
      name: "",
      contact: "",
      date: "",
      slot: profile.bookingSlots?.[0] || "10:00 AM",
      notes: "",
    });
    notify("Appointment request sent!");

    if (supabase && profile.username !== "demo") {
      await supabase
        .from("smarttap_profiles")
        .update({ bookings: updated })
        .eq("username", profile.username);
    }
  };

  const deleteInboxItem = async (type, itemId) => {
    if (type === "message") {
      const updated = messages.filter((m) => m.id !== itemId);
      setMessages(updated);
      if (supabase && profile.username !== "demo") {
        await supabase
          .from("smarttap_profiles")
          .update({ messages: updated })
          .eq("username", profile.username);
      }
    } else if (type === "contact") {
      const updated = exchangedContacts.filter((c) => c.id !== itemId);
      setExchangedContacts(updated);
      if (supabase && profile.username !== "demo") {
        await supabase
          .from("smarttap_profiles")
          .update({ exchanged_contacts: updated })
          .eq("username", profile.username);
      }
    } else if (type === "receipt") {
      const updated = paymentReceipts.filter((r) => r.id !== itemId);
      setPaymentReceipts(updated);
      if (supabase && profile.username !== "demo") {
        await supabase
          .from("smarttap_profiles")
          .update({ payment_receipts: updated })
          .eq("username", profile.username);
      }
    } else if (type === "booking") {
      const updated = bookings.filter((b) => b.id !== itemId);
      setBookings(updated);
      if (supabase && profile.username !== "demo") {
        await supabase
          .from("smarttap_profiles")
          .update({ bookings: updated })
          .eq("username", profile.username);
      }
    }
    notify("Item removed");
  };

  const activeTheme = THEMES[viewerTheme] || THEMES.obsidian;
  const activeTexture = TEXTURES[viewerTexture] || TEXTURES.aurora;
  const businessStatus = computeBusinessStatus(profile);

  // Detect any broken/unreachable links to trigger Floating Warning Banner
  const brokenLinksList = (profile.links || []).filter((l) => linkHealth[l.id] === "broken");
  const hasCtaBroken = profile.ctaUrl && linkHealth["cta-main"] === "broken";
  const hasWebsiteBroken = profile.website && linkHealth["website-main"] === "broken";
  const totalBrokenCount =
    brokenLinksList.length + (hasCtaBroken ? 1 : 0) + (hasWebsiteBroken ? 1 : 0);

  const filteredLinks = [...(profile.links || [])]
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)))
    .filter((item) => {
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.platform?.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 animate-pulse mb-4">
          <SmartTapLogoMark className="w-7 h-7" />
        </div>
        <p className="text-sm text-zinc-400 tracking-wide">Loading SmartTap Profile...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${activeTheme.bg} ${activeTheme.text} selection:bg-amber-400 selection:text-zinc-950`}
      style={activeTexture.style}
    >
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-zinc-900/95 border border-white/15 text-white text-xs font-medium shadow-2xl flex items-center gap-2 backdrop-blur-md">
          <CheckCircle2
            className={`w-4 h-4 ${toast.type === "error" ? "text-rose-400" : "text-emerald-400"}`}
          />
          <span>{toast.text}</span>
        </div>
      )}

      {/* Offline Mode Status Banner */}
      {isOffline && (
        <div className="sticky top-0 z-[90] bg-amber-500/95 text-zinc-950 px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-md">
          <WifiOff className="w-3.5 h-3.5 shrink-0" />
          <span>Offline Mode — Viewing cached SmartTap card (some live features paused)</span>
        </div>
      )}

      {/* Floating Broken / Unreachable Link Warning Banner */}
      {screen !== "claim" && totalBrokenCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[85] w-[92%] max-w-md px-4 py-3 rounded-2xl bg-rose-950/95 border border-rose-500/40 text-rose-100 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="text-xs min-w-0">
              <p className="font-semibold text-rose-200">
                {totalBrokenCount} Broken or Invalid Link{totalBrokenCount > 1 ? "s" : ""} Detected
              </p>
              <p className="text-[11px] text-rose-300/80 truncate">
                {isOwnerLoggedIn
                  ? "Fix highlighted URLs in Links or Profile settings."
                  : "One or more links on this card may not load properly."}
              </p>
            </div>
          </div>
          {isOwnerLoggedIn && (
            <button
              onClick={() => {
                setScreen("editor");
                setEditorTab(brokenLinksList.length > 0 ? "links" : "profile");
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-500 text-white text-[11px] font-semibold shrink-0 hover:bg-rose-400 transition"
            >
              Fix Now
            </button>
          )}
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/25 border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogoSecretTap}
            className="flex items-center gap-2 text-left select-none group"
          >
            <span className={`p-1.5 rounded-xl border ${activeTheme.accentBg}`}>
              <SmartTapLogoMark className="w-4 h-4" />
            </span>
            <span className="font-bold tracking-tight text-sm">SmartTap</span>
          </button>

          <div className="flex items-center gap-2">
            {screen !== "claim" && profile.allowViewerThemeSwitch && (
              <div className="relative">
                <button
                  onClick={() => setShowThemePopover((prev) => !prev)}
                  className={`p-2 rounded-xl border ${activeTheme.subCard} hover:opacity-90 transition`}
                  title="Switch Theme & Texture"
                >
                  <Palette className="w-4 h-4" />
                </button>
                {showThemePopover && (
                  <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-zinc-950/95 border border-white/15 text-zinc-100 shadow-2xl z-50 space-y-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                        Color Theme
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {Object.values(THEMES).map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setViewerTheme(t.id)}
                            className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border text-left truncate ${
                              viewerTheme === t.id
                                ? "border-amber-400 bg-amber-400/15 text-amber-300"
                                : "border-white/10 bg-white/5 text-zinc-300"
                            }`}
                          >
                            {t.name.split(" ")[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                        Surface Texture
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {Object.values(TEXTURES).map((tx) => (
                          <button
                            key={tx.id}
                            onClick={() => setViewerTexture(tx.id)}
                            className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border text-left ${
                              viewerTexture === tx.id
                                ? "border-amber-400 bg-amber-400/15 text-amber-300"
                                : "border-white/10 bg-white/5 text-zinc-300"
                            }`}
                          >
                            {tx.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {screen !== "claim" && (
              <>
                <button
                  onClick={() => setShowQrModal(true)}
                  className={`p-2 rounded-xl border ${activeTheme.subCard} hover:opacity-90 transition`}
                  title="Show QR Code"
                >
                  <QrCode className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNativeShare}
                  className={`p-2 rounded-xl border ${activeTheme.subCard} hover:opacity-90 transition`}
                  title="Share Profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </>
            )}

            {isOwnerLoggedIn ? (
              <button
                onClick={() => setScreen(screen === "editor" ? "viewer" : "editor")}
                className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 ${activeTheme.button}`}
              >
                {screen === "editor" ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> View Card
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3.5 h-3.5" /> Edit Card
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  setLoginError("");
                  setShowLoginModal(true);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${activeTheme.subCard} hover:opacity-90 transition`}
              >
                Owner Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* SCREEN 1: UNCLAIMED / LANDING CLAIM SCREEN */}
      {screen === "claim" && (
        <main className="max-w-md mx-auto px-4 py-12 space-y-6">
          <div className={`rounded-3xl border p-7 text-center space-y-5 ${activeTheme.card} ${activeTheme.glow}`}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3 h-3" /> SmartTap NFC Digital Identity
              </span>
              <h1 className="text-2xl font-bold tracking-tight">
                {unclaimedCode ? "Ready to Activate Your Card" : "Claim or Manage Your SmartTap Card"}
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {unclaimedCode
                  ? "Open your sealed SmartTap package insert and enter the One-Time Activation Code printed inside to link your profile."
                  : "Activate a brand-new SmartTap NFC card using your sealed activation code, or sign in to edit an existing profile."}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setActivateError("");
                  setShowActivateModal(true);
                }}
                className={`w-full py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 ${activeTheme.button}`}
              >
                <KeyRound className="w-4 h-4" /> Activate New Card
              </button>
              <button
                onClick={() => {
                  setLoginError("");
                  setShowLoginModal(true);
                }}
                className="w-full py-3 rounded-2xl text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Owner Login (Already Claimed)
              </button>
              <button
                onClick={() => {
                  setProfile(DEFAULT_PROFILE);
                  setViewerTheme(DEFAULT_PROFILE.theme);
                  setViewerTexture(DEFAULT_PROFILE.texture);
                  setScreen("viewer");
                }}
                className="w-full py-2.5 text-xs text-zinc-400 hover:text-amber-400 transition"
              >
                Explore Interactive Demo Card →
              </button>
            </div>
          </div>
        </main>
      )}

      {/* SCREEN 2: LIVE PUBLIC CARD VIEWER */}
      {screen === "viewer" && (
        <main className="max-w-lg mx-auto px-4 pt-4 pb-24 space-y-5">
          {/* Hero Profile Card */}
          <section className={`rounded-3xl border overflow-hidden ${activeTheme.card} ${activeTheme.glow}`}>
            <div className="h-32 relative bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
              {profile.coverUrl ? (
                <img src={profile.coverUrl} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-r ${activeTheme.accent} opacity-25`} />
              )}
              {businessStatus && (
                <div
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border flex items-center gap-1.5 ${
                    businessStatus.isOpen
                      ? "bg-emerald-950/85 border-emerald-400/40 text-emerald-300"
                      : "bg-rose-950/85 border-rose-400/40 text-rose-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      businessStatus.isOpen ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                    }`}
                  />
                  {businessStatus.label}
                </div>
              )}
            </div>

            <div className="px-5 pb-6 -mt-12 relative">
              <div className="flex items-end justify-between gap-3">
                <div className="w-24 h-24 rounded-3xl border-4 border-zinc-950 bg-zinc-800 overflow-hidden shadow-xl flex items-center justify-center text-2xl font-bold text-amber-400">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
                  ) : (
                    (profile.fullName || "ST").slice(0, 2).toUpperCase()
                  )}
                </div>

                <div className="flex items-center gap-2 pb-1">
                  <button
                    onClick={handleSaveContactVCard}
                    className={`px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-lg ${activeTheme.button}`}
                  >
                    <Download className="w-3.5 h-3.5" /> Save Contact
                  </button>
                  <button
                    onClick={() => setShowExchangeModal(true)}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-medium border ${activeTheme.subCard} flex items-center gap-1.5 hover:opacity-90 transition`}
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Exchange
                  </button>
                </div>
              </div>

              <div className="mt-3.5 space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-xl font-bold tracking-tight">{profile.fullName}</h1>
                  {profile.verified && <CheckCircle2 className={`w-4 h-4 ${activeTheme.accentText}`} />}
                </div>
                {(profile.headline || profile.company) && (
                  <p className={`text-xs font-medium ${activeTheme.accentText}`}>
                    {[profile.headline, profile.company].filter(Boolean).join(" • ")}
                  </p>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    <p className={`text-xs flex items-center gap-1 ${activeTheme.muted}`}>
                      <MapPin className="w-3.5 h-3.5 shrink-0" /> {profile.location}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        profile.mapQuery || profile.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${activeTheme.accentBg}`}
                    >
                      <Navigation className="w-2.5 h-2.5" /> Maps
                    </a>
                    <a
                      href={`https://waze.com/ul?q=${encodeURIComponent(
                        profile.mapQuery || profile.location
                      )}&navigate=yes`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${activeTheme.subCard}`}
                    >
                      Waze
                    </a>
                  </div>
                )}
              </div>

              {profile.bio && (
                <p className={`mt-3 text-xs leading-relaxed ${activeTheme.muted}`}>{profile.bio}</p>
              )}

              {/* Primary Contact Actions */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className={`py-2.5 px-3 rounded-2xl border ${activeTheme.subCard} flex items-center justify-center gap-1.5 text-xs font-medium hover:opacity-90 transition`}
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className={`py-2.5 px-3 rounded-2xl border ${activeTheme.subCard} flex items-center justify-center gap-1.5 text-xs font-medium hover:opacity-90 transition`}
                  >
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                )}
                {sanitizeUrl(profile.website) && (
                  <a
                    href={sanitizeUrl(profile.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`py-2.5 px-3 rounded-2xl border ${
                      hasWebsiteBroken ? "border-rose-500/60 bg-rose-500/10 text-rose-300" : activeTheme.subCard
                    } flex items-center justify-center gap-1.5 text-xs font-medium hover:opacity-90 transition`}
                  >
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>

              {/* Quick-Chat Deep Links (WhatsApp, Viber, Telegram, Messenger) */}
              {(profile.whatsapp || profile.viber || profile.telegram || profile.messenger) && (
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {profile.whatsapp && (
                    <a
                      href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-medium flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  )}
                  {profile.viber && (
                    <a
                      href={`viber://chat?number=${encodeURIComponent(profile.viber.trim())}`}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-300 text-[11px] font-medium flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Viber
                    </a>
                  )}
                  {profile.telegram && (
                    <a
                      href={`https://t.me/${profile.telegram.replace(/^@/, "").trim()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[11px] font-medium flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Telegram
                    </a>
                  )}
                  {profile.messenger && (
                    <a
                      href={`https://m.me/${profile.messenger.replace(/^@/, "").trim()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[11px] font-medium flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Messenger
                    </a>
                  )}
                </div>
              )}

              {profile.ctaLabel && sanitizeUrl(profile.ctaUrl) && (
                <a
                  href={sanitizeUrl(profile.ctaUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 w-full py-3 rounded-2xl text-xs flex items-center justify-center gap-2 ${
                    hasCtaBroken
                      ? "bg-rose-500/20 border border-rose-500/50 text-rose-200 font-semibold"
                      : activeTheme.button
                  }`}
                >
                  <span>{profile.ctaLabel}</span>
                  {hasCtaBroken ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                </a>
              )}
            </div>
          </section>

          {/* Auto-Looping Video Showcase (Inline Cross-Browser, Zero Black Screen) */}
          {profile.videoUrl && (
            <InlineVideoShowcase
              videoUrl={profile.videoUrl}
              caption={profile.videoCaption}
              activeTheme={activeTheme}
            />
          )}

          {/* Links, Gaming IDs & Music Section */}
          <section className={`rounded-3xl border p-5 space-y-4 ${activeTheme.card}`}>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold tracking-tight">Links & Digital Hub</h2>
              <div className="relative w-40">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter..."
                  className={`w-full pl-8 pr-2.5 py-1.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
              </div>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: "all", label: "All" },
                { id: "social", label: "Socials" },
                { id: "business", label: "Business" },
                { id: "gaming", label: "Gaming IDs" },
                { id: "music", label: "Music" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition ${
                    activeCategory === cat.id ? activeTheme.accentBg : activeTheme.subCard
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {filteredLinks.length === 0 ? (
                <p className={`text-xs text-center py-6 ${activeTheme.muted}`}>No links added yet.</p>
              ) : (
                filteredLinks.map((item) => {
                  const cleanTarget = sanitizeUrl(item.url);
                  const isBroken = linkHealth[item.id] === "broken";
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition ${
                        isBroken ? "border-rose-500/50 bg-rose-950/20" : activeTheme.subCard
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.pinned && <Pin className={`w-3 h-3 shrink-0 ${activeTheme.accentText}`} />}
                          <span className={`text-[10px] font-semibold uppercase tracking-wider ${activeTheme.accentText}`}>
                            {item.platform}
                          </span>
                          {isBroken && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              <AlertTriangle className="w-2.5 h-2.5" /> Broken Link
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold truncate mt-0.5">{item.title}</p>
                        {item.subtitle && (
                          <p className={`text-xs truncate ${activeTheme.muted}`}>{item.subtitle}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.category === "gaming" && item.gameId && (
                          <button
                            onClick={() => copyText(item.gameId, item.id, "Game ID copied!")}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border ${activeTheme.accentBg} flex items-center gap-1`}
                          >
                            {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>Copy ID</span>
                          </button>
                        )}

                        {item.category === "music" && (
                          <button
                            onClick={() => toggleAudioPreview(item)}
                            className={`p-2.5 rounded-xl border ${activeTheme.accentBg}`}
                            title={playingId === item.id ? "Pause Audio" : "Play Preview"}
                          >
                            {playingId === item.id ? (
                              <Pause className="w-3.5 h-3.5" />
                            ) : (
                              <Play className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        {cleanTarget && (
                          <button
                            type="button"
                            onClick={() => handleLinkClick(item)}
                            className={`p-2.5 rounded-xl border ${
                              isBroken ? "border-rose-500/40 text-rose-300" : activeTheme.subCard
                            } hover:opacity-80`}
                            title={isBroken ? "Broken / Unreachable Link" : "Open Link"}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Instant Payments & E-Wallets */}
          {profile.showPaymentSection && (profile.payments || []).length > 0 && (
            <section className={`rounded-3xl border p-5 space-y-3.5 ${activeTheme.card}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold tracking-tight flex items-center gap-2">
                  <CreditCard className={`w-4 h-4 ${activeTheme.accentText}`} /> Instant Transfers & QR
                </h2>
              </div>
              <div className="space-y-2.5">
                {profile.payments.map((pay) => (
                  <div
                    key={pay.id}
                    className={`p-3.5 rounded-2xl border ${activeTheme.subCard} flex items-center justify-between gap-3`}
                  >
                    <div className="min-w-0">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTheme.accentText}`}>
                        {pay.provider}
                      </span>
                      <p className="text-sm font-semibold truncate">{pay.accountName}</p>
                      <p className={`text-xs font-mono ${activeTheme.muted}`}>{pay.accountNumber}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => copyText(pay.accountNumber, pay.id, `${pay.provider} number copied!`)}
                        className={`p-2.5 rounded-xl border ${activeTheme.subCard}`}
                        title="Copy Account Number"
                      >
                        {copiedId === pay.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => setShowPaymentModal(pay)}
                        className={`px-3 py-2 rounded-xl text-xs ${activeTheme.button}`}
                      >
                        Pay / QR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Appointment / Schedule Booking */}
          {profile.showBookingSection && (
            <section className={`rounded-3xl border p-5 space-y-3.5 ${activeTheme.card}`}>
              <h2 className="text-sm font-bold tracking-tight flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${activeTheme.accentText}`} /> Book an Appointment
              </h2>
              <form onSubmit={handleBookingSubmit} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className={`w-full min-w-0 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                  />
                  <input
                    type="text"
                    placeholder="Mobile / Email"
                    value={bookingForm.contact}
                    onChange={(e) => setBookingForm({ ...bookingForm, contact: e.target.value })}
                    className={`w-full min-w-0 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className={`w-full min-w-0 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                  />
                  <select
                    value={bookingForm.slot}
                    onChange={(e) => setBookingForm({ ...bookingForm, slot: e.target.value })}
                    className={`w-full min-w-0 px-3.5 py-2.5 rounded-xl text-xs border bg-zinc-900 text-zinc-100 outline-none ${activeTheme.subCard}`}
                  >
                    {(profile.bookingSlots || ["10:00 AM", "02:00 PM"]).map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Purpose / Notes (Optional)"
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
                <button type="submit" className={`w-full py-3 rounded-2xl text-xs ${activeTheme.button}`}>
                  Request Schedule
                </button>
              </form>
            </section>
          )}

          {/* Direct Message Box */}
          {profile.showContactForm && (
            <section className={`rounded-3xl border p-5 space-y-3.5 ${activeTheme.card}`}>
              <h2 className="text-sm font-bold tracking-tight flex items-center gap-2">
                <MessageSquare className={`w-4 h-4 ${activeTheme.accentText}`} /> Send Direct Message
              </h2>
              <form onSubmit={handleQuickMessageSubmit} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={msgForm.sender}
                    onChange={(e) => setMsgForm({ ...msgForm, sender: e.target.value })}
                    className={`w-full min-w-0 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                  />
                  <input
                    type="text"
                    placeholder="Your Phone or Email"
                    value={msgForm.contact}
                    onChange={(e) => setMsgForm({ ...msgForm, contact: e.target.value })}
                    className={`w-full min-w-0 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder={`Write a message for ${profile.fullName}...`}
                  value={msgForm.message}
                  onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
                <button
                  type="submit"
                  className={`w-full py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 ${activeTheme.button}`}
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </form>
            </section>
          )}

          {/* Footer CTA */}
          <footer className="pt-2 pb-6 text-center space-y-2">
            <a
              href={sanitizeUrl(profile.orderFooterUrl) || "https://www.tiktok.com/@smarttap.ph"}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium ${activeTheme.subCard} hover:opacity-90 transition`}
            >
              <SmartTapLogoMark className={`w-3.5 h-3.5 ${activeTheme.accentText}`} />
              <span>Powered by SmartTap • Get Your Own NFC Card</span>
            </a>
          </footer>
        </main>
      )}

      {/* SCREEN 3: OWNER DASHBOARD & EDITOR */}
      {screen === "editor" && isOwnerLoggedIn && (
        <main className="max-w-lg mx-auto px-4 pt-4 pb-24 space-y-4">
          <div className={`rounded-3xl border p-4 flex items-center justify-between ${activeTheme.card}`}>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Owner Dashboard
              </span>
              <h1 className="text-base font-bold">@{profile.username}</h1>
              {activeCardCode && (
                <p className="text-[11px] font-mono text-zinc-400">Card: {activeCardCode}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {syncing && <span className="text-[11px] text-amber-400 animate-pulse">Saving...</span>}
              <button
                onClick={handleOwnerLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "profile", label: "Profile" },
              { id: "links", label: `Links${brokenLinksList.length > 0 ? " (!)" : ""}` },
              { id: "payments", label: "Payments" },
              { id: "booking", label: "Booking & Hours" },
              { id: "theme", label: "Themes" },
              { id: "inbox", label: `Inbox (${messages.length + exchangedContacts.length + paymentReceipts.length + bookings.length})` },
              { id: "analytics", label: "Analytics" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setEditorTab(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border ${
                  editorTab === t.id ? activeTheme.button : activeTheme.subCard
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB: PROFILE & MEDIA */}
          {editorTab === "profile" && (
            <div className={`rounded-3xl border p-5 space-y-4 ${activeTheme.card}`}>
              <div className="grid grid-cols-2 gap-3">
                <label className={`p-3 rounded-2xl border border-dashed text-center cursor-pointer ${activeTheme.subCard}`}>
                  <Upload className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <span className="text-xs font-medium block">Upload Avatar</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      notify("Uploading avatar...");
                      const url = await uploadMediaToCloud(file, "avatars");
                      if (url) syncProfileToCloud({ ...profile, avatarUrl: url });
                    }}
                  />
                </label>
                <label className={`p-3 rounded-2xl border border-dashed text-center cursor-pointer ${activeTheme.subCard}`}>
                  <ImageIcon className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <span className="text-xs font-medium block">Upload Cover</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      notify("Uploading cover...");
                      const url = await uploadMediaToCloud(file, "covers");
                      if (url) syncProfileToCloud({ ...profile, coverUrl: url });
                    }}
                  />
                </label>
              </div>

              {/* Video Showcase Upload / Direct MP4 Link */}
              <div className={`p-3.5 rounded-2xl border space-y-2.5 ${activeTheme.subCard}`}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-amber-400" /> Auto-Looping Video Showcase
                  </p>
                  {profile.videoUrl && (
                    <button
                      type="button"
                      onClick={() => syncProfileToCloud({ ...profile, videoUrl: "" })}
                      className="text-[11px] text-rose-400 hover:underline"
                    >
                      Remove Video
                    </button>
                  )}
                </div>
                <label className="w-full py-2.5 px-3 rounded-xl border border-dashed border-amber-400/40 bg-amber-500/10 text-amber-300 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" /> Upload MP4 / MOV Video (Recommended)
                  <input
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      notify("Uploading video...");
                      const url = await uploadMediaToCloud(file, "videos");
                      if (url) {
                        syncProfileToCloud({ ...profile, videoUrl: url });
                        notify("Video uploaded!");
                      }
                    }}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Or paste direct .mp4 video URL"
                  value={profile.videoUrl || ""}
                  onChange={(e) => syncProfileToCloud({ ...profile, videoUrl: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
                {profile.videoUrl && !isDirectVideoFile(profile.videoUrl) && (
                  <p className="text-[11px] text-amber-300 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Webpage URLs (YouTube/TikTok) cannot autoplay inline. Upload an MP4/MOV file for autoplay.
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Video Caption (e.g. Watch How SmartTap Works)"
                  value={profile.videoCaption || ""}
                  onChange={(e) => syncProfileToCloud({ ...profile, videoCaption: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
              </div>

              {[
                { key: "fullName", label: "Full Name" },
                { key: "headline", label: "Title / Headline" },
                { key: "company", label: "Company / Brand" },
                { key: "location", label: "Location / Address" },
                { key: "mapQuery", label: "Google Maps / Waze Search Pin (Exact Store/Branch)" },
                { key: "phone", label: "Mobile Number" },
                { key: "email", label: "Email Address" },
                { key: "website", label: "Website URL" },
                { key: "whatsapp", label: "WhatsApp Number (e.g. 639171234567)" },
                { key: "viber", label: "Viber Number (e.g. +639171234567)" },
                { key: "telegram", label: "Telegram Username (e.g. @username)" },
                { key: "messenger", label: "Messenger Username (e.g. yourpage)" },
                { key: "ctaLabel", label: "Primary Action Button Label" },
                { key: "ctaUrl", label: "Primary Action Button URL" },
              ].map((field) => {
                const isFieldBroken =
                  (field.key === "ctaUrl" && hasCtaBroken) ||
                  (field.key === "website" && hasWebsiteBroken);
                return (
                  <div key={field.key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-medium text-zinc-400">{field.label}</label>
                      {isFieldBroken && (
                        <span className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Invalid/Unreachable URL
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={profile[field.key] || ""}
                      onChange={(e) => syncProfileToCloud({ ...profile, [field.key]: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${
                        isFieldBroken ? "border-rose-500/70" : activeTheme.subCard
                      }`}
                    />
                  </div>
                );
              })}

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-400">Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio || ""}
                  onChange={(e) => syncProfileToCloud({ ...profile, bio: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="text-[11px] font-medium text-zinc-400">Change Owner Password</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showNewPw ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="New password (min 4 chars)"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      className={`w-full pl-3.5 pr-9 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
                    >
                      {showNewPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleUpdatePassword}
                    className={`px-4 py-2.5 rounded-xl text-xs ${activeTheme.button}`}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LINKS, GAMING IDS & MUSIC */}
          {editorTab === "links" && (
            <div className="space-y-4">
              <div className={`rounded-3xl border p-5 space-y-3 ${activeTheme.card}`}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {editingLink ? "Edit Link Item" : "Add New Link / Game ID / Music"}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={editingLink ? editingLink.category : newLink.category}
                    onChange={(e) =>
                      editingLink
                        ? setEditingLink({ ...editingLink, category: e.target.value })
                        : setNewLink({ ...newLink, category: e.target.value })
                    }
                    className="px-3 py-2.5 rounded-xl text-xs border border-white/10 bg-zinc-900 text-zinc-100"
                  >
                    <option value="social">Social Media</option>
                    <option value="business">Business / Store</option>
                    <option value="gaming">Gaming ID</option>
                    <option value="music">Music / Audio</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Platform (e.g. TikTok, MLBB)"
                    value={editingLink ? editingLink.platform : newLink.platform}
                    onChange={(e) =>
                      editingLink
                        ? setEditingLink({ ...editingLink, platform: e.target.value })
                        : setNewLink({ ...newLink, platform: e.target.value })
                    }
                    className={`px-3 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Title (e.g. Follow my TikTok)"
                  value={editingLink ? editingLink.title : newLink.title}
                  onChange={(e) =>
                    editingLink
                      ? setEditingLink({ ...editingLink, title: e.target.value })
                      : setNewLink({ ...newLink, title: e.target.value })
                  }
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
                <input
                  type="text"
                  placeholder="Subtitle / Handle"
                  value={editingLink ? editingLink.subtitle : newLink.subtitle}
                  onChange={(e) =>
                    editingLink
                      ? setEditingLink({ ...editingLink, subtitle: e.target.value })
                      : setNewLink({ ...newLink, subtitle: e.target.value })
                  }
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
                <input
                  type="text"
                  placeholder="Destination URL (https://...)"
                  value={editingLink ? editingLink.url : newLink.url}
                  onChange={(e) =>
                    editingLink
                      ? setEditingLink({ ...editingLink, url: e.target.value })
                      : setNewLink({ ...newLink, url: e.target.value })
                  }
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />

                {(editingLink ? editingLink.category : newLink.category) === "gaming" && (
                  <input
                    type="text"
                    placeholder="In-Game ID / Server (for 1-tap copy)"
                    value={editingLink ? editingLink.gameId : newLink.gameId}
                    onChange={(e) =>
                      editingLink
                        ? setEditingLink({ ...editingLink, gameId: e.target.value })
                        : setNewLink({ ...newLink, gameId: e.target.value })
                    }
                    className={`w-full px-3 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                  />
                )}

                {(editingLink ? editingLink.category : newLink.category) === "music" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Direct MP3/Audio Stream URL (optional)"
                      value={editingLink ? editingLink.audioUrl || "" : newLink.audioUrl || ""}
                      onChange={(e) =>
                        editingLink
                          ? setEditingLink({ ...editingLink, audioUrl: e.target.value })
                          : setNewLink({ ...newLink, audioUrl: e.target.value })
                      }
                      className={`w-full px-3 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                    />
                    <label className="w-full py-2 px-3 rounded-xl border border-dashed border-amber-400/40 bg-amber-500/10 text-amber-300 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" /> Or Upload MP3 / M4A Audio File
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          notify("Uploading audio track...");
                          const url = await uploadMediaToCloud(file, "audio");
                          if (url) {
                            if (editingLink) {
                              setEditingLink({ ...editingLink, audioUrl: url });
                            } else {
                              setNewLink({ ...newLink, audioUrl: url });
                            }
                            notify("Audio uploaded!");
                          }
                        }}
                      />
                    </label>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const targetItem = editingLink || newLink;
                      if (!targetItem.title) {
                        notify("Title is required", "error");
                        return;
                      }
                      const urlCheck = validateUrlFormat(targetItem.url);
                      if (!urlCheck.valid) {
                        notify(`Invalid URL: ${urlCheck.reason}`, "error");
                        return;
                      }
                      if (editingLink) {
                        const updated = profile.links.map((l) =>
                          l.id === editingLink.id ? { ...editingLink, url: urlCheck.url } : l
                        );
                        syncProfileToCloud({ ...profile, links: updated });
                        setEditingLink(null);
                        notify("Link updated!");
                      } else {
                        const item = {
                          ...newLink,
                          url: urlCheck.url,
                          id: `lnk-${Date.now()}`,
                          clicks: 0,
                        };
                        syncProfileToCloud({ ...profile, links: [...(profile.links || []), item] });
                        setNewLink({
                          category: "social",
                          platform: "Instagram",
                          title: "",
                          subtitle: "",
                          url: "",
                          gameId: "",
                          audioUrl: "",
                          pinned: false,
                        });
                        notify("Link added!");
                      }
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs ${activeTheme.button}`}
                  >
                    {editingLink ? "Save Changes" : "Add Link"}
                  </button>
                  {editingLink && (
                    <button
                      type="button"
                      onClick={() => setEditingLink(null)}
                      className="px-4 py-2.5 rounded-xl text-xs bg-white/10"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {(profile.links || []).map((item, idx) => {
                  const isBroken = linkHealth[item.id] === "broken";
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 ${
                        isBroken ? "border-rose-500/60 bg-rose-950/20" : activeTheme.card
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase text-amber-400 font-bold">
                            {item.platform}
                          </span>
                          {isBroken && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-semibold">
                              Broken URL
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold truncate">{item.title}</p>
                        <p className="text-[10px] text-zinc-400 truncate">{item.url}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            const updated = profile.links.map((l) =>
                              l.id === item.id ? { ...l, pinned: !l.pinned } : l
                            );
                            syncProfileToCloud({ ...profile, links: updated });
                          }}
                          className={`p-1.5 rounded-lg border ${
                            item.pinned ? "border-amber-400 text-amber-400" : "border-white/10"
                          }`}
                          title="Pin to Top"
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (idx === 0) return;
                            const arr = [...profile.links];
                            [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                            syncProfileToCloud({ ...profile, links: arr });
                          }}
                          className="p-1.5 rounded-lg border border-white/10"
                          title="Move Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (idx === profile.links.length - 1) return;
                            const arr = [...profile.links];
                            [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
                            syncProfileToCloud({ ...profile, links: arr });
                          }}
                          className="p-1.5 rounded-lg border border-white/10"
                          title="Move Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingLink(item)}
                          className="p-1.5 rounded-lg border border-white/10 text-amber-400"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const updated = profile.links.filter((l) => l.id !== item.id);
                            syncProfileToCloud({ ...profile, links: updated });
                          }}
                          className="p-1.5 rounded-lg border border-white/10 text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: PAYMENTS */}
          {editorTab === "payments" && (
            <div className="space-y-4">
              <div className={`rounded-3xl border p-5 space-y-3 ${activeTheme.card}`}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Add Philippine Bank / E-Wallet
                </h3>
                <select
                  value={newPayment.provider}
                  onChange={(e) => setNewPayment({ ...newPayment, provider: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-xs border border-white/10 bg-zinc-900 text-zinc-100"
                >
                  {PAYMENT_PROVIDERS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Account Holder Full Name"
                  value={newPayment.accountName}
                  onChange={(e) => setNewPayment({ ...newPayment, accountName: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
                <input
                  type="text"
                  placeholder={
                    PAYMENT_PROVIDERS.find((p) => p.id === newPayment.provider)?.placeholder ||
                    "Account Number"
                  }
                  value={newPayment.accountNumber}
                  onChange={(e) => setNewPayment({ ...newPayment, accountNumber: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                />
                <label className={`p-3 rounded-xl border border-dashed text-center cursor-pointer block ${activeTheme.subCard}`}>
                  <span className="text-xs font-medium text-amber-400">
                    {newPayment.qrUrl ? "QR Code Image Ready ✓" : "+ Upload QR Ph / Wallet QR Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      notify("Uploading QR image...");
                      const url = await uploadMediaToCloud(file, "qrs");
                      if (url) setNewPayment({ ...newPayment, qrUrl: url });
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const spec = PAYMENT_PROVIDERS.find((p) => p.id === newPayment.provider);
                    const digitsOnly = newPayment.accountNumber.replace(/\D/g, "");
                    if (!newPayment.accountName || !digitsOnly) {
                      notify("Enter account name and valid account number", "error");
                      return;
                    }
                    if (spec && spec.digits > 0 && digitsOnly.length !== spec.digits) {
                      notify(`${spec.label} requires exactly ${spec.digits} digits`, "error");
                      return;
                    }
                    const item = { ...newPayment, id: `pay-${Date.now()}` };
                    syncProfileToCloud({ ...profile, payments: [...(profile.payments || []), item] });
                    setNewPayment({ provider: "GCash", accountName: "", accountNumber: "", qrUrl: "" });
                    notify("Payment method added!");
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs ${activeTheme.button}`}
                >
                  Save Payment Method
                </button>
              </div>

              {(profile.payments || []).map((pay) => (
                <div
                  key={pay.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between ${activeTheme.card}`}
                >
                  <div>
                    <p className="text-xs font-bold text-amber-400">{pay.provider}</p>
                    <p className="text-xs font-semibold">{pay.accountName}</p>
                    <p className="text-xs font-mono text-zinc-400">{pay.accountNumber}</p>
                  </div>
                  <button
                    onClick={() => {
                      const updated = profile.payments.filter((p) => p.id !== pay.id);
                      syncProfileToCloud({ ...profile, payments: updated });
                    }}
                    className="p-2 rounded-xl border border-white/10 text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB: BOOKING SLOTS & BUSINESS HOURS */}
          {editorTab === "booking" && (
            <div className="space-y-4">
              <div className={`rounded-3xl border p-5 space-y-3 ${activeTheme.card}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" /> Live Open/Closed Status Badge
                  </span>
                  <input
                    type="checkbox"
                    checked={Boolean(profile.showBusinessHours)}
                    onChange={(e) =>
                      syncProfileToCloud({ ...profile, showBusinessHours: e.target.checked })
                    }
                  />
                </div>
                {profile.showBusinessHours && (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Opening Time</label>
                        <input
                          type="time"
                          value={profile.openTime || "09:00"}
                          onChange={(e) =>
                            syncProfileToCloud({ ...profile, openTime: e.target.value })
                          }
                          className={`w-full px-3 py-2 rounded-xl text-xs border bg-transparent ${activeTheme.subCard}`}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Closing Time</label>
                        <input
                          type="time"
                          value={profile.closeTime || "21:00"}
                          onChange={(e) =>
                            syncProfileToCloud({ ...profile, closeTime: e.target.value })
                          }
                          className={`w-full px-3 py-2 rounded-xl text-xs border bg-transparent ${activeTheme.subCard}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1.5">Open Days</label>
                      <div className="flex flex-wrap gap-1.5">
                        {WEEK_DAYS.map((day) => {
                          const active = (profile.openDays || []).includes(day);
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => {
                                const cur = profile.openDays || [];
                                const next = active
                                  ? cur.filter((d) => d !== day)
                                  : [...cur, day];
                                syncProfileToCloud({ ...profile, openDays: next });
                              }}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border ${
                                active ? activeTheme.button : activeTheme.subCard
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={`rounded-3xl border p-5 space-y-4 ${activeTheme.card}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">Enable Appointment Booking Section</span>
                  <input
                    type="checkbox"
                    checked={Boolean(profile.showBookingSection)}
                    onChange={(e) =>
                      syncProfileToCloud({ ...profile, showBookingSection: e.target.checked })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add slot (e.g. 05:30 PM)"
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-xl text-xs border bg-transparent outline-none ${activeTheme.subCard}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newSlot.trim()) return;
                      syncProfileToCloud({
                        ...profile,
                        bookingSlots: [...(profile.bookingSlots || []), newSlot.trim()],
                      });
                      setNewSlot("");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs ${activeTheme.button}`}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile.bookingSlots || []).map((slot) => (
                    <span
                      key={slot}
                      className={`px-3 py-1.5 rounded-xl text-xs border flex items-center gap-2 ${activeTheme.subCard}`}
                    >
                      {slot}
                      <button
                        onClick={() =>
                          syncProfileToCloud({
                            ...profile,
                            bookingSlots: profile.bookingSlots.filter((s) => s !== slot),
                          })
                        }
                        className="text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: THEMES & TEXTURES */}
          {editorTab === "theme" && (
            <div className={`rounded-3xl border p-5 space-y-4 ${activeTheme.card}`}>
              <div>
                <p className="text-xs font-bold mb-2">Default Card Color Theme</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(THEMES).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setViewerTheme(t.id);
                        syncProfileToCloud({ ...profile, theme: t.id });
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left ${
                        profile.theme === t.id ? "border-amber-400 bg-amber-400/15" : activeTheme.subCard
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold mb-2">Surface Texture</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(TEXTURES).map((tx) => (
                    <button
                      key={tx.id}
                      onClick={() => {
                        setViewerTexture(tx.id);
                        syncProfileToCloud({ ...profile, texture: tx.id });
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left ${
                        profile.texture === tx.id ? "border-amber-400 bg-amber-400/15" : activeTheme.subCard
                      }`}
                    >
                      {tx.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: INBOX (MESSAGES, LEADS, RECEIPTS, BOOKINGS) */}
          {editorTab === "inbox" && (
            <div className="space-y-4">
              <div className={`rounded-3xl border p-4 space-y-2 ${activeTheme.card}`}>
                <h3 className="text-xs font-bold text-amber-400">
                  Direct Messages ({messages.length})
                </h3>
                {messages.length === 0 ? (
                  <p className="text-xs text-zinc-400">No messages yet.</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className={`p-3 rounded-xl border text-xs flex justify-between gap-2 ${activeTheme.subCard}`}>
                      <div>
                        <p className="font-bold">
                          {m.sender} <span className="font-normal text-zinc-400">({m.contact})</span>
                        </p>
                        <p className="mt-1">{m.message}</p>
                      </div>
                      <button
                        onClick={() => deleteInboxItem("message", m.id)}
                        className="text-rose-400 self-start p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className={`rounded-3xl border p-4 space-y-2 ${activeTheme.card}`}>
                <h3 className="text-xs font-bold text-amber-400">
                  Exchanged Contacts ({exchangedContacts.length})
                </h3>
                {exchangedContacts.length === 0 ? (
                  <p className="text-xs text-zinc-400">No contacts exchanged yet.</p>
                ) : (
                  exchangedContacts.map((c) => (
                    <div key={c.id} className={`p-3 rounded-xl border text-xs flex justify-between gap-2 ${activeTheme.subCard}`}>
                      <div>
                        <p className="font-bold">{c.name}</p>
                        <p className="text-zinc-400">
                          {c.phone} {c.email ? `• ${c.email}` : ""}
                        </p>
                        {c.note && <p className="mt-1 italic">{c.note}</p>}
                      </div>
                      <button
                        onClick={() => deleteInboxItem("contact", c.id)}
                        className="text-rose-400 self-start p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className={`rounded-3xl border p-4 space-y-2 ${activeTheme.card}`}>
                <h3 className="text-xs font-bold text-amber-400">
                  Payment Receipts ({paymentReceipts.length})
                </h3>
                {paymentReceipts.length === 0 ? (
                  <p className="text-xs text-zinc-400">No receipts uploaded yet.</p>
                ) : (
                  paymentReceipts.map((r) => (
                    <div key={r.id} className={`p-3 rounded-xl border text-xs space-y-1 ${activeTheme.subCard}`}>
                      <div className="flex justify-between gap-2">
                        <p className="font-bold">
                          {r.provider} • {r.senderName}
                        </p>
                        <button
                          onClick={() => deleteInboxItem("receipt", r.id)}
                          className="text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-zinc-400">
                        Ref: {r.referenceNo} {r.amount ? `• ₱${r.amount}` : ""}
                      </p>
                      {r.proofUrl && (
                        <a
                          href={r.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 underline inline-block"
                        >
                          View Receipt Screenshot
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className={`rounded-3xl border p-4 space-y-2 ${activeTheme.card}`}>
                <h3 className="text-xs font-bold text-amber-400">
                  Appointment Bookings ({bookings.length})
                </h3>
                {bookings.length === 0 ? (
                  <p className="text-xs text-zinc-400">No bookings yet.</p>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className={`p-3 rounded-xl border text-xs flex justify-between gap-2 ${activeTheme.subCard}`}>
                      <div>
                        <p className="font-bold">
                          {b.name} ({b.contact})
                        </p>
                        <p className="text-amber-300">
                          {b.date} at {b.slot}
                        </p>
                        {b.notes && <p className="text-zinc-400 mt-0.5">{b.notes}</p>}
                      </div>
                      <button
                        onClick={() => deleteInboxItem("booking", b.id)}
                        className="text-rose-400 self-start p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {editorTab === "analytics" && (
            <div className="space-y-4">
              <div className={`rounded-3xl border p-5 space-y-4 ${activeTheme.card}`}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" /> Real-Time Card Tap Analytics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Today (1D)", value: analytics.taps1d || 0 },
                    { label: "This Week (1W)", value: analytics.taps1w || 0 },
                    { label: "This Month (1M)", value: analytics.taps1m || 0 },
                    { label: "Lifetime Taps", value: analytics.tapsTotal || 0 },
                  ].map((stat) => (
                    <div key={stat.label} className={`p-4 rounded-2xl border ${activeTheme.subCard}`}>
                      <p className="text-[11px] text-zinc-400">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-3xl border p-5 space-y-3 ${activeTheme.card}`}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <MousePointerClick className="w-4 h-4" /> Clicks Per Link
                </h3>
                {(profile.links || []).length === 0 ? (
                  <p className="text-xs text-zinc-400">No links to track yet.</p>
                ) : (
                  (profile.links || []).map((l) => (
                    <div
                      key={l.id}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${activeTheme.subCard}`}
                    >
                      <span className="font-medium truncate pr-2">{l.title}</span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 font-bold shrink-0">
                        {l.clicks || 0} clicks
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      )}

      {/* POST-SAVE CONTACT PROMPT MODAL */}
      {showPostSavePrompt && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-white/15 text-zinc-100 p-6 space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold">Contact Saved!</h3>
              <p className="text-xs text-zinc-400">
                Would you like to share your contact info with{" "}
                <span className="text-zinc-200 font-semibold">{profile.fullName}</span> too?
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowPostSavePrompt(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10"
              >
                No, Thanks
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPostSavePrompt(false);
                  setShowExchangeModal(true);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs ${activeTheme.button}`}
              >
                Yes, Exchange
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: QR CODE */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-white/15 text-zinc-100 p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Scan to Open Card</h3>
              <button onClick={() => setShowQrModal(false)} className="p-1.5 rounded-xl bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white p-4 rounded-2xl inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                  `${APP_BASE_URL}/?u=${profile.username}`
                )}`}
                alt="Profile QR"
                className="w-48 h-48"
              />
            </div>
            <p className="text-xs text-zinc-400 font-mono break-all">
              {APP_BASE_URL}/?u={profile.username}
            </p>
            <button
              onClick={() =>
                copyText(`${APP_BASE_URL}/?u=${profile.username}`, "qr-link", "Profile URL copied!")
              }
              className={`w-full py-3 rounded-2xl text-xs ${activeTheme.button}`}
            >
              Copy Profile Link
            </button>
          </div>
        </div>
      )}

      {/* MODAL: EXCHANGE CONTACT */}
      {showExchangeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-white/15 text-zinc-100 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Share Your Contact with {profile.fullName}</h3>
              <button onClick={() => setShowExchangeModal(false)} className="p-1.5 rounded-xl bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleExchangeSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Full Name *"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <input
                type="tel"
                placeholder="Your Mobile Number *"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email (Optional)"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <input
                type="text"
                placeholder="Where did we meet? (Optional)"
                value={contactForm.note}
                onChange={(e) => setContactForm({ ...contactForm, note: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <button type="submit" className={`w-full py-3 rounded-2xl text-xs ${activeTheme.button}`}>
                Send My Contact
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PAYMENT QR & RECEIPT UPLOAD */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-white/15 text-zinc-100 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">{showPaymentModal.provider} Transfer</h3>
              <button onClick={() => setShowPaymentModal(null)} className="p-1.5 rounded-xl bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            {showPaymentModal.qrUrl && (
              <img
                src={showPaymentModal.qrUrl}
                alt="Payment QR"
                className="w-48 h-48 mx-auto rounded-2xl object-contain bg-white p-2"
              />
            )}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
              <p className="text-xs font-bold">{showPaymentModal.accountName}</p>
              <p className="text-sm font-mono text-amber-400">{showPaymentModal.accountNumber}</p>
              <button
                onClick={() =>
                  copyText(showPaymentModal.accountNumber, "modal-pay", "Account number copied!")
                }
                className="text-[11px] text-zinc-300 underline"
              >
                Copy Account Number
              </button>
            </div>

            <form onSubmit={handleReceiptSubmit} className="space-y-2.5 pt-2 border-t border-white/10">
              <p className="text-xs font-bold text-amber-400">Upload Payment Receipt</p>
              <input
                type="text"
                placeholder="Your Name *"
                value={receiptForm.senderName}
                onChange={(e) => setReceiptForm({ ...receiptForm, senderName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <input
                type="text"
                placeholder="Reference No. *"
                value={receiptForm.referenceNo}
                onChange={(e) => setReceiptForm({ ...receiptForm, referenceNo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <input
                type="text"
                placeholder="Amount Paid (PHP)"
                value={receiptForm.amount}
                onChange={(e) => setReceiptForm({ ...receiptForm, amount: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <label className="p-2.5 rounded-xl border border-dashed border-white/20 text-center text-xs block cursor-pointer">
                {receiptForm.proofUrl ? "Screenshot Attached ✓" : "+ Attach Receipt Screenshot"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadMediaToCloud(file, "receipts");
                    if (url) setReceiptForm({ ...receiptForm, proofUrl: url });
                  }}
                />
              </label>
              <button type="submit" className={`w-full py-2.5 rounded-xl text-xs ${activeTheme.button}`}>
                Submit Receipt
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ACTIVATE NEW CARD (ANTI-COURIER TAMPERING: BLANK CODE FIELD) */}
      {showActivateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-amber-400/25 text-zinc-100 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" /> Activate Your SmartTap Card
              </h3>
              <button onClick={() => setShowActivateModal(false)} className="p-1.5 rounded-xl bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enter the One-Time Activation Code printed on the sealed thank-you insert inside your
              SmartTap package to claim your card.
            </p>
            <form onSubmit={handleActivateCard} autoComplete="off" className="space-y-3">
              <input
                type="text"
                name="smarttap_act_code"
                autoComplete="off"
                placeholder="ACTIVATION CODE (STPH-XXXX-XXXX)"
                value={actCodeInput}
                onChange={(e) => setActCodeInput(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono border border-amber-400/30 bg-white/5 outline-none"
              />
              <input
                type="text"
                name="smarttap_act_fullname"
                autoComplete="off"
                placeholder="Your Full Name"
                value={actFullName}
                onChange={(e) => setActFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <input
                type="text"
                name="smarttap_act_username"
                autoComplete="off"
                placeholder="Choose Username (for your custom link)"
                value={actUsername}
                onChange={(e) => setActUsername(e.target.value.toLowerCase())}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <div className="relative">
                <input
                  type={showActPw ? "text" : "password"}
                  name="smarttap_act_new_pw"
                  autoComplete="new-password"
                  placeholder="Create Owner Password"
                  value={actPassword}
                  onChange={(e) => setActPassword(e.target.value)}
                  className="w-full pl-3.5 pr-9 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowActPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showActPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {activateError && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {activateError}
                </p>
              )}
              <button
                type="submit"
                disabled={syncing}
                className={`w-full py-3 rounded-2xl text-xs ${activeTheme.button}`}
              >
                {syncing ? "Activating..." : "Activate & Setup My Card"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: OWNER LOGIN */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-white/15 text-zinc-100 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" /> Card Owner Login
              </h3>
              <button onClick={() => setShowLoginModal(false)} className="p-1.5 rounded-xl bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleOwnerLogin} className="space-y-3">
              <input
                type="text"
                placeholder="Username (e.g. demo)"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
              />
              <div className="relative">
                <input
                  type={showLoginPw ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Password (demo123)"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-3.5 pr-9 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showLoginPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {loginError}
                </p>
              )}
              <button
                type="submit"
                disabled={syncing}
                className={`w-full py-3 rounded-2xl text-xs ${activeTheme.button}`}
              >
                {syncing ? "Signing In..." : "Sign In to Edit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FOUNDER ADMIN VAULT (5-TAP ON LOGO) */}
      {showFounderModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-zinc-950 border border-amber-400/30 text-zinc-100 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" /> SmartTap Founder Vault
              </h3>
              <button onClick={() => setShowFounderModal(false)} className="p-1.5 rounded-xl bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!founderUnlocked ? (
              <form onSubmit={handleFounderUnlock} className="space-y-3">
                <p className="text-xs text-zinc-400">
                  Enter Founder Passcode to generate bulk NFC/QR cards & manage inventory.
                </p>
                <div className="relative">
                  <input
                    type={showFounderPw ? "text" : "password"}
                    placeholder="Founder Passcode"
                    value={founderPassInput}
                    onChange={(e) => setFounderPassInput(e.target.value)}
                    className="w-full pl-3.5 pr-9 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFounderPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  >
                    {showFounderPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {founderError && <p className="text-xs text-rose-400">{founderError}</p>}
                <button type="submit" className={`w-full py-3 rounded-2xl text-xs ${activeTheme.button}`}>
                  Unlock Vault
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Bulk Card Generator & Canva CSV Export
                    </p>
                    <button
                      onClick={handleExportMasterExcel}
                      className="text-[11px] text-amber-400 underline"
                    >
                      Export Excel Report (.xls)
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={batchQty}
                      onChange={(e) => setBatchQty(e.target.value)}
                      placeholder="Quantity (e.g. 50)"
                      className="px-3 py-2 rounded-xl text-xs border border-white/10 bg-black/40 outline-none"
                    />
                    <input
                      type="text"
                      value={batchLabel}
                      onChange={(e) => setBatchLabel(e.target.value)}
                      placeholder="Batch Label (e.g. Batch 1)"
                      className="px-3 py-2 rounded-xl text-xs border border-white/10 bg-black/40 outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateBulkCards}
                    disabled={generatingBatch}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-400 text-zinc-950 hover:bg-emerald-300 transition"
                  >
                    {generatingBatch
                      ? "Generating & Saving to Cloud..."
                      : "Generate Cards & Download Canva CSV"}
                  </button>

                  {batchMessage && (
                    <div
                      className={`p-3 rounded-xl text-xs border ${
                        batchMessage.type === "error"
                          ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                          : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                      }`}
                    >
                      {batchMessage.text}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setAdminTab("codes")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        adminTab === "codes" ? activeTheme.button : "bg-white/5"
                      }`}
                    >
                      Card Inventory ({allCodes.length})
                    </button>
                    <button
                      onClick={() => setAdminTab("users")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        adminTab === "users" ? activeTheme.button : "bg-white/5"
                      }`}
                    >
                      Active Buyers ({allProfiles.length})
                    </button>
                  </div>
                  <button
                    onClick={loadFounderInventory}
                    className="p-2 rounded-xl bg-white/5 border border-white/10"
                    title="Refresh Inventory"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search code, batch, or username..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-white/10 bg-white/5 outline-none"
                />

                {adminTab === "codes" ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {allCodes
                      .filter(
                        (c) =>
                          !adminSearch ||
                          c.code.toLowerCase().includes(adminSearch.toLowerCase()) ||
                          (c.batch_label || "").toLowerCase().includes(adminSearch.toLowerCase()) ||
                          (c.claimed_by || "").toLowerCase().includes(adminSearch.toLowerCase())
                      )
                      .map((c) => (
                        <div
                          key={c.code}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <p className="font-mono font-bold text-amber-400">{c.code}</p>
                            <p className="text-[11px] text-zinc-400">
                              {c.batch_label || "Batch 1"} •{" "}
                              {c.is_used ? `Claimed by @${c.claimed_by}` : "Available"}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              copyText(`${APP_BASE_URL}/?c=${c.code}`, c.code, "NFC/QR URL copied!")
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-white/10 text-[11px]"
                          >
                            Copy URL
                          </button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {allProfiles
                      .filter(
                        (p) =>
                          !adminSearch ||
                          p.username.toLowerCase().includes(adminSearch.toLowerCase()) ||
                          (p.profile_data?.fullName || "")
                            .toLowerCase()
                            .includes(adminSearch.toLowerCase())
                      )
                      .map((p) => (
                        <div
                          key={p.username}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-bold">
                              {p.profile_data?.fullName || p.username}{" "}
                              <span className="text-amber-400">@{p.username}</span>
                            </p>
                            <p className="text-[11px] text-zinc-400">
                              Code: {p.activation_code || "-"} • Taps: {p.analytics?.tapsTotal || 0}
                            </p>
                          </div>
                          <a
                            href={`/?u=${p.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-white/10 text-[11px]"
                          >
                            Open
                          </a>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
