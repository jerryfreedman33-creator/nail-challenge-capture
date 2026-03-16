import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lhurnpavasxhnadroyun.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxodXJucGF2YXN4aG5hZHJveXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1OTEwMDksImV4cCI6MjA4OTE2NzAwOX0.6T9YWspyyV4uSghyKBlIWnbhBPrUI8Hob4b1sJxi8B0"
);


const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --red: #dc2626;
    --red-dark: #991b1b;
    --bg: #080808;
    --surface: #111;
    --surface2: #1a1a1a;
    --border: #222;
    --text: #f0ece4;
    --muted: #666;
    --dim: #333;
  }
  html, body { height: 100%; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px;
  }
  .glow {
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }
  .page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 20px 64px;
    max-width: 480px;
    margin: 0 auto;
  }
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 28px;
    animation: fadeUp 0.6s ease both;
  }
  .eyebrow::before, .eyebrow::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--red);
    opacity: 0.4;
  }
  .nail-visual {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-bottom: 32px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .nail { display: flex; flex-direction: column; align-items: center; gap: 0; }
  .nail-head { width: 8px; height: 8px; background: var(--muted); border-radius: 50%; }
  .nail-body { width: 2px; background: linear-gradient(to bottom, var(--muted), #333); border-radius: 0 0 1px 1px; }
  .nail:nth-child(1) .nail-body { height: 28px; }
  .nail:nth-child(2) .nail-body { height: 36px; }
  .nail:nth-child(3) .nail-body { height: 22px; }
  .nail:nth-child(4) .nail-body { height: 40px; }
  .nail:nth-child(5) .nail-body { height: 30px; }
  .nail:nth-child(6) .nail-body { height: 18px; }
  .nail:nth-child(7) .nail-body { height: 34px; }
  .nail:nth-child(8) .nail-body { height: 26px; }
  .nail:nth-child(9) .nail-body { height: 38px; }
  .nail:nth-child(10) .nail-body { height: 24px; }
  .nail:nth-child(11) .nail-body { height: 32px; }
  .nail-active .nail-head { background: var(--red); box-shadow: 0 0 6px var(--red); }
  .nail-active .nail-body { background: linear-gradient(to bottom, var(--red), var(--red-dark)); }
  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 14vw, 72px);
    line-height: 0.9;
    letter-spacing: 0.02em;
    text-align: center;
    margin-bottom: 8px;
    animation: fadeUp 0.6s 0.15s ease both;
  }
  h1 em { font-style: normal; color: var(--red); display: block; }
  .sub {
    font-size: 14px;
    color: var(--muted);
    text-align: center;
    line-height: 1.6;
    max-width: 320px;
    margin: 0 auto 36px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .sub strong { color: var(--text); }
  .counter-bar {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    animation: fadeUp 0.6s 0.25s ease both;
  }
  .counter-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
  .counter-val { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--red); letter-spacing: 0.04em; line-height: 1; }
  .toggle {
    display: flex;
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    margin-bottom: 16px;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .toggle-btn {
    flex: 1; padding: 12px; background: none; border: none;
    color: var(--muted); font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s; position: relative;
  }
  .toggle-btn.active { color: var(--text); background: var(--surface2); }
  .toggle-btn.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--red); }
  .form-wrap { width: 100%; animation: fadeUp 0.6s 0.35s ease both; }
  .input-row { display: flex; gap: 8px; width: 100%; }
  .input-field {
    flex: 1; background: var(--surface); border: 1px solid var(--border);
    color: var(--text); padding: 14px 16px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; outline: none; transition: border-color 0.2s; min-width: 0;
  }
  .input-field::placeholder { color: var(--dim); }
  .input-field:focus { border-color: var(--red); }
  .submit-btn {
    background: var(--red); color: #fff; border: none; padding: 14px 20px;
    font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.06em;
    cursor: pointer; transition: background 0.2s; white-space: nowrap; flex-shrink: 0;
  }
  .submit-btn:hover:not(:disabled) { background: var(--red-dark); }
  .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .fine-print { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); text-align: center; margin-top: 10px; letter-spacing: 0.08em; }
  .error-msg { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--red); text-align: center; margin-top: 8px; letter-spacing: 0.05em; }
  .success {
    width: 100%; background: var(--surface); border: 1px solid var(--red);
    padding: 28px 24px; text-align: center; animation: fadeUp 0.4s ease both;
  }
  .success-icon { font-size: 32px; margin-bottom: 12px; }
  .success h3 { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 0.04em; margin-bottom: 6px; }
  .success p { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .proof { margin-top: 40px; width: 100%; animation: fadeUp 0.6s 0.45s ease both; }
  .proof-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--dim); text-align: center; margin-bottom: 16px; }
  .proof-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); }
  .proof-stat { background: var(--surface); padding: 14px 10px; text-align: center; }
  .proof-num { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--text); line-height: 1; margin-bottom: 2px; }
  .proof-desc { font-size: 9px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; font-family: 'DM Mono', monospace; }
  .handle { margin-top: 32px; font-family: 'DM Mono', monospace; font-size: 11px; color: var(--dim); letter-spacing: 0.12em; animation: fadeUp 0.6s 0.5s ease both; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 380px) {
    .input-row { flex-direction: column; }
    .submit-btn { width: 100%; padding: 14px; }
  }
