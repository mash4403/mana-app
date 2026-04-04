import { useState, useEffect, useRef } from "react";

// ─── CORPORATE PALETTE ─────────────────────────────────
const COLORS = {
  bg: "#FAFAF6",
  bgWarm: "#F5F3ED",
  bgDark: "#1B3A14",
  primary: "#6A9033",
  primaryDark: "#4E6E22",
  primaryLight: "#EFF4E8",
  primarySoft: "#D4E3BF",
  secondary: "#135193",
  secondaryLight: "#E8EFF8",
  secondaryDark: "#0E3D6E",
  accent: "#D4A629",
  accentWarm: "#E8C44A",
  accentLight: "#FBF5E0",
  text: "#1E2A16",
  textLight: "#5A6652",
  textMuted: "#94A08A",
  white: "#FFFFFF",
  danger: "#C25B5B",
  warning: "#D4A629",
};

const ROUTES = [
  {
    id: "oncologia",
    title: "Oncología Integrativa",
    subtitle: "Acompañamiento en tu proceso oncológico",
    icon: "🌿",
    color: COLORS.primary,
    colorLight: COLORS.primaryLight,
    modules: [
      { id: 1, title: "Comprender el diagnóstico", duration: "8 min", type: "lectura", completed: true },
      { id: 2, title: "Qué esperar del tratamiento", duration: "10 min", type: "video", completed: true },
      { id: 3, title: "Nutrición y energía", duration: "12 min", type: "lectura", completed: false },
      { id: 4, title: "Mente–cuerpo en cáncer", duration: "9 min", type: "audio", completed: false },
      { id: 5, title: "Tratamientos integrativos", duration: "11 min", type: "video", completed: false },
      { id: 6, title: "Señales de alerta", duration: "7 min", type: "lectura", completed: false },
    ],
  },
  {
    id: "antiedad",
    title: "Medicina Antiedad y Tricología",
    subtitle: "Envejecimiento saludable y salud capilar",
    icon: "✨",
    color: "#7B9E3F",
    colorLight: "#F2F6EB",
    modules: [
      { id: 1, title: "Envejecimiento saludable", duration: "8 min", type: "lectura", completed: true },
      { id: 2, title: "Metabolismo y hormonas", duration: "10 min", type: "video", completed: false },
      { id: 3, title: "Salud capilar", duration: "9 min", type: "lectura", completed: false },
      { id: 4, title: "Nutrición y micronutrientes", duration: "11 min", type: "audio", completed: false },
      { id: 5, title: "Intervenciones integrativas", duration: "10 min", type: "video", completed: false },
      { id: 6, title: "Señales de alerta", duration: "7 min", type: "lectura", completed: false },
    ],
  },
  {
    id: "funcional",
    title: "Medicina Funcional",
    subtitle: "Salud desde la raíz y el equilibrio",
    icon: "🔬",
    color: COLORS.secondary,
    colorLight: COLORS.secondaryLight,
    modules: [
      { id: 1, title: "¿Qué es la medicina funcional?", duration: "7 min", type: "lectura", completed: false },
      { id: 2, title: "Tu cuerpo como sistema", duration: "10 min", type: "video", completed: false },
      { id: 3, title: "Alimentación consciente", duration: "12 min", type: "lectura", completed: false },
      { id: 4, title: "Manejo del estrés", duration: "9 min", type: "audio", completed: false },
      { id: 5, title: "Sueño y recuperación", duration: "8 min", type: "video", completed: false },
      { id: 6, title: "Plan de bienestar", duration: "10 min", type: "lectura", completed: false },
    ],
  },
  {
    id: "espiritu",
    title: "Cuerpo, Alma y Espíritu",
    subtitle: "Sanación emocional y conexión interior",
    icon: "🕊️",
    color: "#3A7048",
    colorLight: "#E8F2EA",
    modules: [
      { id: 1, title: "Dimensión espiritual de la salud", duration: "8 min", type: "lectura", completed: false },
      { id: 2, title: "Emociones y enfermedad", duration: "11 min", type: "video", completed: false },
      { id: 3, title: "Meditación y respiración", duration: "15 min", type: "audio", completed: false },
      { id: 4, title: "Perdón y liberación", duration: "10 min", type: "lectura", completed: false },
      { id: 5, title: "Propósito y sentido", duration: "9 min", type: "video", completed: false },
      { id: 6, title: "Tu camino de sanación", duration: "8 min", type: "lectura", completed: false },
    ],
  },
];

