import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home,
  ChevronRight,
  Search,
  Pencil,
  Trash2,
  Backpack,
  Footprints,
  Shirt,
  Watch,
  Smartphone,
  Package,
} from 'lucide-react'
import './AllProduct.css'

// ---- Dummy dataset (swap with API data) ----------------------------------
const CATEGORY_ICONS = {
  Bags: Backpack,
  Sports: Footprints,
  Clothing: Shirt,
  Accessories: Watch,
  Electronics: Smartphone,
}

const RAW_PRODUCTS = [
  { id: 1, name: 'Nike Bag', sku: 'NKB-00125', category: 'Bags', brand: 'Nike', price: 16.38, stock: 120, status: 'Published' },
  { id: 2, name: 'ODC Handloom Backpack', sku: 'ODC-00123', category: 'Bags', brand: 'ODC Handloom', price: 45.0, stock: 80, status: 'Published' },
  { id: 3, name: 'Nike Sports Shoe', sku: 'NSH-00234', category: 'Sports', brand: 'Nike', price: 99.0, stock: 50, status: 'Published' },
  { id: 4, name: 'Leather Jacket', sku: 'LJ-00456', category: 'Clothing', brand: 'ODC', price: 120.0, stock: 30, status: 'Draft' },
  { id: 5, name: 'Smart Watch', sku: 'SW-00567', category: 'Accessories', brand: 'Samsung', price: 199.99, stock: 40, status: 'Published' },
  { id: 6, name: 'Wireless Earbuds', sku: 'WE-00678', category: 'Electronics', brand: 'Samsung', price: 59.99, stock: 65, status: 'Published' },
  { id: 7, name: 'Running Shorts', sku: 'RS-00789', category: 'Clothing', brand: 'Nike', price: 24.5, stock: 90, status: 'Published' },
  { id: 8, name: 'Handloom Tote Bag', sku: 'ODC-00124', category: 'Bags', brand: 'ODC Handloom', price: 32.0, stock: 55, status: 'Draft' },
  { id: 9, name: 'Football', sku: 'FB-00890', category: 'Sports', brand: 'Nike', price: 27.75, stock: 70, status: 'Published' },
  { id: 10, name: 'Denim Jacket', sku: 'DJ-00901', category: 'Clothing', brand: 'ODC', price: 85.0, stock: 22, status: 'Published' },
  { id: 11, name: 'Fitness Band', sku: 'FBD-01012', category: 'Accessories', brand: 'Samsung', price: 39.99, stock: 100, status: 'Published' },
  { id: 12, name: 'Laptop Sleeve', sku: 'LS-01123', category: 'Bags', brand: 'ODC Handloom', price: 21.0, stock: 40, status: 'Draft' },
  { id: 13, name: 'Bluetooth Speaker', sku: 'BS-01234', category: 'Electronics', brand: 'Samsung', price: 49.0, stock: 35, status: 'Published' },
  { id: 14, name: 'Training Gloves', sku: 'TG-01345', category: 'Sports', brand: 'Nike', price: 18.25, stock: 60, status: 'Published' },
  { id: 15, name: 'Cotton Kurta', sku: 'CK-01456', category: 'Clothing', brand: 'ODC', price: 42.0, stock: 48, status: 'Published' },
  { id: 16, name: 'Silk Scarf', sku: 'SS-01567', category: 'Accessories', brand: 'ODC Handloom', price: 28.5, stock: 33, status: 'Draft' },
  { id: 17, name: 'Duffel Bag', sku: 'DB-01678', category: 'Bags', brand: 'Nike', price: 54.0, stock: 26, status: 'Published' },
  { id: 18, name: 'Smartphone Stand', sku: 'PS-01789', category: 'Electronics', brand: 'Samsung', price: 14.99, stock: 88, status: 'Published' },
  { id: 19, name: 'Yoga Mat', sku: 'YM-01890', category: 'Sports', brand: 'Nike', price: 31.0, stock: 44, status: 'Published' },
  { id: 20, name: 'Woven Wallet', sku: 'WW-01901', category: 'Accessories', brand: 'ODC Handloom', price: 19.5, stock: 77, status: 'Draft' },
  { id: 21, name: 'Track Pants', sku: 'TP-02012', category: 'Clothing', brand: 'Nike', price: 36.0, stock: 52, status: 'Published' },
  { id: 22, name: 'Power Bank', sku: 'PB-02123', category: 'Electronics', brand: 'Samsung', price: 44.5, stock: 61, status: 'Published' },
  { id: 23, name: 'Canvas Backpack', sku: 'CB-02234', category: 'Bags', brand: 'ODC Handloom', price: 38.0, stock: 29, status: 'Published' },
  { id: 24, name: 'Cricket Bat', sku: 'CR-02345', category: 'Sports', brand: 'Nike', price: 65.0, stock: 18, status: 'Draft' },
  { id: 25, name: 'Analog Watch', sku: 'AW-02456', category: 'Accessories', brand: 'Samsung', price: 89.0, stock: 24, status: 'Published' },
]

