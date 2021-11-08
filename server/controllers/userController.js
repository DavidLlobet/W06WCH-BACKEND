const loginUser = async (req, res, next) => {
const {username, password} = req.body;
if (!user){
 error 401
} else {
const rightPassword = await bcrypt.compare(password, user.password); //true o false
if(!rightPassword){
	error i tal
} else {

const token = jwt.sign(
	{
		id: user.id;
		name: user.name;
	}
	process.env.JWT_SECRET //Me da el token
		{
			expireIn
		}
	);
	res.json({token}) //Lo guardo
}