"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User, Link as LinkIcon, CreditCard, Palette, Save, Plus, Trash2,
  Phone, Mail, Globe, Share2, Download, Copy, Check, Camera, Image as ImageIcon,
  Pencil, Lock, LogOut, ArrowLeft, Smartphone, Building2, QrCode, Sparkles,
  ExternalLink, UserPlus, CheckCircle2, X, ShieldCheck
} from "lucide-react";

// --- CONFIG & CONSTANTS ---
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
  { id: "facebook", name: "Facebook", color: "bg-blue-600", placeholder: "https://facebook.com/username", badge: "FB" },
  { id: "instagram", name: "Instagram", color: "bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600", placeholder: "https://instagram.com/username", badge: "IG" },
  { id: "tiktok", name: "TikTok", color: "bg-neutral-900", placeholder: "https://tiktok.com/@username", badge: "TT" },
  { id: "youtube", name: "YouTube", color: "bg-red-600", placeholder: "https://youtube.com/@channel", badge: "YT" },
  { id: "x", name: "X (Twitter)", color: "bg-neutral-800", placeholder: "https://x.com/username", badge: "X" },
  { id: "snapchat", name: "Snapchat", color: "bg-yellow-400 text-black", placeholder: "https://snapchat.com/add/username", badge: "SC" },
  { id: "whatsapp", name: "WhatsApp", color: "bg-emerald-500", placeholder: "https://wa.me/639123456789", badge: "WA" },
  { id: "telegram", name: "Telegram", color: "bg-sky-500", placeholder: "https://t.me/username", badge: "TG" },
  { id: "discord", name: "Discord", color: "bg-indigo-500", placeholder: "https://discord.gg/invite or Username", badge: "DC" },
  { id: "viber", name: "Viber", color: "bg-purple-600", placeholder: "viber://chat?number=%2B639123456789", badge: "VB" },
  { id: "email", name: "Email", color: "bg-rose-500", placeholder: "you@gmail.com", badge: "@" },
  { id: "website", name: "Website", color: "bg-teal-600", placeholder: "https://yourwebsite.com", badge: "WEB" },
  { id: "custom", name: "Custom URL", color: "bg-slate-600", placeholder: "https://...", badge: "URL" }
];

const PAYMENT_PROVIDERS = [
  { id: "gcash", name: "GCash", type: "ewallet", digits: 11, label: "11-digit Mobile Number (09XX...)", placeholder: "09171234567", color: "bg-blue-600", badge: "G" },
  { id: "maya", name: "Maya (Personal)", type: "ewallet", digits: 11, label: "11-digit Mobile Number (09XX...)", placeholder: "09181234567", color: "bg-emerald-600", badge: "M" },
  { id: "mayabusiness", name: "Maya Business", type: "bank", digits: 12, label: "12-digit Account Number (starts with 9)", placeholder: "900123456789", color: "bg-teal-700", badge: "MB" },
  { id: "maribank", name: "MariBank (SeaBank)", type: "bank", digits: 11, label: "11-digit Account Number", placeholder: "10234567890", color: "bg-orange-500", badge: "SB" },
  { id: "gotyme", name: "GoTyme Bank", type: "bank", digits: 12, label: "12-digit Account Number", placeholder: "012345678901", color: "bg-cyan-600", badge: "GT" },
  { id: "bdo", name: "BDO", type: "bank", digits: 12, label: "12-digit Account Number", placeholder: "001234567890", color: "bg-blue-800", badge: "BDO" },
  { id: "bpi", name: "BPI", type: "bank", digits: 10, label: "10-digit Account Number", placeholder: "1234567890", color: "bg-red-700", badge: "BPI" },
  { id: "landbank", name: "Landbank", type: "bank", digits: 10, label: "10-digit Account Number", placeholder: "1234567890", color: "bg-green-700", badge: "LBP" },
  { id: "metrobank", name: "Metrobank", type: "bank", digits: 13, label: "13-digit Account Number", placeholder: "1234567890123", color: "bg-blue-700", badge: "MBTC" },
  { id: "chinabank", name: "China Bank", type: "bank", digits: 12, label: "12-digit Account Number", placeholder: "123456789012", color: "bg-rose-700", badge: "CBC" },
  { id: "others", name: "Others (Other Banks / E-Wallet)", type: "other", digits: null, label: "Account / Mobile Number", placeholder: "Enter account or mobile number", color: "bg-slate-600", badge: "OTH" }
];

