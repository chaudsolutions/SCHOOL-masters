import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { serVer, useToken } from "../../../../Hooks/useVariable";

const Exams = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { token } = useToken();
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const setExamDate = async () => {
    const { from, to } = dateRange;

    if (!from || !to) {
      toast.error("Please select both dates.");
      return;
    }

    if (new Date(from) > new Date(to)) {
      toast.error("The 'from' date must be before the 'to' date.");
      return;
    }

    try {
      const res = await axios.post(
        `${serVer}/teacher/setExamDate`,
        { from, to },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data);
      setDateRange({ from: "", to: "" }); // Reset date range after successful submission
    } catch (error) {
      toast.error(error.response?.data || "Failed to set exam date.");
    }
  };

  return (
    <div className="manageUsers">
      <h2>Set Exam Date</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}>
        <label>
          From:
          <input
            aria-label="Date from"
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleInputChange}
          />
        </label>
        <label>
          To:
          <input
            aria-label="Date to"
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <button
        onClick={setExamDate}
        className="deleteBtn"
        style={{ marginTop: "20px" }}>
        Set Date
      </button>
    </div>
  );
};

export default Exams;
