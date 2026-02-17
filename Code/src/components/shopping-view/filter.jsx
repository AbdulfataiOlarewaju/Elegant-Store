import { filterOptions } from "@/config";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";


function ProductFilter({filters, handleFIlter}) {
    return ( 

        <div className="bg-black text-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold text-yellow-600">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOptions).map(keyItem=><Fragment>
                        <div>
                            <h3 className="text-base font-bold text-yellow-600">{keyItem}</h3>
                            <div className="grid gap-2 mt-2">
                                {
                                    filterOptions[keyItem].map(option=><Label className="flex items-center gap-2 font-normal">
                                        <Checkbox checked={
                                            filters && Object.keys(filters).length > 0 && 
                                            filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                        } onCheckedChange={()=>handleFIlter(keyItem, option.id)} className='cursor-pointer'/>
                                        {option.label}
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