import { getWallets, BaseDotsamaWallet } from '@talisman/wallets';
import { useState } from 'react';
import './WalletSelect.module.css';

/* eslint-disable-next-line */
export interface WalletSelectProps {}

export function WalletSelect(props: WalletSelectProps) {
  const [supportedWallets, setWallets] = useState<Wallet[] | undefined>();
  const [accounts, setAccounts] = useState<Account[]>();
  return (
    <div>
      <h1>Welcome to WalletSelect!</h1>
      <button onClick={() => setWallets(getWallets())}>Connect wallet</button>
      {supportedWallets?.map((wallet) => {
        return (
          <div key={wallet.extensionName}>
            <button
              onClick={() =>
                wallet.subscribeAccounts((accounts: Account[]) => {
                  setAccounts(accounts);
                })
              }
            >
              {wallet.title}
            </button>
          </div>
        );
      })}
      {accounts?.map((account) => {
        return (
          <div key={account.address}>
            <span>{account.address}</span>
            <button
              onClick={async () => {
                if (!account.wallet?.sign) {
                  return;
                }
                const address = account.address;
                const payload = 'dummy message';
                const signature = await account.wallet?.sign(address, payload);
                console.log(
                  `>>> onclick sign`,
                  signature,
                  account.wallet.extension
                );
              }}
            >
              Sign
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default WalletSelect;
