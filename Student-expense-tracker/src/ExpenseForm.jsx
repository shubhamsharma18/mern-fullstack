import React, { useState, useEffect } from 'react';
import Table from './table';

const ExpenseForm = ({budget}) => {
    const [cart, setCart] = useState([]);      // Master Copy (Hamesha saara data rahega)
    const [display, setDisplay] = useState([]); // Display Copy (Jo Table mein dikhega)
    const [totol,setTotol]=useState(0)


useEffect(() => {
    const savedCart = localStorage.getItem('myExpenses');
    if (savedCart) {
        // Parse karte waqt check karein ki data sahi hai
        const parsedData = JSON.parse(savedCart);
        if(parsedData.length > 0) {
            setCart(parsedData);
        }
    }
}, []); // Only on mount

useEffect(() => {
    // Agar cart mein data hai, tabhi save karein
    if (cart.length > 0) {
        localStorage.setItem('myExpenses', JSON.stringify(cart));
    }
    
    // Total calculation hamesha chalni chahiye
    const total = cart.reduce((acc, curr) => Number(curr.Ammount) + acc, 0);
    setTotol(total);
}, [cart]);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: "",
        other: ''
    });

    // Jab bhi 'cart' update ho (naya item add ho), 'display' ko bhi update karo
    useEffect(() => {
        setDisplay(cart);
    }, [cart]);

    function categoryFun(e) {
    const selectedValue = e.target.value;

    // 1. All Data Logic
    if (selectedValue === "" || selectedValue === "All") {
        setDisplay(cart);
    } 
    
    // 2. Sorting Logic (Low to High)
    else if (selectedValue === "Low") {
        // Amount ke hisaab se chote se bada (Ascending)
        let sorted = [...cart].sort((a, b) => Number(a.Ammount) - Number(b.Ammount));
        setDisplay(sorted);
    }

    // 3. Sorting Logic (High to Low)
    else if (selectedValue === "High") {
        // Amount ke hisaab se bade se chota (Descending)
        let sorted = [...cart].sort((a, b) => Number(b.Ammount) - Number(a.Ammount));
        setDisplay(sorted);
    }
    
    // 4. Category Filter Logic
    else {
        let updatedcart = cart.filter((item) => item.Category === selectedValue);
        setDisplay(updatedcart);
    }
}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       const newAmount = Number(formData.amount);
    const totalBudget = Number(budget);
    
    // 2. Expected Total calculate karo (Purana total + Naya amount)
    const expectedTotal = totol + newAmount;

    // 3. Condition check
    if (expectedTotal > totalBudget) {
        alert("You do not have enough budget! Current Total: ₹" + totol + ", Adding: ₹" + newAmount);
        return; 
    }
        

     
        const data = {
            Title: formData.title,
            Ammount: formData.amount,
            Category: formData.category,
            Date: formData.date,
            other: formData.other
        };
        
        setCart([...cart, data]); // Naya item master copy mein add karo
        
        // Form reset
        setFormData({
            title: '',
            amount: '',
            category: '',
            date: "",
            other: ''
        });
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Expense</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter Title"
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none"
                                required
                            />
                        </div>

                        {/* Amount Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none"
                                required
                            />
                        </div>

                        {/* Date Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none"
                                required
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="food">Food</option>
                                <option value="transport">Transport</option>
                                <option value="education">Education</option>
                                <option value="entertainment">Entertainment</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold">
                            Submit Expense
                        </button>
                    </form>
                </div>
            </div>

            {/* Filter Section */}
            {/* <div className="max-w-md p-6">
                <label className="block text-sm font-medium text-gray-700">Filter Category</label>
                <select
                    onChange={categoryFun}
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md outline-none"
                >
                    <option value="All">All</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="education">Education</option>
                    <option value="entertainment">Entertainment</option>
                </select>
            </div> */}



            {/* filter high low expense */}

<div className='flex gap-8'>    
    <div className='border border-black'>
        <select onChange={categoryFun} className="...">
    <option value="All">All Expenses</option>
    <option value="Low">Price: Low to High</option>
    <option value="High">Price: High to Low</option>
    <hr /> {/* Divider for clarity */}
    <option value="food">Food</option>
    <option value="transport">Transport</option>
          {/* <option value="transport">Transport</option> */}
                    <option value="education">Education</option>
                    <option value="entertainment">Entertainment</option>
    {/* ... baaki categories */}
</select>
    </div>

    <div>
        <h2>Totol expense = {totol} Rs</h2>
    </div>

</div>






            {/* FIXED: Passing 'display' instead of 'cart' to the Table */}
            <Table cart={display} setCart={setCart} />
        </>
    );
};

export default ExpenseForm;