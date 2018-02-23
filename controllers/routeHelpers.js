
module.exports.callAPIFunction = (func, args, req, res) =>{
  func(args).then((result) => {
  	res.status(200).send(result);
  }).catch((error) => {
  	res.status(500).send(error);
  });
}