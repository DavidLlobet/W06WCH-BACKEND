const jwt = require(

const auth = (req, res, next) =>{
	const authHeader = req.header ("Authorization"); //Si llega o no
	if(!authHeader){
		error bla bla bla
	} else {
		const token = authHeader.split(" ")[1]; //Para coger el token
		if (!token){
		  "token missing"

			error... code 401;

		} else {
			try{
			const user = jwt.verify(token, process.env.JWT_SECRET) //Me devuelve el Payload
			req.userId = user.Id;
			next();
			} catch (error) {
				const error = new Error ("Token invalid");
       error.code= 401;
			 next(error)
			
		}
 req.header("Authorization");