<script module lang="ts">
  import WalletIcon from '@lucide/svelte/icons/wallet'
  import TargetIcon from '@lucide/svelte/icons/target'
  import BarChartIcon from '@lucide/svelte/icons/bar-chart'
  import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard'
  import BrainIcon from '@lucide/svelte/icons/brain'
  import PlugIcon from '@lucide/svelte/icons/plug'
  import ActivityIcon from '@lucide/svelte/icons/activity'
  import UserIcon from '@lucide/svelte/icons/user'
  import MessageCircleIcon from '@lucide/svelte/icons/message-circle'

  export type SidebarNavItem = {
    title: string
    path?: string
    icon?: any
    isActive?: boolean
    subItems?: SidebarNavItem[]
  }

  export type SidebarNavGroup = {
    label: string
    items: SidebarNavItem[]
  }

  export const navGroups: SidebarNavGroup[] = [
    {
      label: 'Keuangan',
      items: [
        {
          title: 'Dashboard',
          path: '/dashboard',
          icon: LayoutDashboardIcon,
        },
        {
          title: 'Transaksi',
          path: '/dashboard/transactions',
          icon: WalletIcon,
        },
        {
          title: 'Target',
          path: '/dashboard/target',
          icon: TargetIcon,
        },
        {
          title: 'Analitik',
          path: '/dashboard/analytics',
          icon: BarChartIcon,
        },
        {
          title: 'Insight',
          path: '/dashboard/insight',
          icon: BrainIcon,
        },
      ],
    },
    {
      label: 'Pengguna',
      items: [
        {
          title: 'Profil',
          path: '/dashboard/profile',
          icon: UserIcon,
        },
        {
          title: 'Aktivitas',
          path: '#/activity',
          icon: ActivityIcon,
        },
      ],
    },
    {
      label: 'Integrasi & Sistem',
      items: [
        {
          title: 'Bot & Chat',
          path: '#/bot',
          icon: MessageCircleIcon,
        },
        {
          title: 'Integrasi',
          path: '#/integrations',
          icon: PlugIcon,
        },
      ],
    },
  ]

  export const navLinks: SidebarNavItem[] = [...navGroups.flatMap((group) => group.items.flatMap((item) => (item.subItems?.length ? [item, ...item.subItems] : [item])))]
</script>