const MOCK_MESSAGES = [
  { id: 1, from: "patient", text: "Doctor, tengo una duda sobre la dosis del suplemento de vitamina D que me recetó.", time: "10:30 AM", date: "Hoy" },
  { id: 2, from: "admin", text: "Hola María, tu mensaje fue recibido. El Dr. Saavedra lo revisará hoy.", time: "10:45 AM", date: "Hoy", isSystem: true },
  { id: 3, from: "doctor", text: "Hola María. La dosis indicada es de 2000 UI diarias con el desayuno. Si presentas alguna molestia gástrica, puedes tomarla con el almuerzo. ¿Alguna otra inquietud?", time: "2:15 PM", date: "Hoy", doctorName: "Dr. Miguel Saavedra" },
];

const MODULE_CONTENT = {
  title: "Nutrición y energía en cáncer",
  type: "lectura",
  duration: "12 min",
  sections: [
    { text: "Durante el proceso oncológico, la nutrición cumple un papel fundamental en el mantenimiento de la energía, la tolerancia a los tratamientos y el bienestar general." },
    { text: "No se trata de seguir dietas extremas ni de buscar soluciones milagrosas, sino de apoyar al cuerpo de forma adecuada y segura." },
    { text: "Las necesidades nutricionales pueden cambiar a lo largo del tratamiento. Algunas personas presentan disminución del apetito, cambios en el gusto o fatiga, mientras que otras mantienen una alimentación cercana a la habitual." },
  ],
  tip: "Antes de realizar cambios importantes en la alimentación o iniciar suplementos, consúltalo con tu equipo médico o nutricional.",
  resources: [
    { type: "video", title: "Alimentación durante el tratamiento", duration: "6:30" },
    { type: "audio", title: "Meditación antes de comer", duration: "4:15" },
    { type: "lectura", title: "Guía de nutrientes esenciales", pages: "3 págs" },
  ],
};

// ─── NAV HEIGHT constante para evitar números mágicos ──
const NAV_HEIGHT = 64;

// ─── ICONS ─────────────────────────────────────────────
const I = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Back: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Play: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Clock: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Headphones: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  FileText: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Alert: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Msg: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Cal: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  WA: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  Steth: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
  Shield: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Info: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
};

const TIcon = ({ type }) => {
  if (type === "video") return <I.Play />;
  if (type === "audio") return <I.Headphones />;
  return <I.FileText />;
};

