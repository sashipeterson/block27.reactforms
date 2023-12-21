import { useState } from 'react';

function Authenticate({ token }) {
    const [username, setUsername] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    async function handleAuthentication() {

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate',
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            const responseData = await response.json();

            if (responseData.success) {
                setUsername(responseData.username);
                setSuccessMessage(responseData.message);
            } else {
                throw new Error('Authentication failed');
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Authenticate</h2>
            {successMessage && <p>{successMessage}</p>}
            {username && <p>Username: {username}</p>}
            {error && <p>{error}</p>}
            <button class="button" onClick={handleAuthentication}>Authenticate</button>
        </div>
    );
}

export default Authenticate;