class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // to search the a particular product using keyword.
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  //filter the product using price , rating, category
  filter() {
    const queryCopy = { ...this.queryStr };
    console.log(queryCopy);

    // removing some fieds for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryCopy);
    return this;
  }

  //pagination
  pagination(resultPerpage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerpage * (currentPage - 1);
    this.query = this.query.limit(resultPerpage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
