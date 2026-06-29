export default function Slide8Security() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Section 8</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>SECURITY ARCHITECTURE</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Ref No.</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>SEC-08X</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "2vh", marginBottom: "2vh" }}>
          <h2 style={{ fontSize: "3.5vw", fontWeight: 200, margin: 0, letterSpacing: "0.08em", marginBottom: "3.5vh" }}>SECURITY DESIGN</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vh 4vw" }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)", padding: "2vh 1.8vw" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.12em", opacity: 0.8, marginBottom: "0.8vh" }}>REENTRANCY</div>
              <div style={{ fontSize: "1.35vw", fontWeight: 300, lineHeight: 1.4 }}>ReentrancyGuard on buyInsurance and claimPayout</div>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)", padding: "2vh 1.8vw" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.12em", opacity: 0.8, marginBottom: "0.8vh" }}>ETH TRANSFER</div>
              <div style={{ fontSize: "1.35vw", fontWeight: 300, lineHeight: 1.4 }}>Low-level call() — no gas stipend limits</div>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)", padding: "2vh 1.8vw" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.12em", opacity: 0.8, marginBottom: "0.8vh" }}>ACCESS CONTROL</div>
              <div style={{ fontSize: "1.35vw", fontWeight: 300, lineHeight: 1.4 }}>Owner-only reserve management (deposit / withdraw)</div>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)", padding: "2vh 1.8vw" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.12em", opacity: 0.8, marginBottom: "0.8vh" }}>SUPPLY CAP</div>
              <div style={{ fontSize: "1.35vw", fontWeight: 300, lineHeight: 1.4 }}>1M token mint cap on MyToken</div>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)", padding: "2vh 1.8vw" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.12em", opacity: 0.8, marginBottom: "0.8vh" }}>CUSTODY</div>
              <div style={{ fontSize: "1.35vw", fontWeight: 300, lineHeight: 1.4 }}>Time-locked ETH vault (Lock.sol) for reserve</div>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)", padding: "2vh 1.8vw" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.12em", opacity: 0.8, marginBottom: "0.8vh" }}>OWNERSHIP</div>
              <div style={{ fontSize: "1.35vw", fontWeight: 300, lineHeight: 1.4 }}>OpenZeppelin v5 Ownable(msg.sender) constructor</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Status</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>AUDITED</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Revision</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>B.1</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Page</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>08</div>
          </div>
        </div>
      </div>
    </div>
  );
}
