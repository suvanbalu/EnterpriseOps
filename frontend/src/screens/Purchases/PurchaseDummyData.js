const dummyData = [
  {
    billNumber: 'B001',
    date: '2023-04-01',
    totalAmount: 150.75,
    details: [
      {
        productId: 'P001',
        productName: 'Product A',
        quantity: 2,
        rate: 25.50,
        amount: 51.00,
      },
      {
        productId: 'P002',
        productName: 'Product B',
        quantity: 3,
        rate: 12.75,
        amount: 38.25,
      },
    ],
  },
  {
    billNumber: 'B002',
    date: '2023-04-02',
    totalAmount: 120.50,
    details: [
      {
        productId: 'P003',
        productName: 'Product C',
        quantity: 4,
        rate: 18.25,
        amount: 73.00,
      },
      {
        productId: 'P004',
        productName: 'Product D',
        quantity: 1,
        rate: 47.50,
        amount: 47.50,
      },
    ],
  },
];

export default dummyData;