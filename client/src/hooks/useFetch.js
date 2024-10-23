import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api/apiConfig';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (endpoint, method = 'GET', body = null) => {
        setLoading(true);
        setError(null);
        try {
            setLoading(true);

            const response = await axios({
                method,
                url: `${BASE_URL}${endpoint}`,
                data: body ? JSON.stringify(body) : null,
                headers: { 'Content-Type': 'application/json' },
            });

            setData(response.data);
        } catch (err) {
            setError(err);
            console.error('API error: ', err.response || err.message)
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};

export default useFetch;
