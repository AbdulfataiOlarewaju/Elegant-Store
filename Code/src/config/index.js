
export const registerFormControls = [
    {
        name : 'userName',
        label : 'User Name',
        placeholder : 'Enter your name',
        componentType : 'input',
        type : 'text'
    },
    {
        name : 'email',
        label : 'User Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'text'
    },
    {
        name : 'password',
        label : 'User Password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'text'
    }
]


export const loginFormControls = [
   
    {
        name : 'email',
        label : 'User Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'text'
    },
    {
        name : 'password',
        label : 'User Password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'text'
    }
]

export const adproductFromElement = [
    {
        label : "Title",
        name : "title",
        componentType : 'input',
        placeholder : "Enter you title"
    },
    {
        label : "Description",
        name : "description",
        componentType : 'textarea',
        placeholder : "Enter your description",
    },
    {
       label : "Category",
       name : "category",
       componentType : "select",
       options : [
        {id: "men", label : "Men"},
        {id: "women", label : "Women"},
        {id: "kids", label : "Kids"},
        {id: "footwear", label: "Footwear"},
        {id: "accessories", label: "Accessories"},
       ]
    },
    {
        label : "Brand",
        name : "brand",
        componentType : "select",
         options : [
        {id: "nike",label : "Nike"},
        {id: "adidas", label : "Adidas"},
        {id: "puma", label : "Puma"},
        {id: "zara", label : "Zara"},
        {id : "h&m", label : "H&M"}
       ]
    },
    {
        label : "Price",
        name : 'price',
        componentType:"input",
        placeholder : "Enter your price",
    },
     {
        label : "Sale Price",
        name : 'salePrice',
        componentType:"input",
        placeholder : "Enter your sale price(optional)",
    },
     {
        label : "Total Stock",
        name : 'totalStock',
        componentType:"input",
        placeholder : "Enter your stock",
    },
]

export const shoppingViewHeaderMenuItems = [
    {
        id : 'home',
        label : 'Home',
        link : '/shop/home'
    },
       {
        id : 'products',
        label : 'Products',
        link : '/shop/list'
    },
    {
        id : 'men',
        label : 'Men',
        link : '/shop/list'
    },
    {
        id : 'women',
        label : 'Women',
        link : '/shop/list'
    },
    {
        id : 'kids',
        label : 'Kids',
        link : '/shop/list'
    },
    {
        id : 'accessories',
        label : 'Accessories',
        link : '/shop/list'
    },
    {
        id: 'footwear',
        label : 'Footwear',
        link : '/shop/list'
    },
      {
        id: 'search',
        label : 'Search',
        link : '/shop/search'
    }    
]

export const filterOptions = {
    category: [
        {id : 'men', label: 'Men'},
        {id : 'women', label: 'Women'},
        {id : 'kids', label: 'Kids'},
        {id : 'accsessories', label: 'Accessories'},
        {id : 'footwear', label: 'Footwear'}
    ],
    brand: [
        {id:'nike', label: 'Nike'},
        {id:'adidas', label: 'Adidas'},
        {id:'puma', label: 'Puma'},
        {id: "zara", label : "Zara"},
        {id : "h&m", label : "H&M"},
        {id : "levi", label : "Levi's"}
    ]
};

export const shortOptions = [
    {id:'price-lowtohigh', label: 'Price Low to High'},
    {id:'price-hightolow', label: 'Price High to Low'},
    {id:'title-atoz', label: 'Title A to Z'},
    {id:'title-ztoa', label: 'Z Low to A'}
]

export const addressFormControls = [
    {
        label : 'Addrees',
        name : 'address',
        componentType : 'input',
        type : 'text',
        placeholder : 'Enter your address'
    },
    {
        label : 'City',
        name : 'city',
        componentType : 'input',
        type : 'text',
        placeholder : 'Enter your city' 
    },
    {
        label : 'Phone',
        name : 'phone',
        componentType : 'input',
        type : 'text',
        placeholder : 'Enter your phone number'
    },
      {
        label : 'Pincode',
        name : 'pincode',
        componentType : 'input',
        type : 'text',
        placeholder : 'Enter your pincode'
    },
    {
        label: 'Notes',
        name : 'notes',
        componentType : 'textarea',
        placeholder : 'Additional note'
    },
  
]