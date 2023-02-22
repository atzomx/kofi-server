const get = (base: string) => {
  return {
    create: `${base}Create`,
    update: `${base}Update`,
    paginate: `${base}Paginate`,
    find: `${base}ById`,
    new: `${base}New`,
    delete: `${base}Delete`,
    me: `${base}Me`,
  };
};

export default { get };
