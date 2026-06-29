import { ethers } from "ethers";

export const ZEUS_INSURANCE_ADDRESS = "0xbe8B48f3ad126a8546BA895Cd42B72AA715C382B";
export const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
export const BASE_SEPOLIA_CHAIN_ID = 84532;

export const ZEUS_INSURANCE_ABI = [
  // State variables (public getters)
  "function usdc() view returns (address)",
  "function nextPolicyId() view returns (uint256)",
  "function reserveBalance() view returns (uint256)",
  "function policies(uint256) view returns (address buyer, address seller, uint256 amount, uint256 premium, uint256 retryDeadline, uint256 maxRetries, bool isActive, bool isPaidOut, bool isExpired)",
  "function owner() view returns (address)",

  // Write functions
  "function buyInsurance(address seller, uint256 amount, uint256 timeoutSeconds, uint256 maxRetries) nonpayable",
  "function claimPayout(uint256 policyId) nonpayable",
  "function depositReserve(uint256 amount) nonpayable",
  "function withdrawReserve(uint256 amount) nonpayable",

  // View functions
  "function getPolicy(uint256 policyId) view returns (tuple(address buyer, address seller, uint256 amount, uint256 premium, uint256 retryDeadline, uint256 maxRetries, bool isActive, bool isPaidOut, bool isExpired))",
  "function getReserveBalance() view returns (uint256)",

  // Events
  "event PolicyCreated(uint256 indexed policyId, address indexed buyer, address indexed seller, uint256 amount, uint256 premium, uint256 retryDeadline)",
  "event PayoutExecuted(uint256 indexed policyId, uint256 amount)",
  "event PolicyExpired(uint256 indexed policyId)",
] as const;

export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
] as const;

export interface Policy {
  buyer: string;
  seller: string;
  amount: bigint;
  premium: bigint;
  retryDeadline: bigint;
  maxRetries: bigint;
  isActive: boolean;
  isPaidOut: boolean;
  isExpired: boolean;
}

export function getZeusContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(ZEUS_INSURANCE_ADDRESS, ZEUS_INSURANCE_ABI, signerOrProvider);
}

export function getUsdcContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signerOrProvider);
}

/** Premium formula: 700 bps base + 200 bps per extra retry */
export function calcPremium(amount: bigint, maxRetries: number): bigint {
  const premiumBps = BigInt(700 + (maxRetries - 1) * 200);
  return (amount * premiumBps) / 10000n;
}

/** Format USDC (6 decimals) to human-readable string */
export function formatUSDC(wei: bigint): string {
  return ethers.formatUnits(wei, 6);
}

/** Parse human-readable USDC to bigint */
export function parseUSDC(amount: string): bigint {
  return ethers.parseUnits(amount, 6);
}
