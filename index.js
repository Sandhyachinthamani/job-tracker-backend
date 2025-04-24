require("dotenv").config();
console.log("🔧 MONGO_URI:", process.env.MONGO_URI); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

