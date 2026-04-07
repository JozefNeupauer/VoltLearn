import { motion } from 'framer-motion'
import { Check, Zap, Star, Shield, BookOpen, Trophy, Infinity, Clock, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { Plan } from '../types'

interface PlanFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  id: Plan
  name: string
  price: string
  period: string
  description: string
  color: string
  borderColor: string
  buttonClass: string
  badge?: string
  features: PlanFeature[]
}

const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '0 €',
    period: 'navždy',
    description: 'Začni svoju elektrotechnickú cestu ešte dnes',
    color: 'from-slate-700 to-slate-800',
    borderColor: 'border-slate-700',
    buttonClass: 'bg-slate-700 hover:bg-slate-600 text-white',
    features: [
      { text: 'Téma Základy elektiny', included: true },
      { text: 'Téma Ohmov zákon', included: true },
      { text: '5 lekcií denne', included: true },
      { text: 'Základné typy kvízov', included: true },
      { text: 'Prémiové témy (4)', included: false },
      { text: 'Neobmedzené denné lekcie', included: false },
      { text: 'Zmrazenie série', included: false },
      { text: 'Analytika pokroku', included: false },
      { text: 'Certifikáty o absolvovaní', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '9,99 €',
    period: 'mesačne',
    description: 'Odomkni svoj plný potenciál',
    color: 'from-electric-700 to-electric-900',
    borderColor: 'border-electric-600/60',
    buttonClass: 'bg-electric-600 hover:bg-electric-500 text-white shadow-lg shadow-electric-900/50',
    badge: 'POPULAR',
    features: [
      { text: 'Všetkých 6 tém odomknutých', included: true },
      { text: 'Neobmedzené lekcie', included: true },
      { text: 'Všetky typy kvízov', included: true },
      { text: 'Zmrazenie série (3/mesiac)', included: true },
      { text: 'Analytika pokroku', included: true },
      { text: 'Bez reklám', included: true },
      { text: 'Certifikáty o absolvovaní', included: false },
      { text: 'Personalizovaná cesta', included: false },
      { text: 'Prioritná podpora', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '19,99 €',
    period: 'mesačne',
    description: 'Pre vážnych profesionálov',
    color: 'from-amber-600 to-orange-700',
    borderColor: 'border-amber-500/60',
    buttonClass: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black',
    features: [
      { text: 'Všetko z Prémiového plánu', included: true },
      { text: 'Certifikáty o absolvovaní', included: true },
      { text: 'Personalizovaná cesta učenia', included: true },
      { text: 'Prioritná emailová podpora', included: true },
      { text: 'Včasný prístup k novým témam', included: true },
      { text: 'Neobmedzené zmrazenie série', included: true },
      { text: 'Offline režim', included: true },
      { text: 'Pripomienky na učenie', included: true },
      { text: 'Export pokroku (PDF)', included: true },
    ],
  },
]

export function PremiumPage() {
  const { state, upgradePlan } = useApp()
  const { plan } = state.user

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          className="text-4xl"
        >
          ⚡
        </motion.div>
        <h1 className="text-2xl font-black text-white">Upgradovať VoltLearn</h1>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          Vyber si plán, ktorý zodpovedá tvojim cieľom učenia
        </p>
      </div>

      {/* Current plan badge */}
      {plan !== 'free' && (
        <div className="flex justify-center">
          <span className="text-sm font-semibold text-volt-400 bg-volt-600/20 border border-volt-600/40 px-4 py-1.5 rounded-full">
            ✓ Si na pláne {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </span>
        </div>
      )}

      {/* Plan cards */}
      <div className="space-y-4">
        {PLANS.map((p, i) => {
          const isCurrent = plan === p.id

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border overflow-hidden ${p.borderColor} ${isCurrent ? 'ring-2 ring-volt-500' : ''}`}
            >
              {/* Card header */}
              <div className={`bg-gradient-to-br ${p.color} p-5`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white">{p.name}</h3>
                      {p.badge && (
                        <span className="text-xs font-black text-electric-200 bg-white/20 px-2 py-0.5 rounded-full">
                          {p.badge}
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-xs font-bold text-volt-300 bg-volt-600/30 px-2 py-0.5 rounded-full">
                          AKTUÁLNY
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 text-xs mt-0.5">{p.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">{p.price}</p>
                    <p className="text-white/60 text-xs">{p.period}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-surface-800 p-5 space-y-2.5">
                {p.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        f.included
                          ? 'bg-volt-600/20 border border-volt-600/40'
                          : 'bg-slate-800 border border-slate-700'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${f.included ? 'text-volt-400' : 'text-slate-700'}`}
                        strokeWidth={3}
                      />
                    </div>
                    <span className={`text-sm ${f.included ? 'text-slate-200' : 'text-slate-600 line-through'}`}>
                      {f.text}
                    </span>
                  </div>
                ))}

                {/* CTA */}
                <div className="pt-2">
                  {isCurrent ? (
                    <div className="w-full py-3 bg-volt-700/20 border border-volt-700/40 text-volt-400 font-bold rounded-xl text-sm text-center">
                      ✓ Aktuálny plán
                    </div>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => upgradePlan(p.id)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${p.buttonClass}`}
                    >
                      {p.price === '0 €' ? 'Prejsť na Free' : `Získať ${p.name} – ${p.price}/mes.`}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Trust row */}
      <div className="grid grid-cols-3 gap-3 pb-2">
        {[
          { icon: Shield, label: 'Bezpečné', sub: 'SSL šifrované' },
          { icon: Clock, label: 'Zrušenie kedykoľvek', sub: 'Bez záväzkov' },
          { icon: Users, label: '10 000+ študentov', sub: 'Dôverujú nám' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center gap-1">
            <item.icon className="w-5 h-5 text-slate-500" />
            <p className="text-xs font-semibold text-slate-400">{item.label}</p>
            <p className="text-xs text-slate-600">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
