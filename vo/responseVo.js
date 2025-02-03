class PaginationResVO {
    constructor(totalPages, totalElements, currentPage, pageSize) {
      this.totalPages = totalPages;
      this.totalElements = totalElements;
      this.currentPage = currentPage;
      this.pageSize = pageSize;
    }
  }
  
  class FieldErrorVO {
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  }
  
  class ErrorVO {
    constructor(code, status, errors) {
      this.code = code;
      this.status = status;
      this.errors = [errors];
    }
  }
  
  class WarningVO {
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  }
  
  class DataVo {
    constructor(data, totalPages,totalElements,currentPage,pageSize) {
      this.content = data;
      this.totalPages = totalPages;
      this.totalElements = totalElements;
      this.currentPage = currentPage;
      this.pageSize = pageSize;
    }
  }
  
  class ResponseVO {
    constructor(message, status, data) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }
  
  module.exports = {
    ResponseVO,
    PaginationResVO,
    FieldErrorVO,
    ErrorVO,
    WarningVO,
    DataVo
  };