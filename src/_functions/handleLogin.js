
const handleLogin = async (user, isAuthenticated, setCurrentPokeUser) => {

       class pokeUser {

        constructor(email, username) {
            this.email = email;
            this.username = username;
            this.favPoke = [];
        }
    }
    if (!isAuthenticated) return;
    // setCurrentPokeUser({
    //     email: user.email,
    //     username: user.name
    //     })

    const res = await fetch('https://pokedex-api-collenpw.herokuapp.com/pokemon');
    const data = await res.json();
    let count = 0;
    data.map((pokeUser) => {
        if (pokeUser.email === user.email) { 
            setCurrentPokeUser(pokeUser);
            count++;
        }
    })
    if (count) {
        return
    } else {
        try {
            const res = await fetch('https://pokedex-api-collenpw.herokuapp.com/pokemon', {
                method: 'POST',
                body: JSON.stringify(new pokeUser(user.email, user.nickname)),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        catch (err) {
            console.log(err);
        }

    }
    
}

export default handleLogin;