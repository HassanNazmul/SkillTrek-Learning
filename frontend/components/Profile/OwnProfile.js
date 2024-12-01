import {useState, useEffect} from "react";

import {motion, AnimatePresence} from "framer-motion";
import {fetchStudentData} from "@/components/Profile/lib/FetchStudentData";
import OwnProfileHeader from "@/components/Profile/OwnProfileHeader";
import OwnProfileInfo from "@/components/Profile/OwnProfileInfo";
import OwnProfileEnrolledModules from "@/components/Profile/OwnProfileEnrolledModules";


const OwnProfile = ({username}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchStudentData(username);
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
        return;
    }

    if (error) {
        return;
    }

    const pageTransition = {
        initial: {opacity: 0, y: 20}, animate: {opacity: 1, y: 0}, exit: {opacity: 0, y: -20},
    };

    return (<AnimatePresence>
            <motion.div
                className="h-auto bg-white"
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="h-auto bg-white sm:px-6 lg:px-8 mt-10">
                    <div
                        className="max-w-4xl mx-auto space-y-8 bg-white border border-indigo-100 p-4 rounded-lg">
                        <OwnProfileHeader user={user}/>
                        <OwnProfileInfo user={user}/>
                        {/*<OwnProfileEnrolledModules user={user}/>*/}
                        {/* Conditionally render OwnProfileEnrolledModules only for students */}
                        {user?.user_type === "student" && (
                            <OwnProfileEnrolledModules user={user} />
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>);
};

export default OwnProfile;
