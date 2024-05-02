import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const respone = await axios.get(`${url}/api/food/list`);
    if (respone.data.success) {
      setList(respone.data.data);
    } else {
      toast.error("Error");
    }
  };
  const removeFood = async (foodId) => {
    const respone = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if (respone.data.success) {
      toast.success(respone.data.message);
    } else {
      toast.error(respone.data.message);
    }
}
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>Tất cả sản phẩm</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Ảnh</b>
          <b>Tên</b>
          <b>Danh mục</b>
          <b>Giá</b>
          <b>Xóa</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}đ</p>
              <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default List;
