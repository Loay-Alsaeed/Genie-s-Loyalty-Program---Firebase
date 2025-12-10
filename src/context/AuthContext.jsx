import { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersScore, setUsersScore] = useState([]);
  const [prizes, setPrizes] = useState([]);


  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // جلب بيانات المستخدم من Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || userData.name,
              role: userData.role || "Customer",
              phone: userData.phone || "",
              score: userData.score || 0
            });
          } else {
            // إنشاء مستند جديد للمستخدم إذا لم يكن موجوداً
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || "",
              role: "Customer",
              phone: "",
              score: 0
            });
          }
          console.log(user);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || "",
            role: "Customer",
            phone: "",
            score: 0
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    fetchPrizes();
    fetchUsersScore();
    return () => unsubscribe();
  }, []);


  const login = async (credentials) => {
    setLoading(true);
    try {
      const { Email, Password } = credentials;
      const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
      
      // جلب بيانات المستخدم من Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userInfo = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || userData.name,
          role: userData.role || "Customer",
          phone: userData.phone || "",
          score: userData.score || 0
        };
        setUser(userInfo);
        localStorage.setItem("Genies_Loyalty", JSON.stringify(userInfo));
      }
      return true;
    } catch (err) {
      console.error("Login error:", err.message);
      let errorMessage = "Login failed";
      if (err.code === "auth/user-not-found") {
        errorMessage = "User not found";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Wrong email or password";
      } else if (err.code === "auth/invalid-credential") {
        errorMessage = "Incorrect email or password";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email";
      } else {
        errorMessage = err.message;
      }
      return errorMessage;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData) => {
    setLoading(true);
    try {
      const { Email, Password, Name, Phone } = userData;
      
      // إنشاء حساب Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
      
      // تحديث اسم المستخدم في Firebase Auth
      await updateProfile(userCredential.user, {
        displayName: Name
      });

      // حفظ بيانات المستخدم في Firestore
      const userInfo = {
        name: Name,
        email: Email,
        phone: Phone || "",
        role: "Customer",
        score: 0,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userInfo);

      // تحديث حالة المستخدم
      setUser({
        uid: userCredential.user.uid,
        email: Email,
        displayName: Name,
        role: "Customer",
        phone: Phone || "",
        score: 0
      });

      localStorage.setItem("Genies_Loyalty", JSON.stringify({
        uid: userCredential.user.uid,
        email: Email,
        displayName: Name,
        role: "Customer",
        phone: Phone || "",
        score: 0
      }));

      return true;
    } catch (err) {
      console.error("Register error:", err.message);
      let errorMessage = "Register failed";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email";
      } else if (err.code === "auth/invalid-credential") {
        errorMessage = "Incorrect Email or Password";
      } else {
        errorMessage = err.message;
      }
      return errorMessage;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("Genies_Loyalty");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const fetchUsersScore = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("role", "==", "Customer"));
      const querySnapshot = await getDocs(q);
      const users = [];
      
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });

      console.log("users Score (Customers only):", users);
      setUsersScore(users);
    } catch (err) {
      console.error("Error fetching users score:", err);
    }
  };

  const fetchPrizes = async () => {
    try {
        const prizesRef = collection(db, "prizes");
        const q = query(prizesRef, orderBy("score", "asc"));
        const snapshot = await getDocs(q);
        const list = [];
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            });
        });
        setPrizes(list);
    } catch (error) {
        console.error("Error fetching prizes:", error);
    } finally {
        setLoading(false);
    }
};

  return (
    <AuthContext.Provider value={{ user, prizes, loading, login, logout, register, usersScore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
