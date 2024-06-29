"use client";
import Image from "next/image";
import illustration from "../../public/illustration-empty.svg";
import { useState } from "react";

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Home() {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [monthlyRepayments, setMonthlyRepayments] = useState(null);
  const [totalRepayments, setTotalRepayments] = useState(null);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    const parsedMortgageAmount = parseFloat(mortgageAmount.replace(/,/g, ""));
    if (!parsedMortgageAmount || !mortgageTerm || !interestRate) {
      setCalculationComplete(false);
      setError("All fields are required.");
      return;
    }

    const principal = parsedMortgageAmount;
    const years = parseFloat(mortgageTerm);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;

    if (isNaN(principal) || isNaN(years) || isNaN(monthlyInterestRate)) {
      setError("Please enter valid numbers.");
      setCalculationComplete(false);
      return;
    }

    const numberOfPayments = years * 12;
    let monthlyRepayment;
    let totalRepayment;

    if (mortgageType === "repayment") {
      monthlyRepayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      totalRepayment = monthlyRepayment * numberOfPayments;
    } else {
      monthlyRepayment = principal * monthlyInterestRate;
      totalRepayment = monthlyRepayment * numberOfPayments;
    }

    setMonthlyRepayments(monthlyRepayment.toFixed(2));
    setTotalRepayments(totalRepayment.toFixed(2));
    setError("");
    setCalculationComplete(true);
  };

  const handleMortgageAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value)) {
      setMortgageAmount(formatNumberWithCommas(value));
    }
  };

  return (
    <main className="flex h-screen bg-slate-100 items-center justify-center">
      <div className="flex flex-col sm:flex-row bg-white rounded-2xl w-[100vw] sm:w-1/2 h-auto">
        <div className="w-1/2 p-8">
          <div className="flex mb-10 justify-between">
            <p className="text-xl font-bold">Mortgage Calculator</p>
            <button className="hover:underline accent-slate-500 text-sm text-slate-500">
              Clear All
            </button>
          </div>
          <p className="text-sm text-slate-500 mb-1">Mortgage Amount</p>
          <div className="flex w-full border border-slate-500 mb-1 hover:border-black rounded-lg">
            <div className="w-12 text-center text-slate-500 text-lg p-2 rounded-tl-lg rounded-bl-lg bg-slate-100">
              £
            </div>
            <input
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(e.target.value)}
              className="w-full px-3 rounded-br-lg rounded-tr-lg h-11"
            />
          </div>
          <div className="h-4 mb-4">
            {error && <p className="text-xs text-red">{error}</p>}
          </div>
          <div className="flex gap-2 justify-between">
            <div className="flex w-1/2 flex-col">
              <p className="text-sm text-slate-500 mb-1">Mortage Term</p>
              <div className="flex border border-slate-500 rounded-lg hover:border-slate-900">
                <input
                  value={mortgageTerm}
                  onChange={(e) => setMortgageTerm(e.target.value)}
                  className="hover:border-slate-900 px-3  w-3/5 rounded-tl-lg rounded-bl-lg h-11"
                />
                <div className="flex w-2/5 bg-slate-100  rounded-tr-lg rounded-br-lg p-2 justify-center items-center">
                  <div className="text-sm text-slate-700">years</div>
                </div>
              </div>
              {error && (
                <div className="h-4 mt-1">
                  <p className="text-xs text-red">{error}</p>
                </div>
              )}
            </div>
            <div className="flex w-1/2 flex-col">
              <p className="text-sm text-slate-500 mb-1">Interest Rate</p>
              <div className="flex border-slate-500 rounded-lg border hover:border-slate-900">
                <input
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-4/5 px-3 rounded-tl-lg rounded-bl-lg h-11"
                />
                <div className="flex w-1/5 bg-slate-100 p-2 justify-center rounded-tr-lg rounded-br-lg items-center">
                  <div className="text-sm text-slate-500">%</div>
                </div>
              </div>
              {error && (
                <div className="h-4 mt-1">
                  <p className="text-xs text-red">{error}</p>
                </div>
              )}
            </div>
          </div>
          <p className="text-md text-slate-500 mt-5 text-sm mb-1">
            Mortgage Type
          </p>
          <button
            onClick={() => setMortgageType("repayment")}
            className={`w-full border-slate-500 hover:border-lime border py-2.5 mb-1.5 px-4 flex items-center rounded-lg ${
              mortgageType === "repayment" ? "border-lime bg-yellow-100" : ""
            }`}
          >
            <div className="rounded-full border-black border h-4 w-4"></div>
            <p className="pl-6">Repayment</p>
          </button>
          <button
            onClick={() => setMortgageType("interest-only")}
            className={`w-full border-slate-500 hover:border-lime border py-2.5 px-4 flex items-center rounded-lg ${
              mortgageType === "interest-only"
                ? "border-lime bg-yellow-100"
                : ""
            } `}
          >
            <div className="rounded-full border-black border h-4 w-4"></div>
            <p className="pl-6">Interest Only</p>
            
          </button>
          <div className="h-4 mt-1 mb-4">
            {error && <p className="text-xs text-red">{error}</p>}
          </div>
          
          <button
            onClick={handleCalculate}
            className="w-auto px-6 flex justify-center items-center gap-2 text-black bg-lime rounded-full font-bold py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#133041"
                d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
              />
            </svg>
            Calculate Repayments
          </button>
        </div>
        {calculationComplete ? (
          <div className="w-1/2 flex flex-col gap-4 p-8 bg-slate-900 rounded-tr-2xl rounded-br-2xl rounded-bl-4xl">
            <p className="text-white font-bold text-xl">Your results</p>
            <p className="text-xs leading-relaxed mb-4 text-slate-300">
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
            <div className="w-full h-auto rounded-xl bg-gray-900 p-6 border-t-2 border-t-lime">
              <p className="text-xs text-slate-500">Your monthly repayments</p>
              <p className="text-5xl overflow-auto font-medium text-lime mt-3 mb-3 pb-6">
                £{monthlyRepayments}
              </p>
              <div className="w-full border border-slate-700"></div>
              <p className="text-xs text-slate-500 pt-8">
                Total you'll repay over the term
              </p>
              <p className="text-xl overflow-auto text-white mt-2">
                £{totalRepayments}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-1/2 flex justify-center items-center flex-col gap-3 px-4 bg-slate-900 rounded-bl-4xl">
            <Image
              className="object-cover -mt-4"
              src={illustration}
              alt="empty"
            />
            <p className="text-center text-xl text-white">Results shown here</p>
            <p className="text-center text-sm text-gray-500">
              Complete the form and click “calculate repayments” to see what
              your monthly repayments would be
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
