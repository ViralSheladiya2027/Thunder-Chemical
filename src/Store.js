import create from 'zustand'
import {persist} from "zustand/middleware";

let Store=(set)=>({
    dopen:true,
    rows:[],
setRows:(rows)=>set((state)=>({rows:rows})),
    updateOpen:(dopen)=>set((state)=>({dopen:dopen})),

});

Store = persist(Store,{name:"my_store"})
export const useStore = create(Store)