
	const express		= require(`express`);
	const bodyParser	= require(`body-parser`);
	const cors			= require(`cors`);
	const path			= require(`path`);
	const mongoose		= require(`mongoose`);

	const app = express();

	const routesHandler = require(`./api/routes`);

	mongoose.connect(`mongodb://localhost:27017/customerInfo`);

	mongoose.connection.on(`connected`, ()=>{
		console.log(`Connected to to MongoDB`);
	})

	mongoose.connection.on(`error`, (err)=>{
		if(err){
			console.log(`MongoDB Connection Error - ${err} `);
		}
	})

	
	app.get(`/`, (req, res)=>{
		res.send({
			complete	: false,
			message		: `Invalid Request`
		});
	});
	
	//Define files for different categories
	app.use(`/api/customer`, routesHandler);
	
	//Middleware
	app.use(cors());
	app.use(bodyParser.json());
	
	//Static files
	app.use(express.static(path.join(__dirname, `public`)));
	
	// Start API server
	const port = 54321;

	app.listen(port, ()=>{
		console.log(`Listening in on port ${port}`);
	});
