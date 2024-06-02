'use client'
import {
    CheckIcon,
} from "lucide-react";
import React, {FormEventHandler, useState} from "react";
import {Account, Chain, Hex, Transport, WalletClient} from "viem";
import {Call, Contract} from "starknet";
import {erc20Abi} from "@/app/challenge/abi2";
import {useDynamicContext} from "@dynamic-labs/sdk-react-core";
import useGoogleFitness from '../../hooks/useGoogleFitness';

const FitnessChallenge: React.FC = () => {
    const [step, setStep] = useState(1);
    const [challengeName, setChallengeName] = useState("");
    const [calorieGoal, setCalorieGoal] = useState(200);
    const {primaryWallet} = useDynamicContext();
    const { isSignedIn, handleSignIn, handleSignOut, getFitnessData } = useGoogleFitness();

    const [txnHash, setTxnHash] = useState("");

    if (!primaryWallet) return null;


    const handleNext = () => {
        setStep(step + 1);
    };
    const handlePrev = () => {
        setStep(step - 1);
    };
    const handleSubmit = async () => {
        await onSubmit()
        setStep(3);
    };

    const onSubmit = async () => {
        try {
            const provider = await primaryWallet.connector.getSigner<
                WalletClient<Transport, Chain, Account>
            >();
            if (!provider) return;

            const challgenContract = new Contract(
                erc20Abi.abi,
                "0x0556a6fae70f130ef661954c466c8426de77da2b42140b03c33c6865ddb0088d",
                provider as any,
            )
            const transferCallData: Call = challgenContract.populate('challengeAndDeposit', {
                "amount": 1,
                "challenge": calorieGoal,
            });
            const { transaction_hash: transferTxHash } = await challgenContract.challengeAndDeposit(transferCallData.calldata);

            const hash = await provider.waitForTransaction(transferTxHash);

            setTxnHash(hash.transaction_hash);
        } catch(e: any) {
            console.log("error")
            console.log(e)
        }
    };

    const onFinish = async () => {
        try {
            const provider = await primaryWallet.connector.getSigner<
                WalletClient<Transport, Chain, Account>
            >();
            if (!provider) return;

            const challgenContract = new Contract(
                erc20Abi.abi,
                "0x0556a6fae70f130ef661954c466c8426de77da2b42140b03c33c6865ddb0088d",
                provider as any,
            )
            const transferCallData: Call = challgenContract.populate('withdraw', {
                "amount": 1,
            });
            const { transaction_hash: transferTxHash } = await challgenContract.withdraw(transferCallData.calldata);

            const hash = await provider.waitForTransaction(transferTxHash);

            setTxnHash(hash.transaction_hash);
        } catch(e: any) {
            console.log("error")
            console.log(e)
        }
    };

    const logCalories = async () => {
        try {
            const provider = await primaryWallet.connector.getSigner<
                WalletClient<Transport, Chain, Account>
            >();
            if (!provider) return;
            let currentCal = getFitnessData()

            const challgenContract = new Contract(
                erc20Abi.abi,
                "0x0556a6fae70f130ef661954c466c8426de77da2b42140b03c33c6865ddb0088d",
                provider as any,
            )
            const transferCallData: Call = challgenContract.populate('log_calories', {
                "calories": currentCal,
            });
            const { transaction_hash: transferTxHash } = await challgenContract.log_calories(transferCallData.calldata);

            const hash = await provider.waitForTransaction(transferTxHash);

            setTxnHash(hash.transaction_hash);
        } catch(e: any) {
            console.log("error")
            console.log(e)
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            data-id="element-0"
        >
            <div
                className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-sm md:max-w-lg w-full"
                data-id="element-1"
            >
                <h2 className="text-2xl font-bold mb-6 text-center" data-id="element-2">
                    Create a Fitness Challenge
                </h2>
                {step === 1 && (
                    <div data-id="element-3">
                        <p className="mb-6 text-center" data-id="element-4">
                            Welcome! Let's set up your calorie challenge. First, give your
                            challenge a name.
                        </p>
                        <div className="mb-4" data-id="element-5">
                            <label
                                htmlFor="challengeName"
                                className="block mb-1 font-bold"
                                data-id="element-6"
                            >
                                Challenge Name
                            </label>
                            <input
                                type="text"
                                id="challengeName"
                                className="w-full border-black border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                value={challengeName}
                                onChange={(e) => setChallengeName(e.target.value)}
                                data-id="element-7"
                            />
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-full bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 border-2 border-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition duration-200"
                            data-id="element-8"
                        >
                            Next
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div data-id="element-9">
                        <p className="mb-6 text-center" data-id="element-10">
                            Set your total calorie goal for the challenge period. Use the
                            slider or input your target directly.
                        </p>
                        <div className="mb-8" data-id="element-11">
                            <input
                                type="range"
                                min="100"
                                max="500"
                                step="10"
                                value={calorieGoal}
                                onChange={(e) => setCalorieGoal(Number(e.target.value))}
                                className="w-full accent-cyan-300"
                                data-id="element-12"
                            />
                            <div
                                className="flex justify-between text-sm"
                                data-id="element-13"
                            >
                                <span data-id="element-14">100</span>
                                <span data-id="element-15">{calorieGoal} cal</span>
                                <span data-id="element-16">500</span>
                            </div>
                        </div>
                        <div className="flex justify-between" data-id="element-17">
                            <button
                                onClick={handlePrev}
                                className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 border-2 border-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition duration-200"
                                data-id="element-18"
                            >
                                Prev
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 border-2 border-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition duration-200"
                                data-id="element-19"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div data-id="element-43">
                        <div
                            className="flex flex-col items-center justify-center space-y-6"
                            data-id="element-44"
                        >
                            <CheckIcon
                                className="w-16 h-16 text-lime-400"
                                data-id="element-45"
                            />
                            <h3 className="text-2xl font-bold" data-id="element-46">
                                Challenge Created Successfully!
                            </h3>
                            <p className="text-center" data-id="element-47">
                                Your fitness challenge has been created. Here's a summary:
                            </p>
                            <div
                                className="bg-cyan-200 p-4 rounded-md border-2 border-black"
                                data-id="element-48"
                            >
                                <p data-id="element-49">
                                    <strong data-id="element-50">Challenge Name:</strong>{" "}
                                    {challengeName}
                                </p>
                                <p data-id="element-51">
                                    <strong data-id="element-52">Calorie Goal:</strong>{" "}
                                    {calorieGoal} calories
                                </p>
                                <p data-id="element-51">
                                    <strong data-id="element-52">Hash:</strong>{" "}
                                    {`${txnHash.substring(0, 20)}....`}
                                </p>
                            </div>
                            {isSignedIn ? (
                                <div className='p-4'>
                                    <button
                                        className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 border-2 border-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition duration-200"
                                        data-id="element-55"
                                        onClick={logCalories}
                                    >
                                        Log Calories
                                    </button>
                                    <button
                                        className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 border-2 border-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition duration-200"
                                        data-id="element-55"
                                        onClick={onFinish}
                                    >
                                        End Challenge
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 border-2 border-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition duration-200"
                                        data-id="element-55"
                                        onClick={handleSignIn}
                                    >
                                        Sing In
                                    </button>
                                </div>
                        )}
                    </div>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default FitnessChallenge;
