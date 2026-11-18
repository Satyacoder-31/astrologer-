'use client';

import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { Wallet, Check, Sparkles, X, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestedAmount?: number;
}

const PRESET_AMOUNTS = [
  { amount: 99, bonus: 0, tag: 'Starter' },
  { amount: 199, bonus: 20, tag: 'Popular' },
  { amount: 499, bonus: 75, tag: 'Best Value' },
  { amount: 999, bonus: 200, tag: 'Divine Pack' },
  { amount: 1999, bonus: 500, tag: 'Royal VIP' },
];

export const RechargeModal: React.FC<RechargeModalProps> = ({ isOpen, onClose, suggestedAmount }) => {
  const { balance, rechargeWallet, isRecharging } = useWallet();
  const [selectedAmount, setSelectedAmount] = useState<number>(suggestedAmount || 199);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('UPI (GPay / PhonePe / Paytm)');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!isOpen) return null;

  const currentFinalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handlePay = async () => {
    if (currentFinalAmount < 10) {
      alert('Minimum recharge amount is ₹10');
      return;
    }

    const res = await rechargeWallet(currentFinalAmount, selectedMethod);
    if (res.success) {
      setOrderId(res.orderId || 'TX_' + Date.now());
      setPaymentSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF62', '#087E8B', '#E6A64A'],
      });
      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
      }, 2000);
    } else {
      alert(res.error || 'Payment failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-midnight/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-cosmic-galaxy border border-cosmic-gold/40 p-6 md:p-8 shadow-2xl text-cosmic-white overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cosmic-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cosmic-peacock/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-cosmic-midnight/60 hover:bg-cosmic-midnight text-cosmic-white/70 hover:text-cosmic-white transition-colors border border-cosmic-border/30"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-cosmic-gold">
              Recharge Successful!
            </h3>
            <p className="text-sm text-cosmic-white/80">
              ₹{currentFinalAmount} added to your digital consultation wallet.
            </p>
            <div className="text-xs text-cosmic-white/50">
              Transaction ID: <span className="font-mono text-cosmic-peacock">{orderId}</span>
            </div>
            <div className="text-xs text-amber-200">
              New Wallet Balance: ₹{balance + currentFinalAmount}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-cosmic-gold/15 border border-cosmic-gold/40 text-cosmic-gold">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-cinzel font-bold text-cosmic-white">
                  Add Money to Wallet
                </h3>
                <p className="text-xs text-cosmic-white/60">
                  Current Balance: <span className="text-cosmic-gold font-bold">₹{balance}</span>
                </p>
              </div>
            </div>

            {/* Predefined Recharge Packs */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-gold mb-2.5">
                Select Recharge Amount
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {PRESET_AMOUNTS.map((pack) => {
                  const isSelected = selectedAmount === pack.amount && !customAmount;
                  return (
                    <button
                      key={pack.amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(pack.amount);
                        setCustomAmount('');
                      }}
                      className={`relative p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-cosmic-gold/20 border-cosmic-gold shadow-goldGlow scale-[1.02]'
                          : 'bg-cosmic-midnight/60 border-cosmic-border/30 hover:border-cosmic-gold/50'
                      }`}
                    >
                      {pack.bonus > 0 && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cosmic-saffron text-cosmic-midnight">
                          +₹{pack.bonus} Free
                        </span>
                      )}
                      <div className="text-lg font-bold text-cosmic-white font-cinzel">
                        ₹{pack.amount}
                      </div>
                      <div className="text-[10px] text-cosmic-white/50">{pack.tag}</div>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount input */}
              <div className="mt-3">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cosmic-gold font-bold">₹</span>
                  <input
                    type="number"
                    placeholder="Or enter custom amount (e.g. 250)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white placeholder:text-cosmic-white/30 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-cosmic-gold mb-2.5">
                Payment Method (Razorpay Gateway)
              </label>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'UPI (GPay / PhonePe / Paytm / BHIM)', badge: 'Fastest' },
                  { name: 'Debit / Credit Card (Visa / Mastercard / RuPay)' },
                  { name: 'Net Banking (All Indian Banks)' },
                  { name: 'Wallets & PayLater' },
                ].map((m) => (
                  <label
                    key={m.name}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedMethod === m.name
                        ? 'bg-cosmic-peacock/15 border-cosmic-peacock text-cosmic-white'
                        : 'bg-cosmic-midnight/50 border-cosmic-border/30 text-cosmic-white/70 hover:border-cosmic-gold/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={selectedMethod === m.name}
                        onChange={() => setSelectedMethod(m.name)}
                        className="accent-cosmic-gold"
                      />
                      <span>{m.name}</span>
                    </div>
                    {m.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold">
                        {m.badge}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* CTA Proceed Button */}
            <button
              onClick={handlePay}
              disabled={isRecharging || currentFinalAmount <= 0}
              className="w-full py-3.5 px-6 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-base hover:opacity-95 transition-all shadow-goldGlow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isRecharging ? (
                <>
                  <Zap className="w-5 h-5 animate-spin" />
                  Processing Razorpay Checkout...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Proceed to Pay ₹{currentFinalAmount}
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-cosmic-white/50">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Secured
              </span>
              <span>•</span>
              <span>100% Refund Guarantee</span>
              <span>•</span>
              <span>Verified Razorpay Partner</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
