"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User, Link as LinkIcon, CreditCard, Palette, Save, Plus, Trash2,
  Phone, Mail, Share2, Download, Copy, Check, Image as ImageIcon,
  Pencil, Lock, ArrowLeft, Building2, QrCode, Sparkles,
  ExternalLink, UserPlus, X, ShieldCheck, Music, Gamepad2, MapPin,
  Search, BarChart3, Send, Eye, EyeOff, MessageSquare, Play, Pause, Volume2, VolumeX,
  ChevronLeft, ChevronRight, RefreshCw, WifiOff, Calendar, Receipt, AlertTriangle,
  CheckCircle2, Clock, Navigation, Smartphone
} from "lucide-react";

const TIKTOK_SHOP_URL = "https://www.tiktok.com/@smarttap.ph?is_from_webapp=1&sender_device=pc";

// --- INDEXEDDB HELPER FOR LARGE MEDIA (VIDEO & AUDIO) ---
const DB_NAME = "SmartTapMediaDB";
const STORE_NAME = "mediaFiles";

const openMediaDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("No window");
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveMediaBlob = async (key, blob) => {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

const getMediaBlob = async (key) => {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
};

const deleteMediaBlob = async (key) => {
  const db = await openMediaDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve(true);
  });
};

// --- SMART DEVICE DETECTION & NATIVE APP DEEP LINKS (iOS & ANDROID) ---
const getDeviceOS = () => {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
};

const openWithNativeDeepLink = (e, platformId, webUrl) => {
  if (typeof window === "undefined") return;
  const os = getDeviceOS();
  const isMobile = os === "ios" || os === "android";

  const gameSchemes = {
    mlbb: { app: "mobilelegends://", web: "https://m.mobilelegends.com/" },
    valorant: { app: "riotclient://", web: "https://playvalorant.com/" },
    roblox: { app: "roblox://", web: "https://www.roblox.com/" },
    codm: { app: "garenacodm://", web: "https://codm.garena.com/" },
    dota2: { app: "steam://rungameid/570", web: "https://www.dota2.com/" },
    lol: { app: "riotclient://", web: "https://www.leagueoflegends.com/" }
  };

  if (gameSchemes[platformId]) {
    e.preventDefault();
    if (!isMobile) {
      window.open(gameSchemes[platformId].web, "_blank", "noopener,noreferrer");
      return;
    }
    const start = Date.now();
    window.location.href = gameSchemes[platformId].app;
    setTimeout(() => {
      if (Date.now() - start < 1500 && !document.hidden) {
        window.open(gameSchemes[platformId].web, "_blank", "noopener,noreferrer");
      }
    }, 900);
    return;
  }

  if (!webUrl || !isMobile) return;

  let appScheme = null;
  try {
    const urlObj = new URL(webUrl.startsWith("http") ? webUrl : `https://${webUrl}`);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    const handle = pathParts[0]?.replace("@", "") || "";

    if (platformId === "instagram" && handle) {
      appScheme = `instagram://user?username=${handle}`;
    } else if (platformId === "tiktok" && handle) {
      appScheme = os === "ios" ? `snssdk1233://user/profile/${handle}` : `tiktok://user/profile/${handle}`;
    } else if (platformId === "facebook") {
      appScheme = `fb://facewebmodal/f?href=${encodeURIComponent(webUrl)}`;
    } else if (platformId === "youtube") {
      appScheme = os === "ios" ? `youtube://${urlObj.hostname}${urlObj.pathname}` : `vnd.youtube://${urlObj.hostname}${urlObj.pathname}`;
    }
  } catch (err) {
    return;
  }

  if (appScheme) {
    e.preventDefault();
    const start = Date.now();
    window.location.href = appScheme;
    setTimeout(() => {
      if (Date.now() - start < 1500 && !document.hidden) {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      }
    }, 900);
  }
};

// --- BANK & E-WALLET APP LAUNCHER (iOS & ANDROID) ---
const openBankMobileApp = (providerId) => {
  const os = getDeviceOS();
  const bankApps = {
    gcash: {
      scheme: "gcash://",
      iosStore: "https://apps.apple.com/ph/app/gcash/id520020791",
      androidStore: "https://play.google.com/store/apps/details?id=com.globe.gcash.android"
    },
    maya: {
      scheme: "paymaya://",
      iosStore: "https://apps.apple.com/ph/app/maya-savings-loans-cards/id991673877",
      androidStore: "https://play.google.com/store/apps/details?id=com.paymaya"
    },
    mayabusiness: {
      scheme: "paymaya://",
      iosStore: "https://apps.apple.com/ph/app/maya-business/id1555517890",
      androidStore: "https://play.google.com/store/apps/details?id=com.paymaya.business"
    },
    bdo: {
      scheme: "bdoonline://",
      iosStore: "https://apps.apple.com/ph/app/bdo-online/id1552490339",
      androidStore: "https://play.google.com/store/apps/details?id=ph.com.bdo.retail"
    },
    bpi: {
      scheme: "bpi://",
      iosStore: "https://apps.apple.com/ph/app/bpi/id1551722854",
      androidStore: "https://play.google.com/store/apps/details?id=com.bpi.ng.app"
    },
    gotyme: {
      scheme: "gotyme://",
      iosStore: "https://apps.apple.com/ph/app/gotyme-bank/id1630117912",
      androidStore: "https://play.google.com/store/apps/details?id=ph.gotyme.app"
    },
    maribank: {
      scheme: "seabankph://",
      iosStore: "https://apps.apple.com/ph/app/seabank-ph-a-rural-bank/id1604481696",
      androidStore: "https://play.google.com/store/apps/details?id=ph.seabank.seabank"
    },
    landbank: {
      scheme: "landbank://",
      iosStore: "https://apps.apple.com/ph/app/landbank-mobile-banking/id480098878",
      androidStore: "https://play.google.com/store/apps/details?id=com.landbank.mobilebanking"
    },
    metrobank: {
      scheme: "metrobank://",
      iosStore: "https://apps.apple.com/ph/app/metrobank-app/id1546348573",
      androidStore: "https://play.google.com/store/apps/details?id=ph.com.metrobank.mcc.mbonline"
    },
    chinabank: {
      scheme: "chinabank://",
      iosStore: "https://apps.apple.com/ph/app/my-cbc/id6444061504",
      androidStore: "https://play.google.com/store/apps/details?id=com.chinabank.mobile"
    }
  };

  const target = bankApps[providerId];
  if (!target) {
    alert("Account number copied! Open your preferred banking or e-wallet app to paste and transfer.");
    return;
  }

  const fallbackUrl = os === "ios" ? target.iosStore : target.androidStore;
  if (os === "desktop") {
    window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    return;
  }

  const start = Date.now();
  window.location.href = target.scheme;
  setTimeout(() => {
    if (Date.now() - start < 1600 && !document.hidden) {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    }
  }, 1000);
};

