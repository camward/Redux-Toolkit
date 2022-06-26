import { useState } from "react";
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "../store/goodsApi";
import { GoodsProps } from "../types";

const Goods = () => {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct, { isError }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id).unwrap();
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="form">
        <input
          type="text"
          value={newProduct}
          className="input"
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button className="button" onClick={handleAddProduct}>
          Добавить
        </button>
      </div>
      <div className="changeSelect">
        <label htmlFor="selectView">Показывать:</label>
        <select
          className="select"
          id="selectView"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        >
          <option value="">Все</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map((item: GoodsProps) => (
          <li key={item.id}>
            {item.id}. {item.name}{" "}
            <span onClick={() => handleDeleteProduct(item.id)}>&times;</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goods;
