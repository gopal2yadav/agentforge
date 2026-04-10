import { create } from 'zustand';

interface SwarmAgent {
  name: string;
  status: 'active' | 'idle' | 'busy';
  lastAction: string;
}

interface AppState {
  swarmAgents: SwarmAgent[];
  setSwarmAgents: (agents: SwarmAgent[]) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  swarmAgents: [
    { name: 'Monitor', status: 'active', lastAction: 'scanning' },
    { name: 'Coordinator', status: 'active', lastAction: 'routing' },
    { name: 'Debugger', status: 'idle', lastAction: 'watching' },
    { name: 'Optimizer', status: 'active', lastAction: 'analyzing' },
    { name: 'Improver', status: 'idle', lastAction: 'standby' },
    { name: 'Security', status: 'active', lastAction: 'guarding' },
  ],
  setSwarmAgents: (agents) => set({ swarmAgents: agents }),
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  commandOpen: false,
  setCommandOpen: (open) => set({ commandOpen: open }),
}));