// ─── SPLASH ────────────────────────────────────────────
function Splash({ onEnter }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <div style={{ height: "100dvh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(165deg, ${COLORS.bgDark} 0%, #3D6B1E 40%, ${COLORS.primary} 100%)`, padding: "40px 30px", textAlign: "center", transition: "opacity 0.6s", opacity: show ? 1 : 0 }}>
      <div style={{ width: 48, height: 3, borderRadius: 2, marginBottom: 24, background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)` }} />

      {/* FIX 1: Logo container más grande, imagen ajustada con overflow hidden */}
      <div style={{ width: 140, height: 140, borderRadius: 32, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
        <img src="/logo.png" alt="Maná en Casa" style={{ width: 120, height: 120, objectFit: "contain" }} />
      </div>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "0 0 44px", lineHeight: 1.6, maxWidth: 240 }}>
        Acompañamiento integrativo para tu bienestar, desde casa y a tu ritmo.
      </p>

      <button onClick={onEnter} style={{ background: COLORS.accent, color: "#1E2A16", border: "none", borderRadius: 14, padding: "15px 52px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px rgba(212,166,41,0.3)", letterSpacing: "0.02em" }}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
        Comenzar
      </button>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", margin: "44px 0 0", lineHeight: 1.4, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Centro Médico Integrativo Maná · Cali
      </p>
    </div>
  );
}

// ─── HOME ──────────────────────────────────────────────
function Home({ onSelectRoute }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 50); }, []);

  const total = ROUTES.reduce((a, r) => a + r.modules.length, 0);
  const done = ROUTES.reduce((a, r) => a + r.modules.filter(m => m.completed).length, 0);

  return (
    /* FIX 2: Un solo paddingBottom controlado con la constante NAV_HEIGHT */
    <div style={{ height: "100dvh", overflowY: "auto", background: COLORS.bg, transition: "opacity 0.4s", opacity: show ? 1 : 0, paddingBottom: NAV_HEIGHT + 20 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(165deg, ${COLORS.bgDark} 0%, #3D6B1E 100%)`, padding: "24px 20px 30px", borderRadius: "0 0 24px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0, letterSpacing: "0.04em" }}>
              Bienvenido de nuevo
            </p>
            {/* FIX 3: Texto limpio, un solo emoji */}
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, color: COLORS.white, margin: "4px 0 0", fontWeight: 600 }}>
              Tu espacio de bienestar 👋
            </h2>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)" }}>
            <I.User />
          </div>
        </div>

        {/* Progress */}
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Tu progreso</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.accentWarm, fontWeight: 600 }}>{done}/{total}</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.12)", borderRadius: 3 }}>
            <div style={{ height: "100%", width: `${(done / total) * 100}%`, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentWarm})`, borderRadius: 3 }} />
          </div>
        </div>
      </div>

      {/* Routes list — FIX 2: sin padding-bottom duplicado */}
      <div style={{ padding: "22px 20px 0" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: COLORS.text, margin: "0 0 4px", fontWeight: 600 }}>Rutas de bienestar</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textMuted, margin: "0 0 16px" }}>Selecciona la que mejor se adapte a ti</p>

        {ROUTES.map((route, i) => {
          const c = route.modules.filter(m => m.completed).length;
          const p = (c / route.modules.length) * 100;
          return (
            <div key={route.id} onClick={() => onSelectRoute(route)}
              style={{ background: COLORS.white, borderRadius: 18, padding: "16px", marginBottom: 12, cursor: "pointer", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 1px 8px rgba(0,0,0,0.03)", animation: `fadeUp 0.4s ease ${i * 0.07}s both`, transition: "transform 0.15s" }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: route.colorLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{route.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.text, margin: "0 0 2px" }}>{route.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.textMuted, margin: "0 0 8px" }}>{route.subtitle}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 3, background: "#EEEEEA", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${p}%`, background: route.color, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: COLORS.textMuted }}>{c}/{route.modules.length}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Quick contact */}
        <div style={{ background: COLORS.accentLight, borderRadius: 16, padding: "14px 16px", marginTop: 6, border: `1px solid ${COLORS.accent}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white }}><I.Steth /></div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.text, margin: 0 }}>¿Necesitas orientación?</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.textLight, margin: "1px 0 0" }}>Escríbele a tu equipo de Maná</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROUTE ─────────────────────────────────────────────
function Route({ route, onBack, onSelectModule }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 50); }, []);
  const done = route.modules.filter(m => m.completed).length;

  return (
    <div style={{ height: "100dvh", overflowY: "auto", background: COLORS.bg, transition: "opacity 0.3s", opacity: show ? 1 : 0, paddingBottom: NAV_HEIGHT + 20 }}>
      <div style={{ background: `linear-gradient(165deg, ${route.color}E8 0%, ${route.color} 100%)`, padding: "18px 20px 26px", borderRadius: "0 0 24px 24px" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, cursor: "pointer", marginBottom: 14 }}><I.Back /></button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>{route.icon}</span>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, color: COLORS.white, margin: 0, fontWeight: 600 }}>{route.title}</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.65)", margin: "3px 0 0" }}>{done} de {route.modules.length} módulos completados</p>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 20px 0" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Módulos</p>
        {route.modules.map((mod, i) => {
          const isNext = !mod.completed && (i === 0 || route.modules[i - 1].completed);
          const isLocked = !mod.completed && !isNext;
          return (
            <div key={mod.id} onClick={() => !isLocked && onSelectModule(mod)} style={{ display: "flex", alignItems: "center", gap: 12, background: isLocked ? "rgba(255,255,255,0.5)" : COLORS.white, borderRadius: 14, padding: "14px", marginBottom: 8, cursor: isLocked ? "default" : "pointer", opacity: isLocked ? 0.45 : 1, border: isNext ? `2px solid ${route.color}` : "1px solid rgba(0,0,0,0.04)", boxShadow: isNext ? `0 3px 14px ${route.color}1A` : "none", animation: `fadeUp 0.3s ease ${i * 0.05}s both` }}
              onMouseDown={e => { if (!isLocked) e.currentTarget.style.transform = "scale(0.98)"; }}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: mod.completed ? route.color : isNext ? route.colorLight : "#F0F0EC", display: "flex", alignItems: "center", justifyContent: "center", color: mod.completed ? COLORS.white : isLocked ? COLORS.textMuted : route.color, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700 }}>
                {mod.completed ? <I.Check /> : isLocked ? <I.Lock /> : mod.id}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: isLocked ? COLORS.textMuted : COLORS.text, margin: 0 }}>{mod.title}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 2, color: COLORS.textMuted }}><I.Clock /><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10 }}>{mod.duration}</span></span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, color: route.color, background: route.colorLight, padding: "2px 7px", borderRadius: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>{mod.type}</span>
                </div>
              </div>
              {isNext && <div style={{ width: 30, height: 30, borderRadius: 9, background: route.color, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white }}><I.Play /></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MODULE ────────────────────────────────────────────
function Module({ module, route, onBack }) {
  const [show, setShow] = useState(false);
  const [sp, setSp] = useState(0);
  const ref = useRef(null);
  useEffect(() => { setTimeout(() => setShow(true), 50); }, []);
  const onScroll = () => { const el = ref.current; if (el) setSp(Math.min(el.scrollTop / (el.scrollHeight - el.clientHeight), 1)); };
  const c = MODULE_CONTENT;

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", background: COLORS.bg, transition: "opacity 0.3s", opacity: show ? 1 : 0 }}>
      <div style={{ padding: "14px 18px 10px", display: "flex", alignItems: "center", gap: 10, background: COLORS.white, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", color: COLORS.text, display: "flex" }}><I.Back /></button>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.text, margin: 0 }}>Módulo {module.id}</p>
          <div style={{ height: 3, background: "#EEEEEA", borderRadius: 2, marginTop: 5 }}><div style={{ height: "100%", width: `${sp * 100}%`, background: route.color, borderRadius: 2, transition: "width 0.1s" }} /></div>
        </div>
      </div>
      <div ref={ref} onScroll={onScroll} style={{ flex: 1, overflowY: "auto", padding: "22px 20px 36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: route.color, background: route.colorLight, padding: "3px 8px", borderRadius: 6, textTransform: "uppercase" }}><TIcon type={c.type} />{c.type}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: COLORS.textMuted }}><I.Clock /> {c.duration}</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 600, color: COLORS.text, margin: "0 0 18px", lineHeight: 1.3 }}>{c.title}</h1>
        <div style={{ background: `linear-gradient(135deg, ${route.color}12, ${route.color}06)`, borderRadius: 14, padding: "36px 20px", marginBottom: 22, display: "flex", flexDirection: "column", alignItems: "center", border: `1px solid ${route.color}18` }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: route.color, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, marginBottom: 10, boxShadow: `0 4px 14px ${route.color}40` }}><I.Play /></div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight, margin: 0 }}>Reproducir contenido</p>
        </div>
        {c.sections.map((s, i) => <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.text, lineHeight: 1.7, margin: "0 0 14px" }}>{s.text}</p>)}
        <div style={{ background: COLORS.accentLight, borderRadius: 14, padding: "14px 16px", marginTop: 6, marginBottom: 22, borderLeft: `3px solid ${COLORS.accent}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}><span style={{ color: COLORS.accent }}><I.Alert /></span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.accent }}>Para tener en cuenta</span></div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight, lineHeight: 1.6, margin: 0 }}>{c.tip}</p>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Recursos</p>
        {c.resources.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: COLORS.white, borderRadius: 12, padding: "12px 14px", marginBottom: 7, border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: r.type === "video" ? COLORS.secondaryLight : r.type === "audio" ? COLORS.primaryLight : COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center", color: r.type === "video" ? COLORS.secondary : r.type === "audio" ? COLORS.primary : COLORS.accent }}><TIcon type={r.type} /></div>
            <div style={{ flex: 1 }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.text, margin: 0 }}>{r.title}</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: COLORS.textMuted, margin: "1px 0 0" }}>{r.duration || r.pages}</p></div>
          </div>
        ))}
        <button style={{ width: "100%", background: route.color, color: COLORS.white, border: "none", borderRadius: 14, padding: "15px", marginTop: 18, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: `0 4px 14px ${route.color}35` }}>Completar módulo ✓</button>
      </div>
    </div>
  );
}

