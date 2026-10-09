import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { Product, OrderStatus } from '../types';
import {
  ShieldAlert,
  Plus,
  Edit3,
  Trash2,
  X
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    adminProducts,
    adminAddProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    adminOrders,
    adminUpdateOrderStatus,
    navigate
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview');

  // Product Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('99.00');
  const [category, setCategory] = useState<any>('electronics');
  const [categoryName, setCategoryName] = useState('Electronics');
  const [stockCount, setStockCount] = useState('20');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');

  // Stats calculations
  const totalRevenue = adminOrders.reduce((acc, o) => acc + o.total, 0);
  const lowStockProducts = adminProducts.filter(p => p.stockCount <= 15);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setBrand('VIVA Studio');
    setPrice('99.00');
    setCategory('fashion');
    setCategoryName('Fashion');
    setStockCount('25');
    setImage('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80');
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setPrice(p.price.toString());
    setCategory(p.category);
    setCategoryName(p.categoryName);
    setStockCount(p.stockCount.toString());
    setImage(p.images[0]);
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      adminUpdateProduct({
        ...editingProduct,
        name,
        brand,
        price: parseFloat(price),
        category,
        categoryName,
        stockCount: parseInt(stockCount),
        images: [image]
      });
    } else {
      const newP: Product = {
        id: `p-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/ /g, '-'),
        brand,
        category,
        categoryName,
        price: parseFloat(price),
        rating: 4.8,
        reviewCount: 1,
        images: [image],
        description: 'New product added via Store Admin Control Center.',
        features: ['Premium craftsmanship', '1-year warranty'],
        specifications: { 'Origin': 'VIVA Certified' },
        inStock: parseInt(stockCount) > 0,
        stockCount: parseInt(stockCount),
        tags: ['new', category],
        createdAt: new Date().toISOString().split('T')[0]
      };
      adminAddProduct(newP);
    }
    setModalOpen(false);
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="bg-[#022C23] text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F0787B] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>VIVA Store Administration</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Store Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('shop')}
              className="bg-white/10 hover:bg-white/20 text-[#DCE6D2] font-semibold text-xs py-2 px-4 rounded-full border border-white/20"
            >
              Exit to Live Store
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'overview' ? 'bg-[#063D30] text-white shadow-md' : 'bg-white text-[#17231E]'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'products' ? 'bg-[#063D30] text-white shadow-md' : 'bg-white text-[#17231E]'
            }`}
          >
            Product Management ({adminProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'orders' ? 'bg-[#063D30] text-white shadow-md' : 'bg-white text-[#17231E]'
            }`}
          >
            Order Management ({adminOrders.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">

            {/* 4 Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-2">
                <span className="text-xs text-[#6D746E] font-medium">Total Gross Revenue</span>
                <h3 className="font-serif font-bold text-3xl text-[#063D30]">${totalRevenue.toFixed(2)}</h3>
                <span className="text-[10px] text-emerald-700 font-semibold">+18.4% from last month</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-2">
                <span className="text-xs text-[#6D746E] font-medium">Total Orders Placed</span>
                <h3 className="font-serif font-bold text-3xl text-[#063D30]">{adminOrders.length}</h3>
                <span className="text-[10px] text-emerald-700 font-semibold">100% Fulfillment rate</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-2">
                <span className="text-xs text-[#6D746E] font-medium">Catalog Active Products</span>
                <h3 className="font-serif font-bold text-3xl text-[#063D30]">{adminProducts.length}</h3>
                <span className="text-[10px] text-gray-500 font-semibold">Across 8 categories</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-2">
                <span className="text-xs text-[#6D746E] font-medium">Low Stock Alerts</span>
                <h3 className="font-serif font-bold text-3xl text-[#F0787B]">{lowStockProducts.length}</h3>
                <span className="text-[10px] text-[#F0787B] font-semibold">Requires inventory restock</span>
              </div>

            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#17231E]">Recent Live Customer Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b text-[#6D746E]">
                      <th className="pb-3 font-semibold">Order ID</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {adminOrders.map(order => (
                      <tr key={order.id} className="hover:bg-[#F8F7F2]">
                        <td className="py-3 font-mono font-bold text-[#063D30]">{order.id}</td>
                        <td className="py-3">{order.shippingAddress.fullName}</td>
                        <td className="py-3 font-bold">${order.total.toFixed(2)}</td>
                        <td className="py-3">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => setActiveTab('orders')}
                            className="text-[#063D30] font-bold hover:underline"
                          >
                            Manage Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Products Management CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl text-[#17231E]">Product Inventory Control</h3>
              <button
                onClick={handleOpenAdd}
                className="bg-[#063D30] text-[#DCE6D2] font-bold text-xs py-2.5 px-5 rounded-full flex items-center gap-1.5 shadow-md hover:bg-[#022C23]"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Product</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#063D30]/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#063D30] text-[#DCE6D2]">
                    <tr>
                      <th className="p-4 font-semibold">Product</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">Price</th>
                      <th className="p-4 font-semibold">Stock</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {adminProducts.map(p => (
                      <tr key={p.id} className="hover:bg-[#F8F7F2]">
                        <td className="p-4 font-bold text-[#17231E] flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                          <div>
                            <div>{p.name}</div>
                            <span className="text-[10px] text-gray-500 font-normal">{p.brand}</span>
                          </div>
                        </td>
                        <td className="p-4">{p.categoryName}</td>
                        <td className="p-4 font-bold text-[#063D30]">${p.price.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            p.stockCount <= 15 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.stockCount} units
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-[#063D30] hover:text-white transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => adminDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Order Status Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#17231E]">Customer Order Fulfillment</h3>

            <div className="space-y-4">
              {adminOrders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-3xl border border-[#063D30]/10 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-4">
                    <div>
                      <span className="font-mono font-bold text-base text-[#063D30]">Order #{order.id}</span>
                      <span className="text-xs text-gray-500 ml-3">Customer: <strong>{order.shippingAddress.fullName}</strong> ({order.shippingAddress.email})</span>
                    </div>

                    {/* Status Select Switcher */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-600">Update Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => adminUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-[#F8F7F2] border text-xs font-bold text-[#063D30] p-2 rounded-xl focus:outline-none"
                      >
                        <option value="placed">Placed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <p>Total: <strong>${order.total.toFixed(2)}</strong> | Items: {order.items.length}</p>
                    <p className="text-gray-500">Shipping: {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit / Add Product Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
            <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="font-serif font-bold text-lg text-[#17231E]">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Product'}
                </h4>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F8F7F2] p-2.5 rounded-xl border focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Brand</label>
                    <input
                      type="text"
                      required
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-[#F8F7F2] p-2.5 rounded-xl border focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-[#F8F7F2] p-2.5 rounded-xl border focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setCategoryName(e.target.options[e.target.selectedIndex].text);
                      }}
                      className="w-full bg-[#F8F7F2] p-2.5 rounded-xl border focus:outline-none"
                    >
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home-living">Home & Living</option>
                      <option value="beauty">Beauty</option>
                      <option value="sports">Sports</option>
                      <option value="toys-kids">Toys & Kids</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Stock Count</label>
                    <input
                      type="number"
                      required
                      value={stockCount}
                      onChange={(e) => setStockCount(e.target.value)}
                      className="w-full bg-[#F8F7F2] p-2.5 rounded-xl border focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-[#F8F7F2] p-2.5 rounded-xl border focus:outline-none font-mono text-[10px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#063D30] text-white font-bold py-3 rounded-full text-xs uppercase"
                >
                  Save Product to Catalog
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
