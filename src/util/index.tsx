import {animate, cubicBezier, springEasing} from './AnimationUtil'
import getContentStyle from './ContentStyleUtil'
import {formatTime,formatDuration} from './TimeUtil'
import { mainnet } from 'index'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { toast } from "react-toastify";

const udtoast = toast
  
const shortenAddr = (addr) => addr.slice(0, 4) + "****" + addr.slice(-4)

const connector = new InjectedConnector()
async function switchNetwork(chainId: number = 1) {
    const provider = (window as any).stargate?.wallet?.ethereum?.signer?.provider?.provider ?? (window as any).ethereum
    if (mainnet && provider) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        })
        return true
      } catch (switchError) {
        if ((switchError as any)?.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${mainnet.id.toString(16)}`,
                  chainName: mainnet.name,
                  nativeCurrency: mainnet.nativeCurrency,
                  rpcUrls: mainnet.rpcUrls.default.http,
                  blockExplorerUrls: [mainnet.blockExplorers?.default.url],
                },
              ],
            })
            return true
          } catch (error) {
            console.error('Failed to setup the network', error)
            return false
          }
        }
        return false
      }
    }
    return false
  }

export {animate, cubicBezier, springEasing, shortenAddr,connector,switchNetwork, getContentStyle, formatTime,formatDuration,udtoast}