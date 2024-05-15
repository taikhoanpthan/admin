import React, { useState, useEffect } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Add = () => {
  const url = "https://be-food-ngv7.onrender.com/";
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Milk Tea",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const respone = await axios.post(`${url}/api/food/add`, formData);
    if (respone.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Milk Tea",
      });
      setImage(false);
      toast.success(respone.data.message);
    } else {
      toast.error(respone.data.message);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Tải ảnh sản phẩm</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Thông tin sản phẩm</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Viết nội dung ở đây"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Danh mục</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Milk Tea">Milk Tea</option>
              <option value="Fruits Tea">Fruits Tea</option>
              <option value="Coffee">Coffee</option>
              <option value="IceEgg">IceEgg</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Giá</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="10.000Đ"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Thêm
        </button>
      </form>
    </div>
  );
};

export default Add;
