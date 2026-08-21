import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

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
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../api/axios";

import "./AllProduct.css";

// =====================================================
// CATEGORY ICONS
// =====================================================

const CATEGORY_ICONS = {
  Bags: Backpack,
  Sports: Footprints,
  Clothing: Shirt,
  Accessories: Watch,
  Electronics: Smartphone,
};

const PAGE_SIZE = 5;

// =====================================================
// COMPONENT
// =====================================================

const AllProduct = () => {
  const navigate = useNavigate();

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState(
    "All Categories"
  );

  const [
    brand,
    setBrand,
  ] = useState(
    "All Brands"
  );

  const [
    status,
    setStatus,
  ] = useState(
    "All Status"
  );

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  // ===================================================
  // FETCH PRODUCTS
  // ===================================================

  const fetchProducts =
    async () => {
      try {
        setLoading(true);

        const response =
          await API.get(
            "/products"
          );

        console.log(
          "PRODUCTS:",
          response.data
        );

        const productData =
          Array.isArray(
            response.data
              ?.data
          )
            ? response.data.data
            : [];

        setProducts(
          productData
        );
      } catch (error) {
        console.error(
          "FETCH PRODUCTS ERROR:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===================================================
  // CATEGORIES
  // ===================================================

  const categories =
    useMemo(() => {
      const values =
        products
          .map(
            (product) =>
              product.category
          )
          .filter(Boolean);

      return [
        "All Categories",
        ...new Set(values),
      ];
    }, [products]);

  // ===================================================
  // BRANDS
  // ===================================================

  const brands =
    useMemo(() => {
      const values =
        products
          .map(
            (product) =>
              product.brand
          )
          .filter(Boolean);

      return [
        "All Brands",
        ...new Set(values),
      ];
    }, [products]);

  // ===================================================
  // STATUS
  // ===================================================

  const statuses = [
    "All Status",
    "Published",
    "Draft",
    "Out of Stock",
  ];

  // ===================================================
  // FILTER PRODUCTS
  // ===================================================

  const filteredProducts =
    useMemo(() => {
      const term =
        searchTerm
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {
          const name =
            String(
              product.name || ""
            ).toLowerCase();

          const sku =
            String(
              product.sku || ""
            ).toLowerCase();

          const matchesSearch =
            !term ||
            name.includes(term) ||
            sku.includes(term);

          const matchesCategory =
            category ===
              "All Categories" ||
            product.category ===
              category;

          const matchesBrand =
            brand ===
              "All Brands" ||
            product.brand ===
              brand;

          const matchesStatus =
            status ===
              "All Status" ||
            product.status ===
              status;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesBrand &&
            matchesStatus
          );
        }
      );
    }, [
      products,
      searchTerm,
      category,
      brand,
      status,
    ]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProducts.length /
          PAGE_SIZE
      )
    );

  const safePage =
    Math.min(
      currentPage,
      totalPages
    );

  const startIndex =
    (safePage - 1) *
    PAGE_SIZE;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );

  const showingFrom =
    filteredProducts.length ===
    0
      ? 0
      : startIndex + 1;

  const showingTo =
    Math.min(
      startIndex + PAGE_SIZE,
      filteredProducts.length
    );

  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearchSubmit =
    (e) => {
      e.preventDefault();

      setCurrentPage(1);
    };

  // ===================================================
  // FILTER
  // ===================================================

  const handleFilterChange =
    (setter) => (e) => {
      setter(
        e.target.value
      );

      setCurrentPage(1);
    };

  // ===================================================
  // EDIT
  // ===================================================

  const handleEdit =
    (id) => {
      if (!id) {
        return;
      }

      navigate(
        `/products/edit/${id}`
      );
    };

  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete =
    async (
      id,
      name
    ) => {
      const confirmed =
        window.confirm(
          `Delete "${name}"? This action cannot be undone.`
        );

      if (!confirmed) {
        return;
      }

      try {
        await API.delete(
          `/products/${id}`
        );

        setProducts(
          (prev) =>
            prev.filter(
              (product) =>
                product._id !== id
            )
        );

        alert(
          "Product deleted successfully"
        );
      } catch (error) {
        console.error(
          "DELETE PRODUCT ERROR:",
          error
        );

        alert(
          error.response
            ?.data
            ?.message ||
            "Failed to delete product"
        );
      }
    };

  // ===================================================
  // PAGE
  // ===================================================

  const goToPage =
    (page) => {
      if (
        page < 1 ||
        page > totalPages
      ) {
        return;
      }

      setCurrentPage(page);
    };

  // ===================================================
  // PAGE NUMBERS
  // ===================================================

  const pageNumbers =
    useMemo(() => {
      const pages = [];

      for (
        let i = 1;
        i <= totalPages;
        i += 1
      ) {
        pages.push(i);
      }

      return pages;
    }, [totalPages]);

  // ===================================================
  // FORMAT INR
  // ===================================================

  const formatPrice =
    (price) => {
      return new Intl.NumberFormat(
        "en-IN",
        {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        }
      ).format(
        Number(price) || 0
      );
    };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="all-product">

      {/* Breadcrumb */}

      <nav
        className="all-product__breadcrumb"
        aria-label="Breadcrumb"
      >
        <Home
          size={16}
          className="all-product__breadcrumb-icon"
        />

        <span className="all-product__breadcrumb-link">
          Products
        </span>

        <ChevronRight
          size={14}
          className="all-product__breadcrumb-sep"
        />

        <span className="all-product__breadcrumb-current">
          Product List
        </span>
      </nav>

      <div className="all-product__card">

        {/* Filters */}

        <form
          className="all-product__filters"
          onSubmit={
            handleSearchSubmit
          }
        >
          <div className="all-product__search">

            <Search
              size={18}
              className="all-product__search-icon"
            />

            <input
              type="text"
              className="all-product__search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />

          </div>

          <select
            className="all-product__select"
            value={category}
            onChange={
              handleFilterChange(
                setCategory
              )
            }
          >
            {categories.map(
              (c) => (
                <option
                  key={c}
                  value={c}
                >
                  {c}
                </option>
              )
            )}
          </select>

          <select
            className="all-product__select"
            value={brand}
            onChange={
              handleFilterChange(
                setBrand
              )
            }
          >
            {brands.map(
              (b) => (
                <option
                  key={b}
                  value={b}
                >
                  {b}
                </option>
              )
            )}
          </select>

          <select
            className="all-product__select"
            value={status}
            onChange={
              handleFilterChange(
                setStatus
              )
            }
          >
            {statuses.map(
              (s) => (
                <option
                  key={s}
                  value={s}
                >
                  {s}
                </option>
              )
            )}
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

              {loading && (
                <tr>
                  <td
                    colSpan={9}
                    className="all-product__empty"
                  >
                    Loading products...
                  </td>
                </tr>
              )}

              {!loading &&
                paginatedProducts.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="all-product__empty"
                    >
                      No products match your filters.
                    </td>
                  </tr>
                )}

              {!loading &&
                paginatedProducts.map(
                  (product) => {

                    const Icon =
                      CATEGORY_ICONS[
                        product.category
                      ] ||
                      Package;

                    return (
                      <tr
                        key={
                          product._id
                        }
                      >

                        <td data-label="ID">
                          {product._id
                            ?.slice(-6)
                            .toUpperCase()}
                        </td>

                        <td data-label="Product Name">

                          <div className="all-product__name-cell">

                            <span className="all-product__thumb">

                              {product.featuredImage ||
                              product.image ? (
                                <img
                                  src={`http://localhost:5000${
                                    product.featuredImage ||
                                    product.image
                                  }`}
                                  alt={
                                    product.name
                                  }
                                  style={{
                                    width:
                                      "100%",
                                    height:
                                      "100%",
                                    objectFit:
                                      "cover",
                                    borderRadius:
                                      "inherit",
                                  }}
                                />
                              ) : (
                                <Icon
                                  size={20}
                                />
                              )}

                            </span>

                            <span className="all-product__name-text">
                              {
                                product.name
                              }
                            </span>

                          </div>

                        </td>

                        <td data-label="SKU">
                          {
                            product.sku
                          }
                        </td>

                        <td data-label="Category">
                          {
                            product.category
                          }
                        </td>

                        <td data-label="Brand">
                          {
                            product.brand
                          }
                        </td>

                        <td data-label="Price">
                          {formatPrice(
                            product.price
                          )}
                        </td>

                        <td data-label="Stock">
                          {
                            product.stockQuantity ??
                            product.stock ??
                            0
                          }
                        </td>

                        <td data-label="Status">

                          <span
                            className={`all-product__badge ${
                              product.status ===
                              "Published"
                                ? "all-product__badge--published"
                                : "all-product__badge--draft"
                            }`}
                          >
                            {
                              product.status
                            }
                          </span>

                        </td>

                        <td data-label="Actions">

                          <div className="all-product__actions">

                            <button
                              type="button"
                              className="all-product__action-btn all-product__action-btn--edit"
                              onClick={() =>
                                handleEdit(
                                  product._id
                                )
                              }
                            >
                              <Pencil
                                size={14}
                              />

                              <span>
                                Edit
                              </span>
                            </button>

                            <button
                              type="button"
                              className="all-product__action-btn all-product__action-btn--delete"
                              onClick={() =>
                                handleDelete(
                                  product._id,
                                  product.name
                                )
                              }
                            >
                              <Trash2
                                size={14}
                              />

                              <span>
                                Delete
                              </span>
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="all-product__footer">

          <p className="all-product__showing">
            Showing{" "}
            {showingFrom} to{" "}
            {showingTo} of{" "}
            {
              filteredProducts.length
            }{" "}
            products
          </p>

          <div className="all-product__pagination">

            <button
              type="button"
              className="all-product__page-btn"
              onClick={() =>
                goToPage(
                  safePage - 1
                )
              }
              disabled={
                safePage === 1
              }
            >
              Previous
            </button>

            {pageNumbers.map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  className={`all-product__page-btn ${
                    page === safePage
                      ? "all-product__page-btn--active"
                      : ""
                  }`}
                  onClick={() =>
                    goToPage(page)
                  }
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              className="all-product__page-btn"
              onClick={() =>
                goToPage(
                  safePage + 1
                )
              }
              disabled={
                safePage ===
                totalPages
              }
            >
              Next
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AllProduct;