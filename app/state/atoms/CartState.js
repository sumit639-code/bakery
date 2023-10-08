
import { atom } from "recoil";
const getlocatstorage = ()=>{
    
    let local = JSON.parse(localStorage.getItem('Cake'))
    if(local == []){
        return [];
    }
    else{
        return local;
    }
}
export const CartState = atom({
    key:"add to cart",
    default:getlocatstorage()
})
