const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Business = require("./models/Business");
const Product = require("./models/Product");
const FinancialData = require("./models/FinancialData");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🌱 Connected to DB for seeding..."))
  .catch(err => console.error(err));

async function seedData() {
  await User.deleteMany({});
  await Business.deleteMany({});
  await Product.deleteMany({});
  await FinancialData.deleteMany({});

  const hashedPassword = await bcrypt.hash("securepassword", 10);

  const user = await User.create({
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: hashedPassword,
    role: "user"
  });

  const businessesData = [
    {
      name: "StarTech Innovations",
      email: "info@startech.com",
      incorporationType: "Corporation",
      description: "Innovative solutions in artificial intelligence",
      industry: "Technology",
      product: "AI-Powered Automation Tool",
      productDesc: "Automation for everyday business processes using AI"
    },
    {
      name: "OceanBreeze Travel",
      email: "hello@oceanbreeze.com",
      incorporationType: "LLC",
      description: "Travel agency specializing in coastal tours",
      industry: "Travel & Tourism",
      product: "Luxury Beach Resort Package",
      productDesc: "All-inclusive luxury beach resort experience"
    },
    {
      name: "NatureGro",
      email: "support@naturegro.com",
      incorporationType: "Non-Profit",
      description: "Sustainable farming and organic produce distribution",
      industry: "Agriculture",
      product: "Organic Vegetable Box",
      productDesc: "Fresh organic vegetables delivered weekly"
    },
    {
      name: "CodeCrafters Academy",
      email: "contact@codecrafters.edu",
      incorporationType: "Sole Proprietorship",
      description: "Online coding school offering bootcamps and tutorials",
      industry: "Education",
      product: "Full Stack Developer Bootcamp",
      productDesc: "12-week immersive full-stack development bootcamp"
    },
    {
      name: "FastFuel",
      email: "sales@fastfuel.com",
      incorporationType: "Partnership",
      description: "On-the-go energy solutions for drivers",
      industry: "Automotive",
      product: "Portable Electric Charger",
      productDesc: "Compact, portable charger for electric vehicles"
    },
    {
      name: "ClearSky Solar",
      email: "info@clearsky.com",
      incorporationType: "Corporation",
      description: "Residential and commercial solar energy solutions",
      industry: "Energy",
      product: "Solar Roof Panels",
      productDesc: "Energy-efficient solar panels for rooftops"
    },
    {
      name: "FitJourney",
      email: "support@fitjourney.com",
      incorporationType: "LLP",
      description: "Fitness app offering personalized workout plans",
      industry: "Fitness",
      product: "Personalized Fitness Plans",
      productDesc: "Tailored workout programs based on your fitness goals"
    },
    {
      name: "GigaMart",
      email: "info@gigamart.com",
      incorporationType: "Private Limited",
      description: "E-commerce platform for a wide variety of products",
      industry: "Retail",
      product: "Smartphone",
      productDesc: "Latest smartphones with cutting-edge technology"
    },
    {
      name: "PureWaters",
      email: "hello@purewaters.com",
      incorporationType: "Cooperative",
      description: "Purified water production and distribution",
      industry: "Beverage",
      product: "Bottled Spring Water",
      productDesc: "Premium spring water bottled in eco-friendly materials"
    },
    {
      name: "EventMingle",
      email: "info@eventmingle.com",
      incorporationType: "General Partnership",
      description: "Event management company specializing in corporate events",
      industry: "Hospitality",
      product: "Corporate Event Planning",
      productDesc: "Complete planning and management for corporate events"
    }
  ];

  for (const biz of businessesData) {
    const business = await Business.create({
      name: biz.name,
      email: biz.email,
      password: hashedPassword,
      incorporationType: biz.incorporationType,
      description: biz.description,
      contactDetails: "987-654-3210",
      industry: biz.industry,
      location: "New York",
      role: "business"
    });

    await Product.create({
      businessId: business._id,
      name: biz.product,
      description: biz.productDesc,
      price: parseFloat((Math.random() * 200 + 50).toFixed(2)),
      availability: true
    });

    await FinancialData.create({
      businessId: business._id,
      revenueHistory: [
        { year: 2021, revenue: Math.floor(Math.random() * 200000 + 30000) },
        { year: 2022, revenue: Math.floor(Math.random() * 250000 + 40000) },
        { year: 2023, revenue: Math.floor(Math.random() * 300000 + 50000) }
      ],
      CAGR: parseFloat((Math.random() * 0.4).toFixed(2)),
      profitMargin: parseFloat((Math.random() * 0.35).toFixed(2)),
      ROI: parseFloat((Math.random() * 1.5).toFixed(2)),
      customerRetentionRate: parseFloat((Math.random() * 1).toFixed(2))
    });
  }

  console.log("✅ 10 new dummy businesses inserted!");
  process.exit();
}

seedData();
