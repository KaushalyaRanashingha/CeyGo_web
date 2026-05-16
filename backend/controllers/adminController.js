exports.destinationsPage = (req, res) => {
  res.render("admin/destinations", {
    admin: req.admin,
    destinations: ALL_PLACES,
    search: ""
  });
};