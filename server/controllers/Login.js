exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user =
        await User.findOne({ email });

    if (
        user &&
        await bcrypt.compare(
            password,
            user.password
        )
    ) {

        res.json({

            _id: user._id,

            firstName: user.firstName,

            email: user.email,

            role: user.role,

            token: generateToken(user._id)

        });

    }

    else {

        res.status(401).json({

            message: "Invalid credentials"

        });

    }

};