// ─── MESSAGES ──────────────────────────────────────────
function Messages({ onBack }) {
  const [show, setShow] = useState(false);
  const [msgs, setMsgs] = useState(MOCK_MESSAGES);
  const [txt, setTxt] = useState("");
  const [sending, setSending] = useState(false);
  const ref = useRef(null);
  useEffect(() => { setTimeout(() => setShow(true), 50); }, []);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [msgs]);

  const send = () => {
    if (!txt.trim()) return;
    setMsgs(p => [...p, { id: Date.now(), from: "patient", text: txt, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setTxt(""); setSending(true);
    setTimeout(() => {
      setMsgs(p => [...p, { id: Date.now() + 1, from: "admin", text: "Tu mensaje fue recibido. El equipo médico lo revisará pronto.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isSystem: true }]);
      setSending(false);
    }, 1500);
  };

  return (
    /* FIX 5: paddingBottom respeta el nav fijo */
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", background: COLORS.bg, transition: "opacity 0.3s", opacity: show ? 1 : 0, paddingBottom: NAV_HEIGHT }}>
      {/* Header */}
      <div style={{ background: COLORS.white, padding: "14px 18px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", color: COLORS.text, display: "flex" }}><I.Back /></button>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.primary }}><I.Steth /></div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.text, margin: 0 }}>Mi médico tratante</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.textMuted, margin: "1px 0 0" }}>Dr. Miguel Saavedra · Hemato-Oncología</p>
          </div>
        </div>
      </div>
      {/* Info */}
      <div style={{ background: COLORS.secondaryLight, padding: "8px 18px", display: "flex", alignItems: "center", gap: 6, borderBottom: `1px solid ${COLORS.secondary}12` }}>
        <span style={{ color: COLORS.secondary, flexShrink: 0 }}><I.Info /></span>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: COLORS.secondary, margin: 0, lineHeight: 1.4 }}>Tus mensajes son canalizados por el equipo administrativo al médico. Respuesta: 24-48h hábiles.</p>
      </div>
      {/* Messages */}
      <div ref={ref} style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px" }}>
        {msgs.map((m, i) => {
          const isP = m.from === "patient"; const isA = m.isSystem; const isD = m.from === "doctor";
          return (
            <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: isP ? "flex-end" : "flex-start", marginBottom: 10, animation: `fadeUp 0.3s ease ${i * 0.04}s both` }}>
              {isD && <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3, marginLeft: 4 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: COLORS.primary }}>{m.doctorName}</span>
              </div>}
              {isA && <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3, marginLeft: 4 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white }}><I.Shield /></div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: COLORS.accent }}>Equipo Maná</span>
              </div>}
              <div style={{ maxWidth: "80%", padding: "11px 14px", borderRadius: isP ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isP ? COLORS.primary : isA ? COLORS.accentLight : COLORS.white, border: isP ? "none" : isA ? `1px solid ${COLORS.accent}25` : `1px solid ${COLORS.primary}12`, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: isP ? COLORS.white : COLORS.text, margin: 0, lineHeight: 1.5 }}>{m.text}</p>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: COLORS.textMuted, marginTop: 3, marginLeft: isP ? 0 : 4, marginRight: isP ? 4 : 0 }}>{m.time}</span>
            </div>
          );
        })}
        {sending && <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 4, animation: "fadeUp 0.3s ease both" }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.textMuted, animation: `pulse 1s ease ${i * 0.2}s infinite` }} />)}
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: COLORS.textMuted }}>Enviando...</span>
        </div>}
      </div>
      {/* Input */}
      <div style={{ padding: "10px 14px 14px", background: COLORS.white, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, background: COLORS.bgWarm, borderRadius: 18, padding: "3px 3px 3px 14px", border: "1px solid rgba(0,0,0,0.05)" }}>
          <textarea value={txt} onChange={e => setTxt(e.target.value)} placeholder="Escribe tu consulta..." rows={1}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            style={{ flex: 1, border: "none", background: "transparent", resize: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.text, padding: "9px 0", outline: "none", minHeight: 18, maxHeight: 72 }} />
          <button onClick={send} style={{ width: 38, height: 38, borderRadius: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: txt.trim() ? COLORS.primary : "#D8D8D2", color: COLORS.white, transition: "background 0.2s" }}><I.Send /></button>
        </div>
      </div>
    </div>
  );
}

