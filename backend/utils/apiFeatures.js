class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    /// Removing some feilds from  category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((field) => {
      delete queryCopy[field];
    });

    /// Filter for price and Rating and Category;

    this.query = this.query.find({
      ...queryCopy,
      category: {
        $regex: this.queryStr.category,
        $options: "i",
      },
    });
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.skip(skip).limit(resultPerPage);
    return this;
  }
}

module.exports = ApiFeatures;
