import React from 'react';

const Table = ({ cart, setCart }) => {
    
    // Delete Logic
    const handleDelete = (indexToDelete) => {
        // Hum original cart se woh item hata rahe hain jiska index match nahi karta
        const updatedOriginalCart = cart.filter((_, index) => index !== indexToDelete);
        setCart(updatedOriginalCart);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.Title}</td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">
                                            {item.Category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{item.Date}</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">₹{item.Ammount}</td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => handleDelete(index)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                                    No expenses found. Add some to see them here!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;