'user strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  order = mongoose.model('order'),
  customer = mongoose.model('restaurantuser');
  bookings = mongoose.model('booking');
  Admin = mongoose.model('Admin');
  // HandymanHandlers = require('../controllers/HandymanController.js'),
  // WorkRequestHandlers = require('../controllers/WorkRequestController.js');
  const accountSid = 'ACdb6a9dd060e90a94b29ab1aa7d841ba6';
  const authToken = '673472d82b32e97244c21206539bb1a2';
  const client = require('twilio')(accountSid, authToken);


  exports.admin_login = function(req, res) {
    //console.log(req.body.username);
    Admin.findOne({
    username: req.body.username,
    password: req.body.password

  }, function(err, admin) {
      if (err)  throw err;
      if (!admin) {
      res.status(401).json({ message: 'Authentication failed. Admin not found.', status: '401' });
    } else if (admin) {
      console.log("done");
      return res.json({message: 'Authentication successful, Admin logged in', status: '200' });

    }
  });
};





exports.display_customer = function(req,res){
  customer.find({},function(err,task){
    if(res)
      res.json(task);
    else {
      console.log(err);
    }

  });
}

exports.display_order = function(req,res){
  order.find({},function(err,task){
    if(res)
      res.json(task);
    else {
      console.log(err);
    }

  });
}

exports.display_booking = function(req,res){
  bookings.find({},function(err,task){
    if(res)
      res.json(task);
    else {
      console.log(err);
    }

  });
}


exports.edit_customer = function(req,res){
  //var newEntry = new customer(req.body);
  customer.findOneAndUpdate({customerNo:req.body.customerNo}, {$set:req.body}, {upsert: true},function(err,task){
    if(task)
      res.json(task);
    else {
      console.log(err);
    }


      });
}

exports.edit_order = function(req,res){
  //var newEntry = new order(req.body);
  customer.findOneAndUpdate({customerNo:req.body.GroupNumber}, {$set:req.body}, {upsert: true},function(err,task){
    if(task)
      res.json(task);
    else {
      console.log(err);
    }


      });
}

exports.edit_booking = function(req,res){
  //var newEntry = new booking(req.body);
  customer.findOneAndUpdate({customerNo:req.body.customerNo}, {$set:req.body}, {upsert: true},function(err,task){
    if(task)
      res.json(task);
    else {
      console.log(err);
    }


      });
}

exports.save = function(req,res){
  var cust  = new customer(req.body)
  cust.save(function(err,task){
    if(err)
      console.log(err)
    console.log(res)
  });
}

