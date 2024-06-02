use starknet::ContractAddress;

#[starknet::interface]
pub trait IERC20<TContractState> {
    fn get_name(self: @TContractState) -> felt252;
    fn get_symbol(self: @TContractState) -> felt252;
    fn get_decimals(self: @TContractState) -> u8;
    fn get_total_supply(self: @TContractState) -> felt252;
    fn balance_of(self: @TContractState, account: ContractAddress) -> felt252;
    fn allowance(
        self: @TContractState, owner: ContractAddress, spender: ContractAddress
    ) -> felt252;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: felt252);
    fn transfer_from(
        ref self: TContractState,
        sender: ContractAddress, recipient: ContractAddress, amount: felt252
    );
    fn approve(ref self: TContractState, spender: ContractAddress, amount: felt252);
    fn increase_allowance(ref self: TContractState, spender: ContractAddress, added_value: felt252);
    fn decrease_allowance(
        ref self: TContractState, spender: ContractAddress, subtracted_value: felt252
    );
}

#[starknet::interface]
pub trait ISimpleVault<TContractState> {
    fn deposit(ref self: TContractState, amount: felt252);
    fn challengeAndDeposit(ref self: TContractState, amount: felt252, challenge: felt252);
    fn withdraw(ref self: TContractState, amount: felt252);
    fn log_calories(ref self: TContractState, calories: felt252);
    fn get_calories(ref self: TContractState) -> felt252;
    fn set_challenge(ref self: TContractState, challenge: felt252);
    fn get_challenge(ref self: TContractState) -> felt252;
}

#[starknet::contract]
pub mod SimpleVault {
    use super::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{ContractAddress, get_caller_address, get_contract_address};

    #[storage]
    struct Storage {
        token: IERC20Dispatcher,
        total_supply: felt252,
        balance_of: LegacyMap<ContractAddress, felt252>,
        calories_burned: LegacyMap<ContractAddress, felt252>,
        calorie_challenge: LegacyMap<ContractAddress, felt252>
    }

    #[constructor]
    fn constructor(ref self: ContractState, token: ContractAddress) {
        self.token.write(IERC20Dispatcher { contract_address: token });
    }

    #[abi(embed_v0)]
    impl SimpleVault of super::ISimpleVault<ContractState> {
        fn deposit(ref self: ContractState, amount: felt252) {
            let caller = get_caller_address();
            let this = get_contract_address();
            self.balance_of.write(caller, self.balance_of.read(caller) + amount);
            self.token.read().transfer_from(caller, this, amount);
        }

        fn challengeAndDeposit(ref self: ContractState, amount: felt252, challenge: felt252) {
            let caller = get_caller_address();
            let this = get_contract_address();
            self.balance_of.write(caller, self.balance_of.read(caller) + amount);
            self.calorie_challenge.write(caller, challenge);
            self.token.read().transfer_from(caller, this, amount);
        }

        fn withdraw(ref self: ContractState, amount: felt252) {
            let caller = get_caller_address();
            let challenge = self.calorie_challenge.read(caller);
            let burned = self.calories_burned.read(caller);
            let burnedNumber: u256 = burned.into();
            let challengenumber: u256 = challenge.into();
            assert!(burnedNumber > challengenumber, "NOT_COMPLETED");
            self.balance_of.write(caller, self.balance_of.read(caller) - amount);
            self.token.read().transfer(caller, amount);
            
        }

        fn log_calories(ref self: ContractState, calories: felt252) {
            let caller = get_caller_address();
            self.calories_burned.write(caller, self.calories_burned.read(caller) + calories);
        }

        fn get_calories(ref self: ContractState) -> felt252 {
            let caller = get_caller_address();
            self.calories_burned.read(caller)
        }

        fn set_challenge(ref self: ContractState, challenge: felt252) {
            let caller = get_caller_address();
            self.calorie_challenge.write(caller, challenge);
        }

        fn get_challenge(ref self: ContractState) -> felt252 {
            let caller = get_caller_address();
            self.calorie_challenge.read(caller)
        }

    }
}