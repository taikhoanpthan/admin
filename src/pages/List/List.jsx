import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "https://be-food-vtbl.onrender.com"; // Ensure this URL is correct
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
  });

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("Fetch List Response:", response); // Log response for debugging
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Error fetching list");
      console.error("There was an error!", error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      console.log("Remove Food Response:", response); // Log response for debugging
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Fetch the list again after a successful removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error removing food item");
      console.error("There was an error!", error);
    }
  };

  const updateFood = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editItem._id);
      formData.append("name", updatedData.name);
      formData.append("category", updatedData.category);
      formData.append("price", updatedData.price);
      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      const response = await axios.post(`${url}/api/food/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update Food Response:", response); // Log response for debugging
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Fetch the list again after a successful update
        setEditItem(null); // Exit edit mode
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating food item");
      console.error("There was an error!", error);
    }
  };

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
          <b>Sửa</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            {editItem && editItem._id === item._id ? (
              <>
                <input
                  type="text"
                  value={updatedData.name}
                  onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                />
                <input
                  type="text"
                  value={updatedData.category}
                  onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
                />
                <input
                  type="text"
                  value={updatedData.price}
                  onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
                />
                <input
                  type="file"
                  onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.files[0] })}
                />
                <button onClick={updateFood}>Save</button>
                <button onClick={() => setEditItem(null)}>Cancel</button>
              </>
            ) : (
              <>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}đ</p>
                <p onClick={() => removeFood(item._id)} className="cursor">
                  X
                </p>
                <button
                  onClick={() => {
                    setEditItem(item);
                    setUpdatedData({
                      name: item.name,
                      category: item.category,
                      price: item.price,
                      image: null,
                    });
                  }}
                  className="blue-button cursor"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
