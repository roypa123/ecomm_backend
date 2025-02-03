class PaginationVO {
    constructor(page = 0, size = 10) {
      this.page = page;
      this.size = size;
    }
  }
  
  class FilterVo {
    constructor(value) {
      this.value = value;
    }
  }
  
  class OrderVo {
    constructor(value) {
      this.value = value;
    }
  }
  
  class SortVo {
    constructor(sortOrder) {
      this.sortOrder = sortOrder;
    }
  }
  
  class RequestVO {
    constructor({
      data,
      pagination,
      filter,
      sortBy,
      orderBy,
      skipWarning = false,
    }) {
      this.data = data;
      this.pagination = pagination;
      this.filter = filter;
      this.sortBy = sortBy;
      this.skipWarning = skipWarning;
      this.orderBy = orderBy;
    }
  }
  
  module.exports = {
    RequestVO,
    PaginationVO,
    FilterVo,
    SortVo,
    OrderVo,
  };