import { useXrplReact } from '@dropfi/xrpl-react';
import { createContext, useContext } from 'react';

type Wallet = {
  address?: string;
};

const WalletContext = createContext<Wallet | null>(null);
export default function WalletWrapper({ children }: { children: React.ReactNode }) {
  const { address } = useXrplReact();

  return (
    <WalletContext.Provider
      value={{
        address,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletWrapper');
  }
  return context;
}
