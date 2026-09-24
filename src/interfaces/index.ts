export interface Product {
  id: number
  name: string
  category: string
  description: string
  accent: 'violet' | 'cyan' | 'pink'
  metric: string
  metricLabel: string
  featured?: boolean
}

export interface StatItem {
  value: number
  target: number
  decimals: number
  prefix?: string
  suffix?: string
  label: string
}
