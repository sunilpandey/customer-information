export const customerList = [
  {
    id: "1",
    name: "Customer A",
    profilePicUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=A",
  },
  {
    id: "2",
    name: "Customer B",
    profilePicUrl: "https://via.placeholder.com/150/00FF00/FFFFFF?text=B",
  },
  {
    id: "3",
    name: "Customer C",
    profilePicUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=C",
  },
  {
    id: "4",
    name: "Customer D",
    profilePicUrl: "https://via.placeholder.com/150/FFFF00/FFFFFF?text=D",
  },
  {
    id: "5",
    name: "Customer E",
    profilePicUrl: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=E",
  },
];
export const getActiveCustomerList = async (count: number) => {
  return new Promise((resolve) => setTimeout(() => resolve(customerList.slice(0, count)), 100));
};