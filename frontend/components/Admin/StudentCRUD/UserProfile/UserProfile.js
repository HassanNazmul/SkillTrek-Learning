import {useState, useEffect} from "react";
import {fetchUserData} from '@/components/Admin/StudentCRUD/UserProfile/lib/FetchUserData';
import ProfileHeader from './ProfileHeader';
import PersonalInfo from './PersonalInfo';
import EnrolledModules from './EnrolledModules';
import {motion, AnimatePresence} from "framer-motion";

const UserProfile = ({username}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserData(username);
                setUser(userData);
                setLoading(false);
            } catch (err) {
                setError("Failed to load user data");
                setLoading(false);
            }
        };
        fetchData();
    }, [username]);

    if (loading) {
        // return (
        //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        //     </div>
        // );
        return;
    }

    if (error) {
        // return (
        //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        //         <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        //             <AiOutlineWarning className="text-red-500 text-5xl mx-auto mb-4" />
        //             <p className="text-gray-700">{error}</p>
        //         </div>
        //     </div>
        // );
        return;
    }

    const pageTransition = {
        initial: {opacity: 0, y: 20}, animate: {opacity: 1, y: 0}, exit: {opacity: 0, y: -20},
    };

    return (
        <AnimatePresence>
            <motion.div
                className="h-auto bg-white"
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="h-auto bg-white sm:px-6 lg:px-8 mt-10">
                    <div
                        // className="max-w-4xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-lg">
                        // className="max-w-4xl mx-auto space-y-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg">
                        className="max-w-4xl mx-auto space-y-8 bg-white border border-indigo-100 p-4 rounded-lg">
                        <ProfileHeader user={user}/>
                        <PersonalInfo user={user}/>
                        <EnrolledModules user={user}/>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UserProfile;
