class Http{
    static instance = new Http();

    get = async (url) => {
        try {
            const req = await fetch(url);
            const data = await req.json();
            
            return data;
        } catch (err) {
            console.log("There's an error on the method get: ",err);

            throw Error(err);
        }
    }

    post = async (url, body) => {
        try {
            const req = await fetch(url, {
                method: 'POST',
                body
            });
            const data = await req.json();

            return data;

        } catch (err) {
            console.log("There's an error on method post: ", err);
            throw Error(err);
        }
    }

    put = async (url, id, body) => {
        try {
            const req = await fetch(url, {
                method: 'PUT',
                id,
                body
            })
            const data = await req.json();

            return data;

        } catch (err) {
            console.log("There's an error on the method put: ", err);

            throw Error(err);
        }
    }

    delete = async (url, id) => {
        try {
            const req = await fetch(url, {
                method: 'DELETE',
                id
            });
            const data = req.json();

            return data;

        } catch (err) {
            console.log("There's an error on the method delete: ", err);

            throw Error(err);
        }
    }

}

export default Http;