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
  Sparkles,
  Palette,
  Edit3,
  Eye,
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
  Pin,
  RefreshCw,
  AlertCircle,
  FileSpreadsheet,
  Image as ImageIcon,
  Lock,
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

const DEFAULT_PROFILE = {
  fullName: "Juan Dela Cruz",
  username: "demo",
  headline: "Founder & Digital Creator",
  company: "SmartTap Philippines",
  location: "Metro Manila, Philippines",
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
  ctaLabel: "Order SmartTap NFC Cards",
  ctaUrl: "https://www.tiktok.com/@smarttap.ph",
  orderFooterUrl: "https://www.tiktok.com/@smarttap.ph",
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
    },
    {
      id: "lnk-2",
      category: "business",
      platform: "Portfolio",
      title: "Product Catalog & Packages",
      subtitle: "Custom NFC Review Cards & Stands",
      url: "https://smarttapapp.vercel.app",
      pinned: false,
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

function sanitizeUrl(raw) {
  if (!raw || typeof raw !== "string") return "";
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "#") return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
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

export default function SmartTapApp() {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState(null);

  // Screen & Route states: "claim" (Startup Landing) | "viewer" | "editor"
  const [screen, setScreen] = useState("claim");
  const [unclaimedCode, setUnclaimedCode] = useState("");
  const [activeCardCode, setActiveCardCode] = useState("");
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);

  // Core profile & cloud collections
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

  // Viewer interactive states
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  // Modals & Inline Form Errors
  const [showQrModal, setShowQrModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showFounderModal, setShowFounderModal] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [activateError, setActivateError] = useState("");
  const [founderError, setFounderError] = useState("");

  // Auth & Activation form inputs
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [actCodeInput, setActCodeInput] = useState("");
  const [actFullName, setActFullName] = useState("");
  const [actUsername, setActUsername] = useState("");
  const [actPassword, setActPassword] = useState("");

  // Viewer submission forms
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [msgForm, setMsgForm] = useState({ sender: "", contact: "", message: "" });
  const [receiptForm, setReceiptForm] = useState({ senderName: "", referenceNo: "", amount: "", proofUrl: "" });
  const [bookingForm, setBookingForm] = useState({ name: "", contact: "", date: "", slot: "10:00 AM", notes: "" });

  // Editor states
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

  // Founder Vault states (5-tap secret trigger)
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

  // Enforce iOS / Mobile Viewport Anti-Zoom Guard + Audio Cleanup
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

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Load initial route (?c=CODE, ?u=USERNAME, device session, or Claim Landing Page)
  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(window.location.search);
        const cardParam = (params.get("c") || "").trim().toUpperCase();
        const userParam = (params.get("u") || "").trim().toLowerCase();
        const savedSessionUser = localStorage.getItem("smarttap_device_user") || "";

        // Built-in local demo session restore
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

        if (!supabase) {
          setScreen("claim");
          setLoading(false);
          return;
        }

        // 1. Physical NFC/QR Card Route (?c=STPH-XXXX-XXXX)
        if (cardParam) {
          const { data: codeRow } = await supabase
            .from("smarttap_codes")
            .select("*")
            .eq("code", cardParam)
            .maybeSingle();

          if (codeRow && !codeRow.is_used) {
            setUnclaimedCode(cardParam);
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

        // 2. Direct Username Route (?u=username)
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

        // 3. Logged-in Device Session Fallback
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

        // 4. Default Startup Screen -> Claim Your SmartTap Card Landing Page
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
    const isDeviceOwner = savedDeviceUser && savedDeviceUser.toLowerCase() === row.username.toLowerCase();
    setIsOwnerLoggedIn(Boolean(isDeviceOwner));

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

  // Save profile changes to Supabase Cloud
  const saveProfileToCloud = async (updatedProfile, extraFields = {}) => {
    setProfile(updatedProfile);
    if (!updatedProfile.allowViewerThemeSwitch) {
      setViewerTheme(updatedProfile.theme);
      setViewerTexture(updatedProfile.texture || "aurora");
    }
    if (!supabase || !isOwnerLoggedIn || updatedProfile.username === "demo") return;
    setSyncing(true);
    try {
      const payload = {
        profile_data: updatedProfile,
        updated_at: new Date().toISOString(),
        ...extraFields,
      };
      const { error } = await supabase
        .from("smarttap_profiles")
        .update(payload)
        .eq("username", updatedProfile.username);
      if (error) throw error;
    } catch (err) {
      console.error("Save error:", err);
      notify("Cloud sync failed. Check connection.", "error");
    } finally {
      setSyncing(false);
    }
  };

  // Race-safe cloud array append helper for public viewers
  const appendCloudArrayField = async (columnName, newItem, localSetter) => {
    if (!supabase || profile.username === "demo") {
      localSetter((prev) => [newItem, ...prev]);
      return;
    }
    const { data: freshRow } = await supabase
      .from("smarttap_profiles")
      .select(columnName)
      .eq("username", profile.username)
      .maybeSingle();

    const currentArr = Array.isArray(freshRow?.[columnName]) ? freshRow[columnName] : [];
    const updatedArr = [newItem, ...currentArr];
    localSetter(updatedArr);

    await supabase
      .from("smarttap_profiles")
      .update({ [columnName]: updatedArr })
      .eq("username", profile.username);
  };

  // Activate a physical SmartTap card
  const handleActivateCard = async (e) => {
    e.preventDefault();
    setActivateError("");
    const code = actCodeInput.trim().toUpperCase();
    const cleanUser = actUsername.trim().toLowerCase().replace(/[^a-z0-9._]/g, "");
    if (!code || !actFullName.trim() || !cleanUser || actPassword.length < 4) {
      setActivateError("Please complete all fields (password minimum 4 characters).");
      return;
    }
    if (!supabase) {
      setActivateError("Database connection is not configured yet.");
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
        setActivateError("Invalid Activation Code. Check the printed card insert inside your package.");
        setSyncing(false);
        return;
      }
      if (codeRow.is_used) {
        setActivateError("This Activation Code has already been claimed by another user.");
        setSyncing(false);
        return;
      }

      const { data: existingUser } = await supabase
        .from("smarttap_profiles")
        .select("username")
        .eq("username", cleanUser)
        .maybeSingle();

      if (existingUser || cleanUser === "demo") {
        setActivateError("Username is already taken. Please choose another username.");
        setSyncing(false);
        return;
      }

      const initialProfile = {
        ...DEFAULT_PROFILE,
        fullName: actFullName.trim(),
        username: cleanUser,
        headline: "SmartTap Verified Member",
        company: "",
        bio: `Hi! I'm ${actFullName.trim()}. Tap my SmartTap card to connect with me.`,
        links: [],
        payments: [],
      };

      const { error: insertErr } = await supabase.from("smarttap_profiles").insert({
        username: cleanUser,
        password: actPassword,
        activation_code: code,
        profile_data: initialProfile,
      });

      if (insertErr) throw insertErr;

      await supabase
        .from("smarttap_codes")
        .update({
          is_used: true,
          claimed_by: cleanUser,
          claimed_at: new Date().toISOString(),
        })
        .eq("code", code);

      localStorage.setItem("smarttap_device_user", cleanUser);
      setIsOwnerLoggedIn(true);
      setUnclaimedCode("");
      setActiveCardCode(code);
      setProfile(initialProfile);
      setViewerTheme(initialProfile.theme);
      setViewerTexture(initialProfile.texture);
      setMessages([]);
      setExchangedContacts([]);
      setPaymentReceipts([]);
      setBookings([]);
      setShowActivateModal(false);
      setScreen("editor");
      notify("Card activated! Welcome to SmartTap.");
    } catch (err) {
      console.error(err);
      setActivateError("Activation failed. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  // Owner Login (Supports both Supabase cloud accounts and built-in demo / demo1234)
  const handleOwnerLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    const user = loginUsername.trim().toLowerCase();
    if (!user || !loginPassword) {
      setLoginError("Please enter both username and password.");
      return;
    }

    if (user === "demo" && loginPassword === "demo1234") {
      localStorage.setItem("smarttap_device_user", "demo");
      setProfile(DEFAULT_PROFILE);
      setViewerTheme(DEFAULT_PROFILE.theme);
      setViewerTexture(DEFAULT_PROFILE.texture);
      setActiveCardCode("STPH-DEMO-CARD");
      setIsOwnerLoggedIn(true);
      setShowLoginModal(false);
      setScreen("editor");
      setLoginPassword("");
      notify("Logged in to Demo Editor (@demo)");
      return;
    }

    if (!supabase) {
      setLoginError("Database not connected.");
      return;
    }
    setSyncing(true);
    try {
      const { data: row } = await supabase
        .from("smarttap_profiles")
        .select("*")
        .eq("username", user)
        .maybeSingle();

      if (!row || row.password !== loginPassword) {
        setLoginError("Invalid username or password. Please check and try again.");
        setSyncing(false);
        return;
      }

      localStorage.setItem("smarttap_device_user", row.username);
      await hydrateProfileRow(row, row.username, false);
      setShowLoginModal(false);
      setScreen("editor");
      setLoginPassword("");
      notify(`Logged in as @${row.username}`);
    } catch (err) {
      setLoginError("Network error while logging in. Try again.");
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("smarttap_device_user");
    setIsOwnerLoggedIn(false);
    setScreen("claim");
    notify("Logged out on this device.");
  };

  const handleUpdatePassword = async () => {
    if (newPasswordInput.trim().length < 4) {
      notify("New password must be at least 4 characters.", "error");
      return;
    }
    if (profile.username === "demo") {
      notify("Demo account password cannot be changed.", "error");
      return;
    }
    await saveProfileToCloud(profile, { password: newPasswordInput.trim() });
    setNewPasswordInput("");
    notify("Owner password updated!");
  };

  const handleMoveLink = (index, direction) => {
    const list = [...(profile.links || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    saveProfileToCloud({ ...profile, links: list });
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    notify("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveContact = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${profile.fullName}`,
      profile.company ? `ORG:${profile.company}` : "",
      profile.headline ? `TITLE:${profile.headline}` : "",
      profile.phone ? `TEL;TYPE=CELL:${profile.phone}` : "",
      profile.email ? `EMAIL:${profile.email}` : "",
      profile.website ? `URL:${profile.website}` : "",
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.username || "smarttap"}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
    notify("Contact saved to phone!");
  };

  const toggleAudio = (link) => {
    if (!link.audioUrl) return;
    if (playingId === link.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(link.audioUrl);
    audio.onended = () => setPlayingId(null);
    audio.play().catch(() => notify("Unable to play audio preview.", "error"));
    audioRef.current = audio;
    setPlayingId(link.id);
  };

  // Viewer Submissions
  const submitExchangeContact = async (e) => {
    e.preventDefault();
    if (!contactForm.name.trim()) return;
    const entry = {
      id: `exc-${Date.now()}`,
      ...contactForm,
      createdAt: new Date().toLocaleString(),
    };
    setContactForm({ name: "", phone: "", email: "", note: "" });
    setShowExchangeModal(false);
    await appendCloudArrayField("exchanged_contacts", entry, setExchangedContacts);
    notify("Contact shared with " + profile.fullName + "!");
  };

  const submitDirectMessage = async (e) => {
    e.preventDefault();
    if (!msgForm.sender.trim() || !msgForm.message.trim()) return;
    const entry = {
      id: `msg-${Date.now()}`,
      ...msgForm,
      createdAt: new Date().toLocaleString(),
    };
    setMsgForm({ sender: "", contact: "", message: "" });
    await appendCloudArrayField("messages", entry, setMessages);
    notify("Direct message sent!");
  };

  const submitPaymentReceipt = async (e) => {
    e.preventDefault();
    if (!receiptForm.senderName.trim() || !receiptForm.referenceNo.trim()) return;
    const entry = {
      id: `rcp-${Date.now()}`,
      provider: showPaymentModal?.provider || "Payment",
      ...receiptForm,
      createdAt: new Date().toLocaleString(),
    };
    setReceiptForm({ senderName: "", referenceNo: "", amount: "", proofUrl: "" });
    setShowPaymentModal(null);
    await appendCloudArrayField("payment_receipts", entry, setPaymentReceipts);
    notify("Payment receipt submitted!");
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!bookingForm.name.trim() || !bookingForm.date) return;
    const entry = {
      id: `bok-${Date.now()}`,
      ...bookingForm,
      createdAt: new Date().toLocaleString(),
    };
    setBookingForm({ name: "", contact: "", date: "", slot: profile.bookingSlots?.[0] || "10:00 AM", notes: "" });
    await appendCloudArrayField("bookings", entry, setBookings);
    notify("Booking request sent!");
  };

  // Founder Vault Actions (Unlimited Batch CSV + Executive Excel Report + Remote Reset)
  const handleLogoSecretTap = () => {
    const next = logoTapCount + 1;
    if (next >= 5) {
      setLogoTapCount(0);
      setFounderError("");
      setShowFounderModal(true);
    } else {
      setLogoTapCount(next);
    }
  };

  const loadFounderData = async () => {
    if (!supabase) return;
    const [{ data: codesData }, { data: profsData }] = await Promise.all([
      supabase.from("smarttap_codes").select("*").order("created_at", { ascending: false }),
      supabase.from("smarttap_profiles").select("*").order("created_at", { ascending: false }),
    ]);
    if (codesData) setAllCodes(codesData);
    if (profsData) setAllProfiles(profsData);
  };

  const unlockFounderVault = async (e) => {
    e.preventDefault();
    setFounderError("");
    if (founderPassInput.trim() === FOUNDER_PASSCODE) {
      setFounderUnlocked(true);
      await loadFounderData();
      notify("Founder Vault unlocked.");
    } else {
      setFounderError("Incorrect Founder Passcode.");
    }
  };

  const downloadCsvRows = (filename, headers, rows) => {
    const csvContent = [headers, ...rows]
      .map((r) => r.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateBulkCsv = async () => {
    if (generatingBatch) return;
    setGeneratingBatch(true);
    setBatchMessage(null);
    try {
      const count = Math.max(1, Math.min(2000, Number(batchQty) || 50));
      const label = batchLabel.trim() || "Batch";
      const generated = [];
      const existingSet = new Set(allCodes.map((c) => c.code));

      while (generated.length < count) {
        const code = generateCardCode();
        if (!existingSet.has(code)) {
          existingSet.add(code);
          generated.push({
            code,
            batch_label: label,
            is_used: false,
          });
        }
      }

      if (!supabase) {
        setBatchMessage({
          type: "error",
          text: "Supabase environment variables are missing in Vercel. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then Redeploy.",
        });
        setGeneratingBatch(false);
        return;
      }

      const { error } = await supabase.from("smarttap_codes").insert(generated);
      if (error) {
        setBatchMessage({
          type: "error",
          text: `Database insert failed: ${error.message}. Run the SQL table/policy setup in Supabase.`,
        });
        setGeneratingBatch(false);
        return;
      }

      await loadFounderData();
      setBatchMessage({
        type: "success",
        text: `Successfully generated & saved ${count} cards (${label})! Canva CSV downloaded.`,
      });

      downloadCsvRows(
        `SmartTap_${label.replace(/\s+/g, "_")}_${count}cards_Canva.csv`,
        ["Card_Code", "Full_URL", "Serial_Label"],
        generated.map((item) => [item.code, `${APP_BASE_URL}/?c=${item.code}`, `ID: ${item.code}`])
      );
      notify(`Generated ${count} card codes!`);
    } catch (err) {
      setBatchMessage({ type: "error", text: err?.message || "Unexpected error while generating." });
    } finally {
      setGeneratingBatch(false);
    }
  };

  const handleExportAllInventoryCsv = () => {
    const total = allCodes.length;
    const claimed = allCodes.filter((c) => c.is_used).length;
    const available = total - claimed;
    const rate = total > 0 ? ((claimed / total) * 100).toFixed(1) : "0.0";
    const generatedDate = new Date().toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" });

    const esc = (v) =>
      String(v ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const rowsHtml = allCodes
      .map((c, i) => {
        const bg = i % 2 === 0 ? "#FFFFFF" : "#F8FAFC";
        const statusBg = c.is_used ? "#FEF3C7" : "#DCFCE7";
        const statusColor = c.is_used ? "#92400E" : "#166534";
        const statusLabel = c.is_used ? "CLAIMED" : "AVAILABLE";
        const fullUrl = `${APP_BASE_URL}/?c=${c.code}`;
        const claimedDate = c.claimed_at ? new Date(c.claimed_at).toLocaleDateString("en-PH") : "—";
        return `
          <tr style="background:${bg};">
            <td style="padding:8px 10px;border:1px solid #E2E8F0;text-align:center;color:#64748B;">${i + 1}</td>
            <td style="padding:8px 12px;border:1px solid #E2E8F0;font-family:Consolas,monospace;font-weight:bold;color:#0F172A;">${esc(c.code)}</td>
            <td style="padding:8px 12px;border:1px solid #E2E8F0;color:#334155;">${esc(c.batch_label || "General")}</td>
            <td style="padding:8px 10px;border:1px solid #E2E8F0;text-align:center;background:${statusBg};color:${statusColor};font-weight:bold;">${statusLabel}</td>
            <td style="padding:8px 12px;border:1px solid #E2E8F0;color:#0F172A;font-weight:${c.claimed_by ? "bold" : "normal"};">${c.claimed_by ? "@" + esc(c.claimed_by) : "Unassigned"}</td>
            <td style="padding:8px 10px;border:1px solid #E2E8F0;text-align:center;color:#475569;">${esc(claimedDate)}</td>
            <td style="padding:8px 12px;border:1px solid #E2E8F0;color:#2563EB;"><a href="${esc(fullUrl)}">${esc(fullUrl)}</a></td>
          </tr>`;
      })
      .join("");

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8" /></head>
      <body style="font-family:Calibri,Arial,sans-serif;">
        <table style="border-collapse:collapse;width:100%;">
          <tr>
            <td colspan="7" style="background:#09090B;color:#FBBF24;font-size:18px;font-weight:bold;padding:14px 16px;">
              SMARTTAP PHILIPPINES — MASTER NFC CARD INVENTORY &amp; MONITORING REPORT
            </td>
          </tr>
          <tr>
            <td colspan="7" style="background:#18181B;color:#A1A1AA;font-size:11px;padding:6px 16px 12px 16px;">
              Generated on: ${esc(generatedDate)} • Official Inventory &amp; Activation Tracker
            </td>
          </tr>
          <tr><td colspan="7" style="height:10px;"></td></tr>
          <tr>
            <td colspan="2" style="background:#F1F5F9;border:1px solid #CBD5E1;padding:10px;font-weight:bold;color:#334155;">TOTAL CARDS: ${total}</td>
            <td colspan="2" style="background:#DCFCE7;border:1px solid #86EFAC;padding:10px;font-weight:bold;color:#166534;">AVAILABLE STOCK: ${available}</td>
            <td colspan="2" style="background:#FEF3C7;border:1px solid #FCD34D;padding:10px;font-weight:bold;color:#92400E;">CLAIMED CARDS: ${claimed}</td>
            <td style="background:#EFF6FF;border:1px solid #93C5FD;padding:10px;font-weight:bold;color:#1E40AF;">ACTIVATION RATE: ${rate}%</td>
          </tr>
          <tr><td colspan="7" style="height:12px;"></td></tr>
          <tr style="background:#0F172A;color:#FFFFFF;font-weight:bold;font-size:12px;">
            <th style="padding:10px;border:1px solid #0F172A;">#</th>
            <th style="padding:10px;border:1px solid #0F172A;">ACTIVATION CODE</th>
            <th style="padding:10px;border:1px solid #0F172A;">BATCH LABEL</th>
            <th style="padding:10px;border:1px solid #0F172A;">STATUS</th>
            <th style="padding:10px;border:1px solid #0F172A;">CLAIMED BY</th>
            <th style="padding:10px;border:1px solid #0F172A;">DATE CLAIMED</th>
            <th style="padding:10px;border:1px solid #0F172A;">CARD TAP URL</th>
          </tr>
          ${rowsHtml}
        </table>
      </body>
      </html>`;

    const blob = new Blob([excelHtml], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SmartTap_Inventory_Report_${new Date().toISOString().slice(0, 10)}.xls`;
    a.click();
    URL.revokeObjectURL(url);
    notify("Executive Excel Inventory Report downloaded!");
  };

  const handleAdminResetCard = async (code, claimedBy) => {
    if (!supabase) return;
    if (!window.confirm(`Reset & unbind card ${code} (currently @${claimedBy})? This deletes the profile and makes the physical card claimable again.`)) {
      return;
    }
    if (claimedBy) {
      await supabase.from("smarttap_profiles").delete().eq("username", claimedBy);
    }
    await supabase
      .from("smarttap_codes")
      .update({ is_used: false, claimed_by: null, claimed_at: null })
      .eq("code", code);
    await loadFounderData();
    notify(`Card ${code} reset to Available!`);
  };

  const activeTheme = THEMES[screen === "editor" ? profile.theme : viewerTheme] || THEMES.obsidian;
  const activeTexture = TEXTURES[screen === "editor" ? profile.texture : viewerTexture] || TEXTURES.aurora;
  const shareUrl = `${APP_BASE_URL}/?u=${encodeURIComponent(profile.username || "demo")}`;

  const filteredLinks = (profile.links || [])
    .filter((l) => (activeCategory === "all" ? true : l.category === activeCategory))
    .filter((l) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (l.title || "").toLowerCase().includes(q) ||
        (l.platform || "").toLowerCase().includes(q) ||
        (l.subtitle || "").toLowerCase().includes(q) ||
        (l.gameId || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-zinc-950 flex items-center justify-center animate-pulse">
          <SmartTapLogoMark className="w-7 h-7" />
        </div>
        <p className="text-xs tracking-widest uppercase text-zinc-400">Loading SmartTap...</p>
      </div>
    );
  }

  return (
    <div
      style={activeTexture.style}
      className={`min-h-screen ${activeTheme.bg} ${activeTheme.text} transition-colors duration-300 pb-28`}
    >
      {/* Top-Level Toast Notification (z-[100] above all modals) */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-zinc-900/95 border border-white/15 text-xs font-medium text-white shadow-2xl flex items-center gap-2 backdrop-blur-md">
          {toast.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Clean, Uncrowded Sticky Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/35 border-b border-white/10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleLogoSecretTap}
            className="flex items-center gap-2 select-none shrink-0"
          >
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${activeTheme.accent} text-zinc-950 flex items-center justify-center shadow-md`}>
              <SmartTapLogoMark className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight text-base">SmartTap</span>
          </button>

          <div className="flex items-center gap-2 relative">
            {(screen === "editor" || (screen === "viewer" && profile.allowViewerThemeSwitch)) && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowThemePopover(!showThemePopover)}
                  className={`p-2 rounded-full border ${activeTheme.subCard} hover:opacity-90 transition`}
                  title="Themes & Surface Textures"
                >
                  <Palette className="w-4 h-4" />
                </button>

                {showThemePopover && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-zinc-900/95 border border-white/15 p-4 shadow-2xl backdrop-blur-xl z-40 space-y-3 text-zinc-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Themes (9)</span>
                      <button type="button" onClick={() => setShowThemePopover(false)}>
                        <X className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {Object.values(THEMES).map((t) => {
                        const isSelected = (screen === "editor" ? profile.theme : viewerTheme) === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              if (screen === "editor") {
                                saveProfileToCloud({ ...profile, theme: t.id });
                              } else {
                                setViewerTheme(t.id);
                              }
                            }}
                            className={`p-1.5 rounded-xl border text-[11px] flex items-center gap-1.5 ${
                              isSelected ? "border-amber-400 bg-white/15" : "border-white/10 bg-white/5"
                            }`}
                          >
                            <span className={`w-3 h-3 rounded-full shrink-0 bg-gradient-to-tr ${t.accent}`} />
                            <span className="truncate">{t.name.split(" ")[0]}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <span className="text-xs font-bold block">Surface Texture (5)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.values(TEXTURES).map((tx) => {
                          const isSelected = (screen === "editor" ? profile.texture : viewerTexture) === tx.id;
                          return (
                            <button
                              key={tx.id}
                              type="button"
                              onClick={() => {
                                if (screen === "editor") {
                                  saveProfileToCloud({ ...profile, texture: tx.id });
                                } else {
                                  setViewerTexture(tx.id);
                                }
                              }}
                              className={`px-2.5 py-1 rounded-full text-[11px] border ${
                                isSelected ? "border-amber-400 bg-amber-400/20 text-amber-300" : "border-white/10 bg-white/5"
                              }`}
                            >
                              {tx.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isOwnerLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => setScreen(screen === "viewer" ? "editor" : "viewer")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition ${
                    screen === "editor"
                      ? "bg-white text-zinc-950 border-white"
                      : `${activeTheme.accentBg}`
                  }`}
                >
                  {screen === "editor" ? (
                    <>
                      <Eye className="w-3.5 h-3.5" /> View Card
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" /> Editor
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log Out"
                  className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-rose-500/20 hover:text-rose-300 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setActivateError("");
                    setShowActivateModal(true);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  Activate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginError("");
                    setShowLoginModal(true);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs ${activeTheme.button} transition`}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ================= SCREEN 1: STARTUP / CLAIM LANDING PAGE ================= */}
      {screen === "claim" && (
        <main className="max-w-md mx-auto px-4 pt-12 pb-16">
          <div className={`rounded-3xl border ${activeTheme.card} ${activeTheme.glow} p-7 text-center space-y-6`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto bg-gradient-to-tr ${activeTheme.accent} text-zinc-950 flex items-center justify-center shadow-xl`}>
              <SmartTapLogoMark className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold border ${activeTheme.accentBg}`}>
                SmartTap Digital Identity
              </span>
              <h1 className="text-2xl font-bold tracking-tight">Claim Your SmartTap Card</h1>
              <p className={`text-xs leading-relaxed ${activeTheme.muted}`}>
                Tap your NFC card or enter the One-Time Activation Code from your sealed package insert to launch and customize your digital profile.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActivateError("");
                  setShowActivateModal(true);
                }}
                className={`w-full py-3.5 px-5 rounded-2xl text-sm flex items-center justify-center gap-2 ${activeTheme.button} shadow-lg hover:opacity-95 transition`}
              >
                <KeyRound className="w-4 h-4" /> Activate & Setup Card
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginError("");
                  setShowLoginModal(true);
                }}
                className={`w-full py-3 px-5 rounded-2xl text-xs font-semibold border ${activeTheme.subCard} flex items-center justify-center gap-2 hover:opacity-90 transition`}
              >
                <Lock className="w-3.5 h-3.5" /> Already Activated? Owner Login
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setProfile(DEFAULT_PROFILE);
                  setViewerTheme(DEFAULT_PROFILE.theme);
                  setViewerTexture(DEFAULT_PROFILE.texture);
                  setScreen("viewer");
                }}
                className={`${activeTheme.accentText} font-medium flex items-center gap-1 hover:underline`}
              >
                Preview Live Demo Card <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={DEFAULT_PROFILE.orderFooterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${activeTheme.muted} hover:underline`}
              >
                Order Card →
              </a>
            </div>
          </div>
        </main>
      )}

      {/* ================= SCREEN 2: VIEWER PROFILE ================= */}
      {screen === "viewer" && (
        <main className="max-w-xl mx-auto px-4 pt-5 space-y-5">
          <section className={`rounded-3xl border ${activeTheme.card} ${activeTheme.glow} overflow-hidden`}>
            <div className="h-36 sm:h-44 relative bg-gradient-to-r from-zinc-800 via-zinc-900 to-black group">
              {profile.coverUrl ? (
                <img src={profile.coverUrl} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-r ${activeTheme.accent} opacity-30`} />
              )}

              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyText(shareUrl, "cover-share")}
                  className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-black/80 transition"
                >
                  {copiedId === "cover-share" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                  Share
                </button>
                <button
                  type="button"
                  onClick={() => setShowQrModal(true)}
                  className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white hover:bg-black/80 transition"
                  title="Show Profile QR"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-5 pb-6 -mt-12 relative">
              <div className="flex items-end justify-between gap-3">
                <div className="w-24 h-24 rounded-2xl border-4 border-zinc-950 bg-zinc-800 overflow-hidden shadow-xl flex items-center justify-center text-2xl font-bold text-white">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{(profile.fullName || "S").charAt(0).toUpperCase()}</span>
                  )}
                </div>

                {profile.username === "demo" && !isOwnerLoggedIn && (
                  <button
                    type="button"
                    onClick={() => setScreen("claim")}
                    className="px-3 py-1.5 rounded-full text-xs border border-amber-400/30 bg-amber-500/15 text-amber-300"
                  >
                    ← Back to Claim Page
                  </button>
                )}
              </div>

              <div className="mt-3">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-bold tracking-tight">{profile.fullName}</h1>
                  {profile.verified && <CheckCircle2 className={`w-4 h-4 ${activeTheme.accentText}`} />}
                </div>
                <p className={`text-xs font-medium ${activeTheme.accentText} mt-0.5`}>
                  {profile.headline}
                  {profile.company ? ` • ${profile.company}` : ""}
                </p>
                {profile.location && (
                  <p className={`text-xs ${activeTheme.muted} flex items-center gap-1 mt-1`}>
                    <MapPin className="w-3.5 h-3.5" /> {profile.location}
                  </p>
                )}
                {profile.bio && <p className="text-xs leading-relaxed opacity-85 mt-3">{profile.bio}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={handleSaveContact}
                  className={`py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 ${activeTheme.button} shadow-md hover:opacity-95 transition`}
                >
                  <Download className="w-4 h-4" /> Save Contact
                </button>
                <button
                  type="button"
                  onClick={() => setShowExchangeModal(true)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold border ${activeTheme.subCard} flex items-center justify-center gap-2 hover:opacity-90 transition`}
                >
                  <UserPlus className="w-4 h-4" /> Exchange Contact
                </button>
              </div>

              {sanitizeUrl(profile.ctaUrl) && (
                <a
                  href={sanitizeUrl(profile.ctaUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2.5 w-full py-2.5 px-4 rounded-xl text-xs font-medium border ${activeTheme.accentBg} flex items-center justify-between hover:opacity-90 transition`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> {profile.ctaLabel || "Featured Link"}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className={`px-3 py-1.5 rounded-full text-xs border ${activeTheme.subCard} flex items-center gap-1.5`}
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className={`px-3 py-1.5 rounded-full text-xs border ${activeTheme.subCard} flex items-center gap-1.5`}
                  >
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                )}
                {sanitizeUrl(profile.website) && (
                  <a
                    href={sanitizeUrl(profile.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1.5 rounded-full text-xs border ${activeTheme.subCard} flex items-center gap-1.5`}
                  >
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>
            </div>
          </section>

          {(profile.links || []).length > 0 && (
            <section className={`rounded-3xl border ${activeTheme.card} p-5 space-y-4`}>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold tracking-tight">Links & Digital Hub</h2>
                <div className="relative w-40">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-2.5 py-1 rounded-full text-base sm:text-xs bg-white/5 border border-white/10 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: "all", label: "All" },
                  { id: "social", label: "Social" },
                  { id: "business", label: "Business" },
                  { id: "gaming", label: "Gaming" },
                  { id: "music", label: "Music" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition ${
                      activeCategory === cat.id
                        ? activeTheme.button
                        : `${activeTheme.subCard} opacity-80 hover:opacity-100`
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                {filteredLinks.map((item) => {
                  const validHref = sanitizeUrl(item.url);
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border ${activeTheme.subCard} flex items-center justify-between gap-3`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] uppercase tracking-wider font-semibold ${activeTheme.accentText}`}>
                            {item.platform}
                          </span>
                          {item.pinned && <Pin className="w-3 h-3 text-amber-400" />}
                        </div>
                        <p className="text-sm font-semibold truncate">{item.title}</p>
                        {(item.subtitle || item.gameId) && (
                          <p className={`text-xs ${activeTheme.muted} truncate`}>
                            {item.category === "gaming" && item.gameId ? `ID: ${item.gameId}` : item.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.category === "music" && item.audioUrl && (
                          <button
                            type="button"
                            onClick={() => toggleAudio(item)}
                            className={`p-2 rounded-xl ${activeTheme.button}`}
                            title="Play / Pause Preview"
                          >
                            {playingId === item.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                        )}

                        {item.category === "gaming" && item.gameId && (
                          <button
                            type="button"
                            onClick={() => copyText(item.gameId, item.id)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border ${activeTheme.accentBg} flex items-center gap-1`}
                          >
                            {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            Copy ID
                          </button>
                        )}

                        {validHref && (
                          <a
                            href={validHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${activeTheme.button} flex items-center gap-1`}
                          >
                            Open <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {profile.showPaymentSection && (profile.payments || []).length > 0 && (
            <section className={`rounded-3xl border ${activeTheme.card} p-5 space-y-3`}>
              <h2 className="text-sm font-bold flex items-center gap-2">
                <CreditCard className={`w-4 h-4 ${activeTheme.accentText}`} /> Instant Payment & Transfer
              </h2>
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
                        type="button"
                        onClick={() => copyText(pay.accountNumber, pay.id)}
                        className={`p-2 rounded-xl border ${activeTheme.subCard}`}
                        title="Copy Account Number"
                      >
                        {copiedId === pay.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPaymentModal(pay)}
                        className={`px-3 py-1.5 rounded-xl text-xs ${activeTheme.button}`}
                      >
                        Pay / QR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {profile.showBookingSection && (
            <section className={`rounded-3xl border ${activeTheme.card} p-5 space-y-3`}>
              <h2 className="text-sm font-bold flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${activeTheme.accentText}`} /> Book an Appointment
              </h2>
              <form onSubmit={submitBooking} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10 focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Mobile / Email"
                    value={bookingForm.contact}
                    onChange={(e) => setBookingForm({ ...bookingForm, contact: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10 focus:outline-none"
                  />
                  <select
                    value={bookingForm.slot}
                    onChange={(e) => setBookingForm({ ...bookingForm, slot: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-zinc-900 text-white border border-white/10 focus:outline-none"
                  >
                    {(profile.bookingSlots || ["10:00 AM", "02:00 PM"]).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={`w-full py-2.5 rounded-xl text-xs ${activeTheme.button}`}>
                  Request Booking
                </button>
              </form>
            </section>
          )}

          {profile.showContactForm && (
            <section className={`rounded-3xl border ${activeTheme.card} p-5 space-y-3`}>
              <h2 className="text-sm font-bold flex items-center gap-2">
                <MessageSquare className={`w-4 h-4 ${activeTheme.accentText}`} /> Send Direct Message
              </h2>
              <form onSubmit={submitDirectMessage} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={msgForm.sender}
                    onChange={(e) => setMsgForm({ ...msgForm, sender: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Phone / Social Handle"
                    value={msgForm.contact}
                    onChange={(e) => setMsgForm({ ...msgForm, contact: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10 focus:outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder={`Write a message to ${profile.fullName}...`}
                  value={msgForm.message}
                  onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10 focus:outline-none"
                />
                <button type="submit" className={`w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 ${activeTheme.button}`}>
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </form>
            </section>
          )}

          <footer className={`rounded-3xl border ${activeTheme.card} p-5 text-center space-y-3`}>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${activeTheme.accent} text-zinc-950 flex items-center justify-center`}>
                <SmartTapLogoMark className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold tracking-tight">Powered by SmartTap</span>
            </div>
            <p className={`text-xs ${activeTheme.muted}`}>
              Want your own tap-to-share NFC digital business card & review stand?
            </p>
            <a
              href={sanitizeUrl(profile.orderFooterUrl || DEFAULT_PROFILE.orderFooterUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs ${activeTheme.button} shadow-md hover:opacity-95 transition`}
            >
              Get Your Own SmartTap Card • Order Here <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </footer>

          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md">
            <div className="rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/15 px-3 py-2 shadow-2xl flex items-center justify-around text-zinc-100">
              <button
                type="button"
                onClick={handleSaveContact}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-400 text-zinc-950"
              >
                <Download className="w-3.5 h-3.5" /> Save
              </button>
              <button
                type="button"
                onClick={() => setShowExchangeModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs hover:bg-white/10 transition"
              >
                <UserPlus className="w-3.5 h-3.5" /> Exchange
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs hover:bg-white/10 transition"
              >
                <QrCode className="w-3.5 h-3.5" /> QR
              </button>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="p-2 rounded-full hover:bg-white/10 transition"
                title="Back to Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ================= SCREEN 3: UNIFIED OWNER EDITOR STUDIO ================= */}
      {screen === "editor" && (
        <main className="max-w-xl mx-auto px-4 pt-5 space-y-4">
          <div className={`rounded-2xl border ${activeTheme.card} p-4 flex items-center justify-between gap-3`}>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider opacity-60">Your Live SmartTap Link</p>
              <p className={`text-xs font-mono truncate ${activeTheme.accentText}`}>{shareUrl}</p>
            </div>
            <button
              type="button"
              onClick={() => copyText(shareUrl, "owner-url")}
              className={`px-3 py-1.5 rounded-xl text-xs shrink-0 ${activeTheme.button}`}
            >
              {copiedId === "owner-url" ? "Copied!" : "Copy Link"}
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "profile", label: "Profile & Cover" },
              { id: "links", label: "Links & Media" },
              { id: "payments", label: "Payments" },
              { id: "inbox", label: `Inbox (${messages.length + exchangedContacts.length + paymentReceipts.length + bookings.length})` },
              { id: "analytics", label: "Analytics" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setEditorTab(t.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border ${
                  editorTab === t.id ? activeTheme.button : `${activeTheme.subCard}`
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {editorTab === "profile" && (
            <div className={`rounded-3xl border ${activeTheme.card} p-5 space-y-4`}>
              <h3 className="text-sm font-bold">Profile Photo, Cover Banner & Appearance</h3>

              <div className="rounded-2xl overflow-hidden border border-white/10">
                <div className="h-28 relative bg-zinc-800">
                  {profile.coverUrl ? (
                    <img src={profile.coverUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${activeTheme.accent} opacity-30`} />
                  )}
                  <label className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-black/90">
                    <ImageIcon className="w-3.5 h-3.5" /> Change Cover Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        notify("Uploading cover photo...");
                        const url = await uploadMediaToCloud(file, "covers");
                        if (url) saveProfileToCloud({ ...profile, coverUrl: url });
                      }}
                    />
                  </label>
                </div>

                <div className="p-3 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 overflow-hidden border border-white/15 flex items-center justify-center font-bold">
                      {profile.avatarUrl ? (
                        <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{(profile.fullName || "S").charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{profile.fullName}</p>
                      <p className="text-[11px] opacity-60">@{profile.username}</p>
                    </div>
                  </div>
                  <label className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-white/20">
                    <Upload className="w-3.5 h-3.5" /> Profile Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        notify("Uploading profile photo...");
                        const url = await uploadMediaToCloud(file, "avatars");
                        if (url) saveProfileToCloud({ ...profile, avatarUrl: url });
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <label className="text-xs font-semibold block">Default Card Theme (9)</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(THEMES).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => saveProfileToCloud({ ...profile, theme: t.id })}
                      className={`p-2 rounded-xl border text-left text-xs flex items-center gap-2 ${
                        profile.theme === t.id ? "border-amber-400 bg-white/10" : "border-white/10 bg-white/5"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full shrink-0 bg-gradient-to-tr ${t.accent}`} />
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))}
                </div>

                <label className="text-xs font-semibold block pt-1">Surface Texture (5)</label>
                <div className="flex flex-wrap gap-1.5">
                  {Object.values(TEXTURES).map((tx) => (
                    <button
                      key={tx.id}
                      type="button"
                      onClick={() => saveProfileToCloud({ ...profile, texture: tx.id })}
                      className={`px-3 py-1.5 rounded-full text-xs border ${
                        profile.texture === tx.id
                          ? "border-amber-400 bg-amber-400/20 text-amber-300"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      {tx.name}
                    </button>
                  ))}
                </div>

                <label className="flex items-center justify-between pt-2 text-xs">
                  <span>Allow viewers to switch theme & texture on their screen</span>
                  <input
                    type="checkbox"
                    checked={Boolean(profile.allowViewerThemeSwitch)}
                    onChange={(e) =>
                      saveProfileToCloud({ ...profile, allowViewerThemeSwitch: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-400"
                  />
                </label>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Headline / Role"
                    value={profile.headline}
                    onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                  <input
                    type="text"
                    placeholder="Company / Business"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                <textarea
                  rows={2}
                  placeholder="Short Bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Website URL (optional)"
                  value={profile.website || ""}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Featured Button Label"
                    value={profile.ctaLabel}
                    onChange={(e) => setProfile({ ...profile, ctaLabel: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                  <input
                    type="text"
                    placeholder="Featured Button URL"
                    value={profile.ctaUrl}
                    onChange={(e) => setProfile({ ...profile, ctaUrl: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                </div>

                <div className="space-y-1.5 pt-2 text-xs">
                  <label className="flex items-center justify-between">
                    <span>Show Instant Payment Section</span>
                    <input
                      type="checkbox"
                      checked={Boolean(profile.showPaymentSection)}
                      onChange={(e) => setProfile({ ...profile, showPaymentSection: e.target.checked })}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Show Appointment Booking Section</span>
                    <input
                      type="checkbox"
                      checked={Boolean(profile.showBookingSection)}
                      onChange={(e) => setProfile({ ...profile, showBookingSection: e.target.checked })}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Show Direct Message Form</span>
                    <input
                      type="checkbox"
                      checked={Boolean(profile.showContactForm)}
                      onChange={(e) => setProfile({ ...profile, showContactForm: e.target.checked })}
                    />
                  </label>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-xs font-semibold block">Booking Time Slots</label>
                  <div className="flex flex-wrap gap-1.5">
                    {(profile.bookingSlots || []).map((slot) => (
                      <span
                        key={slot}
                        className="px-2.5 py-1 rounded-full text-[11px] bg-white/10 flex items-center gap-1"
                      >
                        {slot}
                        <button
                          type="button"
                          onClick={() =>
                            setProfile({
                              ...profile,
                              bookingSlots: (profile.bookingSlots || []).filter((s) => s !== slot),
                            })
                          }
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add slot (e.g. 05:30 PM)"
                      value={newSlot}
                      onChange={(e) => setNewSlot(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newSlot.trim()) return;
                        const updatedSlots = Array.from(
                          new Set([...(profile.bookingSlots || []), newSlot.trim()])
                        );
                        setProfile({ ...profile, bookingSlots: updatedSlots });
                        setNewSlot("");
                      }}
                      className="px-3 py-2 rounded-xl text-xs bg-white/15 font-semibold"
                    >
                      Add Slot
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    saveProfileToCloud(profile);
                    notify("Profile saved to cloud!");
                  }}
                  className={`w-full py-3 rounded-xl text-xs ${activeTheme.button}`}
                >
                  Save Profile Changes
                </button>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-70">Linked Card Serial:</span>
                  <span className="font-mono font-bold text-amber-400">{activeCardCode || "DEMO-CARD"}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="New Owner Password (min 4 chars)"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={handleUpdatePassword}
                    className="px-3 py-2 rounded-xl text-xs bg-white/15 font-semibold"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {editorTab === "links" && (
            <div className={`rounded-3xl border ${activeTheme.card} p-5 space-y-4`}>
              <h3 className="text-sm font-bold">Add New Link / Gaming ID / Track</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={newLink.category}
                    onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-zinc-900 text-white border border-white/10"
                  >
                    <option value="social">Social Media</option>
                    <option value="business">Business / Store</option>
                    <option value="gaming">Gaming Profile</option>
                    <option value="music">Music / Audio</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Platform (e.g. TikTok, MLBB)"
                    value={newLink.platform}
                    onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                    className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Display Title"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                {newLink.category === "gaming" && (
                  <input
                    type="text"
                    placeholder="Game ID / IGN (e.g. 123456789 (3012))"
                    value={newLink.gameId}
                    onChange={(e) => setNewLink({ ...newLink, gameId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                  />
                )}
                <input
                  type="text"
                  placeholder="Subtitle / Handle (optional)"
                  value={newLink.subtitle}
                  onChange={(e) => setNewLink({ ...newLink, subtitle: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                <input
                  type="text"
                  placeholder="Destination URL (https://...)"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                {newLink.category === "music" && (
                  <label className="block p-2.5 rounded-xl border border-dashed border-white/20 text-xs text-center cursor-pointer">
                    {newLink.audioUrl ? "Audio Uploaded ✓" : "Upload MP3 / Audio Preview (Optional)"}
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        notify("Uploading audio...");
                        const url = await uploadMediaToCloud(file, "audio");
                        if (url) setNewLink({ ...newLink, audioUrl: url });
                      }}
                    />
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (!newLink.title.trim()) {
                      notify("Please enter a link title.", "error");
                      return;
                    }
                    const entry = { ...newLink, id: `lnk-${Date.now()}` };
                    const updated = [...(profile.links || []), entry];
                    saveProfileToCloud({ ...profile, links: updated });
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
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs ${activeTheme.button}`}
                >
                  + Add Link Item
                </button>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10">
                {(profile.links || []).map((l, idx) => (
                  <div key={l.id} className={`p-3 rounded-2xl border ${activeTheme.subCard} flex items-center justify-between gap-2`}>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{l.title}</p>
                      <p className="text-[11px] opacity-60 truncate">
                        {l.platform} • {l.gameId || l.url || l.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveLink(idx, -1)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === profile.links.length - 1}
                        onClick={() => handleMoveLink(idx, 1)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingLink(l)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profile.links.filter((item) => item.id !== l.id);
                          saveProfileToCloud({ ...profile, links: updated });
                          notify("Link removed.");
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/15 text-rose-300"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {editorTab === "payments" && (
            <div className={`rounded-3xl border ${activeTheme.card} p-5 space-y-4`}>
              <h3 className="text-sm font-bold">Payment Accounts & QR Codes</h3>
              <div className="space-y-2">
                <select
                  value={newPayment.provider}
                  onChange={(e) => setNewPayment({ ...newPayment, provider: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-zinc-900 text-white border border-white/10"
                >
                  {PAYMENT_PROVIDERS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Account Name"
                  value={newPayment.accountName}
                  onChange={(e) => setNewPayment({ ...newPayment, accountName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                <input
                  type="text"
                  placeholder={
                    PAYMENT_PROVIDERS.find((p) => p.id === newPayment.provider)?.placeholder || "Account Number"
                  }
                  value={newPayment.accountNumber}
                  onChange={(e) => setNewPayment({ ...newPayment, accountNumber: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                <label className="block p-2.5 rounded-xl border border-dashed border-white/20 text-xs text-center cursor-pointer">
                  {newPayment.qrUrl ? "QR Code Uploaded ✓" : "Upload Bank / E-Wallet QR Image (Optional)"}
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
                    const cleanDigits = newPayment.accountNumber.replace(/\D/g, "");
                    if (!newPayment.accountName.trim() || !newPayment.accountNumber.trim()) {
                      notify("Enter account name and number.", "error");
                      return;
                    }
                    if (spec && spec.digits > 0 && cleanDigits.length !== spec.digits) {
                      notify(`${spec.label} requires exactly ${spec.digits} digits.`, "error");
                      return;
                    }
                    const entry = { ...newPayment, id: `pay-${Date.now()}` };
                    saveProfileToCloud({ ...profile, payments: [...(profile.payments || []), entry] });
                    setNewPayment({ provider: "GCash", accountName: "", accountNumber: "", qrUrl: "" });
                    notify("Payment method added!");
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs ${activeTheme.button}`}
                >
                  + Add Payment Method
                </button>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10">
                {(profile.payments || []).map((p) => (
                  <div key={p.id} className={`p-3 rounded-2xl border ${activeTheme.subCard} flex items-center justify-between`}>
                    <div>
                      <p className="text-xs font-bold">{p.provider} — {p.accountName}</p>
                      <p className="text-[11px] font-mono opacity-70">{p.accountNumber}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        saveProfileToCloud({
                          ...profile,
                          payments: profile.payments.filter((item) => item.id !== p.id),
                        });
                        notify("Payment removed.");
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/15 text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {editorTab === "inbox" && (
            <div className={`rounded-3xl border ${activeTheme.card} p-5 space-y-4`}>
              <h3 className="text-sm font-bold">Messages, Leads, Receipts & Bookings</h3>

              <div className="space-y-2">
                <p className="text-xs font-semibold opacity-75">Exchanged Contacts ({exchangedContacts.length})</p>
                {exchangedContacts.map((c) => (
                  <div key={c.id} className={`p-3 rounded-xl border ${activeTheme.subCard} text-xs`}>
                    <p className="font-bold">{c.name}</p>
                    <p className="opacity-75">{c.phone} {c.email ? `• ${c.email}` : ""}</p>
                    {c.note && <p className="mt-1 italic opacity-80">"{c.note}"</p>}
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-xs font-semibold opacity-75">Direct Messages ({messages.length})</p>
                {messages.map((m) => (
                  <div key={m.id} className={`p-3 rounded-xl border ${activeTheme.subCard} text-xs`}>
                    <p className="font-bold">{m.sender} <span className="font-normal opacity-60">({m.contact})</span></p>
                    <p className="mt-1">{m.message}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-xs font-semibold opacity-75">Payment Receipts ({paymentReceipts.length})</p>
                {paymentReceipts.map((r) => (
                  <div key={r.id} className={`p-3 rounded-xl border ${activeTheme.subCard} text-xs`}>
                    <p className="font-bold">{r.provider}: {r.senderName} — ₱{r.amount}</p>
                    <p className="font-mono opacity-75">Ref: {r.referenceNo}</p>
                    {r.proofUrl && (
                      <a href={r.proofUrl} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline mt-1 inline-block">
                        View Receipt Screenshot
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-xs font-semibold opacity-75">Bookings ({bookings.length})</p>
                {bookings.map((b) => (
                  <div key={b.id} className={`p-3 rounded-xl border ${activeTheme.subCard} text-xs`}>
                    <p className="font-bold">{b.name} ({b.contact})</p>
                    <p className="opacity-75">{b.date} at {b.slot}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {editorTab === "analytics" && (
            <div className={`rounded-3xl border ${activeTheme.card} p-5 space-y-4`}>
              <h3 className="text-sm font-bold flex items-center gap-2">
                <BarChart3 className={`w-4 h-4 ${activeTheme.accentText}`} /> Card Tap & Scan Performance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Today (24h)", val: analytics.taps1d || 0 },
                  { label: "This Week", val: analytics.taps1w || 0 },
                  { label: "This Month", val: analytics.taps1m || 0 },
                  { label: "Lifetime Taps", val: analytics.tapsTotal || 0 },
                ].map((stat) => (
                  <div key={stat.label} className={`p-4 rounded-2xl border ${activeTheme.subCard}`}>
                    <p className="text-[11px] opacity-60">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* ================= MODALS ================= */}

      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-zinc-100">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-white/15 p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Share SmartTap Profile</h3>
              <button type="button" onClick={() => setShowQrModal(false)} className="p-1 rounded-full bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`}
                alt="Profile QR"
                className="w-44 h-44"
              />
            </div>
            <p className="text-xs font-mono text-amber-400 break-all">{shareUrl}</p>
            <button
              type="button"
              onClick={() => copyText(shareUrl, "modal-qr")}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-400 text-zinc-950"
            >
              Copy Direct Profile Link
            </button>
          </div>
        </div>
      )}

      {showExchangeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-zinc-100">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-white/15 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Share Your Contact with {profile.fullName}</h3>
              <button type="button" onClick={() => setShowExchangeModal(false)} className="p-1 rounded-full bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={submitExchangeContact} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
              <input
                type="text"
                required
                placeholder="Mobile Number"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
              <input
                type="text"
                placeholder="Company / Note (optional)"
                value={contactForm.note}
                onChange={(e) => setContactForm({ ...contactForm, note: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-400 text-zinc-950">
                Send My Contact Info
              </button>
            </form>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-zinc-100">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-white/15 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">{showPaymentModal.provider} Payment</h3>
              <button type="button" onClick={() => setShowPaymentModal(null)} className="p-1 rounded-full bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            {showPaymentModal.qrUrl && (
              <img src={showPaymentModal.qrUrl} alt="Payment QR" className="w-44 h-44 object-contain mx-auto rounded-xl bg-white p-2" />
            )}
            <div className="p-3 rounded-xl bg-white/5 text-xs flex items-center justify-between">
              <div>
                <p className="font-bold">{showPaymentModal.accountName}</p>
                <p className="font-mono text-amber-400">{showPaymentModal.accountNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => copyText(showPaymentModal.accountNumber, "pay-modal")}
                className="px-2.5 py-1 rounded-lg bg-white/10 text-xs"
              >
                Copy
              </button>
            </div>
            <form onSubmit={submitPaymentReceipt} className="space-y-2 border-t border-white/10 pt-3">
              <p className="text-xs font-semibold">Send Proof of Payment</p>
              <input
                type="text"
                required
                placeholder="Sender Name"
                value={receiptForm.senderName}
                onChange={(e) => setReceiptForm({ ...receiptForm, senderName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Reference No."
                  value={receiptForm.referenceNo}
                  onChange={(e) => setReceiptForm({ ...receiptForm, referenceNo: e.target.value })}
                  className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                <input
                  type="text"
                  placeholder="Amount (₱)"
                  value={receiptForm.amount}
                  onChange={(e) => setReceiptForm({ ...receiptForm, amount: e.target.value })}
                  className="px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
              </div>
              <label className="block p-2 rounded-xl border border-dashed border-white/20 text-xs text-center cursor-pointer">
                {receiptForm.proofUrl ? "Screenshot Attached ✓" : "Attach Receipt Screenshot (Optional)"}
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
              <button type="submit" className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-400 text-zinc-950">
                Submit Payment Receipt
              </button>
            </form>
          </div>
        </div>
      )}

      {editingLink && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-zinc-100">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-white/15 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Edit Link Item</h3>
              <button type="button" onClick={() => setEditingLink(null)} className="p-1 rounded-full bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Platform"
              value={editingLink.platform}
              onChange={(e) => setEditingLink({ ...editingLink, platform: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
            />
            <input
              type="text"
              placeholder="Title"
              value={editingLink.title}
              onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
            />
            {editingLink.category === "gaming" && (
              <input
                type="text"
                placeholder="Game ID / IGN"
                value={editingLink.gameId || ""}
                onChange={(e) => setEditingLink({ ...editingLink, gameId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
            )}
            <input
              type="text"
              placeholder="Subtitle"
              value={editingLink.subtitle || ""}
              onChange={(e) => setEditingLink({ ...editingLink, subtitle: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
            />
            <input
              type="text"
              placeholder="Destination URL"
              value={editingLink.url || ""}
              onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
            />
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={Boolean(editingLink.pinned)}
                onChange={(e) => setEditingLink({ ...editingLink, pinned: e.target.checked })}
              />
              Pin to top of links
            </label>
            <button
              type="button"
              onClick={() => {
                const updated = profile.links.map((item) => (item.id === editingLink.id ? editingLink : item));
                saveProfileToCloud({ ...profile, links: updated });
                setEditingLink(null);
                notify("Link updated!");
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-400 text-zinc-950"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 text-zinc-100">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-white/15 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Card Owner Login</h3>
              <button
                type="button"
                onClick={() => {
                  setLoginError("");
                  setShowLoginModal(false);
                }}
                className="p-1 rounded-full bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-400">
              Sign in with your activated username and password to customize your card.
            </p>
            <form onSubmit={handleOwnerLogin} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => {
                  setLoginError("");
                  setLoginUsername(e.target.value);
                }}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginError("");
                  setLoginPassword(e.target.value);
                }}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button type="submit" className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-400 text-zinc-950">
                Log In to Editor
              </button>
            </form>

            <div className="pt-2 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={() => {
                  setLoginUsername("demo");
                  setLoginPassword("demo1234");
                  setLoginError("");
                }}
                className="text-[11px] text-amber-400 hover:underline"
              >
                Testing? Fill Demo Editor Account (demo / demo1234)
              </button>
            </div>
          </div>
        </div>
      )}

      {showActivateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 text-zinc-100">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-amber-400/30 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold">Activate Your SmartTap Card</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActivateError("");
                  setShowActivateModal(false);
                }}
                className="p-1 rounded-full bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Enter the One-Time Activation Code printed on the sealed thank-you insert inside your SmartTap package to claim your card.
            </p>
            <form onSubmit={handleActivateCard} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Activation Code (STPH-XXXX-XXXX)"
                value={actCodeInput}
                onChange={(e) => {
                  setActivateError("");
                  setActCodeInput(e.target.value.toUpperCase());
                }}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs font-mono uppercase bg-white/5 border border-amber-400/40"
              />
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={actFullName}
                onChange={(e) => {
                  setActivateError("");
                  setActFullName(e.target.value);
                }}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
              <input
                type="text"
                required
                placeholder="Choose Username (for your custom link)"
                value={actUsername}
                onChange={(e) => {
                  setActivateError("");
                  setActUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ""));
                }}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />
              <input
                type="password"
                required
                placeholder="Create Owner Password (min 4 chars)"
                value={actPassword}
                onChange={(e) => {
                  setActivateError("");
                  setActPassword(e.target.value);
                }}
                className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
              />

              {activateError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{activateError}</span>
                </div>
              )}

              <button type="submit" className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-400 text-zinc-950">
                Activate & Setup My Card
              </button>
            </form>
          </div>
        </div>
      )}

      {showFounderModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 text-zinc-100">
          <div className="w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-white/15 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold">SmartTap Founder Vault</h3>
              </div>
              <button type="button" onClick={() => setShowFounderModal(false)} className="p-1 rounded-full bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!founderUnlocked ? (
              <form onSubmit={unlockFounderVault} className="space-y-3">
                <p className="text-xs text-zinc-400">Enter Founder Passcode to manage card batches and buyer accounts.</p>
                <input
                  type="password"
                  required
                  placeholder="Founder Passcode"
                  value={founderPassInput}
                  onChange={(e) => {
                    setFounderError("");
                    setFounderPassInput(e.target.value);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />
                {founderError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{founderError}</span>
                  </div>
                )}
                <button type="submit" className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-400 text-zinc-950">
                  Unlock Vault
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Bulk Card Generator & Canva CSV Export
                    </p>
                    <button
                      type="button"
                      onClick={handleExportAllInventoryCsv}
                      className="text-[11px] text-amber-400 font-semibold underline"
                    >
                      Export Excel Report (.xls)
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min={1}
                      max={2000}
                      value={batchQty}
                      onChange={(e) => setBatchQty(e.target.value)}
                      placeholder="Quantity (e.g. 100)"
                      className="px-3 py-2 rounded-xl text-base sm:text-xs bg-black/40 border border-white/10"
                    />
                    <input
                      type="text"
                      value={batchLabel}
                      onChange={(e) => setBatchLabel(e.target.value)}
                      placeholder="Batch Label (e.g. TikTok Batch 1)"
                      className="px-3 py-2 rounded-xl text-base sm:text-xs bg-black/40 border border-white/10"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={generatingBatch}
                    onClick={handleGenerateBulkCsv}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-400 text-zinc-950 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {generatingBatch ? "Generating & Saving to Cloud..." : "Generate Cards & Download Canva CSV"}
                  </button>
                  {batchMessage && (
                    <div
                      className={`p-2.5 rounded-xl text-xs border ${
                        batchMessage.type === "error"
                          ? "bg-rose-500/15 border-rose-400/40 text-rose-200"
                          : "bg-emerald-500/15 border-emerald-400/40 text-emerald-200"
                      }`}
                    >
                      {batchMessage.text}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setAdminTab("codes")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        adminTab === "codes" ? "bg-amber-400 text-zinc-950" : "bg-white/10"
                      }`}
                    >
                      Card Inventory ({allCodes.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminTab("buyers")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        adminTab === "buyers" ? "bg-amber-400 text-zinc-950" : "bg-white/10"
                      }`}
                    >
                      Active Buyers ({allProfiles.length})
                    </button>
                  </div>
                  <button type="button" onClick={loadFounderData} className="p-1.5 rounded-lg bg-white/10" title="Refresh">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search code, batch, or username..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-base sm:text-xs bg-white/5 border border-white/10"
                />

                {adminTab === "codes" ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {allCodes
                      .filter(
                        (c) =>
                          c.code.toLowerCase().includes(adminSearch.toLowerCase()) ||
                          (c.batch_label || "").toLowerCase().includes(adminSearch.toLowerCase()) ||
                          (c.claimed_by || "").toLowerCase().includes(adminSearch.toLowerCase())
                      )
                      .map((c) => (
                        <div key={c.code} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 text-xs">
                          <div>
                            <p className="font-mono font-bold text-amber-300">{c.code}</p>
                            <p className="text-[11px] opacity-70">
                              {c.batch_label} • {c.is_used ? `Claimed by @${c.claimed_by}` : "Available"}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => copyText(`${APP_BASE_URL}/?c=${c.code}`, c.code)}
                              className="px-2 py-1 rounded-lg bg-white/10 text-[11px]"
                            >
                              Copy URL
                            </button>
                            {c.is_used && (
                              <button
                                type="button"
                                onClick={() => handleAdminResetCard(c.code, c.claimed_by)}
                                className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 text-[11px]"
                              >
                                Unbind/Reset
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {allProfiles
                      .filter(
                        (p) =>
                          p.username.toLowerCase().includes(adminSearch.toLowerCase()) ||
                          (p.activation_code || "").toLowerCase().includes(adminSearch.toLowerCase())
                      )
                      .map((p) => (
                        <div key={p.username} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold">@{p.username}</p>
                            <p className="text-[11px] opacity-70">
                              Code: {p.activation_code} • Pass: <span className="font-mono text-amber-300">{p.password}</span>
                            </p>
                          </div>
                          <a
                            href={`${APP_BASE_URL}/?u=${p.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px]"
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
