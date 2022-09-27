const accents = (value: string) => {
  const clean = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return clean;
};
const clean = (name: string) => name.trim().trimEnd().toLowerCase();

export class Sanitizer {
  private value: string;
  constructor(value: string) {
    this.value = value;
  }

  accents() {
    this.value = accents(this.value);
    return this;
  }

  clean() {
    this.value = clean(this.value);
    return this;
  }

  toString() {
    return this.value;
  }
}

export default { accents, clean };
