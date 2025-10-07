import React, { useEffect, useState, useCallback } from "react";
import { fetchAccessTokenTest, fetchTransactions } from "../../api/api";
import { Calendar } from "lucide-react";

const categories = [
  "ENTERTAINMENT",
  "TRANSPORTATION",
  "TRAVEL",
  "INCOME",
  "GENERAL_MERCHANDISE",
  "FOOD_AND_DRINK",
  "PERSONAL_CARE",
  "GENERAL_SERVICES",
  "LOAN_PAYMENTS",
  "OTHER",
  "TRANSFER_OUT",
];

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [dateStart, setDateStart] = useState("2025-01-01");
  const [dateEnd, setDateEnd] = useState("2025-12-31");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);

  // function to fetch and set transactions
  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const token = await fetchAccessTokenTest();
      const transactions = await fetchTransactions(token, String(dateStart), String(dateEnd),);
      setTransactions(transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [dateStart, dateEnd]);

  // Fetch transactions on mount and whenever dates change
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Local category + sort filters
  const filtered = transactions
    .filter((t) => (category ? t.personal_finance_category.primary === category : true))
    .sort((a, b) => {
      if (sortOrder === "high") return b.amount - a.amount;
      if (sortOrder === "low") return a.amount - b.amount;
      return 0;
    });

  return (
    <div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
      <div className="flex items-center mb-4">
        <h1 className="text-left font-bold ml-2 text-lg">Transactions</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        {/* Date Start */}
        <div>
          <label className="block text-sm font-semibold mb-1">Start Date</label>
          <input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Date End */}
        <div>
          <label className="block text-sm font-semibold mb-1">End Date</label>
          <input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold mb-1">Amount</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200"
          >
            <option value="">Default</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && <p className="text-gray-500 text-sm">Loading transactions...</p>}

      {/* Transactions */}
      {!loading && filtered.map((txn, index) => (
        <div
          key={index}
          className="flex justify-between items-start mt-4 p-4 overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm border border-slate-100 hover:shadow-md transition-all duration-200"
        >
          <div className="text-left">
            <div className="font-bold">{txn.name}</div>
            <div className="flex items-center text-gray-500 mt-2">
              <Calendar className="w-3 h-3 mr-1" />
              <div className="text-sm">
                {new Date(txn.date).toLocaleDateString()}
              </div>
              <div className="ml-3 text-xs font-semibold text-black border border-gray-200 rounded-full py-1 px-3 lowercase">
                {txn.personal_finance_category.primary.replace(/_/g, " ")}
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold text-xl">
              ${Number(txn.amount).toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
