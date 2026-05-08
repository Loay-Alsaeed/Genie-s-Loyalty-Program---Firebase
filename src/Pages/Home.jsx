import { useAuth } from "../context/AuthContext";
import Admin from "./Admin";
import Customer from "./Customer";
import Auth from "./Auth";


const Home = () => {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading, Please Wait ...</p>;

    if (!user) {
        return <Auth/>;
    }

    switch(user.role) {
      case "Admin":
        return  <Admin/> 
      case "Customer":
        return <Customer/>
      default:
        return <Auth/>
    }
}
export default Home;