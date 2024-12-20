const express = require('express');
const router = express.Router();



// Post route to add a person
router.post('/', async (req, res) => {
  try {
    const data = req.body // Assuing the request body containg the person data
    // console.log(data);s
    // Create a new person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);

  } catch (err) {
    console.log(err, "Server error");
    res.status(500).json({ error: 'Internal Server Error' })

  }
})


// GET method to get the person
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


// unique id of mongodb
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;     // Extract id from the URL parameter
    const updatedPersonData = req.body;    // Updated the data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,  // Return the updated document
      runValidators: true,   // Run Mongoose validation

    })

    if (!response) {
      return res.status(404).json({
        error: 'Person not found'
      })
    }
    console.log('data updated');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// delete operation 
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    // Assuming you have a person model
    const response = await Person.findByIdAndRemove(personId);

    if (!response) {
      return res.status(404).json({
        error: 'Person not found'
      })
    }

    console.log('data delete');
    res.status(200).json({ message: 'person deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


// Paramaterised API calls
router.get('/:workType', async (
  req, res
) => {
  try {
    const workType = req.params.workType;    // Extract the workType from the url parameter
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter'

    ) {
      const response = await Person.find({
        work: workType
      });
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid workType' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}
)


module.exports = router;