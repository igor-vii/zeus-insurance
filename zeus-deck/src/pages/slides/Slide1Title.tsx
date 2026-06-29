export default function Slide1Title() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Drawing No.</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>ZI-DCK-001</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Date</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>2026-06-29</div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: "0.8vw", textTransform: "uppercase", letterSpacing: "0.3em", opacity: 0.5, marginBottom: "1.5vh" }}>Project Title</div>
          <h1 style={{ fontSize: "7vw", fontWeight: 200, lineHeight: 0.88, margin: 0, letterSpacing: "0.06em" }}>ZEUS</h1>
          <h1 style={{ fontSize: "7vw", fontWeight: 200, lineHeight: 0.88, margin: 0, letterSpacing: "0.06em" }}>INSURANCE</h1>
          <div style={{ width: "8vw", height: "1px", background: "rgba(255,255,255,0.4)", marginTop: "2.5vh" }} />
          <p style={{ fontSize: "1.3vw", opacity: 0.65, marginTop: "2vh", maxWidth: "44vw", lineHeight: 1.6, fontWeight: 300 }}>
            On-Chain Insurance Protocol for Trustless Commerce. Premiums in USDC, payouts enforced by code.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Prepared By</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>ZeusInsurance Protocol</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Classification</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>CONFIDENTIAL</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Network</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>BASE SEPOLIA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
