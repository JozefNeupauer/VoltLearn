import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, User, Crown, Settings } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Učiť sa', exact: true },
  { to: '/profile', icon: User, label: 'Profil', exact: false },
  { to: '/premium', icon: Crown, label: 'Prémium', exact: false },
  { to: '/settings', icon: Settings, label: 'Nastavenia', exact: false },
]

export function BottomNav() {
  const location = useLocation()

  // Hide during lessons
  if (location.pathname.startsWith('/lesson/')) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface-900/90 backdrop-blur-md border-t border-slate-800/80 safe-area-pb">
      <div className="max-w-2xl mx-auto flex">
        {navItems.map(({ to, icon: Icon, label, exact }) => {
          const isActive = exact
            ? location.pathname === to
            : location.pathname.startsWith(to)

          return (
            <NavLink
              key={to}
              to={to}
              className="relative flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors"
            >
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.15 }}
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive
                    ? 'text-electric-400'
                    : 'text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-electric-400' : 'text-slate-500'
                }`}
              >
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-electric-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
