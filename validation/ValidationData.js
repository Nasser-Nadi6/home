class ValidationData {
  errors = [];

  isEmail(email) {
    const emailPattern = /[a-zA-Z0-9.+-]+@[a-zA-Z]+\.[a-zA-Z]+/;
    if (email && emailPattern.test(email)) {
      this.errors = this.errors.filter((err) => {
        return err !== "Error: Email is invalid";
      });
      return true;
    }
    this.validationError("Error: Email is invalid");
    return false;
  }

  validFullName(fullName) {
    if (fullName && fullName.length > 2) {
      this.errors = this.errors.filter((err) => {
        return err !== "Error: FullName is invalid";
      });
      return true;
    }

    this.validationError("Error: FullName is invalid");
    return false;
  }

  validationError(error) {
    if (this.errors.includes(error)) {
      return;
    }
    this.errors.push(error);
  }
}

module.exports = new ValidationData();
