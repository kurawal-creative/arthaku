export type TargetStatus = 'Berjalan' | 'Tercapai' | 'Hampir Tercapai' | 'Gagal'

export type Target = {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  status: TargetStatus
  estimatedDate?: string
}
