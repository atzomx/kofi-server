const get = (base: string) => {
  return {
    create: `${base}Create`,
    update: `${base}Update`,
    paginate: `${base}Paginate`,
    find: `${base}ById`,
  };
};

export default { get };
