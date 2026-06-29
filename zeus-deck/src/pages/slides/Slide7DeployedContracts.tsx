export default function Slide7DeployedContracts() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: "#1B3A5C", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "2vw 2vh" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "10vw 10vh" }} />
      <div style={{ position: "absolute", top: "3vh", left: "3vw", right: "3vw", bottom: "3vh", border: "1px solid rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "5vh", left: "5vw", right: "5vw", bottom: "5vh", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      <div style={{ padding: "7vh 7vw", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", position: "relative", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Section 7</div>
            <div style={{ fontSize: "1vw", fontWeight: 600, fontFamily: "monospace" }}>DEPLOYMENT REGISTER</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7vw", textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5 }}>Ref No.</div>
            <div style={{ fontSize: "1vw", fontFamily: "monospace" }}>DEP-07X</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1.5vh", marginBottom: "1.5vh" }}>
          <h2 style={{ fontSize: "3.5vw", fontWeight: 200, margin: 0, letterSpacing: "0.08em", marginBottom: "3vh" }}>DEPLOYED CONTRACTS</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)" }}>
              <div style={{ padding: "0.8vh 1.5vw", width: "18vw", borderRight: "1px solid rgba(255,255,255,0.12)", fontSize: "0.65vw", fontFamily: "monospace", letterSpacing: "0.12em", color: "#BAE6FD", opacity: 0.7, display: "flex", alignItems: "center" }}>CONTRACT</div>
              <div style={{ padding: "0.8vh 1.5vw", flex: 1, fontSize: "0.65vw", fontFamily: "monospace", letterSpacing: "0.12em", color: "#BAE6FD", opacity: 0.7, display: "flex", alignItems: "center" }}>ADDRESS</div>
            </div>

            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ padding: "1.8vh 1.5vw", width: "18vw", borderRight: "1px solid rgba(255,255,255,0.12)", fontSize: "1.2vw", fontWeight: 500 }}>ZeusInsurance</div>
              <div style={{ padding: "1.8vh 1.5vw", flex: 1, fontSize: "1.1vw", fontFamily: "monospace", opacity: 0.85, letterSpacing: "0.02em" }}>0xbe8B48f3ad126a8546BA895Cd42B72AA715C382B</div>
            </div>

            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ padding: "1.8vh 1.5vw", width: "18vw", borderRight: "1px solid rgba(255,255,255,0.12)", fontSize: "1.2vw", fontWeight: 500 }}>MyToken (ERC20)</div>
              <div style={{ padding: "1.8vh 1.5vw", flex: 1, fontSize: "1.1vw", fontFamily: "monospace", opacity: 0.85, letterSpacing: "0.02em" }}>0x0d4AD4C6b60F445d0e478E0AF48075340AC51Cf5</div>
            </div>

            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ padding: "1.8vh 1.5vw", width: "18vw", borderRight: "1px solid rgba(255,255,255,0.12)", fontSize: "1.2vw", fontWeight: 500 }}>Lock (ETH Vault)</div>
              <div style={{ padding: "1.8vh 1.5vw", flex: 1, fontSize: "1.1vw", fontFamily: "monospace", opacity: 0.85, letterSpacing: "0.02em" }}>0x81F5363Bbe6fE9580d050eF459C875E9dD25C666</div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ padding: "1.8vh 1.5vw", width: "18vw", borderRight: "1px solid rgba(255,255,255,0.12)", fontSize: "1.2vw", fontWeight: 500 }}>USDC (official)</div>
              <div style={{ padding: "1.8vh 1.5vw", flex: 1, fontSize: "1.1vw", fontFamily: "monospace", opacity: 0.85, letterSpacing: "0.02em" }}>0x036CbD53842c5426634e7929541eC2318f3dCF7e</div>
            </div>
          </div>

          <div style={{ marginTop: "2.5vh", display: "flex", gap: "2vw" }}>
            <div style={{ flex: 1, border: "1px solid rgba(255,255,255,0.2)", padding: "1.5vh 1.5vw", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", opacity: 0.5, letterSpacing: "0.1em", marginBottom: "0.6vh" }}>NETWORK</div>
              <div style={{ fontSize: "1.3vw", fontFamily: "monospace" }}>Base Sepolia (chainId 84532)</div>
            </div>
            <div style={{ flex: 1, border: "1px solid rgba(255,255,255,0.2)", padding: "1.5vh 1.5vw", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: "0.65vw", fontFamily: "monospace", opacity: 0.5, letterSpacing: "0.1em", marginBottom: "0.6vh" }}>TEST COVERAGE</div>
              <div style={{ fontSize: "1.3vw", fontFamily: "monospace" }}>43 passing tests</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "0.5px solid rgba(255,255,255,0.2)", paddingTop: "1.5vh" }}>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Status</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>LIVE</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Revision</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>A.1</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>Page</div>
            <div style={{ fontSize: "0.9vw", fontFamily: "monospace" }}>07</div>
          </div>
        </div>
      </div>
    </div>
  );
}
