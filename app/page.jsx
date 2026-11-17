"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User, Phone, Mail, MapPin, Link as LinkIcon, CreditCard, Music, Gamepad2,
  Building2, Share2, Plus, Trash2, Pencil, Eye, EyeOff, Save, Check, Copy,
  QrCode, ExternalLink, Search, BarChart3, Lock, ArrowLeft, X, Image as ImageIcon,
  Send, Navigation, Calendar, Clock, ShieldCheck, Palette, Layers, AlertTriangle,
  WifiOff, RefreshCw, UserPlus, Receipt, Smartphone, Play, Pause, Volume2, VolumeX,
  ChevronLeft, ChevronRight, CheckCircle2, Download, KeyRound, ShieldAlert
} from "lucide-react";

const TIKTOK_SHOP_URL = "https://www.tiktok.com/@smarttapph";
const SUPER_ADMIN_PASSCODE = "SMARTTAP-ADMIN-2026";

// Valid One-Time SmartTap Card Activation Codes (Do NOT put any of these as input placeholder examples)
const INITIAL_ACTIVATION_CODES = [
  "STPH-8K9M-2X7Q", "STPH-4928-7315", "STPH-3R7W-9P4L", "STPH-6194-8052", "STPH-9V2N-5H8C",
  "STPH-7403-2961", "STPH-2M6F-8D3Z", "STPH-5831-9470", "STPH-4J8B-1Q9R", "STPH-9275-3604",
  "STPH-6T3Y-7K2M", "STPH-1549-8237", "STPH-8C5P-4W9N", "STPH-3086-5149", "STPH-7H2X-6L8V"
];

function generateRandomActivationCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `STPH-${part1}-${part2}`;
}

const DAYS_OF_WEEK = [
  { id: 0, short: "Sun", name: "Sunday" },
  { id: 1, short: "Mon", name: "Monday" },
  { id: 2, short: "Tue", name: "Tuesday" },
  { id: 3, short: "Wed", name: "Wednesday" },
  { id: 4, short: "Thu", name: "Thursday" },
  { id: 5, short: "Fri", name: "Friday" },
  { id: 6, short: "Sat", name: "Saturday" }
];

const BOOKING_LABELS = [
  "Book a Meeting / Appointment",
  "Schedule a Consultation",
  "Reserve a Table / Visit",
  "Book a Discovery Call",
  "Inquire / Set an Appointment"
];

const DURATION_OPTIONS = [
  { mins: 15, label: "15 Mins" },
  { mins: 30, label: "30 Mins" },
  { mins: 45, label: "45 Mins" },
  { mins: 60, label: "1 Hour" },
  { mins: 120, label: "2 Hours" }
];

const TIME_OPTIONS_30M = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

function formatTime12(time24) {
  if (!time24) return "";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}

// 9 COLOR THEMES (INCLUDING PURE BLACK & BLUSH PINK)
const THEMES = {
  black: {
    id: "black",
    name: "Pure Black",
    swatch: "bg-black border-neutral-400",
    bg: "bg-[#000000]",
    text: "text-neutral-100",
    subtext: "text-neutral-400",
    card: "bg-[#0a0a0a]/95 border-neutral-800",
    pill: "bg-[#121212] border-neutral-800 hover:border-neutral-600",
    input: "bg-black border-neutral-700 text-white focus:border-white",
    accent: "bg-white hover:bg-neutral-200 text-black",
    accentSoft: "bg-white/10 text-neutral-200 border-neutral-700",
    accentText: "text-neutral-300",
    badgeIcon: "bg-white text-black",
    actionBtn: "bg-neutral-900 hover:bg-neutral-800 text-neutral-200",
    floatingBar: "bg-[#0a0a0a]/95 border-neutral-700"
  },
  blush: {
    id: "blush",
    name: "Blush Pink",
    swatch: "bg-pink-400 border-pink-200",
    bg: "bg-[#1a0b12]",
    text: "text-pink-50",
    subtext: "text-pink-300/75",
    card: "bg-[#26101b]/95 border-pink-900/70",
    pill: "bg-[#1f0d16] border-pink-900/60 hover:border-pink-700",
    input: "bg-[#1a0b12] border-pink-800 text-white focus:border-pink-400",
    accent: "bg-pink-500 hover:bg-pink-400 text-white",
    accentSoft: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    accentText: "text-pink-400",
    badgeIcon: "bg-pink-500 text-white",
    actionBtn: "bg-pink-950 hover:bg-pink-900 text-pink-200",
    floatingBar: "bg-[#26101b]/95 border-pink-800/80"
  },
  midnight: {
    id: "midnight",
    name: "Midnight Indigo",
    swatch: "bg-indigo-600 border-indigo-300",
    bg: "bg-[#090d16]",
    text: "text-slate-100",
    subtext: "text-slate-400",
    card: "bg-[#111827]/95 border-slate-800",
    pill: "bg-slate-900/90 border-slate-800 hover:border-slate-700",
    input: "bg-[#090d16] border-slate-700 text-white focus:border-indigo-500",
    accent: "bg-indigo-600 hover:bg-indigo-500 text-white",
    accentSoft: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    accentText: "text-indigo-400",
    badgeIcon: "bg-indigo-600 text-white",
    actionBtn: "bg-slate-800 hover:bg-slate-700 text-slate-200",
    floatingBar: "bg-[#111827]/95 border-slate-700/80"
  },
  emerald: {
    id: "emerald",
    name: "Emerald Forest",
    swatch: "bg-emerald-600 border-emerald-300",
    bg: "bg-[#06120e]",
    text: "text-emerald-50",
    subtext: "text-emerald-300/70",
    card: "bg-[#0b1f18]/95 border-emerald-900/70",
    pill: "bg-[#081712] border-emerald-900/60 hover:border-emerald-700",
    input: "bg-[#06120e] border-emerald-800 text-white focus:border-emerald-500",
    accent: "bg-emerald-600 hover:bg-emerald-500 text-white",
    accentSoft: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    accentText: "text-emerald-400",
    badgeIcon: "bg-emerald-600 text-white",
    actionBtn: "bg-emerald-950 hover:bg-emerald-900 text-emerald-200",
    floatingBar: "bg-[#0b1f18]/95 border-emerald-800/80"
  },
  crimson: {
    id: "crimson",
    name: "Crimson Velvet",
    swatch: "bg-rose-600 border-rose-300",
    bg: "bg-[#14080c]",
    text: "text-rose-50",
    subtext: "text-rose-300/70",
    card: "bg-[#210d14]/95 border-rose-900/70",
    pill: "bg-[#190a0f] border-rose-900/60 hover:border-rose-700",
    input: "bg-[#14080c] border-rose-800 text-white focus:border-rose-500",
    accent: "bg-rose-600 hover:bg-rose-500 text-white",
    accentSoft: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    accentText: "text-rose-400",
    badgeIcon: "bg-rose-600 text-white",
    actionBtn: "bg-rose-950 hover:bg-rose-900 text-rose-200",
    floatingBar: "bg-[#210d14]/95 border-rose-800/80"
  },
  gold: {
    id: "gold",
    name: "Obsidian Gold",
    swatch: "bg-amber-500 border-amber-200",
    bg: "bg-[#120f08]",
    text: "text-amber-50",
    subtext: "text-amber-200/70",
    card: "bg-[#1c170d]/95 border-amber-900/70",
    pill: "bg-[#16120a] border-amber-900/60 hover:border-amber-700",
    input: "bg-[#120f08] border-amber-800 text-white focus:border-amber-500",
    accent: "bg-amber-500 hover:bg-amber-400 text-black",
    accentSoft: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    accentText: "text-amber-400",
    badgeIcon: "bg-amber-500 text-black",
    actionBtn: "bg-amber-950 hover:bg-amber-900 text-amber-200",
    floatingBar: "bg-[#1c170d]/95 border-amber-800/80"
  },
  clean: {
    id: "clean",
    name: "Clean Daylight",
    swatch: "bg-slate-200 border-slate-500",
    bg: "bg-slate-100",
    text: "text-slate-900",
    subtext: "text-slate-500",
    card: "bg-white border-slate-200",
    pill: "bg-slate-50 border-slate-200 hover:border-slate-300",
    input: "bg-white border-slate-300 text-slate-900 focus:border-indigo-600",
    accent: "bg-slate-900 hover:bg-slate-800 text-white",
    accentSoft: "bg-indigo-50 text-indigo-700 border-indigo-200",
    accentText: "text-indigo-600",
    badgeIcon: "bg-slate-900 text-white",
    actionBtn: "bg-slate-200 hover:bg-slate-300 text-slate-800",
    floatingBar: "bg-white/95 border-slate-300"
  },
  ocean: {
    id: "ocean",
    name: "Ocean Cyan",
    swatch: "bg-cyan-500 border-cyan-200",
    bg: "bg-[#06131a]",
    text: "text-cyan-50",
    subtext: "text-cyan-300/70",
    card: "bg-[#0b202b]/95 border-cyan-900/70",
    pill: "bg-[#081821] border-cyan-900/60 hover:border-cyan-700",
    input: "bg-[#06131a] border-cyan-800 text-white focus:border-cyan-500",
    accent: "bg-cyan-500 hover:bg-cyan-400 text-slate-950",
    accentSoft: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    accentText: "text-cyan-400",
    badgeIcon: "bg-cyan-500 text-slate-950",
    actionBtn: "bg-cyan-950 hover:bg-cyan-900 text-cyan-200",
    floatingBar: "bg-[#0b202b]/95 border-cyan-800/80"
  },
  violet: {
    id: "violet",
    name: "Royal Violet",
    swatch: "bg-purple-600 border-purple-300",
    bg: "bg-[#11081c]",
    text: "text-purple-50",
    subtext: "text-purple-300/70",
    card: "bg-[#1c0e2e]/95 border-purple-900/70",
    pill: "bg-[#160b24] border-purple-900/60 hover:border-purple-700",
    input: "bg-[#11081c] border-purple-800 text-white focus:border-purple-500",
    accent: "bg-purple-600 hover:bg-purple-500 text-white",
    accentSoft: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    accentText: "text-purple-400",
    badgeIcon: "bg-purple-600 text-white",
    actionBtn: "bg-purple-950 hover:bg-purple-900 text-purple-200",
    floatingBar: "bg-[#1c0e2e]/95 border-purple-800/80"
  }
};

const SOCIAL_PLATFORMS = [
  { id: "facebook", name: "Facebook", badge: "FB", placeholder: "https://facebook.com/username" },
  { id: "instagram", name: "Instagram", badge: "IG", placeholder: "https://instagram.com/username" },
  { id: "tiktok", name: "TikTok", badge: "TT", placeholder: "https://tiktok.com/@username" },
  { id: "youtube", name: "YouTube", badge: "YT", placeholder: "https://youtube.com/@channel" },
  { id: "x", name: "X (Twitter)", badge: "X", placeholder: "https://x.com/username" },
  { id: "linkedin", name: "LinkedIn", badge: "IN", placeholder: "https://linkedin.com/in/username" },
  { id: "viber", name: "Viber", badge: "VB", placeholder: "viber://chat?number=%2B63917..." },
  { id: "telegram", name: "Telegram", badge: "TG", placeholder: "https://t.me/username" },
  { id: "others", name: "Others (Custom Social)", badge: "SOC", placeholder: "https://threads.net/@username" }
];

const MUSIC_PLATFORMS = [
  { id: "audio_upload", name: "Audio Track (MP3/WAV)", badge: "MP3" }
];

const GAMING_PLATFORMS = [
  { id: "mlbb", name: "Mobile Legends (MLBB)", badge: "ML", fields: ["IGN / Username", "User ID & Server (e.g. 12345678 (3021))"] },
  { id: "valorant", name: "Valorant", badge: "VAL", fields: ["Riot ID & Tagline (e.g. Player#PH1)", "Rank / Server (Optional)"] },
  { id: "roblox", name: "Roblox", badge: "RBX", fields: ["Roblox Username", "Display Name (Optional)"] },
  { id: "codm", name: "Call of Duty Mobile", badge: "COD", fields: ["IGN / Username", "Player UID"] },
  { id: "genshin", name: "Genshin Impact", badge: "GI", fields: ["UID (Asia/America)", "Adventure Rank / IGN"] },
  { id: "steam", name: "Steam", badge: "STM", fields: ["Steam Friend Code", "Profile Name"] },
  { id: "others", name: "Others (Custom Game)", badge: "GAM", fields: ["Game Name (e.g. PUBG / Farlight)", "IGN / Player ID"] }
];

const BUSINESS_PLATFORMS = [
  { id: "website", name: "Official Website", badge: "WEB", placeholder: "https://yourbusiness.com" },
  { id: "shopee", name: "Shopee Store", badge: "SHP", placeholder: "https://shopee.ph/shopname" },
  { id: "lazada", name: "Lazada Store", badge: "LAZ", placeholder: "https://lazada.com.ph/shop/..." },
  { id: "tiktokshop", name: "TikTok Shop", badge: "TTS", placeholder: "https://tiktok.com/@shop" },
  { id: "gmaps_rev", name: "Google Review Link", badge: "REV", placeholder: "https://g.page/r/..." },
  { id: "menu_pdf", name: "Menu / Brochure Link", badge: "PDF", placeholder: "https://drive.google.com/..." }
];

const PAYMENT_PROVIDERS = [
  { id: "gcash", name: "GCash", badge: "GC", label: "GCash Mobile Number (11 digits)", placeholder: "09171234567", minLen: 11, maxLen: 11 },
  { id: "maya", name: "Maya", badge: "MY", label: "Maya Mobile Number (11 digits)", placeholder: "09181234567", minLen: 11, maxLen: 11 },
  { id: "maribank", name: "MariBank (SeaBank)", badge: "MB", label: "MariBank Account Number (11 digits)", placeholder: "10234567890", minLen: 11, maxLen: 11 },
  { id: "gotyme", name: "GoTyme Bank", badge: "GT", label: "GoTyme Account Number (12 digits)", placeholder: "018812345678", minLen: 12, maxLen: 12 },
  { id: "bdo", name: "BDO Unibank", badge: "BDO", label: "BDO Account Number (12 digits)", placeholder: "001234567890", minLen: 12, maxLen: 12 },
  { id: "bpi", name: "BPI", badge: "BPI", label: "BPI Account Number (10 digits)", placeholder: "1234567890", minLen: 10, maxLen: 10 },
  { id: "metrobank", name: "Metrobank", badge: "MBT", label: "Metrobank Account Number (13 digits)", placeholder: "1234567890123", minLen: 13, maxLen: 13 },
  { id: "landbank", name: "Landbank", badge: "LBP", label: "Landbank Account Number (10 digits)", placeholder: "1234567890", minLen: 10, maxLen: 10 },
  { id: "chinabank", name: "China Bank", badge: "CBC", label: "China Bank Account Number (12 digits)", placeholder: "123456789012", minLen: 12, maxLen: 12 },
  { id: "others", name: "Other Bank / E-Wallet", badge: "OTH", label: "Account / Mobile Number", placeholder: "Enter account number", minLen: 8, maxLen: 16 }
];

