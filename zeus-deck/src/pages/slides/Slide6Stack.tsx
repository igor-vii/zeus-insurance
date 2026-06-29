export default function Slide6Stack() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Section 6</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>TECHNOLOGY STACK</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Ref No.</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>STK-06X</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "2vh", marginBottom: "2vh" }}>
          <h2 style={{ fontSize: "3.5vw", fontWeight: 200, margin: 0, letterSpacing: "0.08em", marginBottom: "4vh" }}>THE STACK</h2>

          <div style={{ display: "flex", gap: "3vw" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.15em", marginBottom: "1.5vh", opacity: 0.8 }}>ONCHAIN LAYER</div>
              <div style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.03)" }}>
                <div style={{ padding: "1.8vh 1.5vw", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: "0.65vw", fontFamily: "monospace", opacity: 0.5, letterSpacing: "0.1em", marginBottom: "0.5vh" }}>SMART CONTRACTS</div>
                  <div style={{ fontSize: "1.4vw", fontWeight: 300 }}>Solidity 0.8.24, Hardhat, OpenZeppelin v5</div>
                </div>
                <div style={{ padding: "1.8vh 1.5vw", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: "0.65vw", fontFamily: "monospace", opacity: 0.5, letterSpacing: "0.1em", marginBottom: "0.5vh" }}>PAYMENT TOKEN</div>
                  <div style={{ fontSize: "1.4vw", fontWeight: 300 }}>USDC on Base Sepolia (6 decimals)</div>
                </div>
                <div style={{ padding: "1.8vh 1.5vw" }}>
                  <div style={{ fontSize: "0.65vw", fontFamily: "monospace", opacity: 0.5, letterSpacing: "0.1em", marginBottom: "0.5vh" }}>TEST SUITE</div>
                  <div style={{ fontSize: "1.4vw", fontWeight: 300 }}>43 tests — Lock, MyToken, ZeusInsurance</div>
                </div>
              </div>
            </div>

            <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", color: "#BAE6FD", letterSpacing: "0.15em", marginBottom: "1.5vh", opacity: 0.8 }}>CLIENT LAYER</div>
              <div style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.03)" }}>
                <div style={{ padding: "1.8vh 1.5vw", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: "0.65vw", fontFamily: "monospace", opacity: 0.5, letterSpacing: "0.1em", marginBottom: "0.5vh" }}>FRONTEND</div>
                  <div style={{ fontSize: "1.4vw", fontWeight: 300 }}>React + Vite + TypeScript, ethers v6</div>
                </div>
                <div style={{ padding: "1.8vh 1.5vw", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: "0.65vw", fontFamily: "monospace", opacity: 0.5, letterSpacing: "0.1em", marginBottom: "0.5vh" }}>WALLET</div>
                  <div style={{ fontSize: "1.4vw", fontWeight: 300 }}>MetaMask via BrowserProvider</div>
                </div>
                <div style={{ padding: "1.8vh 1.5vw" }}>
                  <div style={{ fontSize: "0.65vw", fontFamily: "monospace", opacity: 0.5, letterSpacing: "0.1em", marginBottom: "0.5vh" }}>DEPLOYMENT</div>
                  <div style={{ fontSize: "1.4vw", fontWeight: 300 }}>Base Sepolia — public RPC, no API key</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Status</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>PRODUCTION</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Revision</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>A.1</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Page</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>06</div>
          </div>
        </div>
      </div>
    </div>
  );
}
