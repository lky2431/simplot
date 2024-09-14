export enum PresetScheme {
    default = "default",
    red = "red",
    orange = "orange",
    yellow = "yellow",
    lime = "lime",
    emerald = "emerald",
    cyan = "cyan",
    blue = "blue",
    violet = "violet",
    fuchsia = "fuchsia",
    rose = "rose",
    neutral = "neutral"
}



export const PresetSchemeCSS = {
    [PresetScheme.default]: ["#2662d9", "#e23670", "#e88c30", "#af57db", "#2eb88a", "#2680d9", "#669933", "#d22d2d", "#d2d22d", "#4040bf"],
    [PresetScheme.red]: [
        '#fee2e2',
        '#fecaca',
        '#fca5a5',
        '#f87171',
        '#ef4444',
        '#dc2626',
        '#b91c1c',
        '#991b1b',
        '#7f1d1d',
        '#450a0a'
    ],
    [PresetScheme.orange]: [
        '#ffedd5', // bg-orange-100
        '#fdba74', // bg-orange-200
        '#fb923c', // bg-orange-300
        '#f97316', // bg-orange-400
        '#ea580c', // bg-orange-500
        '#dc2626', // bg-orange-600
        '#c2410c', // bg-orange-700
        '#9a3412', // bg-orange-800
        '#7c2d12', // bg-orange-900
        '#431407'  // bg-orange-950
    ],
    [PresetScheme.yellow]: [
        '#fefcbf', // bg-yellow-100
        '#fde68a', // bg-yellow-200
        '#fcd34d', // bg-yellow-300
        '#fbbf24', // bg-yellow-400
        '#f59e0b', // bg-yellow-500
        '#d97706', // bg-yellow-600
        '#b45309', // bg-yellow-700
        '#92400e', // bg-yellow-800
        '#78350f', // bg-yellow-900
        '#451a0d'  // bg-yellow-950
    ],
    [PresetScheme.lime]: [
        '#f7fee7', // bg-lime-100
        '#ecfccb', // bg-lime-200
        '#d9f99d', // bg-lime-300
        '#bef264', // bg-lime-400
        '#a3e635', // bg-lime-500
        '#84cc16', // bg-lime-600
        '#65a30d', // bg-lime-700
        '#4d7c0f', // bg-lime-800
        '#3f6212', // bg-lime-900
        '#365314'  // bg-lime-950
    ],
    [PresetScheme.emerald]: [
        '#d1fae5', // bg-emerald-100
        '#a7f3d0', // bg-emerald-200
        '#6ee7b7', // bg-emerald-300
        '#34d399', // bg-emerald-400
        '#10b981', // bg-emerald-500
        '#059669', // bg-emerald-600
        '#047857', // bg-emerald-700
        '#065f46', // bg-emerald-800
        '#064e3b', // bg-emerald-900
        '#022c22'  // bg-emerald-950
    ],
    [PresetScheme.cyan]: [
        '#cffafe', // bg-cyan-100
        '#a5f3fc', // bg-cyan-200
        '#67e8f9', // bg-cyan-300
        '#22d3ee', // bg-cyan-400
        '#06b6d4', // bg-cyan-500
        '#06a4b4', // bg-cyan-600
        '#0e7490', // bg-cyan-700
        '#155e75', // bg-cyan-800
        '#164e63', // bg-cyan-900
        '#0e3a4d'  // bg-cyan-950
    ],
    [PresetScheme.blue]: [
        '#dbeafe', // bg-blue-100
        '#bfdbfe', // bg-blue-200
        '#93c5fd', // bg-blue-300
        '#60a5fa', // bg-blue-400
        '#3b82f6', // bg-blue-500
        '#2563eb', // bg-blue-600
        '#1d4ed8', // bg-blue-700
        '#1e40af', // bg-blue-800
        '#1e3a8a', // bg-blue-900
        '#1e2a78'  // bg-blue-950
    ],
    [PresetScheme.violet]: [
        '#e0e7ff', // bg-violet-100
        '#c7d2fe', // bg-violet-200
        '#a5b4fc', // bg-violet-300
        '#818cf8', // bg-violet-400
        '#6366f1', // bg-violet-500
        '#4f46e5', // bg-violet-600
        '#4338ca', // bg-violet-700
        '#3730a3', // bg-violet-800
        '#312e81', // bg-violet-900
        '#1e1a78'  // bg-violet-950
    ],
    [PresetScheme.fuchsia]: [
        '#fae8ff', // bg-fuchsia-100
        '#f5d0fe', // bg-fuchsia-200
        '#f0abfc', // bg-fuchsia-300
        '#e879f9', // bg-fuchsia-400
        '#d946ef', // bg-fuchsia-500
        '#c026d3', // bg-fuchsia-600
        '#a21caf', // bg-fuchsia-700
        '#86198f', // bg-fuchsia-800
        '#701a75', // bg-fuchsia-900
        '#4a044e'  // bg-fuchsia-950
    ],
    [PresetScheme.rose]: [
        '#ffe4e6', // bg-rose-100
        '#fecdd3', // bg-rose-200
        '#fda4af', // bg-rose-300
        '#fb7185', // bg-rose-400
        '#f43f5e', // bg-rose-500
        '#e11d48', // bg-rose-600
        '#be123c', // bg-rose-700
        '#9f1239', // bg-rose-800
        '#881337', // bg-rose-900
        '#4c0519'  // bg-rose-950
    ],
    [PresetScheme.neutral]: [
        '#f9fafb', // bg-neutral-100
        '#f3f4f6', // bg-neutral-200
        '#e5e7eb', // bg-neutral-300
        '#d1d5db', // bg-neutral-400
        '#9ca3af', // bg-neutral-500
        '#6b7280', // bg-neutral-600
        '#4b5563', // bg-neutral-700
        '#374151', // bg-neutral-800
        '#1f2937', // bg-neutral-900
        '#111827'  // bg-neutral-950
    ]
}
