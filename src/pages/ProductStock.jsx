import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { DeleteModal, Input, Tooltip } from "../components/common";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import {
  MODAL_CANCEL_BUTTON_CLASS,
  MODAL_PRIMARY_BUTTON_CLASS,
} from "../components/common/modalButtonStyles";
import { api } from "../utils/api";
import { checkValidation } from "../utils/helpers";
import { productStockRules } from "../utils/validation";

const initialEditForm = {
  name: "",
  category: "",
  price: "",
  piece: "",
};

const ProductStock = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState(initialEditForm);
  const [editError, setEditError] = useState({});
  const pageSize = 5;

  const closeEditModal = useCallback(() => {
    if (editLoading) return;
    setEditOpen(false);
    setSelectedProduct(null);
    setEditForm(initialEditForm);
    setEditError({});
  }, [editLoading]);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/productStock");
        if (isMounted) {
          setProducts(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error("Failed to load product stock:", error);
        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!editOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape" && !editLoading) {
        closeEditModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeEditModal, editLoading, editOpen]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      [product.name, product.category, product.price, product.piece]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [products, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    const nextTotalPages = Math.max(
      1,
      Math.ceil(filteredProducts.length / pageSize),
    );
    if (page > nextTotalPages) {
      setPage(nextTotalPages);
    }
  }, [filteredProducts.length, page]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pagedProducts = filteredProducts.slice(pageStart, pageEnd);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      piece: String(product.piece),
    });
    setEditError({});
    setEditOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleEditFieldChange = (field, value) => {
    const nextValue =
      field === "name" || field === "category"
        ? value.replace(/^\s+/, "")
        : value;

    setEditForm((prev) => {
      const updatedForm = {
        ...prev,
        [field]: nextValue,
      };

      checkValidation(
        {
          [field]: nextValue,
        },
        productStockRules,
        editError,
        setEditError,
      );

      return updatedForm;
    });
  };

  const handleEditSave = async () => {
    if (!selectedProduct) return;

    const validationResult = checkValidation(
      editForm,
      productStockRules,
      editError,
      setEditError,
    );

    const hasNoErrors = Object.values(validationResult).every(
      (value) => value == "",
    );

    if (!hasNoErrors) {
      return;
    }

    const payload = {
      ...selectedProduct,
      name: editForm.name.trim(),
      category: editForm.category.trim(),
      price: Number(editForm.price),
      piece: Number(editForm.piece),
    };

    setEditLoading(true);
    try {
      const response = await api.put(
        `/productStock/${selectedProduct.id}`,
        payload,
      );
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id ? response.data : product,
        ),
      );
      setEditOpen(false);
      setSelectedProduct(null);
      setEditForm(initialEditForm);
      setEditError({});
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    setDeleteLoading(true);
    try {
      await api.delete(`/productStock/${selectedProduct.id}`);
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProduct.id),
      );
      setDeleteOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;
    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="pt-[30px] flex flex-col pl-[31px] pr-[33px] bg-theme-white dark:bg-slate-950 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <div className="flex items-center justify-between">
        <div className="font-bold text-[32px] tracking-[-0.11px] text-gray-900 dark:text-slate-100">
          Product Stock
        </div>
        <div>
          <Input
            startIcon="search"
            divClassName="w-[253px] h-[38px]"
            placeholder="Search product name"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 text-[var(--orderlist-text-color)] bg-white rounded-xl border border-[var(--orderlist-border-color)] overflow-hidden dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
        <div className="grid grid-cols-7 px-6 py-4 text-sm font-[700] border-b border-[var(--orderlist-border-color)] dark:border-slate-700">
          <span className="capitalize">Image</span>
          <span className="capitalize">Product name</span>
          <span className="capitalize">Category</span>
          <span className="capitalize">Price</span>
          <span className="capitalize">Piece</span>
          <span className="capitalize">Available color</span>
          <span className="text-center capitalize">Action</span>
        </div>

        {pagedProducts.map((product, idx) => (
          <div
            key={product.id}
            className={`grid grid-cols-7 px-6 py-5 items-center ${
              idx !== pagedProducts.length - 1
                ? "border-b border-gray-100 dark:border-slate-800"
                : ""
            } hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors`}
          >
            <div className="flex items-center">
              <img
                className="h-14 w-14 rounded-lg object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>
            <span className="font-semibold capitalize text-sm text-gray-700 dark:text-slate-200">
              {product.name}
            </span>
            <span className="font-semibold text-sm text-gray-700 dark:text-slate-200">
              {product.category}
            </span>
            <span className="font-semibold text-sm text-gray-700 dark:text-slate-200">
              ${Number(product.price).toFixed(2)}
            </span>
            <span className="font-semibold text-sm text-gray-700 dark:text-slate-200">
              {product.piece}
            </span>
            <div className="flex items-center grid grid-cols-4 gap-3">
              {product.colors.map((color) => (
                <span
                  key={`${product.id}-${color}`}
                  className="h-5 w-5 rounded-full border border-black/10 dark:border-white/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex justify-center items-center">
              <Tooltip placement="bottom" content="Edit">
                <div
                  onClick={() => handleEditClick(product)}
                  className="w-12 dark:bg-slate-700 cursor-pointer border-[0.6px] border-[#979797]/70 flex items-center justify-center border-y-[0.6px] bg-[#FAFBFD] rounded-l-[8px]  h-8"
                >
                  <button
                    type="button"
                    className="cursor-pointer text-[color:var(--orderlist-text-color)] dark:text-slate-200"
                    aria-label={`Edit ${product.name}`}
                  >
                    <FiEdit />
                  </button>
                </div>
              </Tooltip>
              <Tooltip placement="bottom" content="Delete">
                <div
                  onClick={() => handleDeleteClick(product)}
                  className="w-12 dark:bg-slate-700 cursor-pointer border-r-[0.6px] border-[#979797]/70 flex items-center justify-center border-y-[0.6px] bg-[#FAFBFD] rounded-r-[8px]  h-8"
                >
                  <button
                    type="button"
                    className="cursor-pointer text-red-500"
                    aria-label={`Delete ${product.name}`}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </Tooltip>
            </div>
          </div>
        ))}

        {!loading && filteredProducts.length === 0 ? (
          <div className="px-6 py-10 text-sm text-center text-gray-500 dark:text-slate-400">
            No Data found.
          </div>
        ) : null}

        {loading ? (
          <div className="px-6 py-10 text-sm text-center text-gray-500 dark:text-slate-400">
            Loading products...
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between mt-4 px-1">
        <span className="text-sm text-gray-400 dark:text-slate-400">
          Showing {filteredProducts.length === 0 ? 0 : pageStart + 1}-
          {Math.min(pageEnd, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </span>
        <div className="flex items-center">
          <button
            type="button"
            className="px-3 py-2 border border-[var(--color-border-primary)] rounded-md border-r-none rounded-r-none text-[color:var(--color-text-primary)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            disabled={safePage === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            aria-label="Previous page"
          >
            <FaAngleLeft />
          </button>
          <button
            type="button"
            className="px-3 py-2 border-y-1 border-r-1 border-[var(--color-border-primary)] rounded-y-md rounded-r-lg !rounded-left-none !border-left-none text-[color:var(--color-text-primary)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            disabled={safePage === totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            aria-label="Next page"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {editOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeEditModal}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="popup-animate relative z-[100] w-[92%] max-w-[460px] rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:text-slate-100"
          >
            <button
              type="button"
              onClick={closeEditModal}
              disabled={editLoading}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-1 text-[color:var(--color-text-secondary)] transition-colors hover:bg-slate-100 hover:text-[color:var(--orderlist-text-color)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <RiCloseLine className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
              Edit Product
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-400">
              Update the selected product stock details.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4">
              <Input
                label="Product name"
                placeholder="Enter product name"
                value={editForm.name}
                error={editError?.name}
                capitalizeWords={true}
                onChange={(event) =>
                  handleEditFieldChange("name", event.target.value)
                }
                required={true}
                inputClassName="w-full"
              />
              <Input
                label="Category"
                placeholder="Enter category"
                value={editForm.category}
                error={editError?.category}
                capitalizeWords={true}
                onChange={(event) =>
                  handleEditFieldChange("category", event.target.value)
                }
                required={true}
                inputClassName="w-full"
              />
              <Input
                label="Price"
                type="number"
                placeholder="Enter price"
                value={editForm.price}
                error={editError?.price}
                required={true}
                onChange={(event) =>
                  handleEditFieldChange("price", event.target.value)
                }
                inputClassName="w-full"
              />
              <Input
                label="Piece"
                type="number"
                placeholder="Enter piece count"
                value={editForm.piece}
                error={editError?.piece}
                required={true}
                onChange={(event) =>
                  handleEditFieldChange("piece", event.target.value)
                }
                inputClassName="w-full"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={editLoading}
                className={`${MODAL_CANCEL_BUTTON_CLASS} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                disabled={editLoading}
                className={`${MODAL_PRIMARY_BUTTON_CLASS} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <DeleteModal
        open={deleteOpen}
        title="Delete product"
        message={`Are you sure you want to delete ${selectedProduct?.name || "this product"}?`}
        confirmText={deleteLoading ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
};

export default ProductStock;
