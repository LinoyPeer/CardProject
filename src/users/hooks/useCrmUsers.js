import { useEffect, useState } from 'react';
import axios from 'axios';

const useCrmUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('my token');

                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
                    headers: {
                        'x-auth-token': token
                    }
                });

                setUsers(response.data);
            } catch (error) {
                setError(error.message);
                console.log('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUsers = async (id) => {
        if (!confirm('ARE YOU SURE YOU WANT TO DELETE THIS USER?')) return;
        try {
            const token = localStorage.getItem('my token');

            if (!token) {
                throw new Error('Token not found');
            }

            await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            setUsers(prev => prev.filter(user => user._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return { users, error, handleDeleteUsers, setUsers };
};

export default useCrmUsers;