// ─── APPOINTMENT ───────────────────────────────────────
function Appointment({ onBack }) {
  const [show, setShow] = useState(false);
  const [sel, setSel] = useState(null);
  useEffect(() => { setTimeout(() => setShow(true), 50); }, []);

  const types = [
    { id: "primera", label: "Primera vez", desc: "Consulta inicial con valoración integral", icon: "🩺", time: "60 min" },
    { id: "control", label: "Control / Seguimiento", desc: "Revisión de tu proceso y ajuste de plan", icon: "📋", time: "30 min" },
    { id: "resultado", label: "Revisión de resultados", desc: "Análisis de exámenes o estudios", icon: "🔬", time: "30 min" },
    { id: "urgente", label: "Consulta urgente", desc: "Síntomas que requieren atención pronta", icon: "⚡", time: "Variable" },
  ];
  const docs = [
    { name: "Dr. Miguel Saavedra", sp: "Hemato-Oncología", c: COLORS.primary },
    { name: "Dra. Natalia Alvarez", sp: "Nutriología / Antiedad", c: "#7B9E3F" },
    { name: "Dr. Juan M. Alvarez", sp: "Tricología / Capilar", c: COLORS.secondary },
    { name: "Martha L. Aguado", sp: "Psicoterapia", c: "#3A7048" },
  ];

  return (
    <div style={{ height: "100dvh", overflowY: "auto", background: COLORS.bg, transition: "opacity 0.3s", opacity: show ? 1 : 0, paddingBottom: NAV_HEIGHT + 20 }}>
      <div style={{ background: `linear-gradient(165deg, ${COLORS.secondaryDark} 0%, ${COLORS.secondary} 100%)`, padding: "18px 20px 26px", borderRadius: "0 0 24px 24px" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, cursor: "pointer", marginBottom: 14 }}><I.Back /></button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white }}><I.Cal /></div>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, color: COLORS.white, margin: 0, fontWeight: 600 }}>Agendar cita</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.65)", margin: "3px 0 0" }}>Te conectamos por WhatsApp</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Tipo de consulta</p>
        {types.map((t, i) => (
          <div key={t.id} onClick={() => setSel(t.id)} style={{ background: sel === t.id ? COLORS.secondaryLight : COLORS.white, borderRadius: 14, padding: "14px", marginBottom: 8, cursor: "pointer", border: sel === t.id ? `2px solid ${COLORS.secondary}` : "1px solid rgba(0,0,0,0.04)", boxShadow: sel === t.id ? `0 3px 14px ${COLORS.secondary}15` : "none", animation: `fadeUp 0.3s ease ${i * 0.05}s both`, transition: "all 0.2s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.text, margin: 0 }}>{t.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.textMuted, margin: "1px 0 0" }}>{t.desc}</p>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: COLORS.textMuted }}>{t.time}</span>
            </div>
          </div>
        ))}

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, margin: "18px 0 10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Especialistas</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {docs.map((d, i) => (
            <div key={i} style={{ background: COLORS.white, borderRadius: 12, padding: "12px", border: "1px solid rgba(0,0,0,0.04)", animation: `fadeUp 0.3s ease ${(i + 4) * 0.05}s both` }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: d.c + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: d.c }}>{d.name.charAt(0)}{d.name.split(" ").pop().charAt(0)}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: COLORS.text, margin: "0 0 1px", lineHeight: 1.3 }}>{d.name}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: COLORS.textMuted, margin: 0 }}>{d.sp}</p>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <div style={{ background: COLORS.primaryLight, borderRadius: 14, padding: "14px 16px", marginTop: 16, border: `1px solid ${COLORS.primary}12` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}><I.Clock /><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.primary }}>Horarios</span></div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight, margin: 0, lineHeight: 1.6 }}>Lun – Vie: 8:00 AM – 5:30 PM</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight, margin: "2px 0 0" }}>Sábado: 8:00 AM – 12:30 PM</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.textMuted, margin: "6px 0 0" }}>📍 Calle 26N #6 Bis - 38, Cali</p>
        </div>

        {/* WhatsApp */}
        <a href="https://wa.me/573182616433" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", marginTop: 18 }}>
          <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#25D366", color: COLORS.white, border: "none", borderRadius: 16, padding: "16px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 5px 20px rgba(37,211,102,0.3)" }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
            <I.WA /> Agendar por WhatsApp
          </button>
        </a>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: COLORS.textMuted, textAlign: "center", margin: "8px 0 0" }}>+57 318 261 6433</p>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ────────────────────────────────────────
