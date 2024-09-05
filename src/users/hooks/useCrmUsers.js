import { useCallback, useEffect, useState } from 'react';

const useCrmUsers = () => {
    const [users, setUsers] = useState([]);
    const [usersToDelete, setUsersToDelete] = useState([]);
    const [singleuserToDelete, setSingleuserToDelete] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append(
            'x-auth-token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck'
        );

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users',
                    requestOptions
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data);
                console.log(data);
                return data;
            } catch (error) {
                setError(error.message); // Store the error in state
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUsers = useCallback(async (id) => {
        confirm('ARE YOU SURE YOU WANT TO DELETE THIS USER?')
        try {
            const response = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`);
            const deletesUser = response.data;
            setSingleuserToDelete(deletesUser);
            alert('THE user HAS DELETED');
            console.log("user " + id + " deleted");
            setUsersToDelete(prev => prev.map(userToCheck => {
                if (userToCheck._id !== id) { return userToCheck }
                return deletesUser;
            }));
        } catch (error) {
            setError(error.message);
        }
        // setIsLoading(false);
    }, []);

    return { users, error, handleDeleteUsers, setUsersToDelete, setSingleuserToDelete, singleuserToDelete, usersToDelete };
};

export default useCrmUsers;
