export default function Slide5ContractSpecs() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ position: "absolute", top: "8vh", right: "8vw", border: "0.3vw solid rgba(186,230,253,0.6)", padding: "1vh 1vw", color: "#BAE6FD", fontSize: "1.8vw", fontWeight: "bold", fontFamily: "monospace", transform: "rotate(15deg)", opacity: 0.7, letterSpacing: "0.15vw" }}>
        REV 1.0
      </div>

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Section 5</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>TECHNICAL SPECIFICATIONS</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Ref No.</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>SPC-05X</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "2vh", marginBottom: "2vh" }}>
          <h2 style={{ fontSize: "3.5vw", fontWeight: 200, margin: 0, letterSpacing: "0.08em", marginBottom: "4vh" }}>CONTRACT SPECIFICATIONS</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5vh 5vw" }}>
            <div style={{ display: "flex", alignItems: "flex-end", fontSize: "1.4vw" }}>
              <span style={{ color: "#BAE6FD", whiteSpace: "nowrap", opacity: 0.85 }}>Solidity Version</span>
              <div style={{ flexGrow: 1, borderBottom: "0.15vw dotted rgba(255,255,255,0.25)", margin: "0 1vw", position: "relative", top: "-0.3vw" }} />
              <span style={{ fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>0.8.24</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", fontSize: "1.4vw" }}>
              <span style={{ color: "#BAE6FD", whiteSpace: "nowrap", opacity: 0.85 }}>Library</span>
              <div style={{ flexGrow: 1, borderBottom: "0.15vw dotted rgba(255,255,255,0.25)", margin: "0 1vw", position: "relative", top: "-0.3vw" }} />
              <span style={{ fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>OpenZeppelin v5</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", fontSize: "1.4vw" }}>
              <span style={{ color: "#BAE6FD", whiteSpace: "nowrap", opacity: 0.85 }}>Reentrancy Guard</span>
              <div style={{ flexGrow: 1, borderBottom: "0.15vw dotted rgba(255,255,255,0.25)", margin: "0 1vw", position: "relative", top: "-0.3vw" }} />
              <span style={{ fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>All state calls</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", fontSize: "1.4vw" }}>
              <span style={{ color: "#BAE6FD", whiteSpace: "nowrap", opacity: 0.85 }}>Payment Token</span>
              <div style={{ flexGrow: 1, borderBottom: "0.15vw dotted rgba(255,255,255,0.25)", margin: "0 1vw", position: "relative", top: "-0.3vw" }} />
              <span style={{ fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>USDC (6 decimals)</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", fontSize: "1.4vw" }}>
              <span style={{ color: "#BAE6FD", whiteSpace: "nowrap", opacity: 0.85 }}>Policy States</span>
              <div style={{ flexGrow: 1, borderBottom: "0.15vw dotted rgba(255,255,255,0.25)", margin: "0 1vw", position: "relative", top: "-0.3vw" }} />
              <span style={{ fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>Active / Claimed</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", fontSize: "1.4vw" }}>
              <span style={{ color: "#BAE6FD", whiteSpace: "nowrap", opacity: 0.85 }}>Network</span>
              <div style={{ flexGrow: 1, borderBottom: "0.15vw dotted rgba(255,255,255,0.25)", margin: "0 1vw", position: "relative", top: "-0.3vw" }} />
              <span style={{ fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>Base Sepolia</span>
            </div>
          </div>

          <div style={{ marginTop: "4vh", border: "1px solid rgba(255,255,255,0.2)", padding: "2vh 2vw", background: "rgba(255,255,255,0.03)" }}>
            <div style={{ fontSize: "0.7vw", fontFamily: "monospace", color: "#BAE6FD", opacity: 0.7, letterSpacing: "0.1em", marginBottom: "0.8vh" }}>PREMIUM FORMULA</div>
            <div style={{ fontSize: "1.5vw", fontFamily: "monospace", fontWeight: 300 }}>premium = insuredAmount * (7% + 2% * (retries - 1))</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Status</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>FINALIZED</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Revision</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>C.4</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Page</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>05</div>
          </div>
        </div>
      </div>
    </div>
  );
}