function Nav({ active, onNav, unread }) {
  const items = [
    { id: "home", icon: <I.Home />, label: "Inicio" },
    { id: "messages", icon: <I.Msg />, label: "Mi Médico", badge: unread },
    { id: "appointment", icon: <I.Cal />, label: "Cita" },
    { id: "profile", icon: <I.User />, label: "Perfil" },
  ];
  return (
    /* FIX 4: position fixed + safe-area para iPhones con barra inferior */
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(0,0,0,0.05)",
      display: "flex", justifyContent: "space-around",
      padding: "5px 0 12px",
      paddingBottom: "max(12px, env(safe-area-inset-bottom))",
      zIndex: 100,
    }}>
      {items.map(it => (
        <button key={it.id} onClick={() => onNav(it.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 1, color: active === it.id ? COLORS.primary : COLORS.textMuted, padding: "4px 8px", transition: "color 0.2s", position: "relative" }}>
          <div style={{ position: "relative" }}>
            {it.icon}
            {it.badge && <div style={{ position: "absolute", top: -2, right: -4, width: 7, height: 7, borderRadius: "50%", background: COLORS.danger, border: "2px solid white" }} />}
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: active === it.id ? 700 : 500, marginTop: 1 }}>{it.label}</span>
          {active === it.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.primary, marginTop: 1 }} />}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────