exports.sms = function(req, res) {
  console.log('here');
  var newCustomer = new customer();
  var input=req.body.Body.toLowerCase();
  console.log(input);
  if (input.includes('make a reservation')){
    console.log(req.body.From);
  //   var newCustomer1 = customer();
    newCustomer.customerNo = req.body.From;
    newCustomer.Timeslotreq = null;
    newCustomer.TimeSlotAss = null;
    newCustomer.ReservationMadeAt = null;
    newCustomer.Adults = null;
  newCustomer.Kids = null;
    newCustomer.SpecialRequests = null;
    newCustomer.DisabilityAccomodation = null;
    newCustomer.Name = null;
  newCustomer.MenuPreOrdered = null;
    newCustomer.Friends = null;

    newCustomer.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);


  });
    sendData(req.body.From, "Welcome to the reservation portal, please tell me your name in the the format - Name: <yourname>");

  //   newCustomer. = req.body.Body;
  //
  //
  //
  // split_data.forEach(function(element){
  //   console.log(element);
  //
  // });
  //
  // newHandyman.from = req.body.From;
  // newHandyman.Name = split_data[1];
  // newHandyman.zip = split_data[2];
  // newHandyman.region = split_data[3];
  //
  // console.log(newHandyman);
  //
  //
  //
  // HandymanHandlers.register_handyman(newHandyman, function(err,data){
  //
  //   if (err) throw err;
  //   if (data) {
  //       console.log('handyman saved');
  //     }
  // return;
  // });
}
else if(input.includes('name')){
  var split_data = input.split(":");
  newCustomer.customerNo = req.body.From;
  //console.log("1");
  newCustomer.Name = split_data[1].trim();
  //console.log("2");
  newCustomer.save(function(err, task) {
  if (err)
    res.send(err);

    console.log(err);
    console.log(task);
  res.json(task);



  });

  sendData(req.body.From, "Hi "+newCustomer.Name+", Please tell me the number of adults and kids accompanying you in the format: Adults:<number>, kids:<number>" );

  //console.log(req.body.From + newCustomer.Name);
}
else if(input.includes('adults') || input.includes('kids')){
  var split_data = input.split(",");
  var adult = split_data[0].trim().split(":");
  var kids = split_data[1].trim().split(":");

  var c1 = new customer();

  customer.findOne({customerNo:req.body.From},function(err,res){
    if(res){
    console.log(res);

      res.Adults = adult[1].trim();
      res.Kids = kids[1].trim();
      customer.findOneAndUpdate({customerNo:req.body.From}, res, {new: true},function(err,res){
          if(err)
            console.log(err)
          else {
            console.log(res)
          }

      });

    }
    else {
      console.log(err)
    }
  });

  //newCustomer.customerNo = req.body.From;
  //newCustomer.Name = split_data[1].trim();
  sendData(req.body.From, "Thanks, Do you need any disability accomodations that we need to take care of? Please reply in the format - Disability:<y/n>");

  //console.log(newCustomer);
}
else if(input.includes('disability')){
  var split_data = input.split(":");

  customer.findOne({customerNo:req.body.From},function(err,res){
    if(res){
    console.log(res);

    if(split_data[1].toLowerCase().trim() == 'y')
      res.DisabilityAccomodation = true;
    else if(split_data[1].toLowerCase().trim() == 'n')
      res.DisabilityAccomodation = false;
  customer.findOneAndUpdate({customerNo:req.body.From}, res, {new: true},function(err,res){
          if(err)
            console.log(err)
          else {
            console.log(res)
          }

      });

    }
    else {
      console.log(err)
    }
  });

  sendData(req.body.From, "Do you want to add other numbers for alerts related to this reservation. If yes, please send the numbers as - Friends:<number1> <number2> .., otherwise reply Friends: No " );

  console.log(newCustomer);
}
else if(input.includes('friends')){

  var numbers = [];

  var split_data = input.split(":");

  customer.findOne({customerNo:req.body.From},function(err,res){
    if(res){
    console.log(res);


      if(split_data[1].toLowerCase().trim() == 'no')
        res.Friends = null;
      else{
        numbers = split_data[1].trim().split(",");
        console.log(numbers);
        res.Friends = numbers;
        sendData(req.body.From,"All your friends have been added and sent a text meesage, they will also be sent an alert for the updates of this reservation ");

        numbers.forEach(function(element) {
          sendData(element,"Hi your friend "+ newCustomer.Name +" has registered you as a friend for a reservation at our restaurant.")
        });

      }
  customer.findOneAndUpdate({customerNo:req.body.From}, res, {new: true},function(err,res){
          if(err)
            console.log(err)
          else {
            console.log(res)
          }

      });

    }
    else {
      console.log(err)
    }
  });


  //sendData(req.body.From, "Do you want to add other numbers for alerts related to this reservation. If yes, please send the numbers as - Friends:<number1> <number2> .., otherwise reply Friends: No " );



  sendData(req.body.From,"Please enter the date and time you would want to visit our restaurant in 24 hour format -  Date:<MM.DD.YYYY> and Time:<HH.MM>");

  console.log(newCustomer);
}
else if(input.trim().includes('time') && input.trim().includes('date')){
  var split_data = input.split("and");
  var date = split_data[0].trim().split(":");
  var time = split_data[1].trim().split(":");
    console.log(split_data);
  var h = time[1].trim().split(".");
var d = date[1].trim().split(".");
  console.log(h);

  var x = new Date();
  x.setDate(d[1]);
  x.setMonth(d[0] - 1);
  x.setYear(d[2]);
  x.setMinutes(h[1]);
  x.setHours(h[0]);

  console.log(x);

  customer.findOne({customerNo:req.body.From},function(err,res){
    if(res){
    console.log(res);

  res.Timeslotreq = x;
  customer.findOneAndUpdate({customerNo:res.customerNo}, res, {new: true},function(err,task1){
          if(err)
            console.log(err)
          else {
            console.log(task1)
            sendData(req.body.From,"Your request for " +task1.Timeslotreq.toISOString().replace(/T/, " ").replace(/\..+/,'')+ " has been received and will be confirmed shortly via text.");
//            res.MenuPreOrdered = false;
//            sendData(req.body.From,"Your request has been receieved and we will let you know once the booking is approved by admin");

            const intervalObj30 = setInterval(() => {
              sendData(req.body.From,"Sorry, our restaurant is booked, please try later")

            },30000)

            const intervalObj = setInterval(() => {
              bookings.find({},function(err,array){
                if(err)
                  console.log(err)
                else {
                  console.log(array.length);
                  if(array.length <= 4){
                    sendData(req.body.From,"Your booking is confirmed for "+res.Timeslotreq.toISOString().replace(/T/, " ").replace(/\..+/,'') +".");
                    sendData(req.body.From," Meanwhile if you want to order something ahead, please reply as - Menu:<y/n>");
                  //  console.log("Your booking is confirmed for " + res.Timeslotreq.getHours() + " : " + res.Timeslotreq.getMinutes() +".");
                    var newbooking = new bookings();
                    newbooking.customerNo = res.customerNo
                    newbooking.Timeslotreq = res.Timeslotreq
                    newbooking.TimeSlotAss = res.TimeSlotAss
                    newbooking.ReservationMadeAt = res.ReservationMadeAt
                    newbooking.Adults = res.Adults
                    newbooking.Kids = res.Kids
                    newbooking.SpecialRequests = res.SpecialRequests
                    newbooking.DisabilityAccomodation = res.DisabilityAccomodation
                    newbooking.Name = res.Name
                    newbooking.MenuPreOrdered = res.MenuPreOrdered
                    newbooking.Friends = res.Friends
                    newbooking.Alerted = res.Alerted
                    //newbooking._id = res._id

                    newbooking.save(function(err,task){
                      if(err)
                        console.log("saving err" + err)
                      else {
                        console.log("saved in bookings")
                        clearTimeout(intervalObj30);
                        clearTimeout(intervalObj);

                      }
                    });
                  }
                }
              });

            }, 5000);



          }

      });

    }
    else {
      console.log(err)
    }
  });

  //sendData(req.body.From, "Do you want to add other numbers for alerts related to this reservation. If yes, please send the numbers as - Friends:<number1> <number2> .., otherwise reply Friends: No " );

  console.log(newCustomer);
  console.log(x.toISOString().replace(/T/, " ").replace(/\..+/,''));




}
else if (input.includes('menu')) {

  var split_data = input.trim().split(":")
  customer.findOne({customerNo:req.body.From},function(err,res){
    if(res){
    console.log(res);

    if(split_data[1] == 'y'){


      res.MenuPreOrdered = true;
      sendData(req.body.From,"Thank you for choosing to preorder the menu" );

      order.findOne({GroupNumber:1},function(err,res){
        if(res){
        console.log(res);
        sendData(req.body.From,"Straters: "+res.Starters+", MainCourse: " + res.MainCourse +", Drinks: "+ res.Drinks + ", Desserts: "+res.Desserts);
        sendData(req.body.From,"Please use the format as  'Options - Starters:<option numbers-comma separated> and Drinks:<option numbers-comma separated> and MainCourse:<option numbers-comma separated> and Desserts:<option numbers-comma separated>'")
      }
        else {
          console.log(err)
        }
      });



    } else if(split_data[1] =='n'){
      res.MenuPreOrdered = false;
      sendData(req.body.From, "Your options is saved. We will see you here.")

    }

      console.log(res.MenuPreOrdered);


  customer.findOneAndUpdate({customerNo:res.customerNo}, {$set:{MenuPreOrdered:res.MenuPreOrdered}}, {upsert: true},function(err,res){
          if(err)
            console.log(err)
          else {
            console.log(res)

          }

      });

    }
    else {
      console.log(err)
    }
  });



}
else if(input.includes('options') ){

  var newOrder = order();
    var split_data = input.split("-");
    newOrder.GroupNumber = req.body.From;
    var splits  =split_data[1].trim().split("and")
    console.log(splits.length);
    for(var i =0; i< splits.length;i++){
      if(splits[i].includes("starters")){
        var options = splits[i].trim().split(":");
        newOrder.Starters = options[1];
      }else if(splits[i].includes("desserts")){

          var options = splits[i].trim().split(":");
          newOrder.Desserts = options[1];

      }else if(splits[i].includes("maincourse")){

          var options = splits[i].trim().split(":");
          newOrder.MainCourse = options[1];
      }else if(splits[i].includes("drinks")){

          var options = splits[i].trim().split(":");
          newOrder.Drinks = options[1];
      }
    }
    sendData(req.body.From, "Your menu options are recieved. Looking forward to see you");




}
else if(input.includes('cancel booking')){
  customer.remove({
    customerNo:req.body.From
  }, function(err, task) {
    if (err)
      res.send(err);
    bookings.remove({
        customerNo:req.body.From
      }, function(err, task) {
        if (err)
          res.send(err);
        sendData(req.body.From,"Your booking has been canceled. Hope to see you again.")
      });

  });

}
}






// function to send the messages
function sendData(toNumber,message) {
  client.messages.create({
    body:"\n"+ message +"\n",
    from: '+19163474972',
    to: toNumber
  })
  .then(message => console.log(message.sid))
  .done();
}

const intervalObj30 = setInterval(() => {
bookings.find({},function(err,res){
  var y = new Date();


  if(err)
    console.log(err)
  else {
    for(var i=0;  i< res.length; i++){
      if(Math.abs(y - res[i].Timeslotreq) < 600000 && !res[i].Alerted){
        res[i].Alerted =true;
        bookings.findOneAndUpdate({customerNo:res[i].customerNo},res[i], {new: true},function(err,task){
          if(err)
          console.log(err)
          else {
            sendData(task.customerNo,"Your booking is ready and due in 30mins.")

          }
        })
      }
      console.log(Math.abs(y - res[i].Timeslotreq))
      console.log(y +"\t"+res[i].Timeslotreq)
    }
  }


})
},5000)
