export default class Validator {
  constructor() {
    this.validators = [];
  }

  add(validator) {
    this.validators.push(validator);
  }

  invalidValidators() {
    return this.validators.filter(v => !v.valid());
  }

  valid() {
    return this.invalidValidators().length === 0;
  }

  invalid() {
    return !this.valid();
  }

  errorMessages() {
    return this.invalidValidators().map(v => ( { key: v.key, message: v.errorMessage } ));
  }
}
