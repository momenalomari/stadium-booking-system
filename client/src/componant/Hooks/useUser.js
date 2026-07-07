import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. دخلنا الـ useEffect جوا دالة useUser
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        
        if (response.data.length === 0) {
          toast.warn("لا يوجد مستخدمين حالياً ⚠️", {
            toastId: "warning_no_users",
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("عذراً، حدث خطأ في الاتصال بالسيرفر ❌", {
          toastId: "error_fetch_users",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // 2. ضفنا الأقواس المربعة هون عشان الكود يشتغل مرة وحدة بس أول ما تفتح الصفحة

  // 3. ضفنا سطر الإرجاع عشان نقدر نستخدم البيانات بالداشبورد
  return { users, loading };
}; // 4. نقلنا قوس النهاية لهون