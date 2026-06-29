export default function Slide3Solution() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Section 3</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>PROPOSED SOLUTION</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Ref No.</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>SOL-03X</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "2vh", marginBottom: "2vh" }}>
          <h2 style={{ fontSize: "3.5vw", fontWeight: 200, margin: 0, letterSpacing: "0.08em", marginBottom: "3.5vh" }}>THE SOLUTION</h2>

          <div style={{ display: "flex", gap: "3vw" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.8vh" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
                <div style={{ width: "0.8vw", height: "0.8vw", border: "1px solid rgba(186,230,253,0.7)", marginTop: "0.6vh", flexShrink: 0 }} />
                <div style={{ fontSize: "1.5vw", fontWeight: 300, lineHeight: 1.45 }}>ZeusInsurance replaces trust with cryptographic guarantees</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
                <div style={{ width: "0.8vw", height: "0.8vw", border: "1px solid rgba(186,230,253,0.7)", marginTop: "0.6vh", flexShrink: 0 }} />
                <div style={{ fontSize: "1.5vw", fontWeight: 300, lineHeight: 1.45 }}>Buyer pays a USDC premium at policy creation</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
                <div style={{ width: "0.8vw", height: "0.8vw", border: "1px solid rgba(186,230,253,0.7)", marginTop: "0.6vh", flexShrink: 0 }} />
                <div style={{ fontSize: "1.5vw", fontWeight: 300, lineHeight: 1.45 }}>Seller must perform within the agreed timeout window</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
                <div style={{ width: "0.8vw", height: "0.8vw", border: "1px solid rgba(186,230,253,0.7)", marginTop: "0.6vh", flexShrink: 0 }} />
                <div style={{ fontSize: "1.5vw", fontWeight: 300, lineHeight: 1.45 }}>If timeout expires with no delivery, buyer claims full payout automatically</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
                <div style={{ width: "0.8vw", height: "0.8vw", border: "1px solid rgba(186,230,253,0.7)", marginTop: "0.6vh", flexShrink: 0 }} />
                <div style={{ fontSize: "1.5vw", fontWeight: 300, lineHeight: 1.45 }}>No arbitrator. No middleman. Code is law.</div>
              </div>
            </div>

            <div style={{ width: "28vw", border: "1px solid rgba(255,255,255,0.25)", padding: "2.5vh 2vw", background: "rgba(255,255,255,0.04)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5, marginBottom: "2vh" }}>Core Principle</div>
              <div style={{ fontSize: "3vw", fontWeight: 200, letterSpacing: "0.12em", lineHeight: 1.1, color: "#BAE6FD" }}>CODE</div>
              <div style={{ fontSize: "3vw", fontWeight: 200, letterSpacing: "0.12em", lineHeight: 1.1, color: "#BAE6FD" }}>IS</div>
              <div style={{ fontSize: "3vw", fontWeight: 200, letterSpacing: "0.12em", lineHeight: 1.1, color: "#BAE6FD" }}>LAW</div>
              <div style={{ width: "6vw", height: "1px", background: "rgba(186,230,253,0.4)", margin: "2vh 0" }} />
              <div style={{ fontSize: "1vw", fontWeight: 300, opacity: 0.6, lineHeight: 1.5 }}>Smart contract execution is deterministic and tamper-proof</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Status</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>DEPLOYED</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Revision</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>A.1</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Page</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>03</div>
          </div>
        </div>
      </div>
    </div>
  );
}
