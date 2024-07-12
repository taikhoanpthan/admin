import { useEffect, useState } from "react";
import "./Order.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import moment from "moment"; // Sử dụng thư viện moment để định dạng ngày

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const res = await axios.get(url + "api/order/list");
    if (res.data.success) {
      setOrders(res.data.data);
      console.log(res.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const res = await axios.post(url + "api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (res.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Trang quản lí đơn hàng</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name"><span>Họ và Tên: </span>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
              <p><span style={{ fontWeight: "bold" }}>Số nhà: </span>{order.address.street + ","}</p>
              <p><span style={{ fontWeight: "bold" }}>Đường: </span>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone" ><span style={{ fontWeight: "bold" }}>Số điện thoại: </span>{order.address.phone}</p>
            </div>
            <p>Số lượng : {order.items.length}</p>
            <p><span style={{ fontWeight: "bold" }}>Tổng tiền: </span>{order.amount} VNĐ</p>
            <p className="order-item-date">
              Ngày tạo: {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Đơn hàng đang xử lý">Đơn hàng đang xử lý</option>
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Hủy">Hủy</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
