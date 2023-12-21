import { useState } from 'react';

function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleFormSubmit(e) {
        e.preventDefault();

        if(!username || !password) {
            setError("Please enter a username and password.");
            return;
        }

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
            const data = await response.json();
            console.log(data);
            setToken(data.token);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleFormSubmit}>

                <label>
                    <input value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                </label>

                <label>
                    <input value={password} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </label>

                <button class="button">Submit</button>
            </form>
        </>
    );
}

export default SignUpForm;