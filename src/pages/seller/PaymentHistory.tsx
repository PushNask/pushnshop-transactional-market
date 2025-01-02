import React from 'react';

const PaymentHistory = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment History</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">No payments yet</p>
      </div>
    </div>
  );
};

export default PaymentHistory;
