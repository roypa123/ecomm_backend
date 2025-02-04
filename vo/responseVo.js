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
  constructor(status_code, status, message, errors ) {
    this.status_code = status_code;
    this.status = status;
    this.message = message
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
  constructor(data, totalPages, totalElements, currentPage, pageSize) {
    this.content = data;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}

class ResponseVO {
  constructor(status_code, status, message, data ) {
    this.status_code = status_code
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