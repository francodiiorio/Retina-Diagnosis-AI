const USERS = [
    {
        id: 'u1',
        name: 'fran',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Robert_Downey_Jr-2008.JPG/800px-Robert_Downey_Jr-2008.JPG',
        places: 3
    },
    {
        id: 'u2',
        name: 'Juan',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Robert_Downey_Jr-2008.JPG/800px-Robert_Downey_Jr-2008.JPG',
        places: 2
    }
]

const getUsers = () => {
    return new Promise((resolve, reject) =>{
        return resolve(USERS)
    })
}

const usersService = {getUsers}

export default usersService