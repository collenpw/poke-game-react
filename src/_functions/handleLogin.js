const handleLogin = async (user, isAuthenticated, findCurrentPokeUser) => {

    class pokeUser {

        constructor(email, username) {
            this.email = email;
            this.username = username;
            this.favPoke = [];
        }
    }
    if (!isAuthenticated) return;
    const res = await fetch('https://pokedex-api-collenpw.herokuapp.com/pokemon');
    const data = await res.json();
    let count = 0;
    data.map((pokeUser) => {
        if (pokeUser.email === user.email) { count++ }
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

        findCurrentPokeUser();
    }

}

export default handleLogin;