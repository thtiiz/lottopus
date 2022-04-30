import '~~/styles/main-page.css';
import { GenericContract } from 'eth-components/ant';
import { useBalance, useEthersAdaptorFromProviderOrSigners } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { useDexEthPrice } from 'eth-hooks/dapps';
import { asEthersAdaptor } from 'eth-hooks/functions';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { NETWORKS } from 'scaffold-common/src/constants';

import { MainPageHeader, createPagesAndTabs, TContractPageList } from './components/main';
import { useScaffoldHooksExamples as useScaffoldHooksExamples } from './components/main/hooks/useScaffoldHooksExamples';
import Announcement from './components/pages/Announcement';
import Home from './components/pages/Home';
import MyLotto from './components/pages/MyLotto';

import { useAppContracts, useConnectAppContracts, useLoadAppContracts } from '~~/components/contractContext';
import { useBurnerFallback } from '~~/components/main/hooks/useBurnerFallback';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { BURNER_FALLBACK_ENABLED, MAINNET_PROVIDER } from '~~/config/app.config';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * See config/app.config.ts for configuration, such as TARGET_NETWORK
 * See appContracts.config.ts and externalContracts.config.ts to configure your contracts
 * See pageList variable below to configure your pages
 * See web3Modal.config.ts to configure the web3 modal
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 *
 * For more
 */

/**
 * The main component
 * @returns
 */
export const MainPage: FC = () => {
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();

  // 🦊 Get your web3 ethers context from current providers
  const ethersContext = useEthersContext();

  // if no user is found use a burner wallet on localhost as fallback if enabled
  useBurnerFallback(scaffoldAppProviders, BURNER_FALLBACK_ENABLED);

  // -----------------------------
  // Load Contracts
  // -----------------------------
  // 🛻 load contracts
  useLoadAppContracts();
  // 🏭 connect to contracts for mainnet network & signer
  const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER);
  useConnectAppContracts(mainnetAdaptor);
  // 🏭 connec to  contracts for current network & signer
  useConnectAppContracts(asEthersAdaptor(ethersContext));

  // -----------------------------
  // Hooks use and examples
  // -----------------------------
  // 🎉 Console logs & More hook examples:
  // 🚦 disable this hook to stop console logs
  // 🏹🏹🏹 go here to see how to use hooks!
  useScaffoldHooksExamples(scaffoldAppProviders);

  // -----------------------------
  // These are the contracts!
  // -----------------------------

  // init contracts
  const lottopusContract = useAppContracts('Lottopus', ethersContext.chainId);
  const mainnetDai = useAppContracts('DAI', NETWORKS.mainnet.chainId);

  // 📟 Listen for broadcast events
  // const [setPurposeEvents] = useEventListener(yourContract, 'SetPurpose', 0);

  // -----------------------------
  // .... 🎇 End of examples
  // -----------------------------
  // 💵 This hook will get the price of ETH from 🦄 Uniswap:
  const [ethPrice] = useDexEthPrice(scaffoldAppProviders.mainnetAdaptor?.provider, scaffoldAppProviders.targetNetwork);

  // 💰 this hook will get your balance
  const [yourCurrentBalance] = useBalance(ethersContext.account);

  const [route, setRoute] = useState<string>('');
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  // -----------------------------
  // 📃 Page List
  // -----------------------------
  // This is the list of pages and tabs
  const pageList: TContractPageList = {
    mainPage: {
      name: 'Home',
      element: <Home />,
    },
    pages: [
      {
        name: 'My-Lotto',
        element: <MyLotto />,
      },
      {
        name: 'Announcement',
        element: <Announcement />,
      },
      {
        name: 'Lottopus',
        element: (
          <GenericContract
            contractName="Lottopus"
            contract={lottopusContract}
            mainnetAdaptor={scaffoldAppProviders.mainnetAdaptor}
            blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
          />
        ),
      },
    ],
  };
  const { pageElements, menuElement } = createPagesAndTabs(pageList, route, setRoute);

  return (
    <div className="App">
      <MainPageHeader scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} />
      {/* Routes should be added between the <Switch> </Switch> as seen below */}
      <BrowserRouter>
        {menuElement}
        <Switch>{pageElements}</Switch>
      </BrowserRouter>

      {/* <MainPageFooter scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} /> */}
    </div>
  );
};