// --- HELPER: IMAGE COMPRESSOR FOR LOCALSTORAGE ---
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

// --- HELPER: SMARTTAP LOGO COMPONENT ---
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
  // App Flow: 'claim' | 'auth' | 'edit' | 'view' | 'login_to_edit'
  const [screen, setScreen] = useState("claim");
  const [isLoaded, setIsLoaded] = useState(false);

  // Account State
  const [account, setAccount] = useState(null); // { identifier, password, provider }
  const [authMode, setAuthMode] = useState("signup"); // 'signup' | 'login'
  const [authIdentifier, setAuthIdentifier] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Profile State (Starts clean/empty for new setup)
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    avatar: "",
    photos: [], // up to 4 images
    phone: "",
    email: "",
    theme: "default",
    links: [], // { id, platformId, label, url }
    payments: [] // { id, providerId, customBankName, accountName, accountNumber, qrImage }
  });

  // Modals & Interactive States
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [linkInputUrl, setLinkInputUrl] = useState("");
  const [linkInputLabel, setLinkInputLabel] = useState("");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [payCustomBank, setPayCustomBank] = useState("");
  const [payAccountName, setPayAccountName] = useState("");
  const [payAccountNumber, setPayAccountNumber] = useState("");
  const [payQrImage, setPayQrImage] = useState("");
  const [payError, setPayError] = useState("");

  const [copiedId, setCopiedId] = useState(null);
  const [activeQrModal, setActiveQrModal] = useState(null);
  const [saveToast, setSaveToast] = useState(false);

  const avatarInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const qrInputRef = useRef(null);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedAccount = localStorage.getItem("smarttap_v2_account");
      const savedProfile = localStorage.getItem("smarttap_v2_profile");
      const savedSetupDone = localStorage.getItem("smarttap_v2_setup_done");

      if (savedAccount) setAccount(JSON.parse(savedAccount));
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedSetupDone === "true" && savedProfile) {
        setScreen("view");
      }
    } catch (e) {
      console.error("Failed to load local data:", e);
    }
    setIsLoaded(true);
  }, []);

  const theme = THEMES[profile.theme] || THEMES.default;

  // --- AUTH HANDLERS ---
  const handleGoogleContinue = () => {
    const googleUser = {
      identifier: "google-user@gmail.com",
      password: "",
      provider: "google"
    };
    setAccount(googleUser);
    localStorage.setItem("smarttap_v2_account", JSON.stringify(googleUser));
    setAuthError("");
    setScreen("edit");
  };

  const handleManualAuth = (e) => {
    e.preventDefault();
    setAuthError("");

    if (!authIdentifier.trim() || !authPassword.trim()) {
      setAuthError("Please enter your username/email/phone and password.");
      return;
    }

    if (authMode === "signup") {
      const newAcc = {
        identifier: authIdentifier.trim(),
        password: authPassword.trim(),
        provider: "credentials"
      };
      setAccount(newAcc);
      localStorage.setItem("smarttap_v2_account", JSON.stringify(newAcc));
      setScreen("edit");
    } else {
      // Verify against saved account
      if (
        account &&
        account.identifier.toLowerCase() === authIdentifier.trim().toLowerCase() &&
        account.password === authPassword.trim()
      ) {
        setAuthIdentifier("");
        setAuthPassword("");
        setScreen("edit");
      } else {
        setAuthError("Incorrect username/email or password. Please try again.");
      }
    }
  };

  // --- IMAGE UPLOAD HANDLERS ---
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

  const handleQrUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file, 500, 0.85);
    setPayQrImage(compressed);
  };

  // --- LINK HANDLERS ---
  const openAddLink = (platform) => {
    setSelectedPlatform(platform);
    setLinkInputLabel(platform.id === "custom" ? "" : platform.name);
    setLinkInputUrl("");
  };

  const saveNewLink = (e) => {
    e.preventDefault();
    if (!linkInputUrl.trim()) return;

    let finalUrl = linkInputUrl.trim();
    if (selectedPlatform.id !== "email" && !/^https?:\/\//i.test(finalUrl) && !/^viber:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    const newLink = {
      id: Date.now(),
      platformId: selectedPlatform.id,
      label: linkInputLabel.trim() || selectedPlatform.name,
      url: finalUrl
    };

    setProfile((prev) => ({ ...prev, links: [...prev.links, newLink] }));
    setSelectedPlatform(null);
    setShowLinkModal(false);
  };

  const removeLink = (id) => {
    setProfile((prev) => ({
      ...prev,
      links: prev.links.filter((item) => item.id !== id)
    }));
  };

  // --- PAYMENT HANDLERS ---
  const openAddPayment = (provider) => {
    setSelectedProvider(provider);
    setPayCustomBank("");
    setPayAccountName("");
    setPayAccountNumber("");
    setPayQrImage("");
    setPayError("");
  };

  const saveNewPayment = (e) => {
    e.preventDefault();
    setPayError("");

    const cleanNum = payAccountNumber.replace(/\s+/g, "");
    if (!payAccountName.trim() || !cleanNum) {
      setPayError("Please fill in both the Account Name and Account/Mobile Number.");
      return;
    }

    if (selectedProvider.id === "others" && !payCustomBank.trim()) {
      setPayError("Please specify the Bank or E-Wallet name.");
      return;
    }

    if (selectedProvider.digits && cleanNum.length !== selectedProvider.digits) {
      setPayError(`${selectedProvider.name} requires exactly ${selectedProvider.digits} digits.`);
      return;
    }

    const newPayment = {
      id: Date.now(),
      providerId: selectedProvider.id,
      bankName: selectedProvider.id === "others" ? payCustomBank.trim() : selectedProvider.name,
      accountName: payAccountName.trim(),
      accountNumber: cleanNum,
      qrImage: payQrImage
    };

    setProfile((prev) => ({ ...prev, payments: [...prev.payments, newPayment] }));
    setSelectedProvider(null);
    setShowPaymentModal(false);
  };

  const removePayment = (id) => {
    setProfile((prev) => ({
      ...prev,
      payments: prev.payments.filter((item) => item.id !== id)
    }));
  };

  // --- SAVE PROFILE & SWITCH TO VIEW ---
  const handleSaveProfile = () => {
    localStorage.setItem("smarttap_v2_profile", JSON.stringify(profile));
    localStorage.setItem("smarttap_v2_setup_done", "true");
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      setScreen("view");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  // --- VIEWER ACTIONS ---
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

  if (!isLoaded) return null;

  // ============================================================================
  // SCREEN 1: CLAIM & SETUP WELCOME PAGE
  // ============================================================================
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
              Activate your personal digital profile. Share your social links, contact info, photos, and payment details with a single tap.
            </p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 text-left space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Create your owner login to protect your profile</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Customize links, photos, themes & bank QR codes</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Edit anytime directly from your profile page</span>
            </div>
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

  // ============================================================================
  // SCREEN 2: ACCOUNT REGISTRATION / OWNER LOGIN LOCK
  // ============================================================================
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
                {isOwnerLock ? "Owner Verification" : "Create Your SmartTap Account"}
              </h2>
              <p className="text-xs text-slate-400">
                {isOwnerLock
                  ? "Sign in with your owner account to edit your SmartTap profile."
                  : "Bind this SmartTap card to your account so only you can edit it."}
              </p>
            </div>

            {/* Continue with Google */}
            {(!isOwnerLock || account?.provider === "google") && (
              <button
                type="button"
                onClick={handleGoogleContinue}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm flex items-center justify-center gap-3 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z" />
                  <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z" />
                </svg>
                Continue with Google
              </button>
            )}

            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-xs text-slate-500 uppercase">or with credentials</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleManualAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Username, Email, or Phone Number
                </label>
                <input
                  type="text"
                  value={authIdentifier}
                  onChange={(e) => setAuthIdentifier(e.target.value)}
                  placeholder="e.g. juandelacruz or 09171234567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
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
                {isOwnerLock ? "Verify & Open Editor" : "Create Account & Setup Card"}
              </button>
            </form>
          </div>
        </main>

        <div />
      </div>
    );
  }

  // ============================================================================
  // SCREEN 3: EDIT YOUR SMARTTAP CARD (SETUP & EDITOR)
  // ============================================================================
  if (screen === "edit") {
    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-200 pb-24`}>
        {/* Top Bar */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${theme.card}`}>
          <div className="max-w-xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <BrandLogo size="sm" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-400">
                Editor Mode
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Edit Your SmartTap Card</h1>
            <p className={`text-xs mt-1 ${theme.subtext}`}>
              Only fields you fill out will appear on your public SmartTap profile.
            </p>
          </div>

          {/* 1. PROFILE SECTION */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center gap-2 font-semibold text-base">
              <User className="w-5 h-5 text-indigo-400" />
              <h2>Profile Information</h2>
            </div>

            {/* Avatar Picker */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500/40 bg-slate-800 flex items-center justify-center shrink-0">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-slate-500" />
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition ${theme.pill}`}
                >
                  <ImageIcon className="w-4 h-4 text-indigo-400" />
                  Select from Photos
                </button>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition ${theme.pill}`}
                >
                  <Camera className="w-4 h-4 text-indigo-400" />
                  Take a Picture
                </button>
              </div>
            </div>

            <div className="space-y-3">
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

              <div>
                <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>Bio / Title (Optional)</label>
                <textarea
                  rows={2}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Entrepreneur | Creative Director | Manila, PH"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${theme.input}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>
                    Phone Number (Call & Save Contact)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="09171234567"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${theme.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme.subtext}`}>
                    Email Address (Direct Gmail Compose)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="you@gmail.com"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${theme.input}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. FEATURED PHOTOS (UP TO 4) */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <ImageIcon className="w-5 h-5 text-indigo-400" />
                <h2>Featured Pictures (Up to 4)</h2>
              </div>
              <span className={`text-xs ${theme.subtext}`}>{profile.photos.length}/4</span>
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
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
            />
          </section>

          {/* 3. SOCIAL & CUSTOM LINKS */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <LinkIcon className="w-5 h-5 text-indigo-400" />
                <h2>Social & Custom Links</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPlatform(null);
                  setShowLinkModal(true);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition ${theme.accent}`}
              >
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>

            {profile.links.length === 0 ? (
              <p className={`text-xs py-3 text-center rounded-xl border border-dashed border-slate-700/60 ${theme.subtext}`}>
                No links added yet. Click &ldquo;Add Link&rdquo; to add Facebook, Instagram, TikTok, and more.
              </p>
            ) : (
              <div className="space-y-2.5">
                {profile.links.map((item) => {
                  const plat = SOCIAL_PLATFORMS.find((p) => p.id === item.platformId) || SOCIAL_PLATFORMS[12];
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-xl border ${theme.pill}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-8 h-8 rounded-lg ${plat.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                          {plat.badge}
                        </span>
                        <div className="truncate">
                          <p className="text-sm font-semibold truncate">{item.label}</p>
                          <p className={`text-xs truncate ${theme.subtext}`}>{item.url}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLink(item.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* 4. THEMES (4 OPTIONS) */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center gap-2 font-semibold text-base">
              <Palette className="w-5 h-5 text-indigo-400" />
              <h2>Profile Theme</h2>
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
                      isSelected
                        ? "border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-500/10"
                        : `${theme.pill}`
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full border-2 ${t.swatch}`} />
                    <span className="text-xs font-semibold leading-tight">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 5. PAYMENT METHODS & QR */}
          <section className={`rounded-2xl border p-5 space-y-4 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-base">
                <CreditCard className="w-5 h-5 text-indigo-400" />
                <h2>Payment & Bank Accounts</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedProvider(null);
                  setShowPaymentModal(true);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition ${theme.accent}`}
              >
                <Plus className="w-4 h-4" />
                Add Payment
              </button>
            </div>

            {profile.payments.length === 0 ? (
              <p className={`text-xs py-3 text-center rounded-xl border border-dashed border-slate-700/60 ${theme.subtext}`}>
                Optional: Add GCash, Maya, MariBank, GoTyme, BDO, BPI, or other banks with QR code.
              </p>
            ) : (
              <div className="space-y-2.5">
                {profile.payments.map((pay) => {
                  const prov = PAYMENT_PROVIDERS.find((p) => p.id === pay.providerId) || PAYMENT_PROVIDERS[10];
                  return (
                    <div
                      key={pay.id}
                      className={`flex items-center justify-between p-3 rounded-xl border ${theme.pill}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-9 h-9 rounded-lg ${prov.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                          {prov.badge}
                        </span>
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">{pay.bankName}</p>
                            {pay.qrImage && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-medium">
                                + QR
                              </span>
                            )}
                          </div>
                          <p className={`text-xs truncate ${theme.subtext}`}>
                            {pay.accountName} • {pay.accountNumber}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePayment(pay.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>

        {/* Sticky Bottom Save Button */}
        <div className={`fixed bottom-0 inset-x-0 p-4 border-t backdrop-blur-md ${theme.card}`}>
          <div className="max-w-xl mx-auto">
            <button
              type="button"
              onClick={handleSaveProfile}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              {saveToast ? "Saved! Opening Your Profile..." : "Save & Publish SmartTap Profile"}
            </button>
          </div>
        </div>

        {/* MODAL: ADD SOCIAL LINK */}
        {showLinkModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {selectedPlatform ? `Add ${selectedPlatform.name}` : "Choose a Platform"}
                </h3>
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!selectedPlatform ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {SOCIAL_PLATFORMS.map((plat) => (
                    <button
                      key={plat.id}
                      type="button"
                      onClick={() => openAddLink(plat)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-left transition"
                    >
                      <span className={`w-7 h-7 rounded-lg ${plat.color} text-white text-[11px] font-bold flex items-center justify-center shrink-0`}>
                        {plat.badge}
                      </span>
                      <span className="text-xs font-semibold truncate">{plat.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={saveNewLink} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Display Label</label>
                    <input
                      type="text"
                      value={linkInputLabel}
                      onChange={(e) => setLinkInputLabel(e.target.value)}
                      placeholder="e.g. My Facebook Page"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      {selectedPlatform.id === "email" ? "Email Address" : "Profile / Destination Link"}
                    </label>
                    <input
                      type="text"
                      required
                      value={linkInputUrl}
                      onChange={(e) => setLinkInputUrl(e.target.value)}
                      placeholder={selectedPlatform.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform(null)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold"
                    >
                      Save Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* MODAL: ADD PAYMENT ACCOUNT */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {selectedProvider ? `Add ${selectedProvider.name}` : "Select Bank or E-Wallet"}
                </h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!selectedProvider ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {PAYMENT_PROVIDERS.map((prov) => (
                    <button
                      key={prov.id}
                      type="button"
                      onClick={() => openAddPayment(prov)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-left transition"
                    >
                      <span className={`w-7 h-7 rounded-lg ${prov.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>
                        {prov.badge}
                      </span>
                      <span className="text-xs font-semibold leading-tight">{prov.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={saveNewPayment} className="space-y-3.5">
                  {selectedProvider.id === "others" && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Bank or E-Wallet Name</label>
                      <input
                        type="text"
                        required
                        value={payCustomBank}
                        onChange={(e) => setPayCustomBank(e.target.value)}
                        placeholder="e.g. UnionBank, Security Bank, ShopeePay, Coins.ph"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      {selectedProvider.id === "mayabusiness" ? "Business / Account Name" : "Account Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={payAccountName}
                      onChange={(e) => setPayAccountName(e.target.value)}
                      placeholder="Juan Dela Cruz"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">{selectedProvider.label}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      maxLength={selectedProvider.digits || 20}
                      value={payAccountNumber}
                      onChange={(e) => setPayAccountNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder={selectedProvider.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-slate-700 text-sm text-white font-mono"
                    />
                  </div>

                  {/* Optional QR Upload */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">
                      InstaPay / Payment QR Code (Optional)
                    </label>
                    <input
                      ref={qrInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleQrUpload}
                      className="hidden"
                    />
                    {payQrImage ? (
                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#090d16] border border-slate-700">
                        <img src={payQrImage} alt="QR Preview" className="w-14 h-14 rounded-lg object-cover bg-white" />
                        <div className="flex-1 text-xs text-slate-300">QR Code Attached</div>
                        <button
                          type="button"
                          onClick={() => setPayQrImage("")}
                          className="text-xs text-rose-400 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => qrInputRef.current?.click()}
                        className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-600 text-xs text-slate-300 hover:border-indigo-400 flex items-center justify-center gap-2"
                      >
                        <QrCode className="w-4 h-4 text-indigo-400" />
                        Upload QR Code Image
                      </button>
                    )}
                  </div>

                  {payError && (
                    <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2">
                      {payError}
                    </p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedProvider(null)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold"
                    >
                      Save Payment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // SCREEN 4: PUBLIC VIEWERS PAGE (LIVE SMARTTAP CARD PROFILE)
  // ============================================================================
  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-200 flex flex-col justify-between py-6 px-4`}>
      <div className="max-w-md w-full mx-auto space-y-5">
        {/* Top Bar with Brand Logo & Owner Pencil Edit Button */}
        <div className="flex items-center justify-between">
          <BrandLogo size="sm" />
          <button
            type="button"
            onClick={() => {
              setAuthIdentifier("");
              setAuthPassword("");
              setAuthError("");
              setScreen("login_to_edit");
            }}
            title="Owner Edit Profile"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition ${theme.pill}`}
          >
            <Pencil className="w-3.5 h-3.5 text-indigo-400" />
            <span>Edit</span>
          </button>
        </div>

        {/* Main Profile Card */}
        <div className={`rounded-3xl border p-6 space-y-6 shadow-xl ${theme.card}`}>
          {/* 1. Avatar, Name & Bio */}
          <div className="text-center space-y-3">
            <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-2 border-indigo-500/50 shadow-md bg-slate-800 flex items-center justify-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-indigo-400">
                  {(profile.name || "ST").slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                {profile.name || "SmartTap User"}
              </h1>
              {profile.bio && (
                <p className={`text-xs mt-1 leading-relaxed ${theme.subtext}`}>
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          {/* 2. Featured Photos (Right after Profile Info, only if uploaded) */}
          {profile.photos.length > 0 && (
            <div className={`grid gap-2 ${profile.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {profile.photos.map((photo, index) => (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden border border-slate-700/40 ${
                    profile.photos.length === 1 ? "aspect-video" : "aspect-square"
                  }`}
                >
                  <img src={photo} alt={`Featured ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* 3. Personal Contact Info (Call, Save Contact, Direct Gmail Compose) */}
          {(profile.phone || profile.email) && (
            <div className="space-y-2.5">
              {profile.phone && (
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${profile.phone}`}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${theme.pill}`}
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleSaveContactVCard}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${theme.accent}`}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Save Contact</span>
                  </button>
                </div>
              )}

              {profile.email && (
                <a
                  href={getGmailComposeUrl(profile.email)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${theme.pill}`}
                >
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span>Email ({profile.email})</span>
                </a>
              )}
            </div>
          )}

          {/* 4. Links Section (Only shows links added by user) */}
          {profile.links.length > 0 && (
            <div className="space-y-2.5">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${theme.subtext}`}>
                Links & Socials
              </p>
              <div className="space-y-2">
                {profile.links.map((item) => {
                  const plat = SOCIAL_PLATFORMS.find((p) => p.id === item.platformId) || SOCIAL_PLATFORMS[12];
                  const href =
                    item.platformId === "email"
                      ? getGmailComposeUrl(item.url)
                      : item.url;

                  return (
                    <a
                      key={item.id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 rounded-xl border transition ${theme.pill}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-8 h-8 rounded-lg ${plat.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                          {plat.badge}
                        </span>
                        <span className="text-sm font-semibold truncate">{item.label}</span>
                      </div>
                      <ExternalLink className={`w-4 h-4 shrink-0 ${theme.subtext}`} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. Payment Section (Only shows if user added at least 1 bank/e-wallet) */}
          {profile.payments.length > 0 && (
            <div className="space-y-2.5">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${theme.subtext}`}>
                Payment & Transfers
              </p>
              <div className="space-y-2.5">
                {profile.payments.map((pay) => {
                  const prov = PAYMENT_PROVIDERS.find((p) => p.id === pay.providerId) || PAYMENT_PROVIDERS[10];
                  return (
                    <div
                      key={pay.id}
                      className={`p-3.5 rounded-2xl border space-y-2.5 ${theme.pill}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-lg ${prov.color} text-white text-[11px] font-bold flex items-center justify-center`}>
                            {prov.badge}
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
                        <span className="font-mono text-sm font-semibold tracking-wide">
                          {pay.accountNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(pay.accountNumber, pay.id)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-1 transition"
                        >
                          {copiedId === pay.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with SmartTap Promo & TikTok Shop Link */}
      <footer className="max-w-md w-full mx-auto text-center pt-8 pb-2 space-y-1.5">
        <div className="flex justify-center opacity-80">
          <BrandLogo size="sm" />
        </div>
        <p className={`text-xs ${theme.subtext}`}>
          Tap smarter. Share your world in one touch.
        </p>
        <p className={`text-[11px] ${theme.subtext}`}>
          Want to get your own SmartTap card?{" "}
          <a
            href={TIKTOK_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline font-semibold"
          >
            Order here on our TikTok Shop →
          </a>
        </p>
      </footer>

      {/* VIEWER QR MODAL WITH SAVE TO PHOTOS */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{activeQrModal.bankName} QR</span>
              <button
                onClick={() => setActiveQrModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white p-3 rounded-2xl inline-block mx-auto">
              <img
                src={activeQrModal.qrImage}
                alt="Payment QR"
                className="w-56 h-56 object-contain"
              />
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
              <Download className="w-4 h-4" />
              Save QR to Photos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