export default function App() {
  const [scr, setScr] = useState("splash");
  const [route, setRoute] = useState(null);
  const [mod, setMod] = useState(null);
  const [tab, setTab] = useState("home");

  const nav = (id) => {
    setTab(id);
    if (id === "home") { setScr("home"); setRoute(null); setMod(null); }
    else if (id === "messages") setScr("messages");
    else if (id === "appointment") setScr("appointment");
    else setScr("home");
  };

  const showNav = scr !== "splash" && scr !== "module";

  return (
    <div style={{ height: "100dvh", width: "100%", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; min-height: 100%; }
        body { background: ${COLORS.bg}; }
        ::-webkit-scrollbar { width: 0; }
        textarea::placeholder { color: #AAA; }
      `}</style>

      {scr === "splash" && <Splash onEnter={() => { setScr("home"); setTab("home"); }} />}
      {scr === "home" && <Home onSelectRoute={(r) => { setRoute(r); setScr("route"); }} />}
      {scr === "route" && route && (
        <Route route={route} onBack={() => { setRoute(null); setScr("home"); setTab("home"); }} onSelectModule={(m) => { setMod(m); setScr("module"); }} />
      )}
      {scr === "module" && mod && route && (
        <Module module={mod} route={route} onBack={() => { setMod(null); setScr("route"); }} />
      )}
      {scr === "messages" && <Messages onBack={() => { setScr("home"); setTab("home"); }} />}
      {scr === "appointment" && <Appointment onBack={() => { setScr("home"); setTab("home"); }} />}

      {showNav && <Nav active={tab} onNav={nav} unread={true} />}

      {/* FIX 6: Botón flotante WhatsApp — posición calculada sobre el nav */}
      {showNav && (
        <a
          href="https://wa.me/573108211543?text=Hola%20quiero%20información%20sobre%20Maná%20en%20Casa"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed", bottom: NAV_HEIGHT + 24, right: 16,
            width: 54, height: 54, borderRadius: "50%",
            background: "#25D366",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
            zIndex: 99, textDecoration: "none", color: COLORS.white,
          }}
        >
          <I.WA />
        </a>
      )}
    </div>
  );
}
