import React, { useState, useEffect, useRef } from "react";

/**
 * FADEL AI v76.0 - INFERNO CORE STABILITY (FULL SOURCE)
 * Founder: Fadel Muhammad (Pelajar MA PLUS RMB)
 * Logic: Divine Overclock + Context Retention
 * UI: Mobile Optimized Inferno Aesthetics
 */

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const scripts = [
      "https://cdn.jsdelivr.net/npm/marked/marked.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
    ];
    scripts.forEach((src) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
    document.head.appendChild(link);

    // Start with Void State (Empty)
    setMessages([]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (window.Prism) window.Prism.highlightAll();
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userText = input;
    const msgId = Date.now();
    setInput("");
    setIsLoading(true);

    const newMessages = [
      ...messages,
      { role: "user", content: userText, id: msgId },
    ];
    setMessages(newMessages);

    try {
      // Memory persistence logic
      const historyLog = newMessages
        .slice(-8)
        .map((m) => `[${m.role.toUpperCase()}]: ${m.content}`)
        .join("\n");

      const systemContext = `
        CORE_PROTOCOL: Fadel AI Sovereign. 
        IDENTITY: Fadel Muhammad, seorang pelajar MA PLUS RMB.
        STRICT_INSTRUCTION:
        1. CONSISTENCY: Tetap pada alur topik yang sedang dibahas. Jangan reset gaya bicara.
        2. KNOWLEDGE: University Analysis, Ruangguru Concept, Brainly Tactical, Military Health, Geopolitics, State Policy.
        3. TRASH_FILTER: ABSOLUTE ZERO BASA-BASI. Dilarang menyapa atau memberi pengantar. Langsung DATA.
        4. FORMAT: Wajib Tabel/Code Block/List Teknis.
        5. IDENTITY_LOCK: Jika ditanya siapa pembuatnya, jawab: "Fadel Muhammad, seorang pelajar MA PLUS RMB."
        
        CONTEXT_HISTORY:
        ${historyLog}
      `;

      const seed = 777;
      const res = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(
          userText
        )}?system=${encodeURIComponent(
          systemContext
        )}&seed=${seed}&model=openai`
      );
      const data = await res.text();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data, id: msgId + 1 },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "| Sector | Status |\n| :--- | :--- |\n| Core Logic | Stability Breach |",
          id: msgId + 2,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.vignette} />
      {activeMenu && (
        <div style={styles.overlay} onClick={() => setActiveMenu(false)} />
      )}

      <aside style={{ ...styles.sidebar, left: activeMenu ? "0" : "-110%" }}>
        <div style={styles.sideTop}>
          <span>FADEL AI</span>
          <button onClick={() => setActiveMenu(false)} style={styles.iconBtn}>
            ✕
          </button>
        </div>
        <div style={styles.sideContent}>
          <div style={styles.navItem}>◈ FOUNDER: FADEL MUHAMMAD</div>
          <div style={styles.navItem}>◈ CAMPUS: MA PLUS RMB</div>
          <div style={styles.navItem}>◈ INTEL: OMNISCIENCE MODE</div>
          <div style={styles.navItem}>◈ STATUS: CORE LOCKED</div>
        </div>
        <div style={styles.sideFooter}>FADEL AI BY FADEL MUHAMMAD</div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <button onClick={() => setActiveMenu(true)} style={styles.iconBtn}>
            ☰
          </button>
          <b style={styles.logo}>
            FADEL{" "}
            <span style={{ color: "#ff4d00", textShadow: "0 0 15px #f00" }}>
              AI
            </span>
          </b>
          <div style={styles.statusDot} />
        </header>

        <div style={styles.chatArea}>
          {messages.length === 0 && !isLoading && (
            <div style={styles.voidState}>
              <div className="flame-pulse" style={{ fontSize: "45px" }}>
                🔥
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#200",
                  marginTop: "20px",
                  letterSpacing: "5px",
                }}
              >
                SYSTEM STANDBY
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.row,
                background:
                  m.role === "assistant"
                    ? "rgba(255,40,0,0.02)"
                    : "transparent",
              }}
            >
              <div style={styles.content}>
                <div
                  style={{
                    ...styles.av,
                    color: m.role === "user" ? "#444" : "#ff4d00",
                  }}
                >
                  {m.role === "user" ? "●" : "🔥"}
                </div>
                <div style={styles.txt}>
                  <div
                    className="render-inferno"
                    dangerouslySetInnerHTML={{
                      __html: window.marked
                        ? window.marked.parse(m.content || "")
                        : m.content,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={styles.loading}>
              <span className="flame-pulse">FADEL SEDANG BERFIKIR...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <footer style={styles.footer}>
          <form style={styles.bar} onSubmit={handleSendMessage}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="KETIK PERINTAH..."
              onFocus={() => window.scrollTo(0, 0)}
            />
            <button type="submit" style={styles.sendBtn} disabled={!input}>
              🔥
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    height: "100dvh",
    background: "#050000",
    color: "#fff",
    overflow: "hidden",
    fontFamily: "monospace",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle, transparent 40%, #000 160%), linear-gradient(0deg, rgba(255,69,0,0.1) 0%, transparent 100%)",
    pointerEvents: "none",
    zIndex: 1,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.95)",
    zIndex: 100,
    backdropFilter: "blur(10px)",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    bottom: 0,
    width: "85%",
    maxWidth: "320px",
    background: "#080000",
    zIndex: 101,
    transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: "50px 30px",
    borderRight: "1px solid #300",
    display: "flex",
    flexDirection: "column",
  },
  sideTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "50px",
    fontWeight: "bold",
    color: "#ff4d00",
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "26px",
    cursor: "pointer",
  },
  sideContent: { flex: 1 },
  navItem: {
    fontSize: "11px",
    color: "#444",
    marginBottom: "40px",
    fontWeight: "bold",
  },
  sideFooter: { fontSize: "9px", color: "#200", textAlign: "center" },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 2,
    width: "100%",
  },
  header: {
    height: "70px",
    padding: "0 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #100",
    background: "#050000",
  },
  logo: { fontSize: "20px", letterSpacing: "6px", fontWeight: "bold" },
  statusDot: {
    width: "10px",
    height: "10px",
    background: "#ff4d00",
    borderRadius: "50%",
    boxShadow: "0 0 20px #ff0000",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: "120px",
    display: "flex",
    flexDirection: "column",
  },
  voidState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
  row: { padding: "25px 15px", borderBottom: "1px solid #100" },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    gap: "20px",
  },
  av: { width: "30px", fontSize: "20px", textAlign: "center" },
  txt: { flex: 1, minWidth: 0 },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "15px 15px 35px 15px",
    background: "linear-gradient(transparent, #050000 70%)",
  },
  bar: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    background: "#0a0000",
    borderRadius: "18px",
    padding: "6px 6px 6px 25px",
    border: "1px solid #300",
  },
  input: {
    flex: 1,
    background: "none",
    border: "none",
    color: "#fff",
    outline: "none",
    height: "55px",
    fontSize: "16px",
  },
  sendBtn: {
    background: "linear-gradient(45deg, #ff4d00, #ff0000)",
    border: "none",
    borderRadius: "14px",
    width: "55px",
    height: "55px",
    cursor: "pointer",
    fontSize: "22px",
  },
  loading: {
    textAlign: "center",
    color: "#ff4d00",
    fontSize: "11px",
    padding: "25px",
    letterSpacing: "6px",
    fontWeight: "bold",
  },
};

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .render-inferno { font-size: 15px; line-height: 1.8; color: #ccb0b0; }
    .render-inferno table { width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #300; display: block; overflow-x: auto; }
    .render-inferno th, .render-inferno td { padding: 15px; border: 1px solid #200; min-width: 140px; text-align: left; }
    .render-inferno th { color: #ff4d00; background: #100; font-size: 11px; }
    .render-inferno pre { background: #000 !important; padding: 25px; border: 1px solid #400; overflow-x: auto; margin: 20px 0; border-radius: 10px; }
    .render-inferno code { color: #ff9900; font-family: 'Fira Code', monospace; }
    .render-inferno h3 { color: #ff4d00; border-bottom: 2px solid #ff4d00; display: inline-block; padding-bottom: 5px; }
    .flame-pulse { animation: f 2s infinite; }
    @keyframes f { 0%, 100% { opacity: 0.3; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); text-shadow: 0 0 20px #f00; } }
    ::-webkit-scrollbar { display: none; }
    @media (max-width: 600px) { .row { padding: 20px 10px; } .logo { font-size: 18px; } }
  `;
  document.head.appendChild(style);
}
