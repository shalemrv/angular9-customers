
	const express		= require(`express`);
	const bodyParser	= require(`body-parser`);
	const cors			= require(`cors`);
	const path			= require(`path`);
	const mongoose		= require(`mongoose`);

	const app = express();

	const routesHandler = require(`./api/routes`);

	mongoose.connect(`mongodb://localhost:27017/customersManagement`, {useNewUrlParser: true});

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
	
	//Middleware
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	
	//Static files
	// app.use(express.static(path.join(__dirname, `public`)));

	//Define files for different categories
	app.use(`/api/customer`, routesHandler);

	
	// Start API server
	const port = 54321;

	app.listen(port, ()=>{
		console.log(`Listening in on port ${port}`);
	});
