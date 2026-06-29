export default function Slide9GetStarted() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Section 9</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>INITIATION SEQUENCE</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Ref No.</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>END-09X</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "1vh", marginBottom: "1vh" }}>
          <div style={{ width: "12vw", height: "12vw", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "3.5vh", position: "relative" }}>
            <div style={{ position: "absolute", inset: "-1.2vw", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: "50%" }} />
            <div style={{ width: "6.5vw", height: "6.5vw", border: "1.5px solid rgba(255,255,255,0.7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: "2.5vw", fontWeight: 200, fontFamily: "monospace" }}>&gt;_</div>
            </div>
          </div>

          <h1 style={{ fontSize: "4vw", fontWeight: 200, margin: 0, letterSpacing: "0.12em" }}>GET STARTED</h1>
          <div style={{ width: "10vw", height: "1px", background: "rgba(255,255,255,0.4)", margin: "2.5vh 0" }} />

          <div style={{ display: "flex", gap: "2vw", marginBottom: "3vh" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6vh" }}>
              <div style={{ fontSize: "0.6vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.7, letterSpacing: "0.1em" }}>01</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, maxWidth: "14vw", lineHeight: 1.4 }}>Connect MetaMask to Base Sepolia (chainId 84532)</div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6vh" }}>
              <div style={{ fontSize: "0.6vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.7, letterSpacing: "0.1em" }}>02</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, maxWidth: "14vw", lineHeight: 1.4 }}>Acquire Base Sepolia USDC at 0x036CbD...</div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6vh" }}>
              <div style={{ fontSize: "0.6vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.7, letterSpacing: "0.1em" }}>03</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, maxWidth: "14vw", lineHeight: 1.4 }}>Open the DApp — Dashboard shows live reserve balance</div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6vh" }}>
              <div style={{ fontSize: "0.6vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.7, letterSpacing: "0.1em" }}>04</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, maxWidth: "14vw", lineHeight: 1.4 }}>Click Buy Insurance — fill seller address, amount, timeout</div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6vh" }}>
              <div style={{ fontSize: "0.6vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.7, letterSpacing: "0.1em" }}>05</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, maxWidth: "14vw", lineHeight: 1.4 }}>Approve USDC and confirm the transaction</div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6vh" }}>
              <div style={{ fontSize: "0.6vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.7, letterSpacing: "0.1em" }}>06</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, maxWidth: "14vw", lineHeight: 1.4 }}>Policy is live. If seller defaults — claim your payout.</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2vw" }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.35)", padding: "1.5vh 3vw", background: "rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", minWidth: "16vw" }}>
              <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.5, marginBottom: "0.8vh" }}>Protocol</div>
              <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>ZeusInsurance</div>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "1.5vh 3vw", display: "flex", flexDirection: "column", alignItems: "center", minWidth: "16vw" }}>
              <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.5, marginBottom: "0.8vh" }}>Status</div>
              <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>LIVE ON BASE SEPOLIA</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Status</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>FINAL</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Authorization</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>REQUIRED</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Page</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>09</div>
          </div>
        </div>
      </div>
    </div>
  );
}
