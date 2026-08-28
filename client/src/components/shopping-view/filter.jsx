import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Fragment } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "../ui/checkbox";


function ProductFilter({filters, handleFIlter}) {
    const selectedFilterCount = Object.values(filters || {}).reduce(
        (count, selectedOptions) => count + (selectedOptions?.length || 0),
        0,
    );

    return ( 
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-yellow-500/15 text-yellow-400">
                        <SlidersHorizontal className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold tracking-tight">Filter products</h2>
                        <p className="mt-0.5 text-xs text-white/45">Refine your selection</p>
                    </div>
                </div>
                {selectedFilterCount > 0 && (
                    <span className="rounded-full bg-yellow-400 px-2.5 py-1 text-[11px] font-bold text-neutral-950">
                        {selectedFilterCount} active
                    </span>
                )}
            </div>
            <div className="space-y-1 px-3 py-3">
                {
                    Object.keys(filterOptions).map(keyItem=><Fragment key={keyItem}>
                        <div className="border-b border-white/[0.07] px-2 py-4 last:border-b-0">
                            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">{keyItem}</h3>
                            <div className="grid gap-1">
                                {
                                    filterOptions[keyItem].map(option=><Label key={option.id} className="group flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white">
                                        <Checkbox checked={
                                            filters && Object.keys(filters).length > 0 && 
                                            filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                        } onCheckedChange={()=>handleFIlter(keyItem, option.id)} className="size-[17px] rounded-md border-white/25 data-[state=checked]:border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-neutral-950"/>
                                        <span className="transition-transform group-hover:translate-x-0.5">{option.label}</span>
                                    </Label>)
                                }
                            </div>
                        </div>
                    </Fragment>)
                }
            </div>
        </div>
     );
}

export default ProductFilter;