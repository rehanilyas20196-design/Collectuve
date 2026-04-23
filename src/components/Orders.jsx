import React, { useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Orders = ({ setPage }) => {
    const [orders, setOrders] = useState([]);

    if (orders.length === 0) {
        return (
            <div className="container py-8">
                <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 bg-[#F7F7F7] rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-10 h-10 text-[#8B96A5]" />
                        </div>
                        <h2 className="text-xl font-semibold text-dark mb-2">No orders yet</h2>
                        <p className="text-[#8B96A5] mb-6">You haven't placed any orders yet.</p>
                        <button
                            onClick={() => setPage('listing')}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto hover:bg-primary-dark transition-colors"
                        >
                            Start Shopping
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-[#DEE2E7] rounded-lg overflow-hidden">
                            <div className="bg-[#F7FAFC] p-4 border-b border-[#DEE2E7] flex justify-between items-center">
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <p className="text-[#8B96A5]">ORDER PLACED</p>
                                        <p className="font-medium">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#8B96A5]">TOTAL</p>
                                        <p className="font-medium">{order.total}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#8B96A5] text-sm">ORDER #{order.id}</p>
                                </div>
                            </div>
                            <div className="p-6 flex gap-6">
                                <div className="w-20 h-20 bg-white border border-[#DEE2E7] rounded p-2 flex items-center justify-center">
                                    <img src={order.image} alt={order.title} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-primary hover:underline cursor-pointer mb-2">{order.title}</h3>
                                    <button className="bg-primary text-white px-4 py-2 rounded text-sm font-bold hover:bg-primary-dark transition-colors">Buy it again</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;