export default function Slide4HowItWorks() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Section 4</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>OPERATIONAL FLOW</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Ref No.</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>OPS-04X</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1.5vh", marginBottom: "1.5vh" }}>
          <h2 style={{ fontSize: "3.5vw", fontWeight: 200, margin: 0, letterSpacing: "0.08em", marginBottom: "3vh" }}>HOW IT WORKS</h2>

          <div style={{ display: "flex", gap: "1.5vw", alignItems: "stretch" }}>
            <div style={{ flex: 1, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.04)", padding: "2.5vh 1.8vw", display: "flex", flexDirection: "column", gap: "1.5vh", position: "relative" }}>
              <div style={{ position: "absolute", top: "-1px", left: "1.5vw", right: "1.5vw", height: "2px", background: "#BAE6FD", opacity: 0.7 }} />
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.15em" }}>STEP 01</div>
              <div style={{ fontSize: "2vw", fontWeight: 200, letterSpacing: "0.1em" }}>APPROVE</div>
              <div style={{ width: "3vw", height: "1px", background: "rgba(255,255,255,0.3)" }} />
              <div style={{ fontSize: "1.1vw", fontWeight: 300, opacity: 0.7, lineHeight: 1.5 }}>Buyer approves USDC premium transfer to the protocol contract</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.3)", fontSize: "1.5vw", fontWeight: 100 }}>—</div>

            <div style={{ flex: 1, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.04)", padding: "2.5vh 1.8vw", display: "flex", flexDirection: "column", gap: "1.5vh", position: "relative" }}>
              <div style={{ position: "absolute", top: "-1px", left: "1.5vw", right: "1.5vw", height: "2px", background: "#BAE6FD", opacity: 0.7 }} />
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.15em" }}>STEP 02</div>
              <div style={{ fontSize: "2vw", fontWeight: 200, letterSpacing: "0.1em" }}>BUY</div>
              <div style={{ width: "3vw", height: "1px", background: "rgba(255,255,255,0.3)" }} />
              <div style={{ fontSize: "1vw", fontFamily: "monospace", opacity: 0.6, lineHeight: 1.4 }}>buyInsurance(</div>
              <div style={{ fontSize: "1vw", fontFamily: "monospace", opacity: 0.6, lineHeight: 1.4, paddingLeft: "1.5vw" }}>seller, amount,</div>
              <div style={{ fontSize: "1vw", fontFamily: "monospace", opacity: 0.6, lineHeight: 1.4, paddingLeft: "1.5vw" }}>timeout, retries</div>
              <div style={{ fontSize: "1vw", fontFamily: "monospace", opacity: 0.6, lineHeight: 1.4 }}>)</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.3)", fontSize: "1.5vw", fontWeight: 100 }}>—</div>

            <div style={{ flex: 1, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.04)", padding: "2.5vh 1.8vw", display: "flex", flexDirection: "column", gap: "1.5vh", position: "relative" }}>
              <div style={{ position: "absolute", top: "-1px", left: "1.5vw", right: "1.5vw", height: "2px", background: "#BAE6FD", opacity: 0.7 }} />
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.15em" }}>STEP 03</div>
              <div style={{ fontSize: "2vw", fontWeight: 200, letterSpacing: "0.1em" }}>WAIT</div>
              <div style={{ width: "3vw", height: "1px", background: "rgba(255,255,255,0.3)" }} />
              <div style={{ fontSize: "1.1vw", fontWeight: 300, opacity: 0.7, lineHeight: 1.5 }}>Seller has until retryDeadline to perform. Clock starts on-chain.</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.3)", fontSize: "1.5vw", fontWeight: 100 }}>—</div>

            <div style={{ flex: 1, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.04)", padding: "2.5vh 1.8vw", display: "flex", flexDirection: "column", gap: "1.5vh", position: "relative" }}>
              <div style={{ position: "absolute", top: "-1px", left: "1.5vw", right: "1.5vw", height: "2px", background: "#BAE6FD", opacity: 0.7 }} />
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.15em" }}>STEP 04</div>
              <div style={{ fontSize: "2vw", fontWeight: 200, letterSpacing: "0.1em" }}>CLAIM</div>
              <div style={{ width: "3vw", height: "1px", background: "rgba(255,255,255,0.3)" }} />
              <div style={{ fontSize: "1.1vw", fontWeight: 300, opacity: 0.7, lineHeight: 1.5 }}>Timeout expired — claimPayout sends full insured amount to buyer</div>
            </div>
          </div>

          <div style={{ marginTop: "3vh", border: "1px solid rgba(255,255,255,0.15)", padding: "1.5vh 2vw", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ fontSize: "0.7vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>Premium Formula</div>
            <div style={{ width: "1px", height: "3vh", background: "rgba(255,255,255,0.2)" }} />
            <div style={{ fontSize: "1.2vw", fontFamily: "monospace", fontWeight: 300 }}>7% base + 2% per additional retry</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Status</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>VERIFIED</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Revision</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>B.2</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Page</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>04</div>
          </div>
        </div>
      </div>
    </div>
  );
}
