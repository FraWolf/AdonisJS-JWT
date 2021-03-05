'use strict'

const User = use('App/Models/User');

class UserController {
    async signup ({ request, auth}) {
        const user = await User.create(request.only(['username', 'email', 'password']));
        const token = await auth.generate(user);
        
        return Object.assign(user, token);
    }

    async login ({ request, auth }) {

        const { email, password } = request.all();
        const data = await auth.attempt(email, password);

        // Check if the login attempt is successfull
        if(data) {

            const userFromDB = await User.findBy('email', email);
            const token = await auth.generate(userFromDB);

            return {
                "code": "success",
                "user_id": userFromDB.id,
                "access_token": token
            };

        }
    }
    
    show ({ auth, params }) {
        if (auth.user.id !== Number(params.userId)) {
            return "You cannot see someone else's profile"
        }
        return auth.user
    }
}

module.exports = UserController
