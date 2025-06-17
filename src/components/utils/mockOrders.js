// utils/mockOrders.js

const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
const customerNames = [
  "Amit Shah",
  "Priya Mehta",
  "Ravi Kumar",
  "Sneha Reddy",
  "Vikram Joshi",
  "Aisha Khan",
  "Neha Verma",
  "Rohan Singh",
  "Divya Patel",
  "Karan Malhotra",
];

function randomDate(start, end) {
  const date = new Date(+start + Math.random() * (end - start));
  return date.toISOString().split("T")[0];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMockOrders(count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: 1000 + i,
    customer: customerNames[getRandomInt(0, customerNames.length - 1)],
    amount: getRandomInt(500, 5000),
    date: randomDate(new Date(2024, 0, 1), new Date()),
    status: statuses[getRandomInt(0, statuses.length - 1)],
  }));
}
