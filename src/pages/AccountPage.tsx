import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, MapPin, LogOut, Heart, ShieldAlert } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, isLoggedIn, logoutUser, orders, navigate } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F2]">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold">Please log in to view account</h2>
          <button onClick={() => navigate('login')} className="mt-4 bg-[#063D30] text-white px-6 py-2 rounded-full text-xs font-semibold">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* User Greeting Card */}
        <div className="bg-[#063D30] text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-[#DCE6D2]" />
            <div>
              <span className="text-[10px] bg-[#DCE6D2] text-[#063D30] font-bold px-2.5 py-0.5 rounded-full uppercase">
                VIVA VIP Member
              </span>
              <h1 className="font-serif text-2xl font-bold text-white mt-1">{user.name}</h1>
              <p className="text-xs text-[#DCE6D2]/80">{user.email} • Member since 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('admin')}
              className="bg-white/10 hover:bg-white/20 text-[#DCE6D2] font-semibold text-xs py-2.5 px-4 rounded-full border border-white/20 flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-[#F0787B]" />
              <span>Admin Dashboard</span>
            </button>

            <button
              onClick={() => {
                logoutUser();
                navigate('home');
              }}
              className="bg-[#F0787B] hover:bg-rose-600 text-white font-semibold text-xs py-2.5 px-4 rounded-full flex items-center gap-1.5 shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar Nav (3 Cols) */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'orders' ? 'bg-[#063D30] text-white shadow-md' : 'bg-white text-[#17231E] hover:bg-[#EAE6D8]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'profile' ? 'bg-[#063D30] text-white shadow-md' : 'bg-white text-[#17231E] hover:bg-[#EAE6D8]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                activeTab === 'addresses' ? 'bg-[#063D30] text-white shadow-md' : 'bg-white text-[#17231E] hover:bg-[#EAE6D8]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => navigate('wishlist')}
              className="w-full text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-3 bg-white text-[#17231E] hover:bg-[#EAE6D8]"
            >
              <Heart className="w-4 h-4 text-[#F0787B]" />
              <span>Saved Wishlist</span>
            </button>
          </div>

          {/* Main Tab Content (9 Cols) */}
          <div className="lg:col-span-9 bg-white rounded-3xl border border-[#063D30]/10 p-6 sm:p-8 shadow-sm">

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-serif font-bold text-xl text-[#17231E]">Recent Order History</h3>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="p-5 rounded-2xl bg-[#F8F7F2] border border-[#063D30]/10 text-xs space-y-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3">
                        <div>
                          <span className="font-bold text-sm text-[#063D30]">Order #{order.id}</span>
                          <span className="text-[#6D746E] ml-3">Date: {order.date}</span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full uppercase text-[10px]">
                          Status: {order.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src={item.productImage} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                              <span>{item.quantity}x {item.productName}</span>
                            </div>
                            <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t flex items-center justify-between font-bold">
                        <span>Total Paid: ${order.total.toFixed(2)}</span>
                        <button
                          onClick={() => navigate('track-order')}
                          className="bg-[#063D30] text-white px-4 py-1.5 rounded-full text-xs"
                        >
                          Track Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-serif font-bold text-xl text-[#17231E]">Profile Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F8F7F2] rounded-2xl">
                    <span className="text-gray-500 block">Full Name</span>
                    <strong className="text-sm text-[#17231E]">{user.name}</strong>
                  </div>
                  <div className="p-4 bg-[#F8F7F2] rounded-2xl">
                    <span className="text-gray-500 block">Email Address</span>
                    <strong className="text-sm text-[#17231E]">{user.email}</strong>
                  </div>
                  <div className="p-4 bg-[#F8F7F2] rounded-2xl">
                    <span className="text-gray-500 block">Phone Number</span>
                    <strong className="text-sm text-[#17231E]">{user.phone}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-serif font-bold text-xl text-[#17231E]">Saved Delivery Addresses</h3>
                {user.addresses.map((addr, i) => (
                  <div key={i} className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#063D30]/10">
                    <span className="bg-[#063D30] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">DEFAULT</span>
                    <p className="font-bold text-sm text-[#17231E] mt-2">{addr.fullName}</p>
                    <p className="text-gray-600">{addr.street}</p>
                    <p className="text-gray-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
