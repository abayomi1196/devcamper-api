const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // fields to exclude
  const removedFields = ["select", "sort", "page", "limit"];

  // delete excluded fields from reqQuery
  removedFields.forEach((param) => delete reqQuery[param]);

  // create new query string
  let queryStr = JSON.stringify(reqQuery);

  // prepend operators with $ sign (needed for mongoose operations)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryStr));

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sort fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  // pagination
  const total = await model.countDocuments();
  const pagination = {};
  if (endIdx < total) {
    pagination.next = { page: page + 1, limit };
  }

  if (startIdx > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  query.skip(startIdx).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  // set the results to the `advancedResults` ppty
  res.advancedResults = { nbHits: results.length, pagination, results };

  next();
};

export default advancedResults;
