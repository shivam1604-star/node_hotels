// const express = require('express');
// const router = express.Router();
// const MenuItem = require('../models/menuItem');








// // POST Method to add Menu item
// router.post('/', async (req, res) => {
//   try {
//     const data = req.body;
//     const newMenuItem = newMenuItem(data);
//     const response = await newMenuItem.Save();
//     console.log('data saved');
//     res.status(200).json(response);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json({
//       error: 'Internal Server Error'
//     });
//   }
// })

// // GET method to get Menu items
// router.get('/taste', async (req, res) => {
//   try {
//     const data = await MenuItem.find();
//     console.log('data fetched');
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// }
// )

// module.exports = router;