// --- LIVE PH BUSINESS HOURS EVALUATOR (Asia/Manila) ---
const evaluatePhBusinessStatus = (schedule) => {
  if (!schedule || !schedule.enabled) return null;
  try {
    const now = new Date();
    const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const day = phTime.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    const currentMins = phTime.getHours() * 60 + phTime.getMinutes();

    let isOpenDay = true;
    if (schedule.days === "mon_fri") isOpenDay = day >= 1 && day <= 5;
    else if (schedule.days === "mon_sat") isOpenDay = day >= 1 && day <= 6;

    const [openH, openM] = (schedule.openTime || "09:00").split(":").map(Number);
    const [closeH, closeM] = (schedule.closeTime || "18:00").split(":").map(Number);
    const openMins = openH * 60 + openM;
    const closeMins = closeH * 60 + closeM;

    const format12h = (timeStr) => {
      const [h, m] = timeStr.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
    };

    if (isOpenDay && currentMins >= openMins && currentMins < closeMins) {
      return {
        isOpen: true,
        label: `Open Now • Closes at ${format12h(schedule.closeTime)}`
      };
    } else {
      return {
        isOpen: false,
        label: `Closed • Opens at ${format12h(schedule.openTime)}`
      };
    }
  } catch (e) {
    return null;
  }
};

// --- FULL DYNAMIC THEMES (INCLUDING EXECUTIVE ELEGANT THEME & FULL BUTTON SYNC) ---
const THEMES = {
  default: {
    id: "default",
    name: "Default Midnight",
    bg: "bg-[#090d16]",
    card: "bg-[#111827] border-slate-800/80",
    input: "bg-[#090d16] border-slate-700 text-white placeholder-slate-500",
    text: "text-slate-100",
    subtext: "text-slate-400",
    accent: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25",
    accentText: "text-indigo-400",
    accentSoft: "bg-indigo-500/15 text-indigo-300 border-indigo-500/35",
    pill: "bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border-slate-700/70",
    actionBtn: "bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-700/70",
    floatingBar: "bg-[#111827]/95 border-slate-700/80",
    badgeIcon: "bg-indigo-600 text-white",
    swatch: "bg-[#090d16] border-indigo-500"
  },
  elegant: {
    id: "elegant",
    name: "Executive Gold",
    bg: "bg-[#12100e]",
    card: "bg-[#1b1815] border-[#3d3326] shadow-2xl",
    input: "bg-[#12100e] border-[#4a3e2e] text-[#f5efe6] placeholder-[#8c7b65]",
    text: "text-[#f5efe6]",
    subtext: "text-[#b8a68e]",
    accent: "bg-gradient-to-r from-[#c59b49] to-[#a87e32] hover:from-[#d4aa57] hover:to-[#b88b3a] text-[#12100e] font-bold shadow-amber-900/30",
    accentText: "text-[#dcb76b]",
    accentSoft: "bg-[#c59b49]/15 text-[#e6c681] border-[#c59b49]/40",
    pill: "bg-[#24201c] hover:bg-[#2e2823] text-[#f5efe6] border-[#3d3326]",
    actionBtn: "bg-[#2c2620] hover:bg-[#383028] text-[#e6c681] border border-[#4a3e2e]",
    floatingBar: "bg-[#1b1815]/95 border-[#4a3e2e]",
    badgeIcon: "bg-gradient-to-br from-[#c59b49] to-[#997024] text-[#12100e]",
    swatch: "bg-[#1b1815] border-[#c59b49]"
  },
  black: {
    id: "black",
    name: "Obsidian Black",
    bg: "bg-black",
    card: "bg-[#0a0a0a] border-neutral-800",
    input: "bg-black border-neutral-800 text-white placeholder-neutral-600",
    text: "text-white",
    subtext: "text-neutral-400",
    accent: "bg-white hover:bg-neutral-200 text-black font-bold",
    accentText: "text-white",
    accentSoft: "bg-white/10 text-white border-white/25",
    pill: "bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800",
    actionBtn: "bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700",
    floatingBar: "bg-[#0a0a0a]/95 border-neutral-800",
    badgeIcon: "bg-white text-black",
    swatch: "bg-black border-white"
  },
  white: {
    id: "white",
    name: "Clean White",
    bg: "bg-slate-100",
    card: "bg-white border-slate-200/90 shadow-md",
    input: "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400",
    text: "text-slate-900",
    subtext: "text-slate-500",
    accent: "bg-slate-900 hover:bg-slate-800 text-white font-semibold",
    accentText: "text-slate-900",
    accentSoft: "bg-slate-900/5 text-slate-800 border-slate-300",
    pill: "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200",
    actionBtn: "bg-slate-200/80 hover:bg-slate-300/80 text-slate-900 border border-slate-300",
    floatingBar: "bg-white/95 border-slate-300",
    badgeIcon: "bg-slate-900 text-white",
    swatch: "bg-white border-slate-400"
  },
  pink: {
    id: "pink",
    name: "Blush Pink",
    bg: "bg-[#fdf2f8]",
    card: "bg-white/95 border-pink-200 shadow-md",
    input: "bg-pink-50/70 border-pink-300 text-pink-950 placeholder-pink-400",
    text: "text-pink-950",
    subtext: "text-pink-700/80",
    accent: "bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-semibold shadow-pink-500/25",
    accentText: "text-pink-600",
    accentSoft: "bg-pink-500/15 text-pink-700 border-pink-300",
    pill: "bg-pink-50/90 hover:bg-pink-100/90 text-pink-950 border-pink-200",
    actionBtn: "bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300",
    floatingBar: "bg-white/95 border-pink-300",
    badgeIcon: "bg-gradient-to-br from-pink-500 to-rose-500 text-white",
    swatch: "bg-pink-400 border-pink-600"
  }
};