const PAGE_SIZE = 5

const AllProduct = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState(RAW_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [brand, setBrand] = useState('All Brands')
  const [status, setStatus] = useState('All Status')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(
    () => ['All Categories', ...new Set(products.map((p) => p.category))],
    [products]
  )
  const brands = useMemo(
    () => ['All Brands', ...new Set(products.map((p) => p.brand))],
    [products]
  )
  const statuses = ['All Status', 'Published', 'Draft']

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return products.filter((p) => {
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term)
      const matchesCategory = category === 'All Categories' || p.category === category
      const matchesBrand = brand === 'All Brands' || p.brand === brand
      const matchesStatus = status === 'All Status' || p.status === status
      return matchesSearch && matchesCategory && matchesBrand && matchesStatus
    })
  }, [products, searchTerm, category, brand, status])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE)
  const showingFrom = filteredProducts.length === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + PAGE_SIZE, filteredProducts.length)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value)
    setCurrentPage(1)
  }

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Delete "${name}"? This action cannot be undone.`)
    if (!confirmed) return
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`)
  }

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const pageNumbers = useMemo(() => {
    const pages = []
    for (let i = 1; i <= totalPages; i += 1) pages.push(i)
    return pages
  }, [totalPages])

  return (
    <div className="all-product">
      {/* Breadcrumb */}
      <nav className="all-product__breadcrumb" aria-label="Breadcrumb">
        <Home size={16} className="all-product__breadcrumb-icon" />
        <span className="all-product__breadcrumb-link">Products</span>
        <ChevronRight size={14} className="all-product__breadcrumb-sep" />
        <span className="all-product__breadcrumb-current">Product List</span>
      </nav>

      <div className="all-product__card">
        {/* Filters */}
        <form className="all-product__filters" onSubmit={handleSearchSubmit}>
          <div className="all-product__search">
            <Search size={18} className="all-product__search-icon" />
            <input
              type="text"
              className="all-product__search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="all-product__select"
            value={category}
            onChange={handleFilterChange(setCategory)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select className="all-product__select" value={brand} onChange={handleFilterChange(setBrand)}>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select className="all-product__select" value={status} onChange={handleFilterChange(setStatus)}>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </form>

        {/* Table */}
        <div className="all-product__table-wrapper">
          <table className="all-product__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan={9} className="all-product__empty">
                    No products match your filters.
                  </td>
                </tr>
              )}

              {paginatedProducts.map((product) => {
                const Icon = CATEGORY_ICONS[product.category] || Package
                return (
                  <tr key={product.id}>
                    <td data-label="ID">{product.id}</td>
                    <td data-label="Product Name">
                      <div className="all-product__name-cell">
                        <span className="all-product__thumb">
                          <Icon size={20} />
                        </span>
                        <span className="all-product__name-text">{product.name}</span>
                      </div>
                    </td>
                    <td data-label="SKU">{product.sku}</td>
                    <td data-label="Category">{product.category}</td>
                    <td data-label="Brand">{product.brand}</td>
                    <td data-label="Price">${product.price.toFixed(2)}</td>
                    <td data-label="Stock">{product.stock}</td>
                    <td data-label="Status">
                      <span
                        className={`all-product__badge ${
                          product.status === 'Published'
                            ? 'all-product__badge--published'
                            : 'all-product__badge--draft'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="all-product__actions">
                        <button
                          type="button"
                          className="all-product__action-btn all-product__action-btn--edit"
                          onClick={() => handleEdit(product.id)}
                        >
                          <Pencil size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className="all-product__action-btn all-product__action-btn--delete"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="all-product__footer">
          <p className="all-product__showing">
            Showing {showingFrom} to {showingTo} of {filteredProducts.length} products
          </p>

          <div className="all-product__pagination">
            <button
              type="button"
              className="all-product__page-btn"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
            >
              Previous
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                className={`all-product__page-btn ${
                  page === safePage ? 'all-product__page-btn--active' : ''
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="all-product__page-btn"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllProduct