import { Itinerary } from "../models/itinerary.js"

function index(req, res) {
  // console.log('<><><> ITIN_INDEX_SHOW <><><>')
  // req.body.owner = req.user.profile

  Itinerary.find({})
  .populate("owner")
  .then(itineraries => {
    // console.log('timePlace ----> ',itineraries)
  })
  // .then(itineraries => itineraries.timePlace.populate('places'))
  //   .catch((err) => {
  //     res.json(err)
  //   })
}

function show(req, res) {
  console.log('<><><> ITIN_CONTROLLER_SHOW <><><>')
  req.body.owner = req.user.profile

  Itinerary.findById(req.params.id)
    .populate("owner")
    .then((itinerary) => {
      console.log(itinerary)
      res.render("itineraries/:id", {
        itinerary,
        title: "Itinerary",
      })
    })
    .catch((err) => {
      console.log(err)
      res.redirect("/itineraries")
    })
}

async function create(req, res) {
  if(Object.keys(req.body[0].length === 0)) delete req.body[0]
  req.body.owner = req.user.profile
  // console.log(req.body)
  const itinerary = await Itinerary.create({
    name: req.body['24'].name,
    owner: req.body.owner
  })
  
  const keys = Object.keys(req.body)
  Object.values(req.body).forEach((item, i) => {
    if(keys[i] !== '24' && keys[i] !== 'owner' ) {
      // console.log(keys[i], item)
      const time = keys[i]
      let obj = {}
      obj['time'] = time
      obj['places'] = item
      itinerary.timePlace.push(obj)
    }
  })
  itinerary.save()
  res.status(201).json(itinerary)
}

function update(req, res) {}

function deleteItinerary(req, res) {
  Itinerary.findByIdAndDelete(req.params.id)
    .then((itinerary) => res.json(itinerary))
    .catch((err) => res.json(err))
}

export { 
  index, 
  show, 
  create, 
  update, 
  deleteItinerary as delete 
}