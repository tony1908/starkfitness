export const erc20Abi= {
    "abi": [
        {
            "type": "impl",
            "name": "SimpleVault",
            "interface_name": "starknet_multiple_contracts::todolist::ISimpleVault"
        },
        {
            "type": "interface",
            "name": "starknet_multiple_contracts::todolist::ISimpleVault",
            "items": [
                {
                    "type": "function",
                    "name": "deposit",
                    "inputs": [
                        {
                            "name": "amount",
                            "type": "core::felt252"
                        }
                    ],
                    "outputs": [],
                    "state_mutability": "external"
                },
                {
                    "type": "function",
                    "name": "challengeAndDeposit",
                    "inputs": [
                        {
                            "name": "amount",
                            "type": "core::felt252"
                        },
                        {
                            "name": "challenge",
                            "type": "core::felt252"
                        }
                    ],
                    "outputs": [],
                    "state_mutability": "external"
                },
                {
                    "type": "function",
                    "name": "withdraw",
                    "inputs": [
                        {
                            "name": "amount",
                            "type": "core::felt252"
                        }
                    ],
                    "outputs": [],
                    "state_mutability": "external"
                },
                {
                    "type": "function",
                    "name": "log_calories",
                    "inputs": [
                        {
                            "name": "calories",
                            "type": "core::felt252"
                        }
                    ],
                    "outputs": [],
                    "state_mutability": "external"
                },
                {
                    "type": "function",
                    "name": "get_calories",
                    "inputs": [],
                    "outputs": [
                        {
                            "type": "core::felt252"
                        }
                    ],
                    "state_mutability": "external"
                },
                {
                    "type": "function",
                    "name": "set_challenge",
                    "inputs": [
                        {
                            "name": "challenge",
                            "type": "core::felt252"
                        }
                    ],
                    "outputs": [],
                    "state_mutability": "external"
                },
                {
                    "type": "function",
                    "name": "get_challenge",
                    "inputs": [],
                    "outputs": [
                        {
                            "type": "core::felt252"
                        }
                    ],
                    "state_mutability": "external"
                }
            ]
        },
        {
            "type": "constructor",
            "name": "constructor",
            "inputs": [
                {
                    "name": "token",
                    "type": "core::starknet::contract_address::ContractAddress"
                }
            ]
        },
        {
            "type": "event",
            "name": "starknet_multiple_contracts::todolist::SimpleVault::Event",
            "kind": "enum",
            "variants": []
        }
    ]
}