`;

const NAILS = [0,1,2,3,4,5,6,7,8,9,10];
const ACTIVE = [1,3,6,8];

export default function NailCapture() {
  const [mode, setMode] = useState("email");
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const placeholder = mode === "email" ? "your@email.com" : "+1 (555) 000-0000";
  const inputType = mode === "email" ? "email" : "tel";

  const handleSubmit = async () => {
    if (!value.trim()) return;
    setLoading(true);
    setError("");

    try {
      // Always write to Supabase
      const { error: dbError } = await supabase
        .from("subscribers")
        .insert([{ contact: value.trim(), type: mode, source: "bio-link" }]);

      if (dbError) throw new Error(dbError.message);

      // If email, also subscribe to Beehiiv
      if (mode === "email") {
        const beehiivRes = await fetch('/api/subscribe-beehiiv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: value.trim() }),
        });

        if (!beehiivRes.ok) {
          // Supabase write succeeded - don't block success on Beehiiv
          console.warn("Beehiiv subscription failed:", await beehiivRes.text());
        }
      }

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{STYLE}</style>
      <div className="grain" />
      <div className="glow" />
      <div className="page">
        <div className="eyebrow">The Nail Challenge</div>

        <div className="nail-visual">
          {NAILS.map(i => (
            <div className={`nail ${ACTIVE.includes(i) ? "nail-active" : ""}`} key={i}>
              <div className="nail-head" />
              <div className="nail-body" />
            </div>
          ))}
        </div>

        <h1>Know<em>Tomorrow's</em>Count</h1>

        <p className="sub">
          Every day I stand on nails <strong>one second per follower gained.</strong> Get tomorrow's number before I post it — straight to your inbox or phone.
        </p>

        <div className="counter-bar">
          <span className="counter-label">Current day</span>
          <span className="counter-val">Day 401+</span>
          <span className="counter-label">615K followers</span>
        </div>

        {!submitted ? (
          <div className="form-wrap">
            <div className="toggle">
              <button className={`toggle-btn ${mode === "email" ? "active" : ""}`} onClick={() => { setMode("email"); setValue(""); setError(""); }}>Email</button>
              <button className={`toggle-btn ${mode === "sms" ? "active" : ""}`} onClick={() => { setMode("sms"); setValue(""); setError(""); }}>Text / SMS</button>
            </div>
            <div className="input-row">
              <input
                className="input-field"
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKey}
                autoComplete={mode === "email" ? "email" : "tel"}
              />
              <button className="submit-btn" onClick={handleSubmit} disabled={!value.trim() || loading}>
                {loading ? "..." : "In"}
              </button>
            </div>
            {error && <div className="error-msg">{error}</div>}
            <div className="fine-print">No spam. Just tomorrow's nail count. Unsubscribe anytime.</div>
          </div>
        ) : (
          <div className="success">
            <div className="success-icon">Ã°ÂÂ©Â¸</div>
            <h3>You're In</h3>
            <p>Tomorrow's count comes to you first.<br />Every follower you bring adds one more second.</p>
          </div>
        )}

        <div className="proof">
          <div className="proof-label">Why people follow</div>
          <div className="proof-stats">
            <div className="proof-stat"><div className="proof-num">401+</div><div className="proof-desc">Days straight</div></div>
            <div className="proof-stat"><div className="proof-num">8M</div><div className="proof-desc">Views day 6</div></div>
            <div className="proof-stat"><div className="proof-num">615K</div><div className="proof-desc">Followers</div></div>
          </div>
        </div>

        <div className="handle">@itsJerryFreedman</div>
      </div>
    </>
  );
}
