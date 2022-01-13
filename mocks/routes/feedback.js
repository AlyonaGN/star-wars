const FEEDBACK = [''];

module.exports = [
  {
    id: "post-feedback", // id of the route
    url: "/api/feedback", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        response: (req, res, next, mocksServer) => {
          res.status(200).send(
            res
          );
        }
      },
      {
        id: "error", // id of the variant
        response: {
          status: 400, // status to send
          body: {
            // body to send
            message: "Error",
          },
        },
      },
    ],
  }
];
