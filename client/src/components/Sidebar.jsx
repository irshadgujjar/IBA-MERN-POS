import React from "react";
import {
  BarChart2,
  Layers,
  ShoppingCart,
  Archive,
  FileText,
  Users,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto bg-slate-900 px-5 py-8 fixed">
      <div className="mt-16 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-8">
          <div className="space-y-12">
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/categories"
            >
              <Layers className="h-5 w-5" aria-hidden="true" />
              <span className="mx-4 text-sm font-medium">Categories</span>
            </a>

            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/products"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Products</span>
            </a>

            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/inventory"
            >
              <Archive className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Inventory</span>
            </a>

            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/invoice"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Invoice</span>
            </a>

            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/user"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Users</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
