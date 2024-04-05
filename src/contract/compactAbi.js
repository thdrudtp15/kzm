export const compactAbi = [
  {
    type: "constructor",
    name: "",
    inputs: [
      {
        type: "address",
        name: "_defaultAdmin",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_stakingsection",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "_NodeNFTToken",
        internalType: "contract DropERC1155",
      },
      {
        type: "address",
        name: "_RewardToken",
        internalType: "contract TokenERC20",
      },
      {
        type: "address",
        name: "_DaoAddress",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_rewardPerMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_alreadyClaimed",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "RewardPaid",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_userReward",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_daoReward",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_poolReward",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_agentReward",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "previousAdminRole",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "newAdminRole",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "sender",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "sender",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Staked",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_amount",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "unStaked",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_amount",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "NodeNftCollection",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract DropERC1155",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PauseClaim",
    inputs: [],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PausePool",
    inputs: [],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "StakePlayer",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "isStake",
        internalType: "bool",
      },
      {
        type: "uint256",
        name: "updateTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "poolID",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "StakingSection",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "adminStake",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_depositAmount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "adminWithdraw",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_withdrawAmount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calculateAgentRewards",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_PlayerReward",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_DaoReward",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_AgentReward",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "calculateRewards",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_MyReward",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_DaoReward",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "calculateTotalReward",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_totalReward",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claim",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimAgent",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleMember",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "uint256",
        name: "index",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "address",
        name: "member",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleMemberCount",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "count",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getStakePlayerCount",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "_playerCount",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getStakePlayers",
    inputs: [],
    outputs: [
      {
        type: "address[]",
        name: "_stakeplayers",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalCalimed",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "_totalClaimed",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalUnClaim",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "_totalUnClaim",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasRoleWithSwitch",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "onERC1155BatchReceived",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256[]",
        name: "",
        internalType: "uint256[]",
      },
      {
        type: "uint256[]",
        name: "",
        internalType: "uint256[]",
      },
      {
        type: "bytes",
        name: "",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        type: "bytes4",
        name: "",
        internalType: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onERC1155Received",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
      {
        type: "bytes",
        name: "",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        type: "bytes4",
        name: "",
        internalType: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rewardPerMin",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rewardsToken",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract TokenERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setPauseClaimStatus",
    inputs: [
      {
        type: "bool",
        name: "status",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPausePoolStatus",
    inputs: [
      {
        type: "bool",
        name: "status",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setrewardPerMin",
    inputs: [
      {
        type: "uint256",
        name: "_rewardPerMin",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "stake",
    inputs: [
      {
        type: "uint256",
        name: "_depositAmount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        type: "bytes4",
        name: "interfaceId",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "updateClaimed",
    inputs: [
      {
        type: "uint256",
        name: "_totalClaimed",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      {
        type: "uint256",
        name: "_withdrawAmount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];
