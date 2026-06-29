export default function Slide2Problem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Section 2</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>PROBLEM STATEMENT</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Ref No.</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>PRB-02X</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "2vh", marginBottom: "2vh" }}>
          <h2 style={{ fontSize: "3.5vw", fontWeight: 200, margin: 0, letterSpacing: "0.08em", marginBottom: "4vh" }}>THE PROBLEM</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "2vw", padding: "2vh 2vw", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: "0.8vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.8, minWidth: "4vw", paddingTop: "0.3vh" }}>01</div>
              <div style={{ fontSize: "1.6vw", fontWeight: 300, lineHeight: 1.4 }}>Buyers in on-chain commerce bear 100% of counterparty risk</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "2vw", padding: "2vh 2vw", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: "0.8vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.8, minWidth: "4vw", paddingTop: "0.3vh" }}>02</div>
              <div style={{ fontSize: "1.6vw", fontWeight: 300, lineHeight: 1.4 }}>Sellers can collect payment and never deliver — no recourse</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "2vw", padding: "2vh 2vw", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: "0.8vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.8, minWidth: "4vw", paddingTop: "0.3vh" }}>03</div>
              <div style={{ fontSize: "1.6vw", fontWeight: 300, lineHeight: 1.4 }}>Traditional escrow is custodial, slow, and requires trust in a third party</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "2vw", padding: "2vh 2vw", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: "0.8vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.8, minWidth: "4vw", paddingTop: "0.3vh" }}>04</div>
              <div style={{ fontSize: "1.6vw", fontWeight: 300, lineHeight: 1.4 }}>Dispute resolution is manual, expensive, and often unfair</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Status</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>IDENTIFIED</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Revision</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>A.1</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Page</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>02</div>
          </div>
        </div>
      </div>
    </div>
  );
}