// Theme-Synced SmartTap Brand Logo (Uses /smarttap-logo.png from public/ folder + syncs "Tap" color with theme)
function BrandLogo({ size = "md", accentTextClass = "text-indigo-400", onSecretTap }) {
  const isSm = size === "sm";
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      onClick={onSecretTap}
      className="inline-flex items-center gap-1.5 select-none cursor-pointer shrink-0 whitespace-nowrap"
    >
      {!imgFailed ? (
        <img
          src="/smarttap-logo.png"
          alt="SmartTap Logo"
          onError={() => setImgFailed(true)}
          className={`${isSm ? "w-6 h-6 rounded-md" : "w-9 h-9 rounded-xl"} object-contain shrink-0`}
        />
      ) : (
        <div className={`${isSm ? "w-6 h-6 rounded-md text-[10px]" : "w-9 h-9 rounded-xl text-sm"} bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-black flex items-center justify-center shadow-md shrink-0`}>
          ST
        </div>
      )}
      <span className={`${isSm ? "text-xs sm:text-sm" : "text-lg"} font-extrabold tracking-tight`}>
        Smart<span className={`${accentTextClass} transition-colors duration-200`}>Tap</span>
      </span>
    </div>
  );
}

// Helper to reset mobile zoom & scroll position after closing keyboard or changing screens
function resetMobileViewportZoom() {
  if (typeof window === "undefined") return;
  if (document.activeElement && typeof document.activeElement.blur === "function") {
    document.activeElement.blur();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    const original = viewportMeta.getAttribute("content") || "width=device-width, initial-scale=1";
    viewportMeta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
    setTimeout(() => {
      viewportMeta.setAttribute("content", original);
    }, 150);
  }
}

function normalizeUrl(url) {
  if (!url) return "";
  const trimmed = url.trim();
  if (/^(https?:\/\/|mailto:|tel:|viber:\/\/|tg:\/\/)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function getGmailComposeUrl(email) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

async function compressImage(file, maxWidth = 800, quality = 0.85) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function evaluatePhBusinessStatus(schedule) {
  if (!schedule || !schedule.enabled) return null;
  const nowPh = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  const dayIdx = nowPh.getDay();
  const currentMins = nowPh.getHours() * 60 + nowPh.getMinutes();

  const activeDays = schedule.activeDays || [0, 1, 2, 3, 4, 5, 6];
  if (!activeDays.includes(dayIdx)) {
    return { isOpen: false, label: "Closed Today (PH Time)" };
  }

  let openStr = schedule.openTime || "09:00";
  let closeStr = schedule.closeTime || "18:00";

  if (schedule.mode === "custom" && schedule.perDay?.[dayIdx]) {
    openStr = schedule.perDay[dayIdx].open || openStr;
    closeStr = schedule.perDay[dayIdx].close || closeStr;
  }

  const [oh, om] = openStr.split(":").map(Number);
  const [ch, cm] = closeStr.split(":").map(Number);
  const openMins = oh * 60 + om;
  const closeMins = ch * 60 + cm;

  const isOpen = closeMins >= openMins
    ? currentMins >= openMins && currentMins < closeMins
    : currentMins >= openMins || currentMins < closeMins;

  return {
    isOpen,
    label: isOpen
      ? `Open Now • Closes ${formatTime12(closeStr)}`
      : `Closed • Opens ${formatTime12(openStr)}`
  };
}

function openWithNativeDeepLink(e, platformId, fallbackUrl) {
  if (!fallbackUrl || fallbackUrl === "#") return;
  const schemes = {
    facebook: "fb://",
    instagram: "instagram://",
    tiktok: "snssdk1233://",
    youtube: "vnd.youtube://",
    x: "twitter://",
    linkedin: "linkedin://",
    telegram: "tg://"
  };
  const scheme = schemes[platformId];
  if (scheme && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    e.preventDefault();
    const start = Date.now();
    window.location.href = scheme;
    setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      }
    }, 700);
  }
}

function openBankMobileApp(providerId) {
  const bankSchemes = {
    gcash: "gcash://",
    maya: "paymaya://",
    maribank: "seabankph://",
    gotyme: "gotyme://",
    bdo: "bdoonline://",
    bpi: "bpi://",
    metrobank: "metrobank://",
    landbank: "landbank://",
    chinabank: "chinabank://"
  };
  const scheme = bankSchemes[providerId];
  if (scheme && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = scheme;
  } else {
    alert("Account number copied! Open your banking app to paste and complete the transfer.");
  }
}

const DB_NAME = "SmartTapMediaDB";
const DB_STORE = "mediaFiles";

function openMediaDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(DB_STORE)) {
        req.result.createObjectStore(DB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveMediaBlob(key, blob) {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(blob, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getMediaBlob(key) {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const req = tx.objectStore(DB_STORE).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function deleteMediaBlob(key) {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
const DEFAULT_PROFILE_STATE = {
  name: "",
  bio: "",
  phone: "",
  email: "",
  avatar: "",
  photos: [],
  theme: "black",
  surfaceStyle: "solid",
  verifiedBadge: { enabled: true, color: "text-blue-500" },
  privacy: {
    contact: true,
    media: true,
    booking: true,
    links: true,
    locations: true,
    payments: true
  },
  booking: {
    enabled: false,
    title: "Book a Meeting / Appointment",
    availableDays: [1, 2, 3, 4, 5],
    startTime: "09:00",
    endTime: "18:00",
    location: ""
  },
  links: [],
  locations: [],
  payments: []
};

export default function SmartTapApp() {
  const [screen, setScreen] = useState("view");
  const [authMode, setAuthMode] = useState("signup");
  const [account, setAccount] = useState(null);
  const [authIdentifier, setAuthIdentifier] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [activationCodeInput, setActivationCodeInput] = useState("");
  const [showAuthPass, setShowAuthPass] = useState(false);
  const [authError, setAuthError] = useState("");

  // Floating Live Preview & Password-Verified Reset Modals (Inside Editor)
  const [showFloatingPreview, setShowFloatingPreview] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetPassInput, setResetPassInput] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetToast, setResetToast] = useState(false);

  // Super Admin Hidden Vault States (Only accessible via 5-tap secret logo trigger + Master Admin PIN)
  const [secretTapCount, setSecretTapCount] = useState(0);
  const [showSuperAdminModal, setShowSuperAdminModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPinError, setAdminPinError] = useState("");
  const [validCodes, setValidCodes] = useState(INITIAL_ACTIVATION_CODES);
  const [usedCodes, setUsedCodes] = useState([]);

  const [isOffline, setIsOffline] = useState(false);
  const [largeTextMode, setLargeTextMode] = useState(false);
  const [themeToast, setThemeToast] = useState("");
  const [saveToast, setSaveToast] = useState(false);
  const [copiedId, setCopiedId] = useState("");

  const [profile, setProfile] = useState(DEFAULT_PROFILE_STATE);

  const [videoObjectUrl, setVideoObjectUrl] = useState("");
  const [audioObjectUrls, setAudioObjectUrls] = useState({});
  const [activeAudioId, setActiveAudioId] = useState(null);
  const [musicVolume, setMusicVolume] = useState(0.85);
  const audioRef = useRef(null);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedSubPlatform, setSelectedSubPlatform] = useState(null);
  const [inputField1, setInputField1] = useState("");
  const [inputField2, setInputField2] = useState("");
  const [inputField3, setInputField3] = useState("");
  const [payQrImage, setPayQrImage] = useState("");
  const [modalError, setModalError] = useState("");
  const [pendingAudioFile, setPendingAudioFile] = useState(null);

  const [editingLinkItem, setEditingLinkItem] = useState(null);
  const [dismissedHealthBanner, setDismissedHealthBanner] = useState(false);

  const [showLocModal, setShowLocModal] = useState(false);
  const [locAddress, setLocAddress] = useState("");
  const [locLandmark, setLocLandmark] = useState("");
  const [locMapUrl, setLocMapUrl] = useState("");
  const [locHoursEnabled, setLocHoursEnabled] = useState(false);
  const [locActiveDays, setLocActiveDays] = useState([1, 2, 3, 4, 5, 6, 0]);
  const [locScheduleMode, setLocScheduleMode] = useState("uniform");
  const [locOpenTime, setLocOpenTime] = useState("09:00");
  const [locCloseTime, setLocCloseTime] = useState("18:00");
  const [locPerDay, setLocPerDay] = useState({
    0: { open: "10:00", close: "17:00" },
    1: { open: "09:00", close: "18:00" },
    2: { open: "09:00", close: "18:00" },
    3: { open: "09:00", close: "18:00" },
    4: { open: "09:00", close: "18:00" },
    5: { open: "09:00", close: "18:00" },
    6: { open: "10:00", close: "17:00" }
  });

  const [analytics, setAnalytics] = useState({ taps1d: 1, taps1w: 1, taps1m: 1, tapsTotal: 1 });
  const [messages, setMessages] = useState([]);
  const [exchangedContacts, setExchangedContacts] = useState([]);
  const [paymentReceipts, setPaymentReceipts] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);

  const [contactForm, setContactForm] = useState({ name: "", contact: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [exchangeSuccess, setExchangeSuccess] = useState(false);
  const [exchangeForm, setExchangeForm] = useState({ name: "", phone: "", email: "", social: "" });
  const [showPostSavePrompt, setShowPostSavePrompt] = useState(false);

  const [receiptModalPay, setReceiptModalPay] = useState(null);
  const [receiptSenderName, setReceiptSenderName] = useState("");
  const [receiptRefNo, setReceiptRefNo] = useState("");
  const [receiptImage, setReceiptImage] = useState("");
  const [receiptSuccess, setReceiptSuccess] = useState(false);
  const [viewingReceiptImg, setViewingReceiptImg] = useState(null);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);
  const [calMonthOffset, setCalMonthOffset] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    clientName: "",
    clientPhone: "",
    selectedDateISO: "",
    selectedDateLabel: "",
    durationMins: 30,
    timeChoice: "09:00",
    notes: ""
  });

  const [showShareQrModal, setShowShareQrModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [analyticsPin, setAnalyticsPin] = useState("");
  const [analyticsPinError, setAnalyticsPinError] = useState("");
  const [analyticsUnlocked, setAnalyticsUnlocked] = useState(false);
  const [inboxTab, setInboxTab] = useState("messages");
  const [isEditingCreds, setIsEditingCreds] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [editPass, setEditPass] = useState("");

  const [activeQrModal, setActiveQrModal] = useState(null);
  const [showPaySelectionModal, setShowPaySelectionModal] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [isFloatingMinimized, setIsFloatingMinimized] = useState(false);

  const avatarInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const qrInputRef = useRef(null);
  const receiptInputRef = useRef(null);
  const mainActionsRef = useRef(null);

  useEffect(() => {
    const savedAcc = localStorage.getItem("smarttap_v32_account");
    const savedProf = localStorage.getItem("smarttap_v32_profile");
    const savedMsgs = localStorage.getItem("smarttap_v32_messages");
    const savedExch = localStorage.getItem("smarttap_v32_exchanged");
    const savedRcpt = localStorage.getItem("smarttap_v32_receipts");
    const savedBook = localStorage.getItem("smarttap_v32_bookings");
    const savedValidCodes = localStorage.getItem("smarttap_admin_valid_codes");
    const savedUsedCodes = localStorage.getItem("smarttap_admin_used_codes");

    if (savedValidCodes) setValidCodes(JSON.parse(savedValidCodes));
    if (savedUsedCodes) setUsedCodes(JSON.parse(savedUsedCodes));

    if (savedAcc) {
      const parsedAcc = JSON.parse(savedAcc);
      setAccount(parsedAcc);
      setEditUser(parsedAcc.identifier || "");
      setEditPass(parsedAcc.password || "");
    } else {
      setScreen("claim");
    }

    if (savedProf) {
      const parsedProf = JSON.parse(savedProf);
      setProfile((prev) => ({
        ...prev,
        ...parsedProf,
        privacy: { ...prev.privacy, ...(parsedProf.privacy || {}) },
        booking: { ...prev.booking, ...(parsedProf.booking || {}) },
        verifiedBadge: { ...prev.verifiedBadge, ...(parsedProf.verifiedBadge || {}) }
      }));

      (parsedProf.links || []).forEach(async (item) => {
        if (item.type === "music") {
          const blob = await getMediaBlob(`audio_${item.id}`);
          if (blob) {
            setAudioObjectUrls((prev) => ({ ...prev, [item.id]: URL.createObjectURL(blob) }));
          }
        }
      });
    }

    if (savedMsgs) setMessages(JSON.parse(savedMsgs));
    if (savedExch) setExchangedContacts(JSON.parse(savedExch));
    if (savedRcpt) setPaymentReceipts(JSON.parse(savedRcpt));
    if (savedBook) setBookingsList(JSON.parse(savedBook));

    getMediaBlob("featured_video").then((blob) => {
      if (blob) setVideoObjectUrl(URL.createObjectURL(blob));
    });

    const handleOfflineStatus = () => setIsOffline(!navigator.onLine);
    handleOfflineStatus();
    window.addEventListener("online", handleOfflineStatus);
    window.addEventListener("offline", handleOfflineStatus);
    return () => {
      window.removeEventListener("online", handleOfflineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 220);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const theme = THEMES[profile.theme] || THEMES.black;

  const surfaceInlineStyle = (() => {
    const style = profile.surfaceStyle || "solid";
    if (style === "gradient") {
      return { backgroundImage: "linear-gradient(145deg, rgba(99,102,241,0.22), rgba(6,182,212,0.12), transparent 70%)" };
    }
    if (style === "mesh") {
      return {
        backgroundImage:
          "radial-gradient(at 15% 15%, rgba(99,102,241,0.28) 0px, transparent 50%), radial-gradient(at 85% 80%, rgba(16,185,129,0.22) 0px, transparent 50%)"
      };
    }
    if (style === "pattern") {
      return {
        backgroundImage: "radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1px)",
        backgroundSize: "18px 18px"
      };
    }
    return {};
  })();

  const linkHealthIssues = (profile.links || [])
    .filter((item) => item.type !== "music" && item.type !== "gaming")
    .map((item) => {
      const u = (item.url || "").trim();
      if (!u || !u.includes(".") || u.length < 8) {
        return { item, reason: `${item.label} has an incomplete or invalid URL.` };
      }
      return null;
    })
    .filter(Boolean);

  function navigateWithZoomReset(targetScreen) {
    resetMobileViewportZoom();
    setScreen(targetScreen);
  }

  function handleSecretLogoTap() {
    const next = secretTapCount + 1;
    if (next >= 5) {
      setSecretTapCount(0);
      setAdminPinInput("");
      setAdminPinError("");
      setAdminUnlocked(false);
      setShowSuperAdminModal(true);
    } else {
      setSecretTapCount(next);
      setTimeout(() => setSecretTapCount(0), 2500);
    }
  }

  function handleGenerateNewAdminCode() {
    let code = generateRandomActivationCode();
    while (validCodes.includes(code) || usedCodes.some((u) => u.code === code)) {
      code = generateRandomActivationCode();
    }
    const updated = [code, ...validCodes];
    setValidCodes(updated);
    localStorage.setItem("smarttap_admin_valid_codes", JSON.stringify(updated));
  }

  function copyToClipboard(text, id) {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  }

  function handleManualAuth(e) {
    e.preventDefault();
    const idTrim = authIdentifier.trim();
    const passTrim = authPassword.trim();
    if (!idTrim || !passTrim) return;

    if (authMode === "login" || screen === "login_to_edit") {
      if (account && account.identifier === idTrim && account.password === passTrim) {
        setAuthError("");
        navigateWithZoomReset("edit");
      } else {
        setAuthError("Invalid username or password. Please try again.");
      }
    } else {
      const codeClean = activationCodeInput.trim().toUpperCase();
      if (!codeClean) {
        setAuthError("Please enter the One-Time Activation Code included with your SmartTap card.");
        return;
      }
      if (usedCodes.some((u) => u.code === codeClean)) {
        setAuthError("This Activation Code has already been used and burned. Each SmartTap card requires a unique unused code.");
        return;
      }
      if (!validCodes.includes(codeClean)) {
        setAuthError("Invalid Activation Code. Please check the card insert from SmartTap PH.");
        return;
      }

      const remainingValid = validCodes.filter((c) => c !== codeClean);
      const updatedUsed = [
        { code: codeClean, claimedBy: idTrim, date: new Date().toLocaleDateString("en-PH") },
        ...usedCodes
      ];
      setValidCodes(remainingValid);
      setUsedCodes(updatedUsed);
      localStorage.setItem("smarttap_admin_valid_codes", JSON.stringify(remainingValid));
      localStorage.setItem("smarttap_admin_used_codes", JSON.stringify(updatedUsed));

      const newAcc = { identifier: idTrim, password: passTrim, activationCode: codeClean };
      setAccount(newAcc);
      setEditUser(idTrim);
      setEditPass(passTrim);
      localStorage.setItem("smarttap_v32_account", JSON.stringify(newAcc));
      setAuthError("");
      navigateWithZoomReset("edit");
    }
  }

  function handleSaveProfile() {
    localStorage.setItem("smarttap_v32_profile", JSON.stringify(profile));
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      navigateWithZoomReset("view");
    }, 850);
  }

  async function handleConfirmResetProfile(e) {
    e.preventDefault();
    if (!account || resetPassInput.trim() !== account.password) {
      setResetError("Incorrect password. Layout reset cancelled.");
      return;
    }

    // Delete stored audio & video blobs in IndexedDB while preserving owner account
    for (const item of profile.links || []) {
      if (item.type === "music") {
        await deleteMediaBlob(`audio_${item.id}`);
      }
    }
    await deleteMediaBlob("featured_video");
    if (audioRef.current) {
      audioRef.current.pause();
      setActiveAudioId(null);
    }

    setVideoObjectUrl("");
    setAudioObjectUrls({});
    setProfile(DEFAULT_PROFILE_STATE);
    localStorage.setItem("smarttap_v32_profile", JSON.stringify(DEFAULT_PROFILE_STATE));

    setResetPassInput("");
    setResetError("");
    setShowResetModal(false);
    resetMobileViewportZoom();
    setResetToast(true);
    setTimeout(() => setResetToast(false), 3000);
  }

  async function handleAvatarUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file, 450, 0.85);
    setProfile({ ...profile, avatar: compressed });
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const slotsLeft = 4 - profile.photos.length;
    const selected = files.slice(0, slotsLeft);
    const compressedList = await Promise.all(selected.map((f) => compressImage(f, 800, 0.85)));
    setProfile({ ...profile, photos: [...profile.photos, ...compressedList] });
  }

  function removeGalleryPhoto(idx) {
    setProfile({ ...profile, photos: profile.photos.filter((_, i) => i !== idx) });
  }

  async function handleVideoFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    await saveMediaBlob("featured_video", file);
    setVideoObjectUrl(URL.createObjectURL(file));
  }

  async function handleRemoveVideo() {
    await deleteMediaBlob("featured_video");
    setVideoObjectUrl("");
  }

  function saveLinkItem(e) {
    e.preventDefault();
    const cleanUrl = normalizeUrl(inputField1);
    if (editingLinkItem) {
      setProfile({
        ...profile,
        links: profile.links.map((l) => (l.id === editingLinkItem.id ? { ...l, url: cleanUrl } : l))
      });
      setEditingLinkItem(null);
      setInputField1("");
      setInputField2("");
      resetMobileViewportZoom();
      return;
    }

    const customLabel =
      selectedSubPlatform.id === "others" && inputField2.trim()
        ? inputField2.trim()
        : selectedSubPlatform.name;

    const newItem = {
      id: Date.now().toString(),
      type: activeModal,
      platformId: selectedSubPlatform.id,
      label: customLabel,
      badge: selectedSubPlatform.id === "others" && inputField2.trim()
        ? inputField2.trim().slice(0, 3).toUpperCase()
        : selectedSubPlatform.badge,
      url: cleanUrl
    };
    setProfile({ ...profile, links: [...profile.links, newItem] });
    setActiveModal(null);
    setSelectedSubPlatform(null);
    setInputField1("");
    setInputField2("");
    resetMobileViewportZoom();
  }

  async function saveMusicItem(e) {
    e.preventDefault();
    if (!pendingAudioFile) return;
    const newId = Date.now().toString();
    await saveMediaBlob(`audio_${newId}`, pendingAudioFile);
    const objUrl = URL.createObjectURL(pendingAudioFile);
    setAudioObjectUrls((prev) => ({ ...prev, [newId]: objUrl }));

    const newItem = {
      id: newId,
      type: "music",
      platformId: "audio_upload",
      label: inputField1.trim() || pendingAudioFile.name,
      badge: "MP3",
      url: ""
    };
    setProfile({ ...profile, links: [...profile.links, newItem] });
    setActiveModal(null);
    setSelectedSubPlatform(null);
    setInputField1("");
    setPendingAudioFile(null);
    resetMobileViewportZoom();
  }

  function saveGamingItem(e) {
    e.preventDefault();
    const isCustomGame = selectedSubPlatform.id === "others";
    const gameTitle = isCustomGame && inputField1.trim() ? inputField1.trim() : selectedSubPlatform.name;

    const newItem = {
      id: Date.now().toString(),
      type: "gaming",
      platformId: selectedSubPlatform.id,
      label: gameTitle,
      badge: isCustomGame ? gameTitle.slice(0, 3).toUpperCase() : selectedSubPlatform.badge,
      gameDetails: isCustomGame
        ? { field1: inputField2.trim(), field2: inputField3.trim(), field3: "" }
        : { field1: inputField1.trim(), field2: inputField2.trim(), field3: inputField3.trim() },
      url: "#"
    };
    setProfile({ ...profile, links: [...profile.links, newItem] });
    setActiveModal(null);
    setSelectedSubPlatform(null);
    setInputField1("");
    setInputField2("");
    setInputField3("");
    resetMobileViewportZoom();
  }

  function savePaymentItem(e) {
    e.preventDefault();
    const bankLabel = selectedSubPlatform.id === "others" ? inputField3.trim() : selectedSubPlatform.name;
    const newPay = {
      id: Date.now().toString(),
      providerId: selectedSubPlatform.id,
      bankName: bankLabel,
      accountName: inputField1.trim(),
      accountNumber: inputField2.trim(),
      qrImage: payQrImage
    };
    setProfile({ ...profile, payments: [...profile.payments, newPay] });
    setActiveModal(null);
    setSelectedSubPlatform(null);
    setInputField1("");
    setInputField2("");
    setInputField3("");
    setPayQrImage("");
    setModalError("");
    resetMobileViewportZoom();
  }

  function saveLocationItem(e) {
    e.preventDefault();
    const newLoc = {
      id: Date.now().toString(),
      address: locAddress.trim(),
      landmark: locLandmark.trim(),
      mapUrl: locMapUrl.trim() ? normalizeUrl(locMapUrl) : "",
      schedule: {
        enabled: locHoursEnabled,
        activeDays: locActiveDays,
        mode: locScheduleMode,
        openTime: locOpenTime,
        closeTime: locCloseTime,
        perDay: locPerDay
      }
    };
    setProfile({ ...profile, locations: [...profile.locations, newLoc] });
    setShowLocModal(false);
    resetMobileViewportZoom();
  }

  async function removeItem(id, type) {
    if (type === "location") {
      setProfile({ ...profile, locations: profile.locations.filter((l) => l.id !== id) });
    } else if (type === "payment") {
      setProfile({ ...profile, payments: profile.payments.filter((p) => p.id !== id) });
    } else {
      if (type === "music") {
        await deleteMediaBlob(`audio_${id}`);
        if (activeAudioId === id && audioRef.current) {
          audioRef.current.pause();
          setActiveAudioId(null);
        }
      }
      setProfile({ ...profile, links: profile.links.filter((l) => l.id !== id) });
    }
  }

  function togglePlayAudio(id) {
    const src = audioObjectUrls[id];
    if (!src || !audioRef.current) return;
    if (activeAudioId === id) {
      audioRef.current.pause();
      setActiveAudioId(null);
    } else {
      audioRef.current.src = src;
      audioRef.current.play();
      setActiveAudioId(id);
    }
  }

  function handleSaveContactVCard(customName, customPhone, customEmail, customNote, promptBack = false) {
    const cName = customName || profile.name || "SmartTap Contact";
    const cPhone = customPhone || profile.phone || "";
    const cEmail = customEmail || profile.email || "";
    const cNote = customNote || profile.bio || "Saved via SmartTap PH";

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${cName}`,
      cPhone ? `TEL;TYPE=CELL:${cPhone}` : "",
      cEmail ? `EMAIL:${cEmail}` : "",
      `NOTE:${cNote}`,
      "END:VCARD"
    ].filter(Boolean).join("\n");

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cName.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);

    if (promptBack) {
      setShowPostSavePrompt(true);
    }
  }

  function handleSendContactMessage(e) {
    e.preventDefault();
    const newMsg = {
      id: Date.now().toString(),
      name: contactForm.name.trim(),
      contact: contactForm.contact.trim(),
      message: contactForm.message.trim(),
      date: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric" })
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem("smarttap_v32_messages", JSON.stringify(updated));
    setContactForm({ name: "", contact: "", message: "" });
    setContactSent(true);
    resetMobileViewportZoom();
    setTimeout(() => setContactSent(false), 3500);
  }

  function handleExchangeContactSubmit(e) {
    e.preventDefault();
    const entry = {
      id: Date.now().toString(),
      name: exchangeForm.name.trim(),
      phone: exchangeForm.phone.trim(),
      email: exchangeForm.email.trim(),
      social: exchangeForm.social.trim(),
      date: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric" })
    };
    const updated = [entry, ...exchangedContacts];
    setExchangedContacts(updated);
    localStorage.setItem("smarttap_v32_exchanged", JSON.stringify(updated));
    setExchangeSuccess(true);
    resetMobileViewportZoom();
  }

  function handleReceiptSubmit(e) {
    e.preventDefault();
    if (!receiptImage) return;
    const entry = {
      id: Date.now().toString(),
      bankName: receiptModalPay.bankName,
      senderName: receiptSenderName.trim(),
      refNo: receiptRefNo.trim(),
      image: receiptImage,
      date: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric" })
    };
    const updated = [entry, ...paymentReceipts];
    setPaymentReceipts(updated);
    localStorage.setItem("smarttap_v32_receipts", JSON.stringify(updated));
    setReceiptSuccess(true);
    resetMobileViewportZoom();
  }

  function getAvailableBookingTimes() {
    const start = profile.booking?.startTime || "09:00";
    const end = profile.booking?.endTime || "18:00";
    const filtered = TIME_OPTIONS_30M.filter((t) => t >= start && t <= end);
    return filtered.length > 0 ? filtered : ["09:00", "10:00", "13:00", "15:00"];
  }

  function buildCalendarMonth(offset) {
    const base = new Date();
    const target = new Date(base.getFullYear(), base.getMonth() + offset, 1);
    const year = target.getFullYear();
    const month = target.getMonth();
    const monthLabel = target.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStart = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    const allowedDays = profile.booking?.availableDays || [1, 2, 3, 4, 5];

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const isPast = dateObj < todayStart;
      const isAllowedWeekday = allowedDays.includes(dateObj.getDay());
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const label = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
      cells.push({
        dayNum: d,
        iso,
        label,
        isAvailable: !isPast && isAllowedWeekday
      });
    }
    return { monthLabel, cells };
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    if (!bookingForm.selectedDateISO) return;

    const newBooking = {
      id: Date.now().toString(),
      title: profile.booking?.title || "Appointment",
      location: profile.booking?.location || "TBD",
      clientName: bookingForm.clientName.trim(),
      clientPhone: bookingForm.clientPhone.trim(),
      dayChoice: bookingForm.selectedDateLabel,
      timeChoice: formatTime12(bookingForm.timeChoice),
      durationMins: bookingForm.durationMins,
      notes: bookingForm.notes.trim(),
      date: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric" })
    };

    const updated = [newBooking, ...bookingsList];
    setBookingsList(updated);
    localStorage.setItem("smarttap_v32_bookings", JSON.stringify(updated));

    const [y, m, d] = bookingForm.selectedDateISO.split("-").map(Number);
    const [hh, mm] = bookingForm.timeChoice.split(":").map(Number);
    const startDt = new Date(y, m - 1, d, hh, mm);
    const endDt = new Date(startDt.getTime() + bookingForm.durationMins * 60000);

    const fmtIcs = (dt) =>
      `${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, "0")}${String(dt.getDate()).padStart(2, "0")}T${String(dt.getHours()).padStart(2, "0")}${String(dt.getMinutes()).padStart(2, "0")}00`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SmartTap PH//Booking//EN",
      "BEGIN:VEVENT",
      `DTSTART:${fmtIcs(startDt)}`,
      `DTEND:${fmtIcs(endDt)}`,
      `SUMMARY:${newBooking.title} with ${profile.name || "SmartTap"}`,
      `LOCATION:${newBooking.location}`,
      `DESCRIPTION:Client: ${newBooking.clientName} (${newBooking.clientPhone})`,
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SmartTap_Booking_${bookingForm.selectedDateISO}.ics`;
    a.click();
    URL.revokeObjectURL(url);

    setBookingSuccess(true);
    resetMobileViewportZoom();
  }

  async function handleNativeShare(url) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name || "SmartTap"} Digital Card`,
          text: `Check out ${profile.name || "my"} SmartTap profile!`,
          url
        });
      } catch {}
    } else {
      copyToClipboard(url, "qr_url");
    }
  }

  function downloadQrPhoto(dataUrl, bankName) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${bankName.replace(/\s+/g, "_")}_QR.jpg`;
    a.click();
  }

  // --- SECRET SUPER ADMIN VAULT MODAL (5-Tap Logo Trigger) ---
  const superAdminModalUI = showSuperAdminModal && (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0d1117] border border-amber-500/40 text-white w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-amber-300">SmartTap Founder Vault</h3>
          </div>
          <button onClick={() => setShowSuperAdminModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!adminUnlocked ? (
          <div className="space-y-4 py-3 text-center">
            <p className="text-xs text-slate-400">
              Restricted Area: Enter your Master Super Admin Passcode to generate or audit one-time NFC activation codes.
            </p>
            <input
              type="password"
              autoFocus
              value={adminPinInput}
              onChange={(e) => setAdminPinInput(e.target.value)}
              placeholder="Master Admin Passcode"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-700 text-base sm:text-sm text-white text-center font-mono"
            />
            {adminPinError && <p className="text-xs text-rose-400">{adminPinError}</p>}
            <button
              type="button"
              onClick={() => {
                if (adminPinInput.trim() === SUPER_ADMIN_PASSCODE) {
                  setAdminUnlocked(true);
                  setAdminPinError("");
                  resetMobileViewportZoom();
                } else {
                  setAdminPinError("Unauthorized passcode.");
                }
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
            >
              Unlock Founder Vault
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGenerateNewAdminCode}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <KeyRound className="w-4 h-4" /> Generate New Random Activation Code
            </button>

            <div className="space-y-2">
              <p className="text-xs font-bold text-emerald-400">
                Available Unused Codes ({validCodes.length})
              </p>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {validCodes.map((code) => (
                  <div key={code} className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                    <span className="text-emerald-300 font-bold">{code}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(code, code)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-sans font-semibold cursor-pointer"
                    >
                      {copiedId === code ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <p className="text-xs font-bold text-rose-400">
                Burned / Used Codes ({usedCodes.length})
              </p>
              {usedCodes.length === 0 ? (
                <p className="text-[11px] text-slate-500">No codes have been redeemed yet.</p>
              ) : (
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {usedCodes.map((u, idx) => (
                    <div key={idx} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-rose-950/20 border border-rose-900/30 text-[11px]">
                      <span className="font-mono line-through text-rose-300">{u.code}</span>
                      <span className="text-slate-400">Used by @{u.claimedBy} ({u.date})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- SCREEN 1: CLAIM CARD ---
  if (screen === "claim") {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between p-6">
        {superAdminModalUI}
        <header className="max-w-md w-full mx-auto pt-2 flex items-center justify-between">
          <BrandLogo accentTextClass={theme.accentText} onSecretTap={handleSecretLogoTap} />
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-neutral-300 border border-neutral-700 font-medium">
            Unclaimed Card
          </span>
        </header>

        <main className="max-w-md w-full mx-auto my-auto text-center space-y-6 py-8">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-neutral-800 text-white flex items-center justify-center mx-auto shadow-lg">
            <QrCode className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight">Claim Your SmartTap Card</h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Enter the One-Time Activation Code included with your official SmartTap PH card to unlock and customize your digital profile.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setAuthIdentifier("");
                setAuthPassword("");
                setActivationCodeInput("");
                setAuthError("");
                navigateWithZoomReset("auth");
              }}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm shadow-lg transition cursor-pointer active:scale-95"
            >
              Activate & Set Up Card
            </button>

            {account && (
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthIdentifier("");
                  setAuthPassword("");
                  setAuthError("");
                  navigateWithZoomReset("auth");
                }}
                className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-sm font-medium transition cursor-pointer active:scale-95"
              >
                Already claimed? Sign in to Edit
              </button>
            )}
          </div>
        </main>

        <footer className="max-w-md w-full mx-auto text-center pb-4 text-xs text-neutral-500">
          Official SmartTap PH Hardware Required •{" "}
          <a href={TIKTOK_SHOP_URL} target="_blank" rel="noopener noreferrer" className="text-neutral-300 underline whitespace-nowrap">
            Get a Card
          </a>
        </footer>
      </div>
    );
  }

  // --- SCREEN 2: AUTH (WITH ONE-TIME ACTIVATION CODE GATEKEEPER) ---
  if (screen === "auth" || screen === "login_to_edit") {
    const isOwnerLogin = authMode === "login" || screen === "login_to_edit";

    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between p-6">
        {superAdminModalUI}
        <header className="max-w-md w-full mx-auto pt-2 flex items-center justify-between">
          <button
            onClick={() => navigateWithZoomReset(isOwnerLogin ? "view" : "claim")}
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <BrandLogo size="sm" accentTextClass={theme.accentText} onSecretTap={handleSecretLogoTap} />
        </header>

        <main className="max-w-md w-full mx-auto my-auto py-8">
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-neutral-700 text-white flex items-center justify-center mx-auto mb-3">
                {isOwnerLogin ? <Lock className="w-6 h-6" /> : <KeyRound className="w-6 h-6" />}
              </div>
              <h2 className="text-xl font-bold">
                {isOwnerLogin ? "Owner Login" : "Activate SmartTap Card"}
              </h2>
              <p className="text-xs text-neutral-400">
                {isOwnerLogin
                  ? "Sign in with your existing username & password to edit."
                  : "Enter your unique One-Time Activation Code and create your account."}
              </p>
            </div>

            <form onSubmit={handleManualAuth} className="space-y-4">
              {!isOwnerLogin && (
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    One-Time Card Activation Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={activationCodeInput}
                    onChange={(e) => setActivationCodeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. STPH-XXXX-XXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-neutral-700 text-base sm:text-sm text-white font-mono tracking-wider uppercase focus:outline-none focus:border-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Username</label>
                <input
                  type="text"
                  required
                  value={authIdentifier}
                  onChange={(e) => setAuthIdentifier(e.target.value)}
                  placeholder="e.g. juandelacruz"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-neutral-700 text-base sm:text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showAuthPass ? "text" : "password"}
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-black border border-neutral-700 text-base sm:text-sm text-white focus:outline-none focus:border-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAuthPass(!showAuthPass)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-white cursor-pointer"
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
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm transition cursor-pointer active:scale-95"
              >
                {isOwnerLogin ? "Log In & Open Editor" : "Verify Code & Start Setup"}
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
    const togglePrivacy = (key) => {
      setProfile((prev) => ({
        ...prev,
        privacy: { ...prev.privacy, [key]: !prev.privacy[key] }
      }));
    };

    const toggleBookingDay = (dayId) => {
      const current = profile.booking?.availableDays || [];
      const updated = current.includes(dayId)
        ? current.filter((d) => d !== dayId)
        : [...current, dayId];
      setProfile({
        ...profile,
        booking: { ...profile.booking, availableDays: updated }
      });
    };

    const toggleLocDay = (dayId) => {
      setLocActiveDays((prev) =>
        prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
      );
    };

    return (
      <div style={surfaceInlineStyle} className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-200 pb-36`}>
        {superAdminModalUI}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${theme.card}`}>
          <div className="max-w-xl mx-auto px-4 py-3.5 flex items-center justify-between gap-2">
            <BrandLogo size="sm" accentTextClass={theme.accentText} onSecretTap={handleSecretLogoTap} />
            <button
              type="button"
              onClick={() => {
                resetMobileViewportZoom();
                setShowFloatingPreview(true);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 ${theme.accentSoft} border`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
          {resetToast && (
            <div className="px-4 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Profile layout and settings have been reset to clean defaults!</span>
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold">Edit SmartTap Profile</h1>
            <p className={`text-xs mt-1 ${theme.subtext}`}>
              Use the eye icons on each block to hide/show sections on demand without deleting your saved info.
            </p>
          </div>

          {/* SECTION 1: PROFILE INFO & CONTACT PRIVACY */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <User className={`w-5 h-5 ${theme.accentText}`} />
                <h2>Profile & Contact Info</h2>
              </div>
              <button
                type="button"
                onClick={() => togglePrivacy("contact")}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer ${
                  profile.privacy.contact ? theme.accentSoft : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                }`}
              >
                {profile.privacy.contact ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{profile.privacy.contact ? "Contact Visible" : "Contact Hidden"}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-current/30 bg-slate-800 flex items-center justify-center shrink-0">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-slate-500" />
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${theme.pill}`}
                >
                  <ImageIcon className={`w-4 h-4 ${theme.accentText}`} />
                  Select Photo
                </button>
                {profile.avatar && (
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, avatar: "" })}
                    className="px-3 py-2 rounded-xl border border-rose-500/30 text-rose-400 text-xs font-medium hover:bg-rose-500/10 transition cursor-pointer"
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
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm focus:outline-none ${theme.input}`}
                />
              </div>

              <div className={`p-3.5 rounded-xl border space-y-2 ${theme.pill}`}>
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
                    className="w-4 h-4 rounded cursor-pointer"
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
                        className={`w-6 h-6 rounded-full ${c.bg} border-2 ${profile.verifiedBadge?.color === c.id ? "border-white scale-110" : "border-transparent"} transition cursor-pointer`}
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
                  placeholder="Entrepreneur | Cafe Owner | Manila, PH"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm focus:outline-none ${theme.input}`}
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
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm focus:outline-none ${theme.input}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="you@gmail.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm focus:outline-none ${theme.input}`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: FEATURED PHOTOS & DEVICE VIDEO */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <ImageIcon className={`w-5 h-5 ${theme.accentText}`} />
                <h2>Photos & Video ({profile.photos.length}/4)</h2>
              </div>
              <button
                type="button"
                onClick={() => togglePrivacy("media")}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer ${
                  profile.privacy.media ? theme.accentSoft : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                }`}
              >
                {profile.privacy.media ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{profile.privacy.media ? "Visible" : "Hidden"}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {profile.photos.map((photo, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-700/60 group bg-black/40">
                  <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryPhoto(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/75 text-white flex items-center justify-center hover:bg-rose-600 transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {profile.photos.length < 4 && (
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 text-xs font-medium transition cursor-pointer ${theme.accentSoft}`}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Photo</span>
                </button>
              )}
            </div>
            <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />

            <div className="pt-3 border-t border-slate-700/40 space-y-2">
              <label className={`block text-xs font-medium ${theme.subtext}`}>Featured Video (Direct Upload from Device)</label>
              <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoFileUpload} className="hidden" />
              {videoObjectUrl ? (
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${theme.pill}`}>
                  <video src={videoObjectUrl} muted loop autoPlay playsInline className="w-20 h-12 object-cover rounded bg-black" />
                  <span className="text-xs text-emerald-400 font-semibold flex-1 truncate">Video ready & cached!</span>
                  <button type="button" onClick={handleRemoveVideo} className="text-xs text-rose-400 font-semibold hover:underline cursor-pointer">
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className={`w-full py-3 border border-dashed rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${theme.accentSoft}`}
                >
                  <Plus className="w-4 h-4" /> Choose Video File from Device
                </button>
              )}
            </div>
          </section>

          {/* SECTION 3: APPOINTMENT / MEETING BOOKING */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <Calendar className={`w-5 h-5 ${theme.accentText}`} />
                <h2>Appointment / Meeting Booking</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => togglePrivacy("booking")}
                  className={`p-1.5 rounded-lg border cursor-pointer ${
                    profile.privacy.booking ? theme.accentSoft : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {profile.privacy.booking ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="checkbox"
                  checked={profile.booking?.enabled || false}
                  onChange={(e) => setProfile({
                    ...profile,
                    booking: { ...profile.booking, enabled: e.target.checked }
                  })}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            {profile.booking?.enabled && (
              <div className="space-y-4 pt-1">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Booking Button Label</label>
                  <select
                    value={profile.booking.title}
                    onChange={(e) => setProfile({ ...profile, booking: { ...profile.booking, title: e.target.value } })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs font-medium ${theme.input}`}
                  >
                    {BOOKING_LABELS.map((lbl) => (
                      <option key={lbl} value={lbl}>{lbl}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${theme.subtext}`}>
                    Select Available Days (Viewers can only pick checked days)
                  </label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {DAYS_OF_WEEK.map((d) => {
                      const isChecked = (profile.booking?.availableDays || []).includes(d.id);
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => toggleBookingDay(d.id)}
                          className={`py-2 rounded-xl border text-[11px] font-bold transition cursor-pointer ${
                            isChecked ? theme.accent : theme.pill
                          }`}
                        >
                          {d.short}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Earliest Time</label>
                    <select
                      value={profile.booking.startTime || "09:00"}
                      onChange={(e) => setProfile({ ...profile, booking: { ...profile.booking, startTime: e.target.value } })}
                      className={`w-full px-3 py-2.5 rounded-xl border text-base sm:text-xs ${theme.input}`}
                    >
                      {TIME_OPTIONS_30M.map((t) => (
                        <option key={t} value={t}>{formatTime12(t)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Latest Time</label>
                    <select
                      value={profile.booking.endTime || "18:00"}
                      onChange={(e) => setProfile({ ...profile, booking: { ...profile.booking, endTime: e.target.value } })}
                      className={`w-full px-3 py-2.5 rounded-xl border text-base sm:text-xs ${theme.input}`}
                    >
                      {TIME_OPTIONS_30M.map((t) => (
                        <option key={t} value={t}>{formatTime12(t)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Meeting Location / Link (Optional)</label>
                  <input
                    type="text"
                    value={profile.booking.location || ""}
                    onChange={(e) => setProfile({ ...profile, booking: { ...profile.booking, location: e.target.value } })}
                    placeholder="e.g. Starbucks BGC / Google Meet"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs ${theme.input}`}
                  />
                </div>
              </div>
            )}
          </section>

          {/* SECTION 4: LINKS & CATEGORIES */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <LinkIcon className={`w-5 h-5 ${theme.accentText}`} />
                <h2>Links & Categories</h2>
              </div>
              <button
                type="button"
                onClick={() => togglePrivacy("links")}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer ${
                  profile.privacy.links ? theme.accentSoft : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                }`}
              >
                {profile.privacy.links ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{profile.privacy.links ? "Visible" : "Hidden"}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button type="button" onClick={() => setActiveModal("social")} className={`p-3 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${theme.pill}`}>
                <Share2 className={`w-4 h-4 ${theme.accentText}`} />
                <span className="text-xs font-semibold">Add Social</span>
              </button>
              <button type="button" onClick={() => { setSelectedSubPlatform(MUSIC_PLATFORMS[0]); setActiveModal("music"); }} className={`p-3 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${theme.pill}`}>
                <Music className={`w-4 h-4 ${theme.accentText}`} />
                <span className="text-xs font-semibold">Add Music</span>
              </button>
              <button type="button" onClick={() => setActiveModal("gaming")} className={`p-3 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${theme.pill}`}>
                <Gamepad2 className={`w-4 h-4 ${theme.accentText}`} />
                <span className="text-xs font-semibold">Add Gaming</span>
              </button>
              <button type="button" onClick={() => setActiveModal("business")} className={`p-3 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${theme.pill}`}>
                <Building2 className={`w-4 h-4 ${theme.accentText}`} />
                <span className="text-xs font-semibold">Add Business</span>
              </button>
            </div>

            {profile.links.length > 0 && (
              <div className="space-y-2.5 pt-2">
                {profile.links.map((item) => {
                  const isBroken = linkHealthIssues.some((iss) => iss.item.id === item.id);
                  return (
                    <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border ${isBroken ? "border-amber-500/60 bg-amber-500/10" : theme.pill}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 uppercase shadow ${theme.badgeIcon}`}>
                          {item.badge || item.type.slice(0, 2)}
                        </span>
                        <div className="truncate">
                          <p className="text-sm font-semibold truncate flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {isBroken && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Check URL</span>}
                          </p>
                          <p className={`text-xs truncate ${theme.subtext}`}>
                            {item.type === "music" ? "Device Audio Track" : (item.type === "gaming" ? `${item.gameDetails?.field1}` : item.url)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.type !== "music" && item.type !== "gaming" && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingLinkItem(item);
                              setInputField1(item.url);
                            }}
                            className={`p-1.5 rounded-lg transition cursor-pointer ${theme.actionBtn}`}
                            title="Edit Link"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button type="button" onClick={() => removeItem(item.id, item.type)} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* SECTION 5: LOCATIONS & FLEXIBLE OPERATING HOURS */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <MapPin className={`w-5 h-5 ${theme.accentText}`} />
                <h2>Locations ({profile.locations.length})</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => togglePrivacy("locations")}
                  className={`p-1.5 rounded-lg border cursor-pointer ${
                    profile.privacy.locations ? theme.accentSoft : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {profile.privacy.locations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocAddress("");
                    setLocLandmark("");
                    setLocMapUrl("");
                    setLocHoursEnabled(false);
                    setLocActiveDays([1, 2, 3, 4, 5, 6, 0]);
                    setLocScheduleMode("uniform");
                    setShowLocModal(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${theme.accent}`}
                >
                  <Plus className="w-4 h-4" />
                  Add Location
                </button>
              </div>
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
                      <span className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${theme.badgeIcon}`}>
                        <MapPin className="w-4 h-4" />
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-semibold truncate">{loc.address}</p>
                        {loc.schedule?.enabled && (
                          <p className={`text-[11px] truncate ${theme.accentText}`}>
                            {loc.schedule.mode === "custom"
                              ? "Custom Daily Schedule Enabled"
                              : `${formatTime12(loc.schedule.openTime)} – ${formatTime12(loc.schedule.closeTime)}`}
                          </p>
                        )}
                      </div>
                    </div>
                    <button type="button" onClick={() => removeItem(loc.id, "location")} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SECTION 6: 9 PROFILE THEMES + SURFACE STYLE */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center gap-2 font-semibold text-base">
              <Palette className={`w-5 h-5 ${theme.accentText}`} />
              <h2>Profile Theme (9 Colors) & Surface Finish</h2>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {Object.values(THEMES).map((t) => {
                const isSelected = profile.theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setProfile({ ...profile, theme: t.id })}
                    className={`p-3 rounded-xl border text-left transition flex flex-col gap-2 cursor-pointer ${
                      isSelected ? `ring-2 ring-current ${theme.accentSoft}` : theme.pill
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full border-2 ${t.swatch}`} />
                    <span className="text-xs font-semibold leading-tight">{t.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-700/30 space-y-2">
              <label className={`text-xs font-semibold flex items-center gap-1.5 ${theme.subtext}`}>
                <Layers className="w-3.5 h-3.5" /> Background Surface Finish
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "solid", label: "Solid" },
                  { id: "gradient", label: "Gradient" },
                  { id: "mesh", label: "Mesh" },
                  { id: "pattern", label: "Pattern" }
                ].map((st) => {
                  const active = (profile.surfaceStyle || "solid") === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, surfaceStyle: st.id })}
                      className={`py-2 px-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                        active ? theme.accent : theme.pill
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 7: PAYMENT & BANK ACCOUNTS */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <CreditCard className={`w-5 h-5 ${theme.accentText}`} />
                <h2>Payments & Banks</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => togglePrivacy("payments")}
                  className={`p-1.5 rounded-lg border cursor-pointer ${
                    profile.privacy.payments ? theme.accentSoft : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {profile.privacy.payments ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedSubPlatform(null); setActiveModal("payment"); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${theme.accent}`}
                >
                  <Plus className="w-4 h-4" />
                  Add Payment
                </button>
              </div>
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
                      <span className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${theme.badgeIcon}`}>
                        ₱
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-semibold">{pay.bankName}</p>
                        <p className={`text-xs truncate ${theme.subtext}`}>{pay.accountName} • {pay.accountNumber}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeItem(pay.id, "payment")} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SECTION 8: RESET PROFILE & LAYOUT TO DEFAULT (PASSWORD VERIFIED) */}
          <section className={`rounded-2xl border border-rose-500/30 p-5 space-y-3 ${theme.card}`}>
            <div className="flex items-center gap-2 font-semibold text-sm text-rose-400">
              <RefreshCw className="w-4 h-4" />
              <h2>Reset Profile & Layout</h2>
            </div>
            <p className={`text-xs leading-relaxed ${theme.subtext}`}>
              Restore your profile fields, uploaded media, links, locations, and payment methods back to clean startup defaults. Your SmartTap account login will remain active.
            </p>
            <button
              type="button"
              onClick={() => {
                setResetPassInput("");
                setResetError("");
                resetMobileViewportZoom();
                setShowResetModal(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Layout & Settings to Default</span>
            </button>
          </section>
        </main>

        {/* FLOATING LINK HEALTH POP-UP ALERT */}
        {linkHealthIssues.length > 0 && !dismissedHealthBanner && (
          <div className="fixed bottom-20 inset-x-4 z-40 max-w-xl mx-auto">
            <div className="bg-[#1c1917] border-2 border-amber-500/80 text-amber-100 rounded-2xl p-3.5 shadow-2xl flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-bold text-amber-300">
                    Broken / Incomplete Link Detected ({linkHealthIssues.length})
                  </p>
                  <p className="text-[11px] text-amber-100/90 truncate">
                    {linkHealthIssues[0].reason}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const targetItem = linkHealthIssues[0].item;
                      setEditingLinkItem(targetItem);
                      setInputField1(targetItem.url || "");
                    }}
                    className="mt-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px] inline-flex items-center gap-1 transition cursor-pointer"
                  >
                    <Pencil className="w-3 h-3" /> Edit & Fix Link
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDismissedHealthBanner(true)}
                className="p-1 text-amber-300/70 hover:text-white cursor-pointer"
                title="Dismiss Alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className={`fixed bottom-0 inset-x-0 p-4 border-t backdrop-blur-md z-30 ${theme.card}`}>
          <div className="max-w-xl mx-auto">
            <button
              type="button"
              onClick={handleSaveProfile}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 ${theme.accent}`}
            >
              <Save className="w-4 h-4" />
              {saveToast ? "Saved & Published!" : "Save & Publish SmartTap Profile"}
            </button>
          </div>
        </div>

        {/* FLOATING LIVE PREVIEW MODAL (STAYS INSIDE EDITOR WITHOUT LOGGING OUT) */}
        {showFloatingPreview && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
            <div className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${theme.bg} ${theme.text} border-slate-700`}>
              {/* Floating Preview Header with Close X */}
              <div className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${theme.card}`}>
                <div className="flex items-center gap-2">
                  <Eye className={`w-4 h-4 ${theme.accentText}`} />
                  <span className="text-xs font-bold uppercase tracking-wider">Live Viewer Preview</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetMobileViewportZoom();
                    setShowFloatingPreview(false);
                  }}
                  className="p-1.5 rounded-full bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition cursor-pointer"
                  title="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Live Preview Body */}
              <div style={surfaceInlineStyle} className="p-5 overflow-y-auto space-y-5 flex-1">
                <div className="text-center space-y-2.5">
                  {profile.avatar && (
                    <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-current/30 shadow-md bg-slate-800">
                      <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <div className="inline-flex items-center justify-center gap-1.5">
                      <h2 className="text-lg font-extrabold tracking-tight">
                        {profile.name || "SmartTap User"}
                      </h2>
                      {profile.verifiedBadge?.enabled && (
                        <ShieldCheck className={`w-4 h-4 shrink-0 ${profile.verifiedBadge.color || "text-blue-500"}`} />
                      )}
                    </div>
                    {profile.bio && (
                      <p className={`text-xs mt-1 leading-relaxed ${theme.subtext}`}>{profile.bio}</p>
                    )}
                  </div>
                </div>

                {/* Live Gallery Layout Preview */}
                {profile.privacy.media && (
                  <>
                    {profile.photos.length === 1 && (
                      <div className="rounded-2xl overflow-hidden border border-slate-700/40 bg-black/30 flex items-center justify-center">
                        <img src={profile.photos[0]} alt="Preview 1" className="w-full max-h-64 object-contain" />
                      </div>
                    )}
                    {profile.photos.length === 2 && (
                      <div className="grid grid-cols-2 gap-2">
                        {profile.photos.map((photo, index) => (
                          <div key={index} className="rounded-2xl overflow-hidden border border-slate-700/40 aspect-square bg-black/30">
                            <img src={photo} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    {profile.photos.length === 3 && (
                      <div className="grid grid-cols-2 gap-2">
                        {profile.photos.slice(0, 2).map((photo, index) => (
                          <div key={index} className="rounded-2xl overflow-hidden border border-slate-700/40 aspect-square bg-black/30">
                            <img src={photo} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="col-span-2 flex justify-center">
                          <div className="w-1/2 rounded-2xl overflow-hidden border border-slate-700/40 aspect-square bg-black/30">
                            <img src={profile.photos[2]} alt="Preview 3" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.photos.length >= 4 && (
                      <div className="grid grid-cols-2 gap-2">
                        {profile.photos.map((photo, index) => (
                          <div key={index} className="rounded-2xl overflow-hidden border border-slate-700/40 aspect-square bg-black/30">
                            <img src={photo} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    {videoObjectUrl && (
                      <div className="rounded-2xl overflow-hidden border border-slate-700/60 bg-black">
                        <video src={videoObjectUrl} autoPlay loop muted playsInline className="w-full aspect-video object-cover" />
                      </div>
                    )}
                  </>
                )}

                {/* Contact & Booking Preview */}
                {profile.privacy.contact && (profile.phone || profile.email) && (
                  <div className="grid grid-cols-2 gap-2">
                    {profile.phone && (
                      <div className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${theme.pill}`}>
                        <Phone className={`w-3.5 h-3.5 ${theme.accentText}`} />
                        <span>Call</span>
                      </div>
                    )}
                    {profile.phone && (
                      <div className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 ${theme.accent}`}>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Save Contact</span>
                      </div>
                    )}
                  </div>
                )}

                {profile.privacy.booking && profile.booking?.enabled && (
                  <div className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${theme.accent}`}>
                    <Calendar className="w-4 h-4" />
                    <span>{profile.booking.title || "Book a Meeting"}</span>
                  </div>
                )}

                {/* Links Preview */}
                {profile.privacy.links && profile.links.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-700/30">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.subtext}`}>Links ({profile.links.length})</p>
                    {profile.links.map((item) => (
                      <div key={item.id} className={`flex items-center justify-between p-2.5 rounded-xl border ${theme.pill}`}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-7 h-7 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 uppercase ${theme.badgeIcon}`}>
                            {item.badge || item.type.slice(0, 2)}
                          </span>
                          <span className="text-xs font-semibold truncate">{item.label}</span>
                        </div>
                        <ExternalLink className={`w-3.5 h-3.5 shrink-0 ${theme.subtext}`} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Locations Preview */}
                {profile.privacy.locations && profile.locations.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-700/30">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.subtext}`}>Locations ({profile.locations.length})</p>
                    {profile.locations.map((loc) => (
                      <div key={loc.id} className={`p-2.5 rounded-xl border flex items-center gap-2 ${theme.pill}`}>
                        <MapPin className={`w-4 h-4 shrink-0 ${theme.accentText}`} />
                        <span className="text-xs font-semibold truncate">{loc.address}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Payments Preview */}
                {profile.privacy.payments && profile.payments.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-700/30">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.subtext}`}>Payments ({profile.payments.length})</p>
                    {profile.payments.map((pay) => (
                      <div key={pay.id} className={`p-2.5 rounded-xl border flex items-center justify-between ${theme.pill}`}>
                        <span className="text-xs font-bold">{pay.bankName}</span>
                        <span className="text-xs font-mono opacity-80">{pay.accountNumber}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Action inside Floating Preview */}
              <div className={`p-3 border-t shrink-0 ${theme.card}`}>
                <button
                  type="button"
                  onClick={() => {
                    resetMobileViewportZoom();
                    setShowFloatingPreview(false);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${theme.accent}`}
                >
                  Back to Editing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PASSWORD-VERIFIED RESET SETTINGS & LAYOUT MODAL */}
        {showResetModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111827] border border-rose-500/40 text-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-bold text-base">Reset Profile & Layout?</h3>
                </div>
                <button onClick={() => setShowResetModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure? This will clear all your profile details, photos, videos, links, locations, and payment accounts back to clean startup defaults. Please type your owner password to proceed:
              </p>

              <form onSubmit={handleConfirmResetProfile} className="space-y-3">
                <input
                  type="password"
                  required
                  autoFocus
                  value={resetPassInput}
                  onChange={(e) => setResetPassInput(e.target.value)}
                  placeholder="Enter your owner password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white text-center"
                />
                {resetError && <p className="text-xs text-rose-400 text-center">{resetError}</p>}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                  >
                    Confirm Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DIRECT EDIT BROKEN LINK MODAL */}
        {editingLinkItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">Edit {editingLinkItem.label} URL</h3>
                <button onClick={() => setEditingLinkItem(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={saveLinkItem} className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Profile / Page URL</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={inputField1}
                    onChange={(e) => setInputField1(e.target.value)}
                    placeholder="https://instagram.com/yourusername"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditingLinkItem(null)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold cursor-pointer">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer">Update Link</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* LOCATION & FLEXIBLE BUSINESS HOURS MODAL */}
        {showLocModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">Add Location / Store</h3>
                <button onClick={() => setShowLocModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={saveLocationItem} className="space-y-3.5">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Exact Pinned Address / Store Name</label>
                  <input
                    type="text"
                    required
                    value={locAddress}
                    onChange={(e) => setLocAddress(e.target.value)}
                    placeholder="e.g. Balai Seafood Restaurant, Station 2, Boracay"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Landmark Notes (Optional)</label>
                  <input
                    type="text"
                    value={locLandmark}
                    onChange={(e) => setLocLandmark(e.target.value)}
                    placeholder="e.g. Beside main entrance, second floor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Google Maps / Waze Link (Optional)</label>
                  <input
                    type="text"
                    value={locMapUrl}
                    onChange={(e) => setLocMapUrl(e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
                      <Clock className="w-4 h-4" /> Live Open/Closed Indicator (PH Time)
                    </span>
                    <input
                      type="checkbox"
                      checked={locHoursEnabled}
                      onChange={(e) => setLocHoursEnabled(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 cursor-pointer"
                    />
                  </div>
                  {locHoursEnabled && (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1.5">Check Open Days</label>
                        <div className="grid grid-cols-7 gap-1">
                          {DAYS_OF_WEEK.map((d) => {
                            const checked = locActiveDays.includes(d.id);
                            return (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => toggleLocDay(d.id)}
                                className={`py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                  checked ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {d.short}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 bg-[#090d16] p-1 rounded-xl border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setLocScheduleMode("uniform")}
                          className={`py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer ${
                            locScheduleMode === "uniform" ? "bg-indigo-600 text-white" : "text-slate-400"
                          }`}
                        >
                          Same Hours Daily
                        </button>
                        <button
                          type="button"
                          onClick={() => setLocScheduleMode("custom")}
                          className={`py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer ${
                            locScheduleMode === "custom" ? "bg-indigo-600 text-white" : "text-slate-400"
                          }`}
                        >
                          Custom per Day
                        </button>
                      </div>

                      {locScheduleMode === "uniform" ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Opening Time</label>
                            <select
                              value={locOpenTime}
                              onChange={(e) => setLocOpenTime(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                            >
                              {TIME_OPTIONS_30M.map((t) => (
                                <option key={t} value={t}>{formatTime12(t)}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Closing Time</label>
                            <select
                              value={locCloseTime}
                              onChange={(e) => setLocCloseTime(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                            >
                              {TIME_OPTIONS_30M.map((t) => (
                                <option key={t} value={t}>{formatTime12(t)}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {DAYS_OF_WEEK.filter((d) => locActiveDays.includes(d.id)).map((d) => (
                            <div key={d.id} className="flex items-center justify-between gap-2 bg-[#090d16] p-2 rounded-lg border border-slate-800">
                              <span className="text-[11px] font-bold w-10">{d.short}</span>
                              <select
                                value={locPerDay[d.id]?.open || "09:00"}
                                onChange={(e) =>
                                  setLocPerDay({
                                    ...locPerDay,
                                    [d.id]: { ...locPerDay[d.id], open: e.target.value }
                                  })
                                }
                                className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-base sm:text-[11px] text-white"
                              >
                                {TIME_OPTIONS_30M.map((t) => (
                                  <option key={t} value={t}>{formatTime12(t)}</option>
                                ))}
                              </select>
                              <span className="text-[10px] text-slate-500">to</span>
                              <select
                                value={locPerDay[d.id]?.close || "18:00"}
                                onChange={(e) =>
                                  setLocPerDay({
                                    ...locPerDay,
                                    [d.id]: { ...locPerDay[d.id], close: e.target.value }
                                  })
                                }
                                className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-base sm:text-[11px] text-white"
                              >
                                {TIME_OPTIONS_30M.map((t) => (
                                  <option key={t} value={t}>{formatTime12(t)}</option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowLocModal(false)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold cursor-pointer">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer">Save Location</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PLATFORM ADD MODAL (SUPPORTS CUSTOM "OTHERS" FOR SOCIAL & GAMING) */}
        {activeModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base capitalize">
                  {selectedSubPlatform ? `Add ${selectedSubPlatform.name}` : `Select ${activeModal} Platform`}
                </h3>
                <button onClick={() => { setActiveModal(null); setSelectedSubPlatform(null); setPendingAudioFile(null); setInputField1(""); setInputField2(""); setInputField3(""); }} className="p-1 text-slate-400 hover:text-white cursor-pointer">
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
                      onClick={() => {
                        setInputField1("");
                        setInputField2("");
                        setInputField3("");
                        setSelectedSubPlatform(item);
                      }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-left transition cursor-pointer"
                    >
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {item.badge || "•"}
                      </span>
                      <span className="text-xs font-semibold truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              ) : activeModal === "music" ? (
                <form onSubmit={saveMusicItem} className="space-y-3.5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Song Title (e.g. Dilaw - Maki)</label>
                    <input
                      type="text"
                      required
                      value={inputField1}
                      onChange={(e) => setInputField1(e.target.value)}
                      placeholder="e.g. Dilaw - Maki"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Upload Audio File (MP3 / WAV)</label>
                    <input
                      ref={audioInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setPendingAudioFile(file);
                      }}
                      className="hidden"
                    />
                    {pendingAudioFile ? (
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-emerald-400 flex items-center justify-between">
                        <span className="truncate pr-2">{pendingAudioFile.name}</span>
                        <button type="button" onClick={() => setPendingAudioFile(null)} className="text-rose-400 shrink-0 cursor-pointer">Change</button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => audioInputRef.current?.click()}
                        className="w-full py-3 border border-dashed border-slate-600 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Music className="w-4 h-4 text-emerald-400" /> Choose Audio File from Device
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => { setActiveModal(null); setSelectedSubPlatform(null); }} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold cursor-pointer">Cancel</button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer">Save Music Track</button>
                  </div>
                </form>
              ) : activeModal === "gaming" ? (
                <form onSubmit={saveGamingItem} className="space-y-3.5">
                  {selectedSubPlatform.fields.map((fieldName, idx) => (
                    <div key={idx}>
                      <label className="block text-xs text-slate-400 mb-1">{fieldName}</label>
                      <input
                        type="text"
                        required
                        value={idx === 0 ? inputField1 : idx === 1 ? inputField2 : inputField3}
                        onChange={(e) => {
                          if (idx === 0) setInputField1(e.target.value);
                          else if (idx === 1) setInputField2(e.target.value);
                          else setInputField3(e.target.value);
                        }}
                        placeholder={`Enter ${fieldName}`}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                      />
                    </div>
                  ))}
                  {selectedSubPlatform.id === "others" && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Server / Rank / Extra Info (Optional)</label>
                      <input
                        type="text"
                        value={inputField3}
                        onChange={(e) => setInputField3(e.target.value)}
                        placeholder="e.g. Asia Server / Mythic"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                      />
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setSelectedSubPlatform(null)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold cursor-pointer">Back</button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer">Save Gaming ID</button>
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white font-mono"
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
                        <button type="button" onClick={() => setPayQrImage("")} className="text-xs text-rose-400 cursor-pointer">Remove</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => qrInputRef.current?.click()} className="w-full py-2.5 border border-dashed border-slate-600 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-2 cursor-pointer">
                        <QrCode className="w-4 h-4 text-indigo-400" /> Upload QR Image
                      </button>
                    )}
                  </div>

                  {modalError && <p className="text-xs text-rose-400">{modalError}</p>}

                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setSelectedSubPlatform(null)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold cursor-pointer">Back</button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer">Save Payment</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={saveLinkItem} className="space-y-3.5">
                  {selectedSubPlatform.id === "others" && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Custom Platform Name *</label>
                      <input
                        type="text"
                        required
                        value={inputField2}
                        onChange={(e) => setInputField2(e.target.value)}
                        placeholder="e.g. Threads, Discord, WhatsApp"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Destination URL / Link *</label>
                    <input
                      type="text"
                      required
                      value={inputField1}
                      onChange={(e) => setInputField1(e.target.value)}
                      placeholder={selectedSubPlatform.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-sm text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setSelectedSubPlatform(null)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold cursor-pointer">Back</button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer">Save Link</button>
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
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://smarttapapp.vercel.app/";
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(shareUrl)}`;
  const totalInboxCount = messages.length + exchangedContacts.length + paymentReceipts.length + bookingsList.length;
  const calData = buildCalendarMonth(calMonthOffset);
  const availableTimeSlots = getAvailableBookingTimes();

  return (
    <div style={surfaceInlineStyle} className={`min-h-screen ${theme.bg} ${theme.text} ${largeTextMode ? "text-base" : "text-sm"} transition-colors duration-200 flex flex-col justify-between py-6 px-4 pb-32`}>
      {superAdminModalUI}
      <audio ref={audioRef} loop onEnded={() => setActiveAudioId(null)} />

      <div className="max-w-md w-full mx-auto space-y-5">
        {isOffline && (
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-center gap-2 font-medium">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>Offline Mode Active — Instant Cached Profile Loaded</span>
          </div>
        )}

        {themeToast && (
          <div className={`px-3.5 py-1.5 rounded-full text-center text-xs font-semibold mx-auto w-fit border shadow-md ${theme.accentSoft}`}>
            {themeToast}
          </div>
        )}

        {/* TOP BAR WITH BREATHING ROOM ON MOBILE */}
        <div className="flex items-center justify-between gap-2">
          <BrandLogo size="sm" accentTextClass={theme.accentText} onSecretTap={handleSecretLogoTap} />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setLargeTextMode(!largeTextMode)}
              className={`px-2 py-1 rounded-full border text-[11px] font-extrabold transition cursor-pointer active:scale-95 ${
                largeTextMode ? theme.accent : theme.pill
              }`}
              title="Toggle Large Text & High Contrast"
            >
              Aa
            </button>
            <button
              type="button"
              onClick={() => {
                const keys = Object.keys(THEMES);
                const nextIdx = (keys.indexOf(profile.theme) + 1) % keys.length;
                const nextTheme = THEMES[keys[nextIdx]];
                setProfile({ ...profile, theme: nextTheme.id });
                setThemeToast(`Theme: ${nextTheme.name}`);
                setTimeout(() => setThemeToast(""), 1800);
              }}
              className={`p-1.5 rounded-full border transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Switch Theme"
            >
              <Palette className={`w-3.5 h-3.5 ${theme.accentText}`} />
            </button>
            <button
              type="button"
              onClick={() => setShowShareQrModal(true)}
              className={`p-1.5 rounded-full border transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Share Profile"
            >
              <Share2 className={`w-3.5 h-3.5 ${theme.accentText}`} />
            </button>
            <button
              type="button"
              onClick={() => setShowSearchModal(true)}
              className={`p-1.5 rounded-full border transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Search Profile"
            >
              <Search className={`w-3.5 h-3.5 ${theme.accentText}`} />
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
              className={`relative p-1.5 rounded-full border transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Owner Analytics & Inbox"
            >
              <BarChart3 className={`w-3.5 h-3.5 ${theme.accentText}`} />
              {totalInboxCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center ${theme.badgeIcon}`}>
                  {totalInboxCount > 9 ? "9+" : totalInboxCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setAuthIdentifier("");
                setAuthPassword("");
                setAuthError("");
                navigateWithZoomReset("login_to_edit");
              }}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] font-medium transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Owner Edit Profile"
            >
              <Pencil className={`w-3 h-3 ${theme.accentText}`} />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* MAIN PROFILE CARD */}
        <div className={`rounded-3xl border p-6 space-y-6 shadow-xl ${theme.card}`}>
          <div className="text-center space-y-3">
            {profile.avatar && (
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-2 border-current/30 shadow-md bg-slate-800 flex items-center justify-center">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <div className="inline-flex items-center justify-center gap-1.5">
                <h1 className={`${largeTextMode ? "text-2xl" : "text-xl"} font-extrabold tracking-tight`}>
                  {profile.name || "SmartTap User"}
                </h1>
                {profile.verifiedBadge?.enabled && (
                  <ShieldCheck className={`w-5 h-5 shrink-0 ${profile.verifiedBadge.color || "text-blue-500"}`} title="Verified Profile" />
                )}
              </div>
              {profile.bio && (
                <p className={`${largeTextMode ? "text-sm" : "text-xs"} mt-1 leading-relaxed ${theme.subtext}`}>
                  {profile.bio}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(shareUrl, "profile_url")}
                className={`px-3.5 py-2 rounded-full border ${largeTextMode ? "text-sm" : "text-xs"} font-semibold inline-flex items-center gap-1.5 transition cursor-pointer active:scale-95 ${theme.pill}`}
              >
                {copiedId === "profile_url" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className={`w-3.5 h-3.5 ${theme.accentText}`} />}
                <span>{copiedId === "profile_url" ? "Link Copied!" : "Copy Link"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setExchangeSuccess(false);
                  setExchangeForm({ name: "", phone: "", email: "", social: "" });
                  setShowExchangeModal(true);
                }}
                className={`px-3.5 py-2 rounded-full border ${largeTextMode ? "text-sm" : "text-xs"} font-semibold inline-flex items-center gap-1.5 transition cursor-pointer active:scale-95 ${theme.accentSoft}`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Share My Contact Back</span>
              </button>
            </div>
          </div>

          {/* SMART GALLERY LAYOUT (1: Natural Aspect, 2: Equal Pair, 3: 2 Top + 1 Centered Bottom, 4: 2x2 Grid) & FEATURED VIDEO */}
          {profile.privacy.media && (
            <>
              {profile.photos.length === 1 && (
                <div className="rounded-2xl overflow-hidden border border-slate-700/40 bg-black/30 flex items-center justify-center">
                  <img
                    src={profile.photos[0]}
                    alt="Featured 1"
                    className="w-full max-h-80 object-contain"
                  />
                </div>
              )}

              {profile.photos.length === 2 && (
                <div className="grid grid-cols-2 gap-2">
                  {profile.photos.map((photo, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden border border-slate-700/40 aspect-square bg-black/30">
                      <img src={photo} alt={`Featured ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {profile.photos.length === 3 && (
                <div className="grid grid-cols-2 gap-2">
                  {profile.photos.slice(0, 2).map((photo, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden border border-slate-700/40 aspect-square bg-black/30">
                      <img src={photo} alt={`Featured ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="col-span-2 flex justify-center">
                    <div className="w-1/2 rounded-2xl overflow-hidden border border-slate-700/40 aspect-square bg-black/30">
                      <img src={profile.photos[2]} alt="Featured 3" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              )}

              {profile.photos.length >= 4 && (
                <div className="grid grid-cols-2 gap-2">
                  {profile.photos.map((photo, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden border border-slate-700/40 aspect-square bg-black/30">
                      <img src={photo} alt={`Featured ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {videoObjectUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-700/60 bg-black relative shadow-inner">
                  <video
                    key={videoObjectUrl}
                    src={videoObjectUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full aspect-video object-cover bg-black"
                  />
                </div>
              )}
            </>
          )}

          {/* Main Contact Actions */}
          <div ref={mainActionsRef} className="space-y-2.5">
            {profile.privacy.contact && (profile.phone || profile.email) && (
              <div className="space-y-2.5">
                {profile.phone && (
                  <div className="grid grid-cols-2 gap-2.5">
                    <a href={`tel:${profile.phone}`} className={`py-3 px-3 rounded-xl border ${largeTextMode ? "text-sm" : "text-xs"} font-semibold flex items-center justify-center gap-2 transition active:scale-95 ${theme.pill}`}>
                      <Phone className={`w-4 h-4 ${theme.accentText}`} />
                      <span>Call</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleSaveContactVCard(undefined, undefined, undefined, undefined, true)}
                      className={`py-3 px-3 rounded-xl ${largeTextMode ? "text-sm" : "text-xs"} font-semibold flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 ${theme.accent}`}
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Save Contact</span>
                    </button>
                  </div>
                )}
                {profile.email && (
                  <div className="grid grid-cols-2 gap-2.5">
                    <a href={getGmailComposeUrl(profile.email)} target="_blank" rel="noopener noreferrer" className={`py-3 px-3 rounded-xl border ${largeTextMode ? "text-sm" : "text-xs"} font-semibold flex items-center justify-center gap-2 transition active:scale-95 ${theme.pill}`}>
                      <Mail className={`w-4 h-4 ${theme.accentText}`} />
                      <span>Email</span>
                    </a>
                    <button type="button" onClick={() => copyToClipboard(profile.email, "email_copy")} className={`py-3 px-3 rounded-xl border ${largeTextMode ? "text-sm" : "text-xs"} font-semibold flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 ${theme.pill}`}>
                      {copiedId === "email_copy" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className={`w-4 h-4 ${theme.accentText}`} />}
                      <span>{copiedId === "email_copy" ? "Copied" : "Copy Email"}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ONE-TAP CALENDAR BOOKING CTA */}
            {profile.privacy.booking && profile.booking?.enabled && (
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(false);
                  setShowCalendarPicker(false);
                  setCalMonthOffset(0);
                  setBookingForm({
                    clientName: "",
                    clientPhone: "",
                    selectedDateISO: "",
                    selectedDateLabel: "",
                    durationMins: 30,
                    timeChoice: availableTimeSlots[0] || "09:00",
                    notes: ""
                  });
                  setShowBookingModal(true);
                }}
                className={`w-full py-3.5 px-4 rounded-xl ${largeTextMode ? "text-sm" : "text-xs"} font-bold flex items-center justify-center gap-2 shadow-md transition cursor-pointer active:scale-95 ${theme.accent}`}
              >
                <Calendar className="w-4 h-4" />
                <span>{profile.booking.title || "Book a Meeting / Appointment"}</span>
              </button>
            )}
          </div>

          {/* LOCATIONS + LIVE PH STATUS */}
          {profile.privacy.locations && profile.locations && profile.locations.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-700/30">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${theme.subtext}`}>
                Locations & Navigation
              </p>
              <div className="space-y-2.5">
                {profile.locations.map((loc) => {
                  const status = evaluatePhBusinessStatus(loc.schedule);
                  const fullPinText = loc.landmark ? `${loc.address} (Landmark: ${loc.landmark})` : loc.address;

                  return (
                    <div key={loc.id} className={`p-3.5 rounded-2xl border space-y-2.5 ${theme.pill}`}>
                      {status && (
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/20 text-[11px] font-semibold">
                          <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-emerald-400 animate-ping" : "bg-rose-500"}`} />
                          <span className={status.isOpen ? "text-emerald-400" : "text-rose-400"}>{status.label}</span>
                        </div>
                      )}

                      <div className="flex items-start gap-2.5">
                        <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${theme.accentText}`} />
                        <div className="min-w-0 flex-1">
                          <p className={`${largeTextMode ? "text-sm" : "text-xs"} font-bold`}>{loc.address}</p>
                          {loc.landmark && (
                            <p className={`text-[11px] mt-0.5 ${theme.subtext}`}>Landmark: {loc.landmark}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={loc.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 ${theme.actionBtn}`}
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Open Maps</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(fullPinText, `loc_${loc.id}`)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95 ${theme.actionBtn}`}
                        >
                          {copiedId === `loc_${loc.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === `loc_${loc.id}` ? "Copied" : "Copy Address"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LINKS & CATEGORIES */}
          {profile.privacy.links && profile.links.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-slate-700/30">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${theme.subtext}`}>
                Links & Categories
              </p>

              {profile.links.filter(l => l.type === "music").map(musicItem => {
                const isThisPlaying = activeAudioId === musicItem.id;
                const hasAudioSrc = Boolean(audioObjectUrls[musicItem.id]);

                return (
                  <div key={musicItem.id} className={`p-3.5 rounded-2xl border space-y-3 ${theme.pill}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${theme.badgeIcon} ${isThisPlaying ? "animate-spin" : ""}`}>
                          <Music className="w-5 h-5" />
                        </div>
                        <div className="truncate flex-1">
                          <p className={`${largeTextMode ? "text-sm" : "text-xs"} font-extrabold truncate`}>{musicItem.label}</p>
                          <p className={`text-[10px] truncate ${theme.subtext}`}>
                            {hasAudioSrc ? (isThisPlaying ? "Now Playing..." : "Ready to Play") : "Audio File"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => togglePlayAudio(musicItem.id)}
                        className={`p-2.5 rounded-xl transition shadow shrink-0 ml-2 cursor-pointer active:scale-95 ${theme.accent}`}
                      >
                        {isThisPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-slate-700/20">
                      <button type="button" onClick={() => setMusicVolume(musicVolume > 0 ? 0 : 0.85)} className={`cursor-pointer ${theme.subtext}`}>
                        {musicVolume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className={`w-4 h-4 ${theme.accentText}`} />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={musicVolume}
                        onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-600/40 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className={`text-[10px] font-mono w-8 text-right ${theme.subtext}`}>{Math.round(musicVolume * 100)}%</span>
                    </div>
                  </div>
                );
              })}

              {["social", "gaming", "business"].map((catKey) => {
                const catLinks = profile.links.filter(l => l.type === catKey);
                if (catLinks.length === 0) return null;

                return (
                  <div key={catKey} className="space-y-2 pt-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme.accentText}`}>{catKey}</p>
                    <div className="space-y-2">
                      {catLinks.map((item) => (
                        <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme.pill}`}>
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <span className={`w-8 h-8 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 uppercase shadow ${theme.badgeIcon}`}>
                              {item.badge || item.type.slice(0, 2)}
                            </span>
                            <div className="truncate flex-1">
                              <span className={`${largeTextMode ? "text-base" : "text-sm"} font-semibold truncate block`}>{item.label}</span>
                              {item.type === "gaming" ? (
                                <span className={`text-xs truncate block font-mono ${theme.subtext}`}>
                                  {item.gameDetails?.field1} {item.gameDetails?.field2 ? `• ${item.gameDetails.field2}` : ""}
                                </span>
                              ) : (
                                <span className={`text-xs truncate block ${theme.subtext}`}>{item.url}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 ml-2 shrink-0">
                            {item.type === "gaming" ? (
                              <button
                                type="button"
                                onClick={() => copyToClipboard(`${item.gameDetails?.field1} ${item.gameDetails?.field2 ? `(${item.gameDetails.field2})` : ""}`, item.id)}
                                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 transition cursor-pointer active:scale-95 ${theme.accent}`}
                              >
                                {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedId === item.id ? "Copied" : "Copy ID"}</span>
                              </button>
                            ) : (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => openWithNativeDeepLink(e, item.platformId, item.url)}
                                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 transition active:scale-95 ${theme.actionBtn}`}
                              >
                                <span>Open App</span>
                                <ExternalLink className="w-3.5 h-3.5" />
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

          {/* PAYMENTS & TRANSFERS */}
          {profile.privacy.payments && profile.payments.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-700/30">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${theme.subtext}`}>
                Payment & Transfers
              </p>
              <div className="space-y-3">
                {profile.payments.map((pay) => {
                  const fullCopyText = `${pay.bankName} - ${pay.accountName} - ${pay.accountNumber}`;
                  return (
                    <div key={pay.id} className={`p-3.5 rounded-2xl border space-y-2.5 ${theme.pill}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 shadow ${theme.badgeIcon}`}>
                            ₱
                          </span>
                          <div className="truncate">
                            <p className={`${largeTextMode ? "text-sm" : "text-xs"} font-bold truncate`}>{pay.bankName}</p>
                            <p className={`text-[11px] truncate ${theme.subtext}`}>{pay.accountName}</p>
                          </div>
                        </div>
                        {pay.qrImage && (
                          <button
                            type="button"
                            onClick={() => setActiveQrModal(pay)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition cursor-pointer shrink-0 ${theme.accentSoft} border`}
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>View QR</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between bg-black/10 rounded-xl px-3 py-2">
                        <span className={`font-mono ${largeTextMode ? "text-base" : "text-sm"} font-semibold tracking-wide`}>{pay.accountNumber}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(pay.accountNumber, pay.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition cursor-pointer active:scale-95 ${theme.accent}`}
                          >
                            {copiedId === pay.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === pay.id ? "Copied" : "Copy"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(fullCopyText, `all_${pay.id}`)}
                            className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer active:scale-95 ${theme.actionBtn}`}
                            title="Copy Bank + Name + Number"
                          >
                            {copiedId === `all_${pay.id}` ? "Copied All!" : "Copy All"}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            copyToClipboard(pay.accountNumber, pay.id);
                            openBankMobileApp(pay.providerId);
                          }}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95 ${theme.actionBtn}`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Open {pay.bankName}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setReceiptModalPay(pay);
                            setReceiptSenderName("");
                            setReceiptRefNo("");
                            setReceiptImage("");
                            setReceiptSuccess(false);
                          }}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95 ${theme.accentSoft} border`}
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Send Receipt</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LEAVE A MESSAGE FORM */}
          <div className={`p-4 rounded-2xl border space-y-3 ${theme.pill}`}>
            <p className={`${largeTextMode ? "text-sm" : "text-xs"} font-bold`}>Leave a Message</p>
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
                  className={`w-full px-3 py-2.5 rounded-xl border text-base sm:text-xs ${theme.input}`}
                />
                <input
                  type="text"
                  value={contactForm.contact}
                  onChange={(e) => setContactForm({ ...contactForm, contact: e.target.value })}
                  placeholder="Your Email or Phone (Optional)"
                  className={`w-full px-3 py-2.5 rounded-xl border text-base sm:text-xs ${theme.input}`}
                />
                <textarea
                  rows={2}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Type your message here..."
                  className={`w-full px-3 py-2.5 rounded-xl border text-base sm:text-xs ${theme.input}`}
                />
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95 ${theme.accent}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FLOATING BOTTOM BAR NAVIGATION */}
      <div
        className={`fixed bottom-4 inset-x-4 z-40 max-w-md mx-auto transition-all duration-500 ease-out ${
          showFloatingBar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`backdrop-blur-md border shadow-2xl flex items-center justify-between gap-2 transition-all duration-300 ease-in-out ${theme.floatingBar} ${
            isFloatingMinimized
              ? "w-14 h-14 rounded-full ml-auto p-0 justify-center"
              : "w-full rounded-2xl p-2.5"
          }`}
        >
          {isFloatingMinimized ? (
            <button
              type="button"
              onClick={() => setIsFloatingMinimized(false)}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105 cursor-pointer ${theme.accent}`}
              title="Expand Quick Actions"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : (
            <>
              <a
                href={profile.phone ? `tel:${profile.phone}` : "#"}
                className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-semibold flex flex-col items-center justify-center gap-0.5 transition active:scale-95 ${theme.actionBtn}`}
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
              <button
                type="button"
                onClick={() => handleSaveContactVCard(undefined, undefined, undefined, undefined, true)}
                className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-semibold flex flex-col items-center justify-center gap-0.5 transition shadow cursor-pointer active:scale-95 ${theme.accent}`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const paymentsList = profile.payments || [];
                  if (paymentsList.length === 0) {
                    alert("No payment methods added yet.");
                  } else if (paymentsList.length === 1) {
                    if (paymentsList[0].qrImage) setActiveQrModal(paymentsList[0]);
                    else copyToClipboard(paymentsList[0].accountNumber, paymentsList[0].id);
                  } else {
                    setShowPaySelectionModal(true);
                  }
                }}
                className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-semibold flex flex-col items-center justify-center gap-0.5 transition cursor-pointer active:scale-95 ${theme.actionBtn}`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay QR</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFloatingMinimized(true)}
                className={`p-2.5 rounded-xl transition cursor-pointer active:scale-95 ${theme.actionBtn}`}
                title="Slide Right to Hide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* POST-SAVE CONTACT PROMPT MODAL */}
      {showPostSavePrompt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-base">Contact Card Downloaded!</h4>
              <p className="text-xs text-slate-400">
                Want to share your contact info back to {profile.name || "the owner"} so they have your number too?
              </p>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowPostSavePrompt(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold cursor-pointer"
              >
                Maybe Later
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPostSavePrompt(false);
                  setExchangeSuccess(false);
                  setShowExchangeModal(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold cursor-pointer"
              >
                Share My Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT RECEIPT UPLOAD MODAL */}
      {receiptModalPay && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold">Send {receiptModalPay.bankName} Receipt</span>
              </div>
              <button onClick={() => setReceiptModalPay(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {receiptSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">Payment Receipt Sent!</h4>
                <p className="text-xs text-slate-400">
                  Your screenshot has been delivered directly to {profile.name || "the owner"}'s Receipts Inbox.
                </p>
                <button
                  type="button"
                  onClick={() => setReceiptModalPay(null)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleReceiptSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={receiptSenderName}
                  onChange={(e) => setReceiptSenderName(e.target.value)}
                  placeholder="Your Name / Sender Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />
                <input
                  type="text"
                  value={receiptRefNo}
                  onChange={(e) => setReceiptRefNo(e.target.value)}
                  placeholder="Reference No. / Amount (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />

                <div>
                  <input
                    ref={receiptInputRef}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) setReceiptImage(await compressImage(f, 700, 0.8));
                    }}
                    className="hidden"
                  />
                  {receiptImage ? (
                    <div className="space-y-2">
                      <img src={receiptImage} alt="Receipt Preview" className="w-full max-h-44 object-contain rounded-xl bg-black border border-slate-700" />
                      <button type="button" onClick={() => setReceiptImage("")} className="text-xs text-rose-400 hover:underline cursor-pointer">
                        Remove Screenshot
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => receiptInputRef.current?.click()}
                      className="w-full py-6 border-2 border-dashed border-slate-700 rounded-xl text-xs text-slate-300 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-indigo-500"
                    >
                      <ImageIcon className="w-6 h-6 text-indigo-400" />
                      <span>Tap to Upload Receipt Screenshot *</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!receiptImage}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Payment Receipt</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ONE-TAP CALENDAR BOOKING MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold">{profile.booking?.title || "Book Appointment"}</span>
              </div>
              <button onClick={() => setShowBookingModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-5 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">Booking Confirmed & Added to Calendar!</h4>
                <p className="text-xs text-slate-400">
                  An <code>.ics</code> calendar invite with reminder alarm has been downloaded to your phone and sent to {profile.name || "the owner"}.
                </p>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <p className="text-xs text-slate-400">
                  With <strong className="text-white">{profile.name || "SmartTap Owner"}</strong>
                  {profile.booking?.location ? ` • ${profile.booking.location}` : ""}
                </p>

                <input
                  type="text"
                  required
                  value={bookingForm.clientName}
                  onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                  placeholder="Your Full Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />
                <input
                  type="tel"
                  required
                  value={bookingForm.clientPhone}
                  onChange={(e) => setBookingForm({ ...bookingForm, clientPhone: e.target.value })}
                  placeholder="Your Mobile Number *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Select Date *</label>
                  <button
                    type="button"
                    onClick={() => setShowCalendarPicker(!showCalendarPicker)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-left flex items-center justify-between hover:border-indigo-500 transition cursor-pointer"
                  >
                    <span className={bookingForm.selectedDateLabel ? "text-white font-semibold" : "text-slate-400"}>
                      {bookingForm.selectedDateLabel || "Tap to open calendar & pick available date"}
                    </span>
                    <Calendar className="w-4 h-4 text-indigo-400" />
                  </button>

                  {showCalendarPicker && (
                    <div className="mt-2 p-3 rounded-2xl bg-[#090d16] border border-slate-700 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          disabled={calMonthOffset === 0}
                          onClick={() => setCalMonthOffset(Math.max(0, calMonthOffset - 1))}
                          className="p-1 rounded-lg bg-slate-800 disabled:opacity-30 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold">{calData.monthLabel}</span>
                        <button
                          type="button"
                          onClick={() => setCalMonthOffset(calMonthOffset + 1)}
                          className="p-1 rounded-lg bg-slate-800 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500 font-bold">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((w) => (
                          <span key={w}>{w}</span>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calData.cells.map((cell, i) => {
                          if (!cell) return <span key={i} />;
                          const isSelected = bookingForm.selectedDateISO === cell.iso;
                          return (
                            <button
                              key={i}
                              type="button"
                              disabled={!cell.isAvailable}
                              onClick={() => {
                                setBookingForm({
                                  ...bookingForm,
                                  selectedDateISO: cell.iso,
                                  selectedDateLabel: cell.label
                                });
                                setShowCalendarPicker(false);
                              }}
                              className={`py-1.5 rounded-lg text-[11px] font-semibold transition ${
                                isSelected
                                  ? "bg-indigo-600 text-white font-bold"
                                  : cell.isAvailable
                                  ? "bg-slate-800/90 hover:bg-indigo-600/40 text-white cursor-pointer"
                                  : "text-slate-600 opacity-40 cursor-not-allowed"
                              }`}
                            >
                              {cell.dayNum}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-slate-400 text-center">
                        Highlighted dates are open for booking.
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Session Duration</label>
                    <select
                      value={bookingForm.durationMins}
                      onChange={(e) => setBookingForm({ ...bookingForm, durationMins: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                    >
                      {DURATION_OPTIONS.map((d) => (
                        <option key={d.mins} value={d.mins}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Select Time</label>
                    <select
                      value={bookingForm.timeChoice}
                      onChange={(e) => setBookingForm({ ...bookingForm, timeChoice: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                    >
                      {availableTimeSlots.map((t) => (
                        <option key={t} value={t}>{formatTime12(t)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <input
                  type="text"
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  placeholder="Agenda / Other Details (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />

                <button
                  type="submit"
                  disabled={!bookingForm.selectedDateISO}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Confirm & Add to Phone Calendar</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* TWO-WAY CONTACT EXCHANGE MODAL */}
      {showExchangeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold">Share My Contact Back</span>
              </div>
              <button onClick={() => setShowExchangeModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {exchangeSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">Contact Shared!</h4>
                <p className="text-xs text-slate-400">
                  Your contact details have been saved to {profile.name || "the owner"}'s Contacts Inbox.
                </p>
                <button
                  type="button"
                  onClick={() => setShowExchangeModal(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleExchangeContactSubmit} className="space-y-3">
                <p className="text-xs text-slate-400">
                  Send your number or social handle back to {profile.name || "the owner"} in one tap.
                </p>
                <input
                  type="text"
                  required
                  value={exchangeForm.name}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, name: e.target.value })}
                  placeholder="Your Full Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />
                <input
                  type="tel"
                  required
                  value={exchangeForm.phone}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, phone: e.target.value })}
                  placeholder="Your Mobile Number *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />
                <input
                  type="email"
                  value={exchangeForm.email}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, email: e.target.value })}
                  placeholder="Your Email (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />
                <input
                  type="text"
                  value={exchangeForm.social}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, social: e.target.value })}
                  placeholder="IG / FB / Company Note (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Contact Info</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MULTIPLE PAYMENT METHOD SELECTION MODAL */}
      {showPaySelectionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Select Payment Method</span>
              <button onClick={() => setShowPaySelectionModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {profile.payments.map((pay) => (
                <button
                  key={pay.id}
                  type="button"
                  onClick={() => {
                    setShowPaySelectionModal(false);
                    if (pay.qrImage) {
                      setActiveQrModal(pay);
                    } else {
                      copyToClipboard(pay.accountNumber, pay.id);
                      alert(`Copied ${pay.bankName} Account Number: ${pay.accountNumber}`);
                    }
                  }}
                  className="w-full p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-left flex items-center justify-between transition cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{pay.bankName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{pay.accountNumber}</p>
                  </div>
                  <QrCode className="w-4 h-4 text-indigo-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CLEAN SINGLE-LINE FOOTER LINK */}
      <footer className="max-w-md w-full mx-auto text-center pt-8 pb-4 space-y-1.5 px-2">
        <div className="flex justify-center opacity-80">
          <BrandLogo size="sm" accentTextClass={theme.accentText} onSecretTap={handleSecretLogoTap} />
        </div>
        <p className={`text-xs ${theme.subtext}`}>Tap smarter. Share your world in one touch.</p>
        <p className={`text-[11px] leading-relaxed ${theme.subtext}`}>
          Want to get your own SmartTap card?{" "}
          <a
            href={TIKTOK_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme.accentText} hover:underline font-semibold inline-flex items-center gap-1 whitespace-nowrap`}
          >
            <span>Order here on our TikTok Shop</span>
            <span>→</span>
          </a>
        </p>
      </footer>

      {/* SHARE PROFILE MODAL */}
      {showShareQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Share SmartTap Profile</span>
              <button onClick={() => setShowShareQrModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-lg">
              <img src={qrImageSrc} alt="SmartTap Profile QR Code" className="w-48 h-48 object-contain" />
            </div>
            <p className="text-xs text-slate-400">Scan camera or tap Share Profile below to send via AirDrop, Messenger, or Viber.</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleNativeShare(shareUrl)}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-indigo-600/25"
              >
                <Share2 className="w-4 h-4" /> Share Profile (AirDrop / Messenger / Apps)
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(shareUrl, "qr_url")}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs inline-flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> {copiedId === "qr_url" ? "Profile Link Copied!" : "Copy Profile Link"}
              </button>
            </div>
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
                  className="bg-transparent text-base sm:text-xs text-white focus:outline-none w-full"
                />
              </div>
              <button onClick={() => setShowSearchModal(false)} className="ml-2 p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pt-1">
              {profile.links.filter(l => l.label.toLowerCase().includes(searchQuery.toLowerCase())).map(l => (
                <div key={l.id} className="p-2.5 rounded-xl bg-slate-800/80 text-xs flex justify-between items-center">
                  <span>{l.label}</span>
                  {l.type === "music" ? (
                    <button onClick={() => { setShowSearchModal(false); togglePlayAudio(l.id); }} className="text-emerald-400 font-semibold cursor-pointer">Play</button>
                  ) : (
                    <a href={l.url} target="_blank" rel="noopener noreferrer" onClick={(e) => openWithNativeDeepLink(e, l.platformId, l.url)} className="text-indigo-400 font-semibold">Open</a>
                  )}
                </div>
              ))}
              {profile.payments.filter(p => p.bankName.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                <div key={p.id} className="p-2.5 rounded-xl bg-slate-800/80 text-xs flex justify-between items-center">
                  <span>{p.bankName} ({p.accountNumber})</span>
                  <button onClick={() => copyToClipboard(p.accountNumber, p.id)} className="text-indigo-400 font-semibold cursor-pointer">Copy</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OWNER ANALYTICS & 4-TAB INBOX MODAL */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">Owner Dashboard</h3>
              </div>
              <button onClick={() => setShowAnalyticsModal(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
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
                  <p className="text-xs text-slate-400 mt-1">Enter your password to view analytics, receipts, bookings, and contacts.</p>
                </div>
                <div className="space-y-2">
                  <input
                    type="password"
                    autoFocus
                    value={analyticsPin}
                    onChange={(e) => setAnalyticsPin(e.target.value)}
                    placeholder="Enter owner password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-base sm:text-sm text-white text-center"
                  />
                  {analyticsPinError && <p className="text-xs text-rose-400">{analyticsPinError}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (account && analyticsPin === account.password) {
                      setAnalyticsUnlocked(true);
                      setAnalyticsPinError("");
                      resetMobileViewportZoom();
                    } else {
                      setAnalyticsPinError("Incorrect password. Access denied.");
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer"
                >
                  Unlock Owner Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400">1 Day</p>
                    <p className="text-lg font-extrabold text-indigo-400 mt-0.5">{analytics.taps1d}</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400">1 Week</p>
                    <p className="text-lg font-extrabold text-indigo-400 mt-0.5">{analytics.taps1w}</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400">1 Month</p>
                    <p className="text-lg font-extrabold text-indigo-400 mt-0.5">{analytics.taps1m}</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400">Total</p>
                    <p className="text-lg font-extrabold text-emerald-400 mt-0.5">{analytics.tapsTotal}</p>
                  </div>
                </div>

                {/* 4 SEPARATED INBOX TABS */}
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                    {[
                      { id: "messages", label: "Inbox", count: messages.length },
                      { id: "contacts", label: "Contacts", count: exchangedContacts.length },
                      { id: "receipts", label: "Receipts", count: paymentReceipts.length },
                      { id: "bookings", label: "Bookings", count: bookingsList.length }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setInboxTab(tab.id)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold transition cursor-pointer flex flex-col items-center ${
                          inboxTab === tab.id ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className="text-[9px] opacity-80">({tab.count})</span>
                      </button>
                    ))}
                  </div>

                  {inboxTab === "messages" && (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {messages.length === 0 ? (
                        <p className="text-xs py-6 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-500">No messages received yet.</p>
                      ) : (
                        messages.map((m) => (
                          <div key={m.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">{m.name}</span>
                              <span className="text-[10px] text-slate-500">{m.date}</span>
                            </div>
                            {m.contact && <p className="text-[11px] text-indigo-400 font-mono">{m.contact}</p>}
                            <p className="text-xs text-slate-300">{m.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {inboxTab === "contacts" && (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {exchangedContacts.length === 0 ? (
                        <p className="text-xs py-6 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-500">No contacts exchanged yet.</p>
                      ) : (
                        exchangedContacts.map((c) => (
                          <div key={c.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">{c.name}</span>
                              <span className="text-[10px] text-slate-500">{c.date}</span>
                            </div>
                            <p className="text-[11px] text-emerald-400 font-mono">{c.phone}</p>
                            {c.email && <p className="text-[11px] text-slate-400">{c.email}</p>}
                            {c.social && <p className="text-[11px] text-slate-300">Note: {c.social}</p>}
                            <button
                              type="button"
                              onClick={() => handleSaveContactVCard(c.name, c.phone, c.email, c.social)}
                              className="mt-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                            >
                              <UserPlus className="w-3 h-3" /> Save to Phone Contacts (.vcf)
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {inboxTab === "receipts" && (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {paymentReceipts.length === 0 ? (
                        <p className="text-xs py-6 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-500">No payment receipts uploaded yet.</p>
                      ) : (
                        paymentReceipts.map((r) => (
                          <div key={r.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                            <div className="space-y-1 min-w-0 flex-1">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">{r.bankName}</span>
                              <p className="text-xs font-bold text-white truncate">{r.senderName}</p>
                              {r.refNo && <p className="text-[11px] text-slate-400 font-mono truncate">Ref: {r.refNo}</p>}
                              <p className="text-[10px] text-slate-500">{r.date}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setViewingReceiptImg(r.image)}
                              className="shrink-0 cursor-pointer group relative"
                            >
                              <img src={r.image} alt="Receipt" className="w-14 h-16 object-cover rounded-lg border border-slate-700" />
                              <span className="block text-[9px] text-indigo-400 mt-0.5 text-center font-semibold">View Full</span>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {inboxTab === "bookings" && (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {bookingsList.length === 0 ? (
                        <p className="text-xs py-6 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-500">No appointments booked yet.</p>
                      ) : (
                        bookingsList.map((b) => (
                          <div key={b.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-indigo-400">{b.dayChoice} • {b.timeChoice}</span>
                              <span className="text-[10px] text-slate-500">{b.date}</span>
                            </div>
                            <p className="text-xs font-bold text-white">{b.clientName} ({b.clientPhone})</p>
                            <p className="text-[11px] text-slate-400">{b.title} • {b.location}</p>
                            {b.notes && <p className="text-[11px] text-slate-300">Notes: {b.notes}</p>}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Owner Credentials */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold">Owner Credentials</p>
                    <button
                      type="button"
                      onClick={() => setIsEditingCreds(!isEditingCreds)}
                      className="text-xs text-indigo-400 hover:underline font-semibold cursor-pointer"
                    >
                      {isEditingCreds ? "Cancel" : "Change"}
                    </button>
                  </div>
                  {!isEditingCreds ? (
                    <p className="text-xs text-slate-400">Username: <span className="text-white">{account?.identifier}</span></p>
                  ) : (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={editUser}
                        onChange={(e) => setEditUser(e.target.value)}
                        placeholder="New Username"
                        className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                      />
                      <input
                        type="password"
                        value={editPass}
                        onChange={(e) => setEditPass(e.target.value)}
                        placeholder="New Password"
                        className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-slate-700 text-base sm:text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedAcc = { ...account, identifier: editUser.trim(), password: editPass.trim() };
                          setAccount(updatedAcc);
                          localStorage.setItem("smarttap_v32_account", JSON.stringify(updatedAcc));
                          setIsEditingCreds(false);
                          resetMobileViewportZoom();
                          alert("Credentials updated!");
                        }}
                        className="w-full py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
                      >
                        Save Credentials
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowAnalyticsModal(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer"
                >
                  Close Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULL RECEIPT IMAGE LIGHTBOX */}
      {viewingReceiptImg && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setViewingReceiptImg(null)}>
          <div className="max-w-sm w-full space-y-3 text-center">
            <img src={viewingReceiptImg} alt="Full Receipt" className="w-full max-h-[75vh] object-contain rounded-2xl border border-slate-700" />
            <button type="button" onClick={() => setViewingReceiptImg(null)} className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold cursor-pointer">
              Close Receipt
            </button>
          </div>
        </div>
      )}

      {/* PAYMENT QR MODAL */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{activeQrModal.bankName} QR</span>
              <button onClick={() => setActiveQrModal(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
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
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4" /> Save QR to Photos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
