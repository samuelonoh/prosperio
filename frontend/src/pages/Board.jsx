import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTotalProducts,
  updateTotalStockValue,
  updateOutOfStockCount,
  updateCategories
} from '../slices/products/boardSlice'; // Import your dashboardSlice actions instead of products/boardSlice

import { BsListCheck } from 'react-icons/bs';
import { GiShoppingCart } from 'react-icons/gi';
import { TbCurrencyNaira, TbShoppingCartX } from 'react-icons/tb';
import Table from '../components/Table';

export default function Board() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  // Declare state variables for calculations
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [Categories, setCategories] = useState(0);

  useEffect(() => {
    const updatedTotalProducts = products.length;
    const updatedTotalStockValue = products.reduce(
      (total, product) => total + product?.value,
      0
    );
    const updatedOutOfStockCount = products.filter(
      (product) => product?.quantity === 0
    ).length;
    const uniqueCategories = [
      ...new Set(products.map((product) => product?.category)),
    ];
    const updatedCategories = uniqueCategories.length;

    // Update state variables
    setTotalProducts(updatedTotalProducts);
    setTotalStockValue(updatedTotalStockValue);
    setOutOfStockCount(updatedOutOfStockCount);
    setCategories(updatedCategories);

    // Dispatch the updates to the Redux store
    dispatch(updateTotalProducts(updatedTotalProducts));
    dispatch(updateTotalStockValue(updatedTotalStockValue));
    dispatch(updateOutOfStockCount(updatedOutOfStockCount));
    dispatch(updateCategories(updatedCategories));

  }, [dispatch, products]);

  return (
    <div className="w-full flex flex-col items-center justify-between h-[85vh]">
      <div className="flex items-center justify-between h-[20%] w-[97%] text-white">
        <button className="w-[20%] h-[90%] rounded-xl bg-[#0F1377] flex items-center justify-evenly transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 hover:bg-[#0F1377] duration-300">
          <div>
            <GiShoppingCart className="text-4xl font-semibold" />
          </div>
          <div className="text-center">
            <p>Total Products</p>
            <p>{totalProducts}</p>
          </div>
        </button>
        <button className="w-[20%] h-[90%] rounded-xl bg-[#0A6502] flex items-center justify-evenly transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 hover:bg-[#0A6502] duration-300">
          <div>
            <TbCurrencyNaira className="text-4xl" />
          </div>
          <div className="text-center">
            <p>Total Stock Value</p>
            <p>{totalStockValue}</p>
          </div>
        </button>
        <button className="w-[20%] h-[90%] rounded-xl bg-[#850707] flex items-center justify-evenly transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 hover:bg-[#850707] duration-300">
          <div>
            <TbShoppingCartX className="text-4xl" />
          </div>
          <div className="text-center">
            <p>Out of Stock</p>
            <p>{outOfStockCount}</p>
          </div>
        </button>
        <button className="w-[20%] h-[90%] rounded-xl bg-[#530441] flex items-center justify-evenly transition ease-in-out delay-150 hover:-translate-1 hover:scale-110 hover:bg-[#530441] duration-300">
          {' '}
          <div>
            <BsListCheck className="text-4xl " />
          </div>
          <div className="text-center">
            <p>All Categories</p>
            <p>{Categories}</p>
          </div>
        </button>
      </div>

      <div className="h-[75%] w-[98%]">
        <Table />
      </div>
    </div>
  );
}