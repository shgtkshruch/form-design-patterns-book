export default class Validator {
  constructor() {
    this.validators = [];
    this.errors = new Error();
  }

  add(validator) {
    this.validators.push(validator);
  }

  valid() {
    return !this.invalid();
  }

  invalid() {
    return this.invalidValidators().length > 0;
  }

  invalidValidators() {
    return this.validators.filter(v => !v.valid());
  }

  errorMessages() {
    this.invalidValidators().forEach(v => {
      if (!this.errors.exsit(v.key)) {
        this.errors.add({ key: v.key, message: v.errorMessage });
      }
    });
    return this.errors;
  }
}

class Error {
  constructor() {
    this.errors = [];
  }

  add(error) {
    this.errors.push(error);
  }

  all() {
    return this.errors;
  }

  count() {
    return this.all().length;
  }

  getMessage(key) {
    if (this.errors.length > 0) {
      const keyError = this.errors.filter(e => e.key === key)[0];
      if (keyError) {
        return keyError.message;
      }
    }
    return '';
  }

  exsit(key) {
    return this.getMessage(key).length > 0;
  }
}
