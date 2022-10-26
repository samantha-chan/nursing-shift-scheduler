const fs = require('fs');
const express = require('express')
const next = require('next')

const chanceOfFailure = 0.10;
const shiftList = JSON.parse(fs.readFileSync('pages/api/shift_list.json', 'utf8'));
const nurseList = JSON.parse(fs.readFileSync('pages/api/nurse_list.json', 'utf8'));

const PORT = parseInt(process.env.PORT, 10) || 9001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

app.prepare().then(() => {
  const server = express()

  /**
   * Returns a JSON list of the shifts in the facility
   */
    server.get('/shifts', (req, res) => {
    console.info('Attempting to send shift list to requestor');
    if(Math.random() > chanceOfFailure) {
      res.status(200).send(shiftList);
      console.info('Successfully delivered shift list');
    }
    else {
      res.status(500).send({ error: 'Server blew up'});
      console.error('Oh no! The send failed!');
    }
  });

  /**
   * Returns a JSON list of nurses in the facility
   */
    server.get('/nurses', (req, res) => {
      console.info('Attempting to send nurse list to requestor');
      if(Math.random() > chanceOfFailure) {
        res.status(200).send(nurseList);
        console.info('Successfully delivered nurse list');
      }
      else {
        res.status(500).send({ error: 'Server blew up'});
        console.error('Oh no! The send failed!');
      }
    });

    /* Given an API call with a shift ID to save and a nurseID in the request body, will fake saving that nurse to the shift.
    */
    app.put('/shifts/:shiftID', (req, res) => {
      const shiftID = req.params.shiftID;
      const nurseID = req.body.nurseID;
      console.info(`Attempting to save shift ${shiftID} with nurse ${nurseID} assigned to it.`);
      if (Math.random() > chanceOfFailure) {
        res.status(200).send({
          shiftID,
          nurseID,
        })
        console.info(`Successfully saved the shift ${shiftID}`)
      }
      else {
        res.status(500).send({ error: 'Server blew up'});
        console.error('Oh no! The save failed!');
      }
    });


  /**
   * Start the server
   */
  server.listen(PORT, () => {
    console.info(`Server is listening on port ${PORT}`); 
  });
  
}).catch(er => {
  console.error(er.stack)
  process.exit(1)
})






