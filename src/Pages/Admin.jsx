import { useState, useEffect } from "react";
import Header from "../Components/Header";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";
import { useAuth } from "../context/AuthContext";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../firebase";
import { Icon } from "@iconify/react";

const Admin = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("games"); // "games" | "users" | "prizes"
    const [games, setGames] = useState([]);
    const [users, setUsers] = useState([]);
    const [prizes, setPrizes] = useState([]);
    const [showTopTen, setShowTopTen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Delete confirmation state
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        type: null, // "game" | "prize" | "user"
        id: null,
        name: "",
        loading: false
    });

    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success" // "success" | "error"
    });

    // Game form state
    const [showGameForm, setShowGameForm] = useState(false);
    const [editingGame, setEditingGame] = useState(null);
    const [gameForm, setGameForm] = useState({
        name: "",
        imageUrl: "",
        description: "",
        schedule: ""
    });

    // Prize form state
    const [showPrizeForm, setShowPrizeForm] = useState(false);
    const [editingPrize, setEditingPrize] = useState(null);
    const [prizeForm, setPrizeForm] = useState({
        name: "",
        imageUrl: "",
        description: "",
        score: 0
    });

    // User form state
    const [showUserForm, setShowUserForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "Customer",
        score: 0
    });

    useEffect(() => {
        if (user?.role === "Admin") {
            fetchGames();
            fetchPrizes();
            fetchUsers();
        }
    }, [user]);

    const fetchGames = async () => {
        setLoading(true);
        try {
            const gamesRef = collection(db, "games");
            const q = query(gamesRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const gamesList = [];
            querySnapshot.forEach((doc) => {
                gamesList.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setGames(gamesList);
        } catch (error) {
            // console.error("Error fetching games:", error);
            // alert("Error fetching games: " + error.message);
            showNotification("Error fetching games", "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, "users");
            const querySnapshot = await getDocs(usersRef);
            const usersList = [];
            querySnapshot.forEach((doc) => {
                usersList.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setUsers(usersList);
        } catch (error) {
            // console.error("Error fetching users:", error);
            // alert("Error fetching users: " + error.message);
            showNotification("Error fetching users", "error");

        } finally {
            setLoading(false);
        }
    };

    const fetchPrizes = async () => {
        setLoading(true);
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
            // console.error("Error fetching prizes:", error);
            // alert("Error fetching prizes: " + error.message);
            showNotification("Error fetching prizes", "error");

            
        } finally {
            setLoading(false);
        }
    };

    const handleGameSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingGame) {
                // Update existing game
                const gameRef = doc(db, "games", editingGame.id);
                await updateDoc(gameRef, {
                    name: gameForm.name,
                    imageUrl: gameForm.imageUrl,
                    description: gameForm.description,
                    schedule: gameForm.schedule,
                    updatedAt: new Date().toISOString()
                });
                showNotification("Game updated successfully!", "success");

            } else {
                // Add new game
                await addDoc(collection(db, "games"), {
                    name: gameForm.name,
                    imageUrl: gameForm.imageUrl,
                    description: gameForm.description,
                    schedule: gameForm.schedule,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                showNotification("Game added successfully!", "success");

            }
            setShowGameForm(false);
            setEditingGame(null);
            setGameForm({ name: "", imageUrl: "", description: "", schedule: "" });
            fetchGames();
        } catch (error) {
            // console.error("Error saving game:", error);
            // alert("Error saving game: " + error.message);
            showNotification("Error saving game", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingUser) {
                // Update existing user
                const userRef = doc(db, "users", editingUser.id);
                await updateDoc(userRef, {
                    name: userForm.name,
                    email: userForm.email,
                    phone: userForm.phone,
                    role: userForm.role,
                    score: parseInt(userForm.score) || 0,
                    updatedAt: new Date().toISOString()
                });
                showNotification("User updated successfully!", "success");

            } else {
                // Create new user
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    userForm.email,
                    userForm.password
                );

                await updateProfile(userCredential.user, {
                    displayName: userForm.name
                });

                await addDoc(collection(db, "users"), {
                    name: userForm.name,
                    email: userForm.email,
                    phone: userForm.phone,
                    role: userForm.role,
                    score: parseInt(userForm.score) || 0,
                    createdAt: new Date().toISOString()
                });
                showNotification("User created successfully!", "success");

            }
            setShowUserForm(false);
            setEditingUser(null);
            setUserForm({ name: "", email: "", password: "", phone: "", role: "Customer", score: 0 });
            fetchUsers();
        } catch (error) {
            showNotification("Error saving user", "error");

        } finally {
            setLoading(false);
        }
    };

    const handlePrizeSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingPrize) {
                const prizeRef = doc(db, "prizes", editingPrize.id);
                await updateDoc(prizeRef, {
                    name: prizeForm.name,
                    imageUrl: prizeForm.imageUrl,
                    description: prizeForm.description,
                    score: Number(prizeForm.score) || 0,
                    updatedAt: new Date().toISOString()
                });
                showNotification("Prize updated successfully!", "success");

            } else {
                await addDoc(collection(db, "prizes"), {
                    name: prizeForm.name,
                    imageUrl: prizeForm.imageUrl,
                    description: prizeForm.description,
                    score: Number(prizeForm.score) || 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                showNotification("Prize added successfully!", "success");

            }
            setShowPrizeForm(false);
            setEditingPrize(null);
            setPrizeForm({ name: "", imageUrl: "", description: "", score: 0 });
            fetchPrizes();
        } catch (error) {
            showNotification("Error saving prize", "error");
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (type, id, name) => {
        setDeleteModal({
            isOpen: true,
            type,
            id,
            name,
            loading: false
        });
    };

    const closeDeleteModal = () => {
        if (!deleteModal.loading) {
            setDeleteModal({
                isOpen: false,
                type: null,
                id: null,
                name: "",
                loading: false
            });
        }
    };

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "success" });
        }, 3000);
    };

    const handleConfirmDelete = async () => {
        setDeleteModal(prev => ({ ...prev, loading: true }));

        try {
            let collectionName = "";
            let fetchFunction = null;
            let successMessage = "";

            switch (deleteModal.type) {
                case "game":
                    collectionName = "games";
                    fetchFunction = fetchGames;
                    successMessage = "Game deleted successfully!";
                    break;
                case "prize":
                    collectionName = "prizes";
                    fetchFunction = fetchPrizes;
                    successMessage = "Prize deleted successfully!";
                    break;
                case "user":
                    collectionName = "users";
                    fetchFunction = fetchUsers;
                    successMessage = "User deleted successfully!";
                    break;
                default:
                    throw new Error("Invalid delete type");
            }

            await deleteDoc(doc(db, collectionName, deleteModal.id));
            await fetchFunction();
            closeDeleteModal();
            showNotification(successMessage, "success");
        } catch (error) {
            showNotification(`Error deleting ${deleteModal.type}: ${error.message}`, "error");
            setDeleteModal(prev => ({ ...prev, loading: false }));
        }
    };

    const handleDeleteGame = (gameId, gameName) => {
        openDeleteModal("game", gameId, gameName);
    };

    const handleDeletePrize = (prizeId, prizeName) => {
        openDeleteModal("prize", prizeId, prizeName);
    };

    const handleDeleteUser = (userId, userName) => {
        openDeleteModal("user", userId, userName);
    };

    const openEditGame = (game) => {
        setEditingGame(game);
        setGameForm({
            name: game.name,
            imageUrl: game.imageUrl || "",
            description: game.description || "",
            schedule: game.schedule || ""
        });
        setShowGameForm(true);
    };

    const openEditUser = (userData) => {
        setEditingUser(userData);
        setUserForm({
            name: userData.name || "",
            email: userData.email || "",
            password: "",
            phone: userData.phone || "",
            role: userData.role || "Customer",
            score: userData.score || 0
        });
        setShowUserForm(true);
    };

    const openEditPrize = (prize) => {
        setEditingPrize(prize);
        setPrizeForm({
            name: prize.name || "",
            imageUrl: prize.imageUrl || "",
            description: prize.description || "",
            score: prize.score || 0
        });
        setShowPrizeForm(true);
    };

    if (user?.role !== "Admin") {
        return (
            <>
                <div className="m-auto max-w-5xl flex flex-col min-h-screen bg-background text-foreground font-sans">
                    <div className="flex items-center justify-center flex-1 px-5 py-12">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold font-heading mb-4">Access Denied</h2>
                            <p className="text-muted-foreground">You need admin privileges to access this page.</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="m-auto max-w-5xl min-h-screen bg-background text-foreground font-sans">
                <div className="pt-4 px-5 bg-linear-to-b from-primary/10 to-background">
                    <Header />
                </div>
                <div className="max-w-5xl m-auto w-full px-5 py-4 ">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mask-radial-from-sidebar-accent-foreground mb-2">
                            Admin Dashboard
                        </h1>
                        <div className="h-1 w-24 bg-primary rounded-full mx-auto"></div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 justify-center flex-wrap">
                        <button
                            onClick={() => setActiveTab("games")}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === "games"
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary text-secondary-foreground hover:opacity-80"
                                }`}
                        >
                            Manage Games
                        </button>
                        <button
                            onClick={() => setActiveTab("prizes")}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === "prizes"
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary text-secondary-foreground hover:opacity-80"
                                }`}
                        >
                            Manage Prizes
                        </button>
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === "users"
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary text-secondary-foreground hover:opacity-80"
                                }`}
                        >
                            Manage Users
                        </button>
                    </div>

                    {/* Games Tab */}
                    {activeTab === "games" && (
                        <div>
                            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                <h2 className="text-xl font-bold font-heading">Games Management</h2>
                                <button
                                    onClick={() => {
                                        setEditingGame(null);
                                        setGameForm({ name: "", imageUrl: "", description: "", schedule: "" });
                                        setShowGameForm(true);
                                    }}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors font-semibold text-sm"
                                >
                                    Add New Game
                                </button>
                            </div>

                            {loading && games.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Loading games...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {games.map((game) => (

                                        <div key={game.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                                            <div className="w-20 h-20 rounded-2xl bg-indigo-900/50 shrink-0 overflow-hidden">
                                                <img
                                                    alt="Magic"
                                                    src={game.imageUrl || "https://www.freeiconspng.com/uploads/no-image-icon-10.png"}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-base">{game.name}</h4>
                                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                            {game.description || "No description available."}
                                                        </p>
                                                    </div>
                                                    
                                                </div>
                                                <div className="flex items-center gap-3 mt-3">
                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                                        <Icon icon="solar:calendar-bold" className="size-4 text-amber-400" />
                                                        <span>{game.schedule || "Schedule TBD"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Icon onClick={() => {openEditGame(game)}} className="cursor-pointer text-primary" icon="line-md:edit" width="24" height="24" />
                                                <Icon onClick={() => {handleDeleteGame(game.id, game.name)}} className="cursor-pointer" color="red" icon="typcn:delete-outline" width="24" height="24" />                                            
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Prizes Tab */}
                    {activeTab === "prizes" && (
                        <div>
                            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                <h2 className="text-xl font-bold font-heading">Prizes Management</h2>
                                <button
                                    onClick={() => {
                                        setEditingPrize(null);
                                        setPrizeForm({ name: "", imageUrl: "", description: "", score: 0 });
                                        setShowPrizeForm(true);
                                    }}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors font-semibold text-sm"
                                >
                                    Add New Prize
                                </button>
                            </div>

                            {loading && prizes.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Loading prizes...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {prizes.map((prize) => (
                                        <div key={prize.id} className="p-4 rounded-2xl bg-card border-2 border-primary shadow-md shadow-primary/20">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 rounded-xl bg-primary/10 shrink-0 flex items-center justify-center">
                                                <img className="rounded-xl" src={prize.imageUrl} alt={prize.name} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-base">{prize.name}</h3>
                                                        <p className="text-xs text-muted-foreground mt-0.5">
                                                            {prize.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                                                        <Icon icon="solar:star-bold" className="size-4" />
                                                        <span>{prize.score} pts</span>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Icon onClick={() => {openEditPrize(prize)}} className="cursor-pointer text-primary" icon="line-md:edit" width="24" height="24" />
                                                <Icon onClick={() => {handleDeletePrize(prize.id, prize.name)}} className="cursor-pointer" color="red" icon="typcn:delete-outline" width="24" height="24" />                                            
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === "users" && (
                        <div>
                            <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
                                <h2 className="text-xl font-bold font-heading">Users Management</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingUser(null);
                                            setUserForm({ name: "", email: "", password: "", phone: "", role: "Customer", score: 0 });
                                            setShowUserForm(true);
                                        }}
                                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors font-semibold text-sm"
                                    >
                                        Add New User
                                    </button>
                                    <button
                                        onClick={() => setShowTopTen((prev) => !prev)}
                                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg border border-border hover:opacity-80 transition-colors font-semibold text-sm"
                                    >
                                        {showTopTen ? "Show All" : "Show Top 10"}
                                    </button>
                                </div>
                            </div>

                            {loading && users.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Loading users...</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full bg-card rounded-lg overflow-hidden border border-border">
                                        <thead className="bg-secondary">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold text-sm">Name</th>
                                                <th className="px-4 py-3 text-left font-semibold text-sm">Email</th>
                                                <th className="px-4 py-3 text-left font-semibold text-sm">Phone</th>
                                                <th className="px-4 py-3 text-left font-semibold text-sm">Role</th>
                                                <th className="px-4 py-3 text-left font-semibold text-sm">Score</th>
                                                <th className="px-4 py-3 text-left font-semibold text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(showTopTen
                                                ? [...users].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 10)
                                                : users
                                            ).map((userData) => (
                                                <tr key={userData.id} className="border-t border-border">
                                                    <td className="px-4 py-3">{userData.name}</td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">{userData.email}</td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">{userData.phone || "-"}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${userData.role === "Admin"
                                                                ? "bg-primary/20 text-primary"
                                                                : "bg-secondary text-secondary-foreground"
                                                            }`}>
                                                            {userData.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 font-semibold">{userData.score || 0}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => openEditUser(userData)}
                                                                className="px-3 py-1 bg-primary text-primary-foreground rounded hover:opacity-90 transition-colors text-sm font-semibold"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteUser(userData.id, userData.name)}
                                                                className="px-3 py-1 bg-destructive text-destructive-foreground rounded hover:opacity-90 transition-colors text-sm font-semibold"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Game Form Modal */}
                    {showGameForm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                            <div className="bg-card rounded-2xl p-6 max-w-md w-full border border-border shadow-lg">
                                <h3 className="text-xl font-bold font-heading mb-4">
                                    {editingGame ? "Edit Game" : "Add New Game"}
                                </h3>
                                <form onSubmit={handleGameSubmit}>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Game Name</label>
                                        <input
                                            type="text"
                                            value={gameForm.name}
                                            onChange={(e) => setGameForm({ ...gameForm, name: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Image URL</label>
                                        <input
                                            type="url"
                                            value={gameForm.imageUrl}
                                            onChange={(e) => setGameForm({ ...gameForm, imageUrl: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Description</label>
                                        <textarea
                                            value={gameForm.description}
                                            onChange={(e) => setGameForm({ ...gameForm, description: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            rows={3}
                                            placeholder="Brief game description"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Schedule (e.g. Fri - 7PM)</label>
                                        <input
                                            type="text"
                                            value={gameForm.schedule}
                                            onChange={(e) => setGameForm({ ...gameForm, schedule: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Fri - 7PM"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 font-semibold"
                                        >
                                            {loading ? "Saving..." : editingGame ? "Update" : "Add"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowGameForm(false);
                                                setEditingGame(null);
                                                setGameForm({ name: "", imageUrl: "", description: "", schedule: "" });
                                            }}
                                            className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-80 transition-colors font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* User Form Modal */}
                    {showUserForm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                            <div className="bg-card rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-border shadow-lg">
                                <h3 className="text-xl font-bold font-heading mb-4">
                                    {editingUser ? "Edit User" : "Add New User"}
                                </h3>
                                <form onSubmit={handleUserSubmit}>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Name</label>
                                        <input
                                            type="text"
                                            value={userForm.name}
                                            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Email</label>
                                        <input
                                            type="email"
                                            value={userForm.email}
                                            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    {!editingUser && (
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-semibold">Password</label>
                                            <input
                                                type="password"
                                                value={userForm.password}
                                                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                                                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                                required={!editingUser}
                                                minLength={6}
                                            />
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Phone</label>
                                        <input
                                            type="tel"
                                            value={userForm.phone}
                                            onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Role</label>
                                        <select
                                            value={userForm.role}
                                            onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        >
                                            <option className="text-sm w-fit" value="Customer">Customer</option>
                                            <option className="text-sm w-fit" value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Score</label>
                                        <input
                                            type="number"
                                            value={userForm.score}
                                            onChange={(e) => setUserForm({ ...userForm, score: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            min="0"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 font-semibold"
                                        >
                                            {loading ? "Saving..." : editingUser ? "Update" : "Add"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowUserForm(false);
                                                setEditingUser(null);
                                                setUserForm({ name: "", email: "", password: "", phone: "", role: "Customer", score: 0 });
                                            }}
                                            className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-80 transition-colors font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Prize Form Modal */}
                    {showPrizeForm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                            <div className="bg-card rounded-2xl p-6 max-w-md w-full border border-border shadow-lg">
                                <h3 className="text-xl font-bold font-heading mb-4">
                                    {editingPrize ? "Edit Prize" : "Add New Prize"}
                                </h3>
                                <form onSubmit={handlePrizeSubmit}>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Prize Name</label>
                                        <input
                                            type="text"
                                            value={prizeForm.name}
                                            onChange={(e) => setPrizeForm({ ...prizeForm, name: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Image URL</label>
                                        <input
                                            type="url"
                                            value={prizeForm.imageUrl}
                                            onChange={(e) => setPrizeForm({ ...prizeForm, imageUrl: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Description</label>
                                        <textarea
                                            value={prizeForm.description}
                                            onChange={(e) => setPrizeForm({ ...prizeForm, description: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            rows={3}
                                            placeholder="Brief prize description"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-semibold">Required Score</label>
                                        <input
                                            type="number"
                                            value={prizeForm.score}
                                            onChange={(e) => setPrizeForm({ ...prizeForm, score: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 font-semibold"
                                        >
                                            {loading ? "Saving..." : editingPrize ? "Update" : "Add"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowPrizeForm(false);
                                                setEditingPrize(null);
                                                setPrizeForm({ name: "", imageUrl: "", description: "", score: 0 });
                                            }}
                                            className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-80 transition-colors font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmModal
                        isOpen={deleteModal.isOpen}
                        onClose={closeDeleteModal}
                        onConfirm={handleConfirmDelete}
                        title={`Delete ${deleteModal.type === "game" ? "Game" : deleteModal.type === "prize" ? "Prize" : "User"}?`}
                        message={`Are you sure you want to delete this ${deleteModal.type}? This action cannot be undone.`}
                        itemName={deleteModal.name}
                        loading={deleteModal.loading}
                    />

                    {/* Success/Error Notification */}
                    {notification.show && (
                        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${notification.type === "success"
                                ? "bg-primary/10 border-primary/30 text-primary"
                                : "bg-destructive/10 border-destructive/30 text-destructive"
                            }`}>
                            <Icon
                                icon={notification.type === "success" ? "solar:check-circle-bold" : "solar:close-circle-bold"}
                                className="size-5"
                            />
                            <p className="font-semibold text-sm">{notification.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Admin;