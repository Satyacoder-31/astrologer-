'use client';

import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { RechargeModal } from '@/components/wallet/RechargeModal';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  Gift,
  RotateCcw,
  Receipt,
  Download,
} from 'lucide-react';

export default function WalletPage() {
  const { balance, transactions } = useWallet();
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'recharge' | 'deduction' | 'promo' | 'refund'>('all');
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<any | null>(null);

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === 'recharge') return tx.type === 'recharge';
    if (filterType === 'deduction') return tx.type === 'consultation_deduction';
    if (filterType === 'promo') return tx.type === 'promotional_credit';
    if (filterType === 'refund') return tx.type === 'refund';
    return true;
  });

  const totalRecharged = transactions
    .filter((t) => t.type === 'recharge' && t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter((t) => t.type === 'consultation_deduction')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Digital Consultation Wallet
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Secure, server-authoritative Razorpay ledger for seamless per-minute consultations.
        </p>
      </div>

      {/* Main Balance & Action Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-7 rounded-3xl bg-gradient-to-tr from-cosmic-galaxy via-cosmic-midnight to-cosmic-galaxy border-2 border-cosmic-gold/50 p-8 shadow-goldGlow relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cosmic-gold/20 text-cosmic-gold">
                <Wallet className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] text-cosmic-white/60 uppercase tracking-widest block font-poppins">
                  Current Balance
                </span>
                <span className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
                  ₹{balance}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsRechargeModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Money
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-8 border-t border-cosmic-border/30 mt-8 text-xs">
            <div>
              <div className="text-cosmic-white/50 text-[10px] uppercase">Lifetime Added</div>
              <div className="text-base font-bold text-emerald-300 font-cinzel">₹{totalRecharged}</div>
            </div>
            <div>
              <div className="text-cosmic-white/50 text-[10px] uppercase">Consultation Spent</div>
              <div className="text-base font-bold text-amber-200 font-cinzel">₹{totalSpent}</div>
            </div>
            <div>
              <div className="text-cosmic-white/50 text-[10px] uppercase">Security</div>
              <div className="text-base font-bold text-cosmic-peacock flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 256-Bit SSL
              </div>
            </div>
          </div>
        </div>

        {/* Quick Recharge Packs */}
        <div className="lg:col-span-5 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel font-bold text-base text-cosmic-white">
              Instant Quick Recharge
            </h3>
            <span className="text-[10px] text-cosmic-peacock font-semibold uppercase">
              Razorpay Secured
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { amount: 99, bonus: 0 },
              { amount: 199, bonus: 20 },
              { amount: 499, bonus: 75 },
              { amount: 999, bonus: 200 },
            ].map((pack) => (
              <button
                key={pack.amount}
                onClick={() => setIsRechargeModalOpen(true)}
                className="p-3 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30 hover:border-cosmic-gold/60 text-center transition-all group"
              >
                <div className="text-lg font-cinzel font-bold text-cosmic-white group-hover:text-cosmic-gold">
                  ₹{pack.amount}
                </div>
                {pack.bonus > 0 ? (
                  <div className="text-[10px] text-cosmic-saffron font-bold">
                    + ₹{pack.bonus} Free Credits
                  </div>
                ) : (
                  <div className="text-[10px] text-cosmic-white/50">Starter Pack</div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsRechargeModalOpen(true)}
            className="w-full py-3 rounded-xl bg-cosmic-peacock/20 border border-cosmic-peacock/50 text-cosmic-white hover:bg-cosmic-peacock/40 transition-colors font-cinzel font-bold text-xs"
          >
            Custom Amount or Divine VIP Packs →
          </button>
        </div>
      </div>

      {/* Transaction History & Ledger */}
      <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-cinzel font-bold text-cosmic-white">
              Transaction History & Audit Ledger
            </h3>
            <p className="text-xs text-cosmic-white/60 font-poppins">
              Immutable ledger of recharges, per-minute session deductions, and refunds.
            </p>
          </div>

          {/* Ledger Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-cosmic-midnight border border-cosmic-border/30 text-xs overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'recharge', label: 'Recharges' },
              { id: 'deduction', label: 'Deductions' },
              { id: 'promo', label: 'Bonuses' },
              { id: 'refund', label: 'Refunds' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  filterType === f.id
                    ? 'bg-cosmic-gold text-cosmic-midnight font-bold shadow-sm'
                    : 'text-cosmic-white/70 hover:text-cosmic-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-poppins">
            <thead>
              <tr className="border-b border-cosmic-border/30 text-cosmic-gold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Transaction Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Balance After</th>
                <th className="py-3 px-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cosmic-border/20">
              {filteredTransactions.map((tx) => {
                const isPositive = tx.type === 'recharge' || tx.type === 'promotional_credit' || tx.type === 'refund';
                return (
                  <tr key={tx.id} className="hover:bg-cosmic-midnight/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-cosmic-white">{tx.description}</div>
                      <div className="text-[10px] text-cosmic-white/50 font-mono">{tx.id}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          tx.type === 'recharge'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : tx.type === 'consultation_deduction'
                            ? 'bg-amber-500/20 text-amber-300'
                            : tx.type === 'promotional_credit'
                            ? 'bg-cosmic-purple/30 text-purple-200'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {tx.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-cosmic-white/70">{tx.paymentMethod}</td>
                    <td className="py-3.5 px-4 text-cosmic-white/60">
                      {new Date(tx.timestamp).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className={`py-3.5 px-4 text-right font-bold font-cinzel text-sm ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPositive ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-cosmic-white font-cinzel">
                      ₹{tx.balanceAfter}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedTxForReceipt(tx)}
                        className="p-1.5 rounded-lg bg-cosmic-midnight text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-midnight transition-colors"
                        title="View Invoice Receipt"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Receipt Modal */}
      {selectedTxForReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-midnight/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-cosmic-galaxy border-2 border-cosmic-gold p-6 text-cosmic-white space-y-4">
            <div className="flex items-center justify-between border-b border-cosmic-border/30 pb-3">
              <div className="font-cinzel font-bold text-lg text-cosmic-gold">
                Krishna Jyotish Tax Invoice
              </div>
              <button
                onClick={() => setSelectedTxForReceipt(null)}
                className="text-cosmic-white/60 hover:text-cosmic-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-cosmic-white/50">Receipt Number:</span>
                <span className="font-mono text-cosmic-gold">{selectedTxForReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cosmic-white/50">Payment Reference:</span>
                <span className="font-mono">{selectedTxForReceipt.orderId || 'INTERNAL_LEDGER'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cosmic-white/50">Description:</span>
                <span className="font-semibold">{selectedTxForReceipt.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cosmic-white/50">Method:</span>
                <span>{selectedTxForReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cosmic-white/50">Timestamp:</span>
                <span>{new Date(selectedTxForReceipt.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-cosmic-border/30 text-base font-bold">
                <span>Amount:</span>
                <span className="text-cosmic-gold font-cinzel">₹{selectedTxForReceipt.amount}</span>
              </div>
            </div>

            <div className="pt-2 text-center text-[10px] text-cosmic-white/40">
              Authorized digital receipt generated by Krishna Cosmic Universe
            </div>
          </div>
        </div>
      )}

      {/* Recharge Modal Portal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
      />
    </div>
  );
}
