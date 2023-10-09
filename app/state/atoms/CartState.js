import { recoilPersist } from 'recoil-persist'

import { atom } from "recoil";

const { persistAtom } = recoilPersist()
export const CartState = atom({
    key:"add to cart",
    default:[],
    effects_UNSTABLE: [persistAtom],
})