const SOCIAL_PLATFORMS = [
  { id: "facebook", name: "Facebook", placeholder: "https://facebook.com/username", badge: "FB" },
  { id: "instagram", name: "Instagram", placeholder: "https://instagram.com/username", badge: "IG" },
  { id: "tiktok", name: "TikTok", placeholder: "https://tiktok.com/@username", badge: "TT" },
  { id: "youtube", name: "YouTube", placeholder: "https://youtube.com/@channel", badge: "YT" },
  { id: "x", name: "X (Twitter)", placeholder: "https://x.com/username", badge: "X" },
  { id: "whatsapp", name: "WhatsApp", placeholder: "https://wa.me/639123456789", badge: "WA" },
  { id: "telegram", name: "Telegram", placeholder: "https://t.me/username", badge: "TG" },
  { id: "discord", name: "Discord", placeholder: "https://discord.gg/invite", badge: "DC" },
  { id: "viber", name: "Viber", placeholder: "viber://chat?number=...", badge: "VB" },
  { id: "custom", name: "Custom URL", placeholder: "https://...", badge: "URL" }
];

const MUSIC_PLATFORMS = [
  { id: "audio_upload", name: "Device Audio File (MP3/WAV)", placeholder: "Song Title", badge: "♪" }
];

const GAMING_PLATFORMS = [
  { id: "mlbb", name: "Mobile Legends (MLBB)", badge: "ML", fields: ["Game ID", "Server ID"], defaultUrl: "https://m.mobilelegends.com/" },
  { id: "valorant", name: "Valorant", badge: "VAL", fields: ["Riot ID + Tagline (e.g. Player#PH1)"], defaultUrl: "https://playvalorant.com/" },
  { id: "roblox", name: "Roblox", badge: "RBX", fields: ["Username or Display Name"], defaultUrl: "https://www.roblox.com/" },
  { id: "codm", name: "CODM", badge: "COD", fields: ["Exact In-Game Username"], defaultUrl: "https://codm.garena.com/" },
  { id: "dota2", name: "Dota 2", badge: "D2", fields: ["Steam Friend Code / ID"], defaultUrl: "https://www.dota2.com/" },
  { id: "lol", name: "League of Legends", badge: "LOL", fields: ["Riot ID + Tagline"], defaultUrl: "https://www.leagueoflegends.com/" },
  { id: "game_other", name: "Other Game", badge: "GAME", fields: ["Game Name", "IGN / Username", "Player ID / Server"], defaultUrl: "https://google.com" }
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

const TIME_OPTIONS = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00", "23:00"
];

const formatTime12 = (t) => {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
};

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
  const [isOffline, setIsOffline] = useState(false);

  // High-Contrast / Large Text Accessibility Mode
  const [largeTextMode, setLargeTextMode] = useState(false);

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
    hasFeaturedVideo: false,
    phone: "",
    email: "",
    theme: "default",
    verifiedBadge: { enabled: true, color: "text-blue-500" },
    privacy: {
      contact: true,
      media: true,
      locations: true,
      links: true,
      booking: true,
      payments: true
    },
    booking: {
      enabled: false,
      title: "Book a Meeting / Appointment",
      availableDays: "mon_sat",
      startTime: "09:00",
      endTime: "18:00",
      duration: "30 mins",
      location: ""
    },
    links: [],
    payments: [],
    locations: []
  });

  const [videoObjectUrl, setVideoObjectUrl] = useState("");
  const [audioObjectUrls, setAudioObjectUrls] = useState({});

  const [activeModal, setActiveModal] = useState(null);
  const [selectedSubPlatform, setSelectedSubPlatform] = useState(null);
  const [inputField1, setInputField1] = useState("");
  const [inputField2, setInputField2] = useState("");
  const [inputField3, setInputField3] = useState("");
  const [pendingAudioFile, setPendingAudioFile] = useState(null);
  const [modalError, setModalError] = useState("");
  const [payQrImage, setPayQrImage] = useState("");

  // Location & Business Hours Modal
  const [showLocModal, setShowLocModal] = useState(false);
  const [locAddress, setLocAddress] = useState("");
  const [locLandmark, setLocLandmark] = useState("");
  const [locMapUrl, setLocMapUrl] = useState("");
  const [locHoursEnabled, setLocHoursEnabled] = useState(false);
  const [locDays, setLocDays] = useState("mon_sun");
  const [locOpenTime, setLocOpenTime] = useState("09:00");
  const [locCloseTime, setLocCloseTime] = useState("18:00");

  // Search, Share & Payment Modals
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showShareQrModal, setShowShareQrModal] = useState(false);
  const [showPaySelectionModal, setShowPaySelectionModal] = useState(false);

  // Payment Receipt Upload Modal
  const [receiptModalPay, setReceiptModalPay] = useState(null);
  const [receiptSenderName, setReceiptSenderName] = useState("");
  const [receiptRefNo, setReceiptRefNo] = useState("");
  const [receiptImage, setReceiptImage] = useState("");
  const [receiptSuccess, setReceiptSuccess] = useState(false);
  const [viewingReceiptImg, setViewingReceiptImg] = useState(null);

  // Two-Way Contact Exchange Modal + Post-Save Prompt
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [exchangeForm, setExchangeForm] = useState({ name: "", phone: "", email: "", social: "" });
  const [exchangeSuccess, setExchangeSuccess] = useState(false);
  const [showPostSavePrompt, setShowPostSavePrompt] = useState(false);

  // Booking Modal (Preset Dropdowns + Automatic .ics Calendar Download)
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    clientName: "",
    clientPhone: "",
    dayChoice: "Tomorrow",
    timeChoice: "10:00 AM",
    notes: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Owner Analytics & 4-Tab Inbox Modal
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [analyticsPin, setAnalyticsPin] = useState("");
  const [analyticsUnlocked, setAnalyticsUnlocked] = useState(false);
  const [analyticsPinError, setAnalyticsPinError] = useState("");
  const [analytics, setAnalytics] = useState({ taps1d: 0, taps1w: 0, taps1m: 0, tapsTotal: 0 });
  const [inboxTab, setInboxTab] = useState("messages"); // "messages" | "contacts" | "receipts" | "bookings"

  const [isEditingCreds, setIsEditingCreds] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [editPass, setEditPass] = useState("");

  // 4 Separate Inbox Lists
  const [messages, setMessages] = useState([]);
  const [exchangedContacts, setExchangedContacts] = useState([]);
  const [paymentReceipts, setPaymentReceipts] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);

  const [contactForm, setContactForm] = useState({ name: "", contact: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const [copiedId, setCopiedId] = useState(null);
  const [activeQrModal, setActiveQrModal] = useState(null);
  const [saveToast, setSaveToast] = useState(false);
  const [themeToast, setThemeToast] = useState("");

  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [isFloatingMinimized, setIsFloatingMinimized] = useState(false);
  const mainActionsRef = useRef(null);

  const [activeAudioId, setActiveAudioId] = useState(null);
  const [musicVolume, setMusicVolume] = useState(0.85);
  const audioRef = useRef(null);

  const avatarInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const qrInputRef = useRef(null);
  const receiptInputRef = useRef(null);

  // --- INTERACTIVE LINK HEALTH & BROKEN URL CHECKER ---
  const scanBrokenLinks = (linksArr) => {
    const issues = [];
    (linksArr || []).forEach((item) => {
      if (item.type === "music" || item.type === "gaming") return;
      const u = (item.url || "").trim();
      if (!u) {
        issues.push(`${item.label}: Missing URL`);
        return;
      }
      try {
        const parsed = new URL(u);
        if (!parsed.hostname.includes(".")) {
          issues.push(`${item.label}: Invalid domain format`);
        } else if (
          u.includes("private") ||
          u.includes("deleted") ||
          u.includes("404") ||
          parsed.pathname === "/" && ["instagram", "tiktok", "facebook", "youtube"].includes(item.platformId)
        ) {
          issues.push(`${item.label}: Profile handle missing or unreachable (${u})`);
        }
      } catch {
        issues.push(`${item.label}: Broken or malformed URL`);
      }
    });
    return issues;
  };

  const linkHealthIssues = scanBrokenLinks(profile.links);

  const reloadMediaFromDB = async (currentProfile) => {
    try {
      if (currentProfile?.hasFeaturedVideo) {
        const vBlob = await getMediaBlob("featured_video");
        if (vBlob) {
          setVideoObjectUrl(URL.createObjectURL(vBlob));
        }
      } else {
        setVideoObjectUrl("");
      }

      const musicLinks = (currentProfile?.links || []).filter((l) => l.type === "music");
      const urlMap = {};
      for (const m of musicLinks) {
        const aBlob = await getMediaBlob(`audio_${m.id}`);
        if (aBlob) {
          urlMap[m.id] = URL.createObjectURL(aBlob);
        }
      }
      setAudioObjectUrls(urlMap);
    } catch (err) {
      console.error("IndexedDB media load error:", err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      const goOnline = () => setIsOffline(false);
      const goOffline = () => setIsOffline(true);
      window.addEventListener("online", goOnline);
      window.addEventListener("offline", goOffline);

      if ("serviceWorker" in navigator) {
        const swCode = `
          const CACHE_NAME = 'smarttap-offline-v4';
          self.addEventListener('install', (e) => self.skipWaiting());
          self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
          self.addEventListener('fetch', (e) => {
            if (e.request.method !== 'GET') return;
            e.respondWith(
              fetch(e.request)
                .then((res) => {
                  const clone = res.clone();
                  caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                  return res;
                })
                .catch(() => caches.match(e.request))
            );
          });
        `;
        const blob = new Blob([swCode], { type: "application/javascript" });
        navigator.serviceWorker.register(URL.createObjectURL(blob)).catch(() => {});
      }
    }

    try {
      const savedAccount = localStorage.getItem("smarttap_v32_account");
      const savedProfile = localStorage.getItem("smarttap_v32_profile");
      const savedSetupDone = localStorage.getItem("smarttap_v32_setup_done");
      const savedAnalytics = localStorage.getItem("smarttap_v32_analytics");
      const savedMessages = localStorage.getItem("smarttap_v32_messages");
      const savedContacts = localStorage.getItem("smarttap_v32_contacts");
      const savedReceipts = localStorage.getItem("smarttap_v32_receipts");
      const savedBookings = localStorage.getItem("smarttap_v32_bookings");

      if (savedAccount) {
        const acc = JSON.parse(savedAccount);
        setAccount(acc);
        setEditUser(acc.identifier || "");
        setEditPass(acc.password || "");
      }
      if (savedProfile) {
        const parsedProf = JSON.parse(savedProfile);
        setProfile((prev) => ({
          ...prev,
          ...parsedProf,
          privacy: { ...prev.privacy, ...(parsedProf.privacy || {}) },
          booking: { ...prev.booking, ...(parsedProf.booking || {}) }
        }));
        reloadMediaFromDB(parsedProf);
      }
      if (savedMessages) setMessages(JSON.parse(savedMessages));
      if (savedContacts) setExchangedContacts(JSON.parse(savedContacts));
      if (savedReceipts) setPaymentReceipts(JSON.parse(savedReceipts));
      if (savedBookings) setBookingsList(JSON.parse(savedBookings));

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

  useEffect(() => {
    if (screen !== "view") return;
    const handleScroll = () => {
      if (!mainActionsRef.current) return;
      const rect = mainActionsRef.current.getBoundingClientRect();
      setShowFloatingBar(rect.bottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [screen]);

  const togglePlayAudio = (trackId) => {
    const src = audioObjectUrls[trackId];
    if (!src || !audioRef.current) return;

    if (activeAudioId === trackId) {
      audioRef.current.pause();
      setActiveAudioId(null);
    } else {
      audioRef.current.src = src;
      audioRef.current.volume = musicVolume;
      audioRef.current.play()
        .then(() => setActiveAudioId(trackId))
        .catch(() => setActiveAudioId(null));
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  const theme = THEMES[profile.theme] || THEMES.default;

  const handleManualAuth = (e) => {
    e.preventDefault();
    setAuthError("");

    const enteredUser = authIdentifier.trim().toLowerCase();
    const enteredPass = authPassword.trim();

    if (!enteredUser || !enteredPass) {
      setAuthError("Please enter username and password.");
      return;
    }

    if (authMode === "login" || screen === "login_to_edit") {
      const savedAccStr = localStorage.getItem("smarttap_v32_account");
      const parsedAcc = savedAccStr ? JSON.parse(savedAccStr) : account;

      if (
        parsedAcc &&
        parsedAcc.identifier.toLowerCase() === enteredUser &&
        parsedAcc.password === enteredPass
      ) {
        setAuthIdentifier("");
        setAuthPassword("");
        setScreen("edit");
      } else {
        setAuthError("Incorrect username or password.");
      }
      return;
    }

    const existingAccounts = JSON.parse(localStorage.getItem("smarttap_registry") || "[]");
    const isTaken = existingAccounts.some((acc) => acc.identifier.toLowerCase() === enteredUser);

    if (isTaken) {
      setAuthError("Username is already taken. Please choose another unique username.");
      return;
    }

    const newAcc = { identifier: authIdentifier.trim(), password: enteredPass };
    existingAccounts.push(newAcc);
    localStorage.setItem("smarttap_registry", JSON.stringify(existingAccounts));
    localStorage.setItem("smarttap_v32_account", JSON.stringify(newAcc));

    setAccount(newAcc);
    setEditUser(newAcc.identifier);
    setEditPass(newAcc.password);
    setScreen("edit");
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
    const compressedList = await Promise.all(
      files.slice(0, remainingSlots).map((f) => compressImage(f, 700, 0.75))
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

  const handleVideoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await saveMediaBlob("featured_video", file);
      setVideoObjectUrl(URL.createObjectURL(file));
      setProfile((prev) => ({ ...prev, hasFeaturedVideo: true }));
    } catch {
      alert("Failed to save video to browser storage.");
    }
  };

  const handleRemoveVideo = async () => {
    await deleteMediaBlob("featured_video");
    setVideoObjectUrl("");
    setProfile((prev) => ({ ...prev, hasFeaturedVideo: false }));
  };

  const saveLinkItem = (e) => {
    e.preventDefault();
    if (!inputField1.trim()) return;

    let finalUrl = inputField1.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
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

  const saveMusicItem = async (e) => {
    e.preventDefault();
    if (!inputField1.trim() || !pendingAudioFile) return;

    const trackId = Date.now();
    await saveMediaBlob(`audio_${trackId}`, pendingAudioFile);
    setAudioObjectUrls((prev) => ({ ...prev, [trackId]: URL.createObjectURL(pendingAudioFile) }));

    const newMusicItem = {
      id: trackId,
      type: "music",
      platformId: "audio_upload",
      label: inputField1.trim(),
      badge: "♪",
      url: ""
    };

    setProfile((prev) => ({ ...prev, links: [...prev.links, newMusicItem] }));
    setActiveModal(null);
    setSelectedSubPlatform(null);
    setInputField1("");
    setPendingAudioFile(null);
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
      url: selectedSubPlatform.defaultUrl || "https://google.com",
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
    const newLoc = {
      id: Date.now(),
      address: locAddress.trim(),
      landmark: locLandmark.trim(),
      mapUrl: locMapUrl.trim(),
      schedule: locHoursEnabled
        ? { enabled: true, days: locDays, openTime: locOpenTime, closeTime: locCloseTime }
        : { enabled: false }
    };
    setProfile((prev) => ({ ...prev, locations: [...prev.locations, newLoc] }));
    setLocAddress("");
    setLocLandmark("");
    setLocMapUrl("");
    setLocHoursEnabled(false);
    setShowLocModal(false);
  };

  const removeItem = async (id, category) => {
    if (category === "payment") {
      setProfile((prev) => ({ ...prev, payments: prev.payments.filter((p) => p.id !== id) }));
    } else if (category === "location") {
      setProfile((prev) => ({ ...prev, locations: prev.locations.filter((l) => l.id !== id) }));
    } else {
      if (category === "music") {
        await deleteMediaBlob(`audio_${id}`);
      }
      setProfile((prev) => ({ ...prev, links: prev.links.filter((l) => l.id !== id) }));
    }
  };

  const handleSaveProfile = () => {
    try {
      localStorage.setItem("smarttap_v32_profile", JSON.stringify(profile));
      localStorage.setItem("smarttap_v32_setup_done", "true");
      setSaveToast(true);
      setTimeout(() => {
        setSaveToast(false);
        setScreen("view");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 450);
    } catch {
      alert("Storage limit warning: Try reducing gallery image sizes.");
    }
  };

  const handleSaveContactVCard = (customName, customPhone, customEmail, customNote, triggerPrompt = false) => {
    const fn = customName || profile.name || "SmartTap User";
    const tel = customPhone !== undefined ? customPhone : profile.phone;
    const mail = customEmail !== undefined ? customEmail : profile.email;
    const note = customNote !== undefined ? customNote : profile.bio;

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${fn}`,
      tel ? `TEL;TYPE=CELL:${tel}` : "",
      mail ? `EMAIL:${mail}` : "",
      note ? `NOTE:${note}` : "",
      "END:VCARD"
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fn.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);

    if (triggerPrompt) {
      setShowPostSavePrompt(true);
    }
  };

  // --- SUBMIT TWO-WAY CONTACT EXCHANGE ---
  const handleExchangeContactSubmit = (e) => {
    e.preventDefault();
    if (!exchangeForm.name.trim() || !exchangeForm.phone.trim()) return;

    const newContactEntry = {
      id: Date.now(),
      name: exchangeForm.name.trim(),
      phone: exchangeForm.phone.trim(),
      email: exchangeForm.email.trim(),
      social: exchangeForm.social.trim(),
      date: new Date().toLocaleString()
    };

    const updatedContacts = [newContactEntry, ...exchangedContacts];
    setExchangedContacts(updatedContacts);
    localStorage.setItem("smarttap_v32_contacts", JSON.stringify(updatedContacts));
    setExchangeSuccess(true);
  };

  // --- SUBMIT PAYMENT RECEIPT ---
  const handleReceiptSubmit = (e) => {
    e.preventDefault();
    if (!receiptSenderName.trim() || !receiptImage || !receiptModalPay) return;

    const newReceipt = {
      id: Date.now(),
      bankName: receiptModalPay.bankName,
      senderName: receiptSenderName.trim(),
      refNo: receiptRefNo.trim(),
      image: receiptImage,
      date: new Date().toLocaleString()
    };

    const updatedReceipts = [newReceipt, ...paymentReceipts];
    setPaymentReceipts(updatedReceipts);
    localStorage.setItem("smarttap_v32_receipts", JSON.stringify(updatedReceipts));
    setReceiptSuccess(true);
  };

  // --- GENERATE .ICS CALENDAR EVENT & SUBMIT BOOKING ---
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.clientName.trim() || !bookingForm.clientPhone.trim()) return;

    const eventTitle = `${profile.booking?.title || "Meeting"} with ${profile.name || "SmartTap Owner"}`;
    const eventLoc = profile.booking?.location || "Online / To be confirmed";
    const eventDesc = `Client: ${bookingForm.clientName} (${bookingForm.clientPhone}) | Notes: ${bookingForm.notes || "None"}`;

    // Build start/end ISO strings for tomorrow/selected day
    const startDate = new Date();
    if (bookingForm.dayChoice === "Tomorrow") startDate.setDate(startDate.getDate() + 1);
    else if (bookingForm.dayChoice === "In 2 Days") startDate.setDate(startDate.getDate() + 2);
    else if (bookingForm.dayChoice === "Next Monday") {
      const diff = (1 + 7 - startDate.getDay()) % 7 || 7;
      startDate.setDate(startDate.getDate() + diff);
    }

    const [timePart, meridiem] = bookingForm.timeChoice.split(" ");
    let [hr, min] = timePart.split(":").map(Number);
    if (meridiem === "PM" && hr !== 12) hr += 12;
    if (meridiem === "AM" && hr === 12) hr = 0;
    startDate.setHours(hr, min, 0, 0);

    const endDate = new Date(startDate.getTime() + 30 * 60000);
    const toICSDate = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SmartTap PH//Booking//EN",
      "BEGIN:VEVENT",
      `UID:smarttap-${Date.now()}@smarttap.ph`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(startDate)}`,
      `DTEND:${toICSDate(endDate)}`,
      `SUMMARY:${eventTitle}`,
      `LOCATION:${eventLoc}`,
      `DESCRIPTION:${eventDesc}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
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
    a.download = `SmartTap_Booking_${bookingForm.clientName.replace(/\s+/g, "_")}.ics`;
    a.click();
    URL.revokeObjectURL(url);

    const newBooking = {
      id: Date.now(),
      title: profile.booking?.title || "Meeting / Appointment",
      clientName: bookingForm.clientName.trim(),
      clientPhone: bookingForm.clientPhone.trim(),
      dayChoice: bookingForm.dayChoice,
      timeChoice: bookingForm.timeChoice,
      location: eventLoc,
      notes: bookingForm.notes.trim(),
      date: new Date().toLocaleString()
    };

    const updatedBookings = [newBooking, ...bookingsList];
    setBookingsList(updatedBookings);
    localStorage.setItem("smarttap_v32_bookings", JSON.stringify(updatedBookings));
    setBookingSuccess(true);
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

  const handleNativeShare = async (shareUrl) => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name || "SmartTap"} — Digital Profile`,
          text: profile.bio || "Connect with me via SmartTap!",
          url: shareUrl
        });
      } catch {
        // User cancelled share sheet
      }
    } else {
      copyToClipboard(shareUrl, "qr_url");
    }
  };

  if (!isLoaded) return null;

  // --- SCREEN 1: CLAIM ---
  if (screen === "claim") {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col justify-between p-6">
        <header className="max-w-md w-full mx-auto pt-2 flex justify-between items-center">
          <BrandLogo size="md" />
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-medium">
            SmartTap v4.0
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
              Your luxury digital identity—complete with Native App Deep Links, Payment Receipt Uploads, One-Tap Calendar Bookings, and Offline PWA Support.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                setAuthMode("signup");
                setAuthError("");
                setScreen("auth");
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              Get Started — Claim Card
            </button>

            {account && (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                  setScreen("login_to_edit");
                }}
                className="w-full py-3 px-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-sm font-medium transition cursor-pointer active:scale-95"
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
    const isOwnerLogin = authMode === "login" || screen === "login_to_edit";

    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col justify-between p-6">
        <header className="max-w-md w-full mx-auto pt-2 flex items-center justify-between">
          <button
            onClick={() => setScreen(isOwnerLogin ? "view" : "claim")}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition cursor-pointer"
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
                {isOwnerLogin ? "Owner Login" : "Create SmartTap Account"}
              </h2>
              <p className="text-xs text-slate-400">
                {isOwnerLogin
                  ? "Sign in with your existing username & password to edit."
                  : "Choose a unique username for your card."}
              </p>
            </div>

            <form onSubmit={handleManualAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Username</label>
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
                    className="absolute right-3 top-3 text-slate-400 hover:text-white cursor-pointer"
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
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition cursor-pointer active:scale-95"
              >
                {isOwnerLogin ? "Log In & Open Editor" : "Create Account & Start Setup"}
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

    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-200 pb-28`}>
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${theme.card}`}>
          <div className="max-w-xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <BrandLogo size="sm" />
            <button
              type="button"
              onClick={() => setScreen("view")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 ${theme.accentSoft} border`}
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
              Use the eye icons on each block to hide/show sections on demand without deleting your saved info.
            </p>
          </div>

          {/* LINK HEALTH CHECKER ALERT */}
          {linkHealthIssues.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Link Health Scanner Alert ({linkHealthIssues.length} issue found)</span>
              </div>
              <ul className="text-[11px] text-amber-200/90 list-disc pl-5 space-y-0.5">
                {linkHealthIssues.map((iss, i) => (
                  <li key={i}>{iss}</li>
                ))}
              </ul>
            </div>
          )}

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
                title="Toggle Contact Buttons Visibility"
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
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${theme.input}`}
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
                  placeholder="Entrepreneur | Gamer | Manila, PH"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${theme.input}`}
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
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${theme.input}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="you@gmail.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${theme.input}`}
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
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-700/60 group">
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

          {/* SECTION 3: ONE-TAP CALENDAR BOOKING SETUP (PRESET DROPDOWNS) */}
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
                  title="Hide/Show Booking Section"
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
              <div className="space-y-3 pt-1">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Booking Button Label</label>
                  <select
                    value={profile.booking.title}
                    onChange={(e) => setProfile({ ...profile, booking: { ...profile.booking, title: e.target.value } })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium ${theme.input}`}
                  >
                    <option value="Book a Meeting / Appointment">Book a Meeting / Appointment</option>
                    <option value="Schedule a Consultation">Schedule a Consultation</option>
                    <option value="Reserve a Table / Visit">Reserve a Table / Visit</option>
                    <option value="Book a Discovery Call">Book a Discovery Call</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Available Days</label>
                    <select
                      value={profile.booking.availableDays}
                      onChange={(e) => setProfile({ ...profile, booking: { ...profile.booking, availableDays: e.target.value } })}
                      className={`w-full px-3 py-2.5 rounded-xl border text-xs ${theme.input}`}
                    >
                      <option value="mon_sun">Monday – Sunday</option>
                      <option value="mon_sat">Monday – Saturday</option>
                      <option value="mon_fri">Monday – Friday</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Session Duration</label>
                    <select
                      value={profile.booking.duration}
                      onChange={(e) => setProfile({ ...profile, booking: { ...profile.booking, duration: e.target.value } })}
                      className={`w-full px-3 py-2.5 rounded-xl border text-xs ${theme.input}`}
                    >
                      <option value="15 mins">15 Minutes</option>
                      <option value="30 mins">30 Minutes</option>
                      <option value="1 hour">1 Hour</option>
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
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${theme.input}`}
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
                {profile.links.map((item) => (
                  <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme.pill}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 uppercase shadow ${theme.badgeIcon}`}>
                        {item.badge || item.type.slice(0, 2)}
                      </span>
                      <div className="truncate">
                        <p className="text-sm font-semibold truncate">{item.label}</p>
                        <p className={`text-xs truncate ${theme.subtext}`}>
                          {item.type === "music" ? "Device Audio Track" : (item.type === "gaming" ? `${item.gameDetails?.field1}` : item.url)}
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeItem(item.id, item.type)} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SECTION 5: LOCATIONS & OPERATING HOURS */}
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
                            Hours: {formatTime12(loc.schedule.openTime)} – {formatTime12(loc.schedule.closeTime)}
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

          {/* SECTION 6: PROFILE THEMES (INCLUDING EXECUTIVE GOLD) */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center gap-2 font-semibold text-base">
              <Palette className={`w-5 h-5 ${theme.accentText}`} />
              <h2>Profile Theme Default</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
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
                      <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
        </main>

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

        {/* LOCATION & BUSINESS HOURS MODAL (PRESET OPTIONS) */}
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Landmark Notes for Grab / Angkas (Optional)</label>
                  <input
                    type="text"
                    value={locLandmark}
                    onChange={(e) => setLocLandmark(e.target.value)}
                    placeholder="e.g. Beside D'Mall entrance, green signage"
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

                {/* Live Business Operating Hours Option (Preset Dropdowns) */}
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
                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Operating Days</label>
                        <select
                          value={locDays}
                          onChange={(e) => setLocDays(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-slate-700 text-xs text-white"
                        >
                          <option value="mon_sun">Open Daily (Monday – Sunday)</option>
                          <option value="mon_sat">Monday – Saturday</option>
                          <option value="mon_fri">Monday – Friday (Weekdays)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Opening Time</label>
                          <select
                            value={locOpenTime}
                            onChange={(e) => setLocOpenTime(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-slate-700 text-xs text-white"
                          >
                            {TIME_OPTIONS.map((t) => (
                              <option key={t} value={t}>{formatTime12(t)}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Closing Time</label>
                          <select
                            value={locCloseTime}
                            onChange={(e) => setLocCloseTime(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-slate-700 text-xs text-white"
                          >
                            {TIME_OPTIONS.map((t) => (
                              <option key={t} value={t}>{formatTime12(t)}</option>
                            ))}
                          </select>
                        </div>
                      </div>
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

        {/* PLATFORM ADD MODAL */}
        {activeModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base capitalize">
                  {selectedSubPlatform ? `Add ${selectedSubPlatform.name}` : `Select ${activeModal} Platform`}
                </h3>
                <button onClick={() => { setActiveModal(null); setSelectedSubPlatform(null); setPendingAudioFile(null); }} className="p-1 text-slate-400 hover:text-white cursor-pointer">
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
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

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} ${largeTextMode ? "text-base" : "text-sm"} transition-colors duration-200 flex flex-col justify-between py-6 px-4 pb-32`}>
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

        {/* TOP BAR WITH HIGH-CONTRAST / LARGE TEXT Aa TOGGLE */}
        <div className="flex items-center justify-between gap-1.5">
          <BrandLogo size="sm" />
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLargeTextMode(!largeTextMode)}
              className={`px-2.5 py-1.5 rounded-full border text-xs font-extrabold transition cursor-pointer active:scale-95 ${
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
              className={`p-2 rounded-full border transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Switch Theme"
            >
              <Palette className={`w-4 h-4 ${theme.accentText}`} />
            </button>
            <button
              type="button"
              onClick={() => setShowShareQrModal(true)}
              className={`p-2 rounded-full border transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Share Profile"
            >
              <Share2 className={`w-4 h-4 ${theme.accentText}`} />
            </button>
            <button
              type="button"
              onClick={() => setShowSearchModal(true)}
              className={`p-2 rounded-full border transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Search Profile"
            >
              <Search className={`w-4 h-4 ${theme.accentText}`} />
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
              className={`relative p-2 rounded-full border transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Owner Analytics & Inbox"
            >
              <BarChart3 className={`w-4 h-4 ${theme.accentText}`} />
              {totalInboxCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center">
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
                setScreen("login_to_edit");
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-medium transition cursor-pointer active:scale-95 ${theme.pill}`}
              title="Owner Edit Profile"
            >
              <Pencil className={`w-3.5 h-3.5 ${theme.accentText}`} />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* MAIN PROFILE CARD */}
        <div className={`rounded-3xl border p-6 space-y-6 shadow-xl ${theme.card}`}>
          {/* Avatar & Header */}
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

          {/* Gallery & Featured Video (Respects Privacy Toggle) */}
          {profile.privacy.media && (
            <>
              {profile.photos.length > 0 && (
                <div className={`grid gap-2 ${profile.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                  {profile.photos.map((photo, index) => (
                    <div key={index} className={`rounded-2xl overflow-hidden border border-slate-700/40 ${profile.photos.length === 1 ? "aspect-video" : "aspect-square"}`}>
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

          {/* Main Contact Actions (Respects Privacy Toggle) */}
          <div ref={mainActionsRef} className="space-y-2.5">
            {profile.privacy.contact && (profile.phone || profile.email) && (
              <div className="space-y-2.5">
                {profile.phone && (
                  <div className="grid grid-cols-2 gap-2.5">
                    <a href={`tel:${profile.phone}`} className={`py-3 px-3 rounded-xl border ${largeTextMode ? "text-sm" : "text-xs"} font-semibold flex items-center justify-center gap-2 transition active:scale-95 ${theme.pill}`}>
                      <Phone className="w-4 h-4 text-emerald-400" />
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
                  setShowBookingModal(true);
                }}
                className={`w-full py-3.5 px-4 rounded-xl ${largeTextMode ? "text-sm" : "text-xs"} font-bold flex items-center justify-center gap-2 shadow-md transition cursor-pointer active:scale-95 ${theme.accent}`}
              >
                <Calendar className="w-4 h-4" />
                <span>{profile.booking.title || "Book a Meeting / Appointment"}</span>
              </button>
            )}
          </div>

          {/* LOCATIONS + LIVE PH STATUS + RIDE-HAILING COPY */}
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
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/25 text-[11px] font-semibold">
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
                          title="Copy Address for Grab / Angkas / JoyRide"
                        >
                          {copiedId === `loc_${loc.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === `loc_${loc.id}` ? "Address Copied" : "Copy for Grab"}</span>
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

              {/* Audio Player Tracks */}
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
                              <>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(`${item.gameDetails?.field1} ${item.gameDetails?.field2 ? `(${item.gameDetails.field2})` : ""}`, item.id)}
                                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 transition cursor-pointer active:scale-95 ${theme.accent}`}
                                >
                                  {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedId === item.id ? "Copied" : "Copy"}</span>
                                </button>
                                <a
                                  href={item.url || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => openWithNativeDeepLink(e, item.platformId, item.url)}
                                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 transition active:scale-95 ${theme.actionBtn}`}
                                >
                                  <span>Open App</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </>
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

          {/* PAYMENTS & TRANSFERS (COPY + COPY ALL + OPEN APP + UPLOAD RECEIPT) */}
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
                          <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
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

                      <div className="flex items-center justify-between bg-black/15 rounded-xl px-3 py-2">
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

                      {/* OPEN BANK APP & UPLOAD PAYMENT RECEIPT BUTTONS */}
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
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs ${theme.input}`}
                />
                <input
                  type="text"
                  value={contactForm.contact}
                  onChange={(e) => setContactForm({ ...contactForm, contact: e.target.value })}
                  placeholder="Your Email or Phone (Optional)"
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs ${theme.input}`}
                />
                <textarea
                  rows={2}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Type your message here..."
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs ${theme.input}`}
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

      {/* FLOATING BOTTOM BAR NAVIGATION (HORIZONTAL SLIDE LEFT/RIGHT ARROWS + FULL THEME SYNC) */}
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
                <Receipt className="w-4 h-4 text-emerald-400" />
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  value={receiptRefNo}
                  onChange={(e) => setReceiptRefNo(e.target.value)}
                  placeholder="Reference No. / Amount (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
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
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Payment Receipt</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ONE-TAP CALENDAR BOOKING MODAL (PRESET DROPDOWNS + .ICS DOWNLOAD) */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl">
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
                  With <strong className="text-white">{profile.name || "SmartTap Owner"}</strong> ({profile.booking?.duration || "30 mins"})
                  {profile.booking?.location ? ` • ${profile.booking.location}` : ""}
                </p>

                <input
                  type="text"
                  required
                  value={bookingForm.clientName}
                  onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                  placeholder="Your Full Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                />
                <input
                  type="tel"
                  required
                  value={bookingForm.clientPhone}
                  onChange={(e) => setBookingForm({ ...bookingForm, clientPhone: e.target.value })}
                  placeholder="Your Mobile Number *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Select Day</label>
                    <select
                      value={bookingForm.dayChoice}
                      onChange={(e) => setBookingForm({ ...bookingForm, dayChoice: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                    >
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="In 2 Days">In 2 Days</option>
                      <option value="Next Monday">Next Monday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Select Time</label>
                    <select
                      value={bookingForm.timeChoice}
                      onChange={(e) => setBookingForm({ ...bookingForm, timeChoice: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <input
                  type="text"
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  placeholder="Agenda / Other Details (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                />
                <input
                  type="tel"
                  required
                  value={exchangeForm.phone}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, phone: e.target.value })}
                  placeholder="Your Mobile Number *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                />
                <input
                  type="email"
                  value={exchangeForm.email}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, email: e.target.value })}
                  placeholder="Your Email (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  value={exchangeForm.social}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, social: e.target.value })}
                  placeholder="IG / FB / Company Note (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
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

      <footer className="max-w-md w-full mx-auto text-center pt-8 pb-4 space-y-1.5">
        <div className="flex justify-center opacity-80"><BrandLogo size="sm" /></div>
        <p className={`text-xs ${theme.subtext}`}>Tap smarter. Share your world in one touch.</p>
        <p className={`text-[11px] ${theme.subtext}`}>
          Want to get your own SmartTap card?{" "}
          <a href={TIKTOK_SHOP_URL} target="_blank" rel="noopener noreferrer" className={`${theme.accentText} hover:underline font-semibold`}>
            Order here on our TikTok Shop →
          </a>
        </p>
      </footer>

      {/* SHARE PROFILE MODAL (NATIVE PHONE SHARE SHEET + QR CODE) */}
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
                  className="bg-transparent text-xs text-white focus:outline-none w-full"
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

      {/* OWNER ANALYTICS & 4-TAB SEPARATED INBOX MODAL */}
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
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer"
                >
                  Unlock Owner Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Tap Statistics */}
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

                  {/* TAB 1: MESSAGES */}
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

                  {/* TAB 2: EXCHANGED CONTACTS */}
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

                  {/* TAB 3: PAYMENT RECEIPTS */}
                  {inboxTab === "receipts" && (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {paymentReceipts.length === 0 ? (
                        <p className="text-xs py-6 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-500">No payment receipts uploaded yet.</p>
                      ) : (
                        paymentReceipts.map((r) => (
                          <div key={r.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                            <div className="space-y-1 min-w-0 flex-1">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{r.bankName}</span>
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

                  {/* TAB 4: BOOKINGS */}
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
                        className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                      />
                      <input
                        type="password"
                        value={editPass}
                        onChange={(e) => setEditPass(e.target.value)}
                        placeholder="New Password"
                        className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-slate-700 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedAcc = { identifier: editUser.trim(), password: editPass.trim() };
                          setAccount(updatedAcc);
                          localStorage.setItem("smarttap_v32_account", JSON.stringify(updatedAcc));
                          setIsEditingCreds(false);
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
