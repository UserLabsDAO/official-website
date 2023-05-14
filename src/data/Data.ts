import {BigNumber} from 'bignumber.js'
export interface MineInfo {
    address?: string
    balance?: BigNumber
    record?: BigNumber[]
    animated?: boolean
}

export interface Menu  {
    label: string[]
    indexs: number[]
    childrens: any
    isSpecial: boolean